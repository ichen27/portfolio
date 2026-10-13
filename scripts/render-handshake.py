"""Render two figures from the published, anonymized outcome counts."""
import json
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

root = Path(__file__).resolve().parents[1] / "public/artifacts"
data = json.loads((root / "handshake-benchmarks.json").read_text())
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 11, "svg.fonttype": "none", "svg.hashsalt": "handshake-evidence"})
green, gray, ink, paper = "#305e46", "#d9ded8", "#292e2c", "#fdfdfb"

def save(fig, name):
    fig.set_facecolor(paper)
    fig.savefig(root / name, format="svg", metadata={"Date": None})
    p = root / name
    p.write_text("\n".join(line.rstrip() for line in p.read_text().splitlines()) + "\n")
    plt.close(fig)

def style(ax):
    ax.set_facecolor(paper)
    ax.spines[["top", "right"]].set_visible(False)
    ax.tick_params(length=0, pad=8)
    ax.set_axisbelow(True)
    ax.grid(axis="y", alpha=.14)

fig, ax = plt.subplots(figsize=(9, 5.2))
counts = [sum(r["solved"] == n for r in data["rows"]) for n in range(6)]
ax.bar(range(6), counts, width=.55, color=green)
for x, n in enumerate(counts):
    ax.text(x, n + .35, str(n), ha="center", color=ink)
ax.set_xticks(range(6))
ax.set_yticks([0, 5, 10, 15])
ax.set_ylim(0, 15)
ax.set_xlabel("Solved trials out of five", labelpad=12)
ax.set_ylabel("Number of tasks", labelpad=12)
style(ax)
fig.suptitle("How often did agents solve the tasks?", x=.12, ha="left", fontsize=17)
fig.text(.12, .88, f"{data['tasks']} completed task records · {data['attempts']} official attempts · {data['solved']} solves", fontsize=11, color=green)
fig.subplots_adjust(left=.12, right=.95, top=.80, bottom=.22)
fig.text(.12, .035, "Selected difficult tasks. Archived results; not a general model success rate.", fontsize=10, color=ink)
save(fig, "handshake-distribution.svg")

fig, ax = plt.subplots(figsize=(9, 7.8))
rows = data["rows"]
y = list(range(len(rows)))
ax.barh(y, [r["solved"] for r in rows], height=.64, color=green, label="Solved")
ax.barh(y, [r["not_solved"] for r in rows], left=[r["solved"] for r in rows], height=.64, color=gray, label="Not solved")
for i, row in enumerate(rows):
    ax.text(5.15, i, f'{row["solved"]}/5', va="center", fontsize=10, color=ink)
ax.set_yticks(y, [r["task"] for r in rows])
ax.set_xticks(range(6))
ax.set_xlim(0, 5.65)
ax.invert_yaxis()
ax.set_xlabel("Recorded attempts", labelpad=12)
style(ax)
ax.grid(False)
ax.legend(frameon=False, loc="lower left", bbox_to_anchor=(0, 1.01), ncols=2)
fig.suptitle("Every task in the published sample", x=.12, ha="left", fontsize=17)
fig.subplots_adjust(left=.12, right=.94, top=.87, bottom=.15)
fig.text(.12, .035, "Each row is one task, not a timeline. Not solved includes timeouts.\nAnonymous IDs match the downloadable CSV and JSON.", fontsize=10, color=ink, linespacing=1.6)
save(fig, "handshake-tasks.svg")
print("Rendered both Handshake benchmark figures.")
