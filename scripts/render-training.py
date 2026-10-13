"""Render the committed validation log without smoothing or invented samples."""
from pathlib import Path
import csv
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

root = Path(__file__).resolve().parents[1]
with (root / "public/artifacts/chess-training.csv").open() as stream:
    rows = list(csv.DictReader(stream))
epochs = [int(row["epoch"]) for row in rows]
assert epochs == list(range(1, 62)), "Expected the 61 preserved training epochs"
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 11, "svg.fonttype": "none"})
fig, ax = plt.subplots(figsize=(9.6, 5.6), layout="constrained")
fig.set_facecolor("#fdfdfb")
ax.set_facecolor("#fdfdfb")
for key, label, color in [
    ("metrics/mAP50(B)", "mAP@50", "#305e46"),
    ("metrics/mAP50-95(B)", "mAP@50-95", "#687eae"),
]:
    values = [float(row[key]) for row in rows]
    ax.plot(epochs, values, label=label, color=color, linewidth=2)
    ax.annotate(f"{values[-1]:.2%}", (epochs[-1], values[-1]), xytext=(-5, -19 if key.endswith("50(B)") else -21), textcoords="offset points", ha="right", color=color)
ax.set(xlabel="Training epoch", ylabel="Validation mAP", xlim=(1, 62), ylim=(0, 1.06))
ax.set_title("Chess-piece detection / YOLOv8s", loc="left", fontsize=16, pad=22)
ax.set_yticks([0, .25, .5, .75, 1], ["0%", "25%", "50%", "75%", "100%"])
ax.grid(axis="y", color="#dee2dc", linewidth=.7)
ax.spines[["top", "right"]].set_visible(False)
ax.spines[["bottom", "left"]].set_color("#a9b1aa")
ax.legend(frameon=False, loc="lower right")
fig.text(.01, -.035, "61 logged epochs. Historical validation, not a new test-set evaluation.", fontsize=9, color="#626a65")
fig.savefig(root / "public/artifacts/chess-training.svg", bbox_inches="tight")

svg = Path("public/artifacts/chess-training.svg")
svg.write_text("\n".join(line.rstrip() for line in svg.read_text().splitlines()) + "\n")
