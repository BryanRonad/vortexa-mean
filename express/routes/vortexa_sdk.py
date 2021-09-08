from datetime import datetime
import vortexasdk
import os
import sys
import json
os.environ["VORTEXA_API_KEY"] = "hidden"


def callVesselMovementsAPI(**kwargs):
    print('Filters passed:', kwargs)
    df = vortexasdk.VesselMovements().search(
        **kwargs).to_df(columns='all')
    print(df)
    print(sorted(df.columns))
    print(sorted(df['vessel.status'].unique()))


def callVesselsAPI(filterDict):
    df = vortexasdk.Vessels().search(
        **filterDict).to_df()
    df = df.to_json(orient='records')
    print(df)


if __name__ == "__main__":
    filterDict = (json.loads(sys.argv[2]))
    filterDict = {k.lower(): v for k, v in filterDict.items()}
    if(sys.argv[1] == 'vesselmovements'):
        callVesselMovementsAPI(
            sys.argv[2]
        )
    elif(sys.argv[1] == 'vessels'):
        callVesselsAPI(
            filterDict
        )
    sys.stdout.flush()
