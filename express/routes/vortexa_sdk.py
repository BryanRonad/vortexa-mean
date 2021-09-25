from datetime import datetime
import vortexasdk
import os
import sys
import json
os.environ["VORTEXA_API_KEY"] = "hidden"


def callVesselMovementsAPI(filterDict):
    df = vortexasdk.VesselMovements().search(
        **filterDict).to_df()
    df = df.to_json(orient='records')
    return df


def callVesselsAPI(filterDict):
    df = vortexasdk.Vessels().search(
        **filterDict).to_df()
    df = df.to_json(orient='records')
    return df


if __name__ == "__main__":
    filterDict = (json.loads(sys.argv[2]))
    filterDict = {k.lower(): v for k, v in filterDict.items()}
    if(sys.argv[1] == 'vesselmovements'):
        res_json = (callVesselMovementsAPI(
            filterDict
        ))
    elif(sys.argv[1] == 'vessels'):
        res_json = (callVesselsAPI(
            filterDict
        ))
    else:
        raise ValueError("This is an invalid endpoint")
    print(res_json)
    sys.stdout.flush()
