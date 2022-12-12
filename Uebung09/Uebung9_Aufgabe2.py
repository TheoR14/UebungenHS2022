import uvicorn
from fastapi import FastAPI, Response
import pyproj

g = pyproj.Geod(ellps="WGS84")

app = FastAPI()

@app.get("/geodetic/&")
async def geodetic (startlong:float, startlat:float, endlong:float, endlat:float, punkte:int):
    lonlats = g.npts(startlong, startlat, endlong, endlat, punkte) #    punkte ist # Punkte das man will (als Ganzzahl)
    lonlats = [[startlong, startlat]]+ [list(i) for i in lonlats] + [[endlong, endlat]]
    geojson = f"""{{
    "type":"Feature",
    "geometry":{{
        "type":"LineString",
        "coordinates":{lonlats}
    }},
    "properties": {{
        "attribut": "Beliebige Attribute"
    }}
    }}"""
    
    return Response(content=geojson)
    
    # mit Response gibt das Problem mit \ und \n bei Zeichenketten niocht mehr

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8002)

# https://vm24.sourcelab.ch/geodetic/&?startlong=8.53&startlat=47.37&endlong=-74.00&endlat=40.70&punkte=12