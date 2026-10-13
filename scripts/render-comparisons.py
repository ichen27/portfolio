"""Figures from published comparison data. Run with matplotlib; no live inference."""
from pathlib import Path
import json
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.ticker import PercentFormatter
root=Path(__file__).resolve().parents[1]/"public/artifacts"
plt.rcParams.update({"font.family":"DejaVu Sans","font.size":11,"svg.fonttype":"path","svg.hashsalt":"comparison-2026"})
paper="#fdfdfb";green="#305e46";orange="#b06331";blue="#58788f";muted="#626a65"
def save(fig,name):
 fig.set_facecolor(paper)
 fig.savefig(root/name,metadata={"Date":None},format="svg")
 p=root/name;p.write_text("\n".join(x.rstrip() for x in p.read_text().splitlines())+"\n");plt.close(fig)
def style(ax):
 ax.set_facecolor(paper);ax.spines[["top","right"]].set_visible(False);ax.tick_params(length=0,pad=8);ax.set_axisbelow(True)
d=json.loads((root/"handshake-methods.json").read_text())
fig,ax=plt.subplots(figsize=(10,5))
for i,row in enumerate(d["rows"]):
 for offset,key,color,label in [(-.17,"before",blue,"Earlier version"),(.17,"after",green,"Revised version")]:
  s=row[key];rate=s["solved"]/s["total"]
  ax.barh(i+offset,rate,height=.27,color=color,label=label if i==0 else None)
  ax.text(rate+.025,i+offset,f'{s["solved"]}/{s["total"]}',va="center",fontsize=10)
ax.set_yticks(range(4),[r["label"] for r in d["rows"]]);ax.invert_yaxis();ax.set_xlim(0,1.2);ax.set_xticks([0,.25,.5,.75,1]);ax.xaxis.set_major_formatter(PercentFormatter(1));ax.set_xlabel("Observed solve rate (counts shown beside bars)")
style(ax);ax.legend(frameon=False,loc="lower left",bbox_to_anchor=(0,1.02),ncols=2)
fig.suptitle("Which changes made a task harder?",x=.28,ha="left",fontsize=16)
fig.subplots_adjust(left=.28,right=.95,bottom=.22,top=.77)
fig.text(.04,.035,"Local redesign probes. Lower solve rate = harder in this sample. Different tasks and sample sizes; not a causal estimate.",fontsize=9,color=muted)
save(fig,"handshake-methods.svg")
d=json.loads((root/"handshake-benchmarks.json").read_text())
names=["Build & release","Systems & operations","ML infrastructure","Machine learning & AI","Hardware & embedded","Security","Scientific computing","Software engineering","Files & media","Data science & reporting","Games & simulation"]
fig,ax=plt.subplots(figsize=(10,6.5))
for i,(g,name) in enumerate(zip(d["categories"],names)):
 rate=g["solved"]/g["attempts"];ax.barh(i,rate,color=green,height=.55)
 ax.text(rate+.018,i,f'{g["solved"]}/{g["attempts"]} · {g["tasks"]} task'+("s" if g["tasks"]!=1 else ""),va="center",fontsize=10)
ax.set_yticks(range(len(names)),names);ax.invert_yaxis();ax.set_xlim(0,1);ax.set_xticks([0,.25,.5,.75,1]);ax.xaxis.set_major_formatter(PercentFormatter(1));ax.set_xlabel("Observed solve rate")
style(ax);fig.suptitle("Official evaluations by problem category",x=.28,ha="left",fontsize=16)
fig.subplots_adjust(left=.28,right=.94,bottom=.18,top=.87)
fig.text(.04,.035,"17 archived tasks / 85 attempts. Counts include timeouts. Selected difficult tasks; model settings are not normalized.",fontsize=9,color=muted)
save(fig,"handshake-categories.svg")
d=json.loads((root/"decision-runtime.json").read_text())
families=list(dict.fromkeys(g["family"] for g in d["groups"]))
names=["Retrieval","Multi-hop retrieval","Conflicting evidence","File search","Arithmetic","Classification","Tool routing","Abstention","Untrusted content","Constraint reasoning"]
labels={"astra":"Astra","luna":"Luna","hybrid":"Decisions + Astra"}
for metric,title,xlabel,out in [("mean_seconds","Decision models help differently across use cases","Mean runtime per task (seconds)","decision-use-cases.svg"),("mean_estimated_usd","The cost of the complete execution pipeline","Mean estimated cost per task (USD, log scale)","decision-cost.svg")]:
 fig,ax=plt.subplots(figsize=(10,6.7))
 for j,(mode,color) in enumerate([("astra",blue),("luna",orange),("hybrid",green)]):
  vals=[next(g[metric] for g in d["groups"] if g["family"]==f and g["mode"]==mode) for f in families]
  ax.scatter(vals,[i+(j-1)*.20 for i in range(10)],color=color,s=35,label=labels[mode],zorder=3)
 ax.set_yticks(range(10),names);ax.invert_yaxis();ax.set_xlabel(xlabel);style(ax);ax.grid(axis="x",alpha=.14)
 if metric=="mean_estimated_usd":ax.set_xscale("log")
 else:ax.set_xlim(0,7)
 ax.legend(frameon=False,loc="lower left",bbox_to_anchor=(0,1.02),ncols=3)
 fig.suptitle(title,x=.25,ha="left",fontsize=15)
 fig.subplots_adjust(left=.25,right=.95,bottom=.18,top=.80)
 fig.text(.04,.035,"Two repeats per use case and policy. All runtime calls included; 59/60 passed. Synthetic tasks, not a model ranking.",fontsize=9,color=muted)
 save(fig,out)
