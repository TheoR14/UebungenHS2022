import uvicorn
from fastapi import FastAPI
from pyproj import Transformer

app = FastAPI()

transformer1 = Transformer.from_crs("epsg:4326","epsg:2056") #WGS84 to LV95
transformer2 = Transformer.from_crs("epsg:2056","epsg:4326") #LV95 to WGS84
transformer3 = Transformer.from_crs("epsg:21781","epsg:2056") #LV03 to LV95
transformer4 = Transformer.from_crs("epsg:2056","epsg:21781") #LV95 to LV03
transformer5 = Transformer.from_crs("epsg:21781","epsg:4316") #LV03 to WGS84
transformer6 = Transformer.from_crs("epsg:4326","epsg:21781") #WGS84 to LV03





@app.get("/proj/wgs84lv95")
async def transform1 (lng: float, lat: float):
    r1 = transformer1.transform(lng, lat)
    return { "ost": r1[0], "nord": r1[1] }

@app.get("/proj/lv95wgs84")
async def transform2 (lng: float, lat: float):
    r2 = transformer2.transform(lng, lat)
    return { "ost": r2[0], "nord": r2[1] }

@app.get("/proj/lv03lv95")
async def transform3 (lng: float, lat: float):
    r3 = transformer3.transform(lng, lat)
    return { "ost": r3[0], "nord": r3[1] }

@app.get("/proj/lv95lv03")
async def transform4 (lng: float, lat: float):
    r4 = transformer4.transform(lng, lat)
    return { "ost": r4[0], "nord": r4[1] }

@app.get("/proj/lv03wgs84")
async def transform5 (lng: float, lat: float):
    r5 = transformer5.transform(lng, lat)
    return { "ost": r5[0], "nord": r5[1] }

@app.get("/proj/wgs84lv03")
async def transform6 (lng: float, lat: float):
    r6 = transformer6.transform(lng, lat)
    return { "ost": r6[0], "nord": r6[1] }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8010, root_path="/proj") 

#   https://vm24.sourcelab.ch/transform/lv95wgs84?lng=2600000&lat=1260000