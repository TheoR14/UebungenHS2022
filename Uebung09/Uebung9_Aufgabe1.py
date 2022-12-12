import uvicorn
from fastapi import FastAPI
from pyproj import Transformer

app = FastAPI()

transformer1 = Transformer.from_crs("epsg:4326","epsg:2056") #WGS84 to LV95
transformer2 = Transformer.from_crs("epsg:2056","epsg:4326") #LV95 to WGS84


@app.get("/transform/wgs84lv95")
async def transform1 (lng: float, lat: float):
    r1 = transformer1.transform(lng, lat)
    return f"""ost: {r1[0]}, nord: {r1[1]}"""

@app.get("/transform/lv95wgs84")
async def transform2 (lng: float, lat: float):
    r2 = transformer2.transform(lng, lat)
    return f"""ost: {r2[0]}, nord: {r2[1]}"""

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8003, root_path="/transform") #mit 8003 gemacht, da problem: [Errno 98] error while attempting to bind on address ('127.0.0.1', 8001): address already in use

#   https://vm24.sourcelab.ch/transform/lv95wgs84?lng=2600000&lat=1260000