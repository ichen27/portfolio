"""Publish explicit numeric evidence fields from existing experiment outputs.
Run on the Mac mini. Does not copy raw conversations, credentials or personal images.
"""
from pathlib import Path
import json, hashlib
root=Path(__file__).resolve().parents[1]
out=root/"public/artifacts"
sources={}
def read(name,path):
    p=Path(path); sources[name]={"file":p.name,"sha256":hashlib.sha256(p.read_bytes()).hexdigest()}
    return json.loads(p.read_text())
def save(name,data): (out/name).write_text(json.dumps(data,indent=2)+"\n")
a=read("agent","/Volumes/SamsungSSD1/code/deal-toy-designs/experiments/long_session_trial/results/analysis.json")
arms={}
for name,arm in a["arms"].items():
    timeline=[]
    for t in arm["timeline"]:
        row={k:t[k] for k in ["event_id","initial_action","action","acceptable_actions","correct","initial_probability","final_probability","jev_action","jev_probability"]}
        row["advice_correct"]=None if t["jev_action"] is None else t["jev_action"] in t["acceptable_actions"]
        timeline.append(row)
    arms[name]={"counters":arm["counters"],"probabilities":{k:{"n":v["n"],"brier":v["brier"]} for k,v in arm["probabilities"].items()},"timeline":timeline}
assert sum(not t["advice_correct"] for t in arms["assisted"]["timeline"])==5
assert all(t["correct"] for arm in arms.values() for t in arm["timeline"])
save("agent-trial.json",{"protocol":a["protocol"],"integrity_pass":a["integrity_pass"],"arms":arms,"limitations":a["limitations"],"source":sources["agent"]})
k=read("geometry","/Volumes/SamsungSSD1/code/fusion-recreation/experiments/2026-10-12-shared-topology/topology-comparison.json")
assert k["comparisons"]==54 and len(k["rows"])==54 and all(r["passed"] for r in k["rows"])
save("geometry-validation.json",{**k,"source":sources["geometry"]})
s=read("splat","/Volumes/SamsungSSD1/tools/apartment-3d-lab/output/san-francisco-trained/training-report.json")
keys=["splats","finite","sh_degree","training_views","heldout_views","resolution","training_steps","cleanup","cleaned_metrics","metrics","sha256","provenance"]
save("splat-training.json",{**{k:s[k] for k in keys},"source":sources["splat"],"evaluation_note":"The same 12 synthetic evaluation views were used before and after scene-specific cleanup; no fresh test set."})
print("Published numeric extracts with original source hashes; 80 agent events, 54 geometry cases, 4 splat checkpoints.")
