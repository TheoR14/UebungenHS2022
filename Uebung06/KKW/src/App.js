import React from 'react';
import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle} from 'react-leaflet'


function App() {

  React.useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
  }, []);

  //Koord KKW
  const AKWS = [
    [47.60135, 8.18336],
    [47.55243, 8.22638],
    [47.35264, 7.95646],
    [46.97768, 7.28697], 
  ]

  const MitteCH = [46.876045678, 8.278188210]

  var openstreetmap = (<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //{z} = Zoomlevel (0,1,2..) {x},{y} = x-y-Richtungen (Sensorkoord)
      attribution='&copy; swisstopo'/>);

  const style1 = {color: 'green'};
  const style2 = {color: 'blue'};
  const style3 = {color: 'red'};
  const style4 = {color: 'yellow'};



return (
  <MapContainer center={MitteCH} zoom={8} scrollWheelZoom={true}>
  
  {openstreetmap}

    <Marker position={AKWS[0]}>
        <Popup>	Kernkraftwerk Leibstadt</Popup>
    </Marker>
    <Marker position={AKWS[1]}>
        <Popup>Kernkraftwerk Beznau</Popup>
    </Marker>
    <Marker position={AKWS[2]}>
        <Popup>Kernkraftwerk Gösgen</Popup>
    </Marker>
    <Marker position={AKWS[3]}>
        <Popup>Kernkraftwerk Mühleberg</Popup>
    </Marker>

    <Circle center={AKWS[0]} radius={[50000]} pathOptions={style1}></Circle>
    <Circle center={AKWS[1]} radius={[50000]} pathOptions={style2}></Circle>
    <Circle center={AKWS[2]} radius={[50000]} pathOptions={style3}></Circle>
    <Circle center={AKWS[3]} radius={[50000]} pathOptions={style4}></Circle>


 
  </MapContainer>
  

  );
}

export default App;
