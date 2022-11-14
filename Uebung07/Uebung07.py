import uvicorn
from fastapi import FastAPI

app = FastAPI()

d = {}
file = open("PLZO_CSV_LV95.csv", encoding="utf-8")
next(file) #1. Linie springen
for line in file:
    daten = line.strip().split(";") #semicolon; -> Ortschaftsname;PLZ;Zusatzziffer;Gemeindename;BFS-Nr;Kantonskürzel;E;N;Sprache  
    ort = daten[0]
    zip = daten[1] #plz
    zusatz = daten[2]
    gemeinde = daten[3]
    bfs = daten[4]
    kanton = daten[5]
    easting = daten[6]
    northing = daten[7]
    sprache = daten[8]
    d[gemeinde] = { "Ortschaftsname": ort,
                    "PLZ": zip, 
                    #"Zusatzziffer": zusatz, 
                    "Gemeindename": gemeinde, 
                    #"BFS-Nr": bfs, 
                    "Kantonskuerzel": kanton, 
                    #"E": easting, 
                    #"N": northing, 
                    #"Sprache": sprache 
                    }


file.close()


@app.get("/gmd")
async def search(gmd: str):
    if gmd in d:
        return d[gmd]

    return {"ERROR": "GEMEINDE NOT FOUND"}


uvicorn.run(app, host="127.0.0.1", port=8000)