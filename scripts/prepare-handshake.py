"""Export only anonymous outcome counts from archived delivery records.
Usage: python scripts/prepare-handshake.py /path/to/private/context
The source documents, task identities and solutions never enter the export.
"""
import csv
import hashlib
import json
from pathlib import Path
import sys

source = Path(sys.argv[1])
target = Path(__file__).resolve().parents[1] / "public/artifacts"
rows = []
excluded = 0
for file in sorted(source.glob("*delivery-record.json")):
    record = json.loads(file.read_text())
    score = (record.get("official") or {}).get("pass_at_5")
    if record.get("phase") != "complete" or not score or score.get("total") != 5:
        excluded += 1
        continue
    solved = score["solved"]
    assert type(solved) is int and 0 <= solved <= 5
    rows.append({
        "task": f"T{len(rows)+1:02}",
        "attempts": 5,
        "solved": solved,
        "not_solved": 5 - solved,
        "category": record["category"],
        "source_sha256": hashlib.sha256(file.read_bytes()).hexdigest(),
    })
assert rows, "No completed five-trial records found"
categories = {}
for row in rows:
    g = categories.setdefault(row["category"], {"category":row["category"],"tasks":0,"attempts":0,"solved":0})
    for key in ["attempts", "solved"]: g[key] += row[key]
    g["tasks"] += 1
payload = {
    "categories": list(categories.values()),
    "schema_version": 1,
    "snapshot_date": "2026-10-13",
    "source_type": "Archived official five-trial results recorded in private delivery summaries",
    "selection": "All complete five-trial delivery records in the inspected context directory; not all authored tasks.",
    "excluded_incomplete_records": excluded,
    "unit": "One final recorded five-trial evaluation per task; anonymous task IDs are not trial order.",
    "limitations": [
        "Historical record snapshot, not a fresh benchmark run or live acceptance audit.",
        "Deliberately difficult tasks selected and revised during benchmark development.",
        "Not solved includes recorded valid failures and timeouts; it does not mean semantic failure in every trial.",
        "Per-model identities, versions and budgets are not normalized across these records.",
        "Counts are observed solved trials, not the probability-of-at-least-one-success pass@k estimator.",
        "Source documents remain private. Hashes provide provenance, not independent public verification.",
    ],
    "tasks": len(rows),
    "attempts": sum(r["attempts"] for r in rows),
    "solved": sum(r["solved"] for r in rows),
    "not_solved": sum(r["not_solved"] for r in rows),
    "rows": rows,
}
(target / "handshake-benchmarks.json").write_text(json.dumps(payload, indent=2) + "\n")
with (target / "handshake-benchmarks.csv").open("w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=list(rows[0]), lineterminator="\n")
    writer.writeheader()
    writer.writerows(rows)
print(f"Exported {len(rows)} tasks, {payload['attempts']} attempts, {payload['solved']} solved; excluded {excluded} incomplete record(s).")
