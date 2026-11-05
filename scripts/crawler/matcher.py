SCORES = {"venture":12,"lab":10,"ip":8,"innobiz":7,"mainbiz":5,"iso":4}
def calc_readiness(caps: dict):
    base=38
    bonus=sum(SCORES[k] for k,v in caps.items() if v)
    total=min(100, base+bonus)
    return {"total": total, "grant_count": 11 if total>=60 else 4}
