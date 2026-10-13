"""Render measured data; no generated illustrative evidence."""
from pathlib import Path
import json
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
root=Path(__file__).resolve().parents[1]/"public/artifacts"
plt.rcParams.update({"font.family":"DejaVu Sans","font.size":11,"svg.fonttype":"none","svg.hashsalt":"ivan-research"})
ink="#292e2c"; green="#305e46"; orange="#b06331"; muted="#626a65"; paper="#fdfdfb"
def finish(fig,name):
    fig.set_facecolor(paper)
    fig.savefig(root/name,format="svg",metadata={"Date":None},bbox_inches="tight")
    p=root/name; p.write_text("\n".join(s.rstrip() for s in p.read_text().splitlines())+"\n")
    plt.close(fig)
a=json.loads((root/"agent-trial.json").read_text())
fig,ax=plt.subplots(figsize=(10,4))
for y,(label,vals) in enumerate([
    ("General agent",[t["correct"] for t in a["arms"]["plain"]["timeline"]]),
    ("Agent + advice",[t["correct"] for t in a["arms"]["assisted"]["timeline"]]),
    ("Advice alone",[t["advice_correct"] for t in a["arms"]["assisted"]["timeline"]])
]):
    ax.scatter(range(1,41),[2-y]*40,c=[green if v else orange for v in vals],marker="s",s=52)
    ax.text(42,2-y,f"{sum(vals)}/40",va="center",color=ink)
ax.set_yticks([2,1,0],["General agent","Agent + advice","Advice alone"])
ax.set_xticks([1,10,20,30,40]); ax.set_xlim(0,46); ax.set_ylim(-.8,2.8)
ax.set_xlabel("Event in the authored revision sequence",labelpad=12)
for edge in ax.spines.values(): edge.set_visible(False)
ax.tick_params(axis="both",length=0,pad=8); ax.set_facecolor(paper)
ax.set_title("40 decisions. Five incorrect recommendations. No changed final actions.",loc="left",pad=18,fontsize=12)
fig.text(.02,.015,"Green: accepted action. Orange: incorrect advice, overridden by the general agent. One paired sequence.",fontsize=9,color=muted)
finish(fig,"agent-decisions.svg")
s=json.loads((root/"splat-training.json").read_text())
fig,axs=plt.subplots(1,2,figsize=(10,4))
for ax,key,label in zip(axs,["psnr","ssim"],["PSNR (dB)","SSIM"]):
    xs=[m["steps"]/1000 for m in s["metrics"]]; ys=[m[key] for m in s["metrics"]]
    ax.plot(xs,ys,color=green,marker="o",lw=1.4,label="Training checkpoints")
    ax.scatter([16],[s["cleaned_metrics"][key]],color=orange,marker="D",s=40,label="After cleanup",zorder=5)
    ax.annotate(f'{s["cleaned_metrics"][key]:.2f}' if key=="psnr" else f'{s["cleaned_metrics"][key]:.4f}',(16,s["cleaned_metrics"][key]),xytext=(-8,7),textcoords="offset points",ha="right",fontsize=10,color=orange)
    ax.set_title(label,loc="left",fontsize=12); ax.set_xticks([4,8,12,16]); ax.set_xlabel("Training steps (thousands)")
    ax.spines[["top","right"]].set_visible(False); ax.set_facecolor(paper); ax.grid(axis="y",alpha=.15)
axs[0].legend(frameon=False,fontsize=8,loc="upper left")
fig.suptitle("Fidelity to 12 synthetic views of the source mesh",x=.125,ha="left",fontsize=13)
fig.subplots_adjust(bottom=.23,top=.80,wspace=.32)
fig.text(.125,.025,"The same evaluation views were reused after scene-specific cleanup. Not physical reconstruction accuracy.",fontsize=9,color=muted)
finish(fig,"splat-evaluation.svg")
print("Rendered agent-decisions.svg and splat-evaluation.svg from published numeric evidence.")
