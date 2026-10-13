"""Project numeric measurements from the private runtime evaluation.
Usage: python scripts/prepare-runtime.py /path/to/evaluation-directory
"""
import csv, hashlib, json, statistics, sys
from pathlib import Path
source=Path(sys.argv[1]);root=Path(__file__).resolve().parents[1]/"public/artifacts"
raw=[json.loads(line) for line in (source/"runs.jsonl").read_text().splitlines()]
rows=[{"family":v["family"],"mode":v["mode"],"repeat":v["repeat"],"passed":v["passed"],"seconds":v["metrics"]["elapsedMs"]/1000,"estimated_usd":v["metrics"]["estimatedUsd"],"model_calls":v["metrics"]["modelCalls"],"fallbacks":v["metrics"]["fallbacks"],"steps":v["metrics"]["steps"]} for v in raw]
groups=[]
for family in dict.fromkeys(v["family"] for v in rows):
 for mode in ["astra","luna","hybrid"]:
  xs=[v for v in rows if v["family"]==family and v["mode"]==mode]
  assert len(xs)==2
  groups.append({"family":family,"mode":mode,"runs":len(xs),"passed":sum(v["passed"] for v in xs),"mean_seconds":statistics.mean(v["seconds"] for v in xs),"mean_estimated_usd":statistics.mean(v["estimated_usd"] for v in xs)})
payload={"source_sha256":hashlib.sha256((source/"runs.jsonl").read_bytes()).hexdigest(),"date":"2026-10-12","method":"Ten synthetic use cases, two repetitions, three policies; same fixtures and deterministic graders; counterbalanced sequential order.","limitations":["Small smoke benchmark, not a statistical superiority test.","Hybrid combines Decisions with Astra planning and completion; no standalone Decisions-only arm.","Costs are recorded standard-rate estimates, not bills or current pricing.","All runtime calls counted; browser execution and parent-agent setup excluded."],"totals":json.loads((source/"summary.json").read_text())["summary"],"groups":groups,"rows":rows}
(root/"decision-runtime.json").write_text(json.dumps(payload,indent=2)+"\n")
with (root/"decision-runtime.csv").open("w",newline="") as f:
 w=csv.DictWriter(f,fieldnames=list(rows[0]), lineterminator="\n");w.writeheader();w.writerows(rows)
print("Exported numeric metrics for",len(rows),"runs.")
