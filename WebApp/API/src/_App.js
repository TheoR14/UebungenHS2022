import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import axios from "axios";

import 'leaflet/dist/leaflet.css';


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
    }, []);

  function do_download() {
    // TODO: Parametrisieren
    var url = "https://vm24.sourcelab.ch/geodetic/&?startlong=8.53&startlat=47.37&endlong=-74.00&endlat=40.70&punkte=12";

    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <h1>Geodetic Line</h1>

      {!data &&
      <Button variant="contained" onClick={() => { do_download() }}>
          Convert
        </Button>
      }
   
      {loading && <>
                     <div>API Aufruf, bitte warten!</div><br/>
                  </>
      }

      {error &&   <>
                     <div>ERROR API Aufruf fehlgeschlagen</div>{console.log(error)}<br/>
                  </>}

      {data &&  <>
                  <MapContainer center={[47.5349, 7.6416]} zoom={2} scrollWheelZoom={true}
                    style={{ height: "600px", width: "100%" }} >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                  
                  <GeoJSON data={data} style={{ weight: 8, opacity: '30%', color: 'green'}}/>

                  </MapContainer>
                </>}
  
      </>
  );
}

export default App;
