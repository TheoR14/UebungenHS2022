import uvicorn
from fastapi import FastAPI
import pyproj

g = pyproj.Geod(ellps="WGS84")

app = FastAPI()

@app.get("/")
async def geodetic (startlong:float, startlat:float, endlong:float, endlat:float):
    lonlats = g.npts(startlong, startlat, endlong, endlat, )
    lonlats = [[startlong, startlat]]+ [list(i) for i in lonlats] + [[endlong, endlat]]
    return f"""{{
  "type": "Feature",
  "geometry": {{
    "type": "Point",
    "coordinates": {lonlats}
  }},
  "properties": {{
    "attribut": "Beliebige Attribute"
  }}
}}"""

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8002, port_path="/geodetic")