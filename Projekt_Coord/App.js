import React, {useState, useEffect, useId} from 'react';
import  Grid  from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import './App.css';
import AppBar from '@mui/material/AppBar';

function App() {
  const [lat, setLatitude] = useState(47.5349);
  const [lng, setLongitude] = useState(7.6417);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const [open, setOpen] = React.useState(false);
 
  var lv95zuwgs84 = "LV95 to WGS84"
  var lv95zulv03 = "LV95 to LV03"
  var wgs84zulv95 = "WGS84 to LV95"
  var wgs84zulv03 = "WGS84 to LV03"
  var lv03zulv95 = "LV03 to LV95"
  var lv03zuwgs84 = "LV03 to WGS84"


  // const [visible, setVisibility] = useState(true);
  // function validCoord(lat, lon, crs=lv95) {
  //   if lat >= 200 {
  //     fdk
  //   };
  // }

  function handleOpen() {
    setOpen(!open);
  }
  // const [handleOpen] = () => {
  //   setOpen(!open);
  // };

  useEffect( () => {console.log(""); });

  function lv95towgs84() {
    var url = `https://vm24.sourcelab.ch/proj/lv95wgs84?lng=${lng}&lat=${lat}`
    setLoading(true);
    axios.get(url).then( (response) => {setData(response.data);} ).catch( (error) => {setError(error);} ).finally( () => {setLoading(false);} )
    setOpen(false)
  }

  function wgs84tolv95() {
    var url = `https://vm24.sourcelab.ch/proj/wgs84lv95?lng=${lng}&lat=${lat}`
    // console.log("DOWNLOAD");
    setLoading(true);
    axios.get(url).then( (response) => {setData(response.data);} ).catch( (error) => {setError(error);} ).finally( () => {setLoading(false);} )
    setOpen(false)
  }

  function lv95tolv03() {
    var url = `https://vm24.sourcelab.ch/proj/lv95lv03?lng=${lng}&lat=${lat}`
    setLoading(true);
    axios.get(url).then( (response) => {setData(response.data);} ).catch( (error) => {setError(error);} ).finally( () => {setLoading(false);} )
    setOpen(false)
  }

  function lv03tolv95() {
    var url = `https://vm24.sourcelab.ch/proj/lv03lv95?lng=${lng}&lat=${lat}`
    setLoading(true);
    axios.get(url).then( (response) => {setData(response.data);} ).catch( (error) => {setError(error);} ).finally( () => {setLoading(false);} )
    setOpen(false)
  }

  function lv03towgs84() {
    var url = `https://vm24.sourcelab.ch/proj/lv03wgs84?lng=${lng}&lat=${lat}`
    setLoading(true);
    axios.get(url).then( (response) => {setData(response.data);} ).catch( (error) => {setError(error);} ).finally( () => {setLoading(false);} )
    setOpen(false)
  }

  function wgs84tolv03() {
    var url = `https://vm24.sourcelab.ch/proj/wgs84lv03?lng=${lng}&lat=${lat}`
    setLoading(true);
    axios.get(url).then( (response) => {setData(response.data);} ).catch( (error) => {setError(error);} ).finally( () => {setLoading(false);} )
    setOpen(false)
  }
  
  console.log(data)
  
  return <>
  <div className="body">
    <AppBar color='secondary' position='sticky' className="appbar">Coordinate Transformation Tool</AppBar>
    <div className='main'>
      <Grid>
        <Grid item xs={12} className="sowas">
          <div className="feld1">
            <TextField type="number" label="Easting/Longitude" variant="filled" color="secondary" onChange= { (event) => {setLongitude(event.target.value)} } id="halo"/>
            <TextField type="number" label="Northing/Latitude" variant="filled" color="secondary" onChange= { (event) => {setLatitude(event.target.value)} } className="Feld2"/>
          </div>
        </Grid><br/><br/>
        <Grid item xs={12}>
          <div className="dropdown">
            <div className="wrapper">
              <Button color="secondary" variant="contained" onClick={handleOpen} className="menu">Choose Transformation</Button>
            </div>
            {open ? (
              <ul className="menu">
                <li className="menu-item">
                  <Button 
                  color="secondary"
                  variant="contained"
                  disabled={(lng > 2640398) || (lng < 2480555) || (lat > 1300660) || (lat < 1070927) ? true : false }
                  onClick={ () => lv95towgs84() }
                  >{lv95zuwgs84}</Button>
                </li>
                <li className='menu-item'>
                  <Button 
                  color="secondary"
                  variant='contained' 
                  disabled={(lng > 2640398) || (lng < 2480555) || (lat > 1300660) || (lat < 1070927) ? true : false }
                  onClick={ () => lv95tolv03() }
                  >{lv95zulv03}</Button>
                </li>
                <li className="menu-item">
                  <Button 
                  color="secondary"
                  variant="contained"
                  disabled={(Math.abs(lng) > 180) || (Math.abs(lat) > 90) ? true : false}
                  onClick={ () => wgs84tolv95() }
                  >{wgs84zulv95}</Button>
                </li>
                <li className="menu-item">
                  <Button 
                  color="secondary"
                  variant="contained"
                  disabled={(Math.abs(lng) > 180) || (Math.abs(lat) > 90) ? true : false}
                  onClick={ () => wgs84tolv03() }
                  >{wgs84zulv03}</Button>
                </li>
                <li className='menu-item'>
                  <Button 
                  color="secondary"
                  variant='contained' 
                  disabled={(lng > 540398) || (lng < 480555) || (lat > 300660) || (lat < 70926) ? true : false }
                  onClick={ () => lv03tolv95() }
                  >{lv03zulv95}</Button>
                </li>
                <li className='menu-item'>
                  <Button 
                  color="secondary"
                  variant='contained' 
                  disabled={(lng > 540398) || (lng < 480555) || (lat > 300660) || (lat < 70926) ? true : false }
                  onClick={ () => lv03towgs84() }
                  >{lv03zuwgs84}</Button>
                </li>
              </ul>
            ) : null}
        </div>
        </Grid>
        {/* <Grid item xs={12}>
          <TextField class="output" readOnly/>
        </Grid> */}
      </Grid><br/><br/>

      {data &&
          <>
            <Grid>
              <TextField value={Math.round(data.ost*10000)/10000} variant="outlined" label="Easting/Longitude" readOnly></TextField>
              <TextField value={Math.round(data.nord*10000)/10000} variant="outlined" label="Northing/Latitude" readOnly></TextField>
            </Grid>
      </>
      }
    </div>

  </div>
</> 
}

export default App;