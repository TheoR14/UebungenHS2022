import React, { useState } from 'react';
// import  Grid  from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import './App.css';
import AppBar from '@mui/material/AppBar';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@radix-ui/react-tooltip';
import Names from './components/Names';
import styled from '@emotion/styled';
// import Footer from './components/Footer';
// import Testtip from './components/conditionaltooltip';
// import DisableAfterMouseOver from './Disable';


function App() {
  const [lat, setLatitude] = useState(47.5349);
  const [lng, setLongitude] = useState(7.6417);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const [open, setOpen] = useState(false);
  const [convertedto, setConvertedto] = useState(null);

  // const [visible, setVisibility] = useState(true);
  // function validCoord(lat, lon, crs=lv95) {
  //   if lat >= 200 {
  //     fdk
  //   };
  // }
  // const [onsight, setSight] = useState(true);
  // const [disable, setDisable] = useState(false)

  // function handletoolbar() {
  //   if (disable === true) {
  //     setSight(true); 
  //     console.log(onsight);
  //   }
  //   if (disable === false) {
  //     setSight(false);
  //     console.log(onsight);
  //   }
  // }

  // function handletoolbarhidden() {
  //   setSight(false);
  // }
  // VERSUCH EINES CONDITIONAL TOOLTIPS, AUSKOMMENTIERT DA NOCH WEITERENTWICKELT WERDEN SOLL.


  function handleOpen() {
    setOpen(!open);
  }
  // const [handleOpen] = () => {
  //   setOpen(!open);
  // };


  const Outlinecoloring = styled(TextField, {
    shouldForwardProp: (props) => props !== "focusColor"
  })((p) => ({
    // input label when focused
    "& label.Mui-focused": {
      color: p.focusColor
    },
    // focused color for input
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: p.focusColor
    }
  }));




  function lv95towgs84() {
    var url = `https://vm24.sourcelab.ch/proj/lv95wgs84?lng=${lng}&lat=${lat}`
    setLoading(true);
    axios.get(url).then( (response) => {setData(response.data);} ).catch( (success) => {setError(success);} ).finally( () => {setLoading(false);} )
    setOpen(false)
    setConvertedto('WGS84')
  }

  function wgs84tolv95() {
    var url = `https://vm24.sourcelab.ch/proj/wgs84lv95?lng=${lng}&lat=${lat}`
    // console.log("DOWNLOAD");
    setLoading(true);
    axios.get(url).then( (response) => {setData(response.data);} ).catch( (success) => {setError(success);} ).finally( () => {setLoading(false);} )
    setOpen(false)
    setConvertedto('LV95')
  }

  function lv95tolv03() {
    var url = `https://vm24.sourcelab.ch/proj/lv95lv03?lng=${lng}&lat=${lat}`
    setLoading(true);
    axios.get(url).then( (response) => {setData(response.data);} ).catch( (success) => {setError(success);} ).finally( () => {setLoading(false);} )
    setOpen(false)
    setConvertedto('LV03')
  }

  function lv03tolv95() {
    var url = `https://vm24.sourcelab.ch/proj/lv03lv95?lng=${lng}&lat=${lat}`
    setLoading(true);
    axios.get(url).then( (response) => {setData(response.data);} ).catch( (success) => {setError(success);} ).finally( () => {setLoading(false);} )
    setOpen(false)
    setConvertedto('LV95')
  }

  function lv03towgs84() {
    var url = `https://vm24.sourcelab.ch/proj/lv03wgs84?lng=${lng}&lat=${lat}`
    setLoading(true);
    axios.get(url).then( (response) => {setData(response.data);} ).catch( (success) => {setError(success);} ).finally( () => {setLoading(false);} )
    setOpen(false)
    setConvertedto('WGS84')
  }

  function wgs84tolv03() {
    var url = `https://vm24.sourcelab.ch/proj/wgs84lv03?lng=${lng}&lat=${lat}`
    setLoading(true);
    axios.get(url).then( (response) => {setData(response.data);} ).catch( (success) => {setError(success);} ).finally( () => {setLoading(false);} )
    setOpen(false)
    setConvertedto('LV03')
  }
    
  return <>
  <div className="body">
    <AppBar sx={{background:'black', color:'peachpuff', height:'100px'}} position='sticky' className="appbar">Coordinate Transformation Tool</AppBar>
    <div className='main'>
      <div>
        <div className="pizza-tim">
          <p>Currently used:
          <span>{(lng < 2834000) && (lng > 2485000) && (lat < 1296000) && (lat > 1075000) ? <span> LV95</span> : null }
          {(Math.abs(lng) < 180) && (Math.abs(lat) < 90) ? <span> WGS 84 </span> : null}
          {(lng < 834000) && (lng > 485000) && (lat < 296000) && (lat > 75000) ? <span> LV 03</span> : null }</span></p>
        </div>
        <div className="input">
            <div className="field_one"><TextField sx={{"& label.Mui-focused":{color: 'black'}, "& .MuiFilledInput-underline:after": {borderBottomColor: 'black'}}} type="number" label="Easting/Longitude" variant="filled" onChange= { (event) => {setLongitude(event.target.value)} } id="halo"/></div>
            <div className="field_two"><TextField sx={{"& label.Mui-focused":{color: 'black'}, "& .MuiFilledInput-underline:after": {borderBottomColor: 'black'}}} type="number" label="Northing/Latitude" variant="filled" onChange= { (event) => {setLatitude(event.target.value)} } className="Feld2"/></div>
        </div>
        <div>
          <div className="dropdown">
            <div className="wrapper">
              <Button sx={{background:'black', color:'peachpuff', "&:hover":{background:'peachpuff', color:'black'}}} variant="contained" onClick={handleOpen} className="menu">Choose Transformation</Button>
            </div>
            {open ? (
              <ul className="menu">
                <li className="menu-item-top">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="trigger">
                        <Button 
                          id = "Button1"
                          sx={{width:'250px', background:'black', color:'peachpuff', "&:hover":{background:'peachpuff', color:'black'}}}
                          // onMouseEnter={() => handletoolbar()}
                          // onMouseLeave={() => handletoolbarhidden()}
                          onClick={ () => lv95towgs84() }
                          variant="contained"
                          disabled={(lng > 2834000) || (lng < 2485000) || (lat > 1296000) || (lat < 1075000) ? true : false }
                          >LV95 zu WGS84</Button>
                      </TooltipTrigger>
                      <TooltipContent className="tooltip"><p className="text">Auswahl Koordinatenformat:<br />Wähle für Easting & Northing Werte in folgenden Bereichen:<br />Easting: [2485000; 2834000]<br />Northing: [1075000; 1296000]</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
                <li className="menu-item">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="trigger">
                        <Button 
                          sx={{width:'250px', background:'black', color:'peachpuff', "&:hover":{background:'peachpuff', color:'black'}}}
                          // onMouseEnter={() => handletoolbar()}
                          // onMouseLeave={() => handletoolbarhidden()}
                          color="secondary"
                          variant="contained"
                          disabled={(lng > 2834000) || (lng < 2485000) || (lat > 1296000) || (lat < 1075000) ? true : false }
                          onClick={ () => lv95tolv03() }
                          >LV95 zu LV03</Button>
                      </TooltipTrigger>
                      <TooltipContent className="tooltip"><p className="text">Auswahl Koordinatenformat:<br />Wähle für Easting & Northing Werte in folgenden Bereichen:<br />Easting: [2485000; 2834000]<br />Northing: [1075000; 1296000]</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
                <li className='menu-item'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="trigger">
                        <Button 
                          sx={{width:'250px', background:'black', color:'peachpuff', "&:hover":{background:'peachpuff', color:'black'}}}
                          // onMouseEnter={() => handletoolbar()}
                          // onMouseLeave={() => handletoolbarhidden()}
                          color="secondary"
                          variant='contained' 
                          disabled={(Math.abs(lng) > 180) || (Math.abs(lat) > 90) ? true : false}
                          onClick={ () => wgs84tolv95() }
                          >WGS84 zu Lv95</Button>
                      </TooltipTrigger>
                      <TooltipContent className="tooltip"><p className="text">Auswahl Koordinatenformat:<br />Wähle für Longitude & Latitude Werte in folgenden Bereichen:<br />Longitude: [-180; 180]<br />Latitude: [-90; 90]</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
                <li className="menu-item">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="trigger">
                        <Button 
                          sx={{width:'250px', background:'black', color:'peachpuff', "&:hover":{background:'peachpuff', color:'black'}}}
                          // onMouseEnter={() => handletoolbar()}
                          // onMouseLeave={() => handletoolbarhidden()}
                          color="secondary"
                          variant="contained"
                          disabled={(Math.abs(lng) > 180) || (Math.abs(lat) > 90) ? true : false}
                          onClick={ () => wgs84tolv03() }
                          >WGS84 zu LV03</Button>
                      </TooltipTrigger>
                      <TooltipContent className="tooltip"><p className="text">Auswahl Koordinatenformat:<br />Wähle für Longitude & Latitude Werte in folgenden Bereichen:<br />Longitude: [-180; 180]<br />Latitude: [-90; 90]</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
                <li className="menu-item">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="trigger">
                        <Button 
                          sx={{width:'250px', background:'black', color:'peachpuff', "&:hover":{background:'peachpuff', color:'black'}}}
                          // onMouseEnter={() => handletoolbar()}
                          // onMouseLeave={() => handletoolbarhidden()}
                          color="secondary"
                          variant="contained"
                          disabled={(lng > 834000) || (lng < 485000) || (lat > 296000) || (lat < 75000) ? true : false }
                          onClick={ () => lv03tolv95() }
                          >LV03 zu LV95</Button>
                      </TooltipTrigger>
                      <TooltipContent className="tooltip"><p className="text">Auswahl Koordinatenformat:<br />Wähle für Easting & Northing Werte in folgenden Bereichen:<br />Easting: [485000; 834000]<br />Northing: [75000; 296000]</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
                <li className="menu-item">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="trigger">
                        <Button 
                          sx={{width:'250px', background:'black', color:'peachpuff', "&:hover":{background:'peachpuff', color:'black'}}}
                          // onMouseEnter={() => handletoolbar()}
                          // onMouseLeave={() => handletoolbarhidden()}
                          color="secondary"
                          variant="contained"
                          disabled={(lng > 834000) || (lng < 485000) || (lat > 296000) || (lat < 75000) ? true : false }
                          onClick={ () => lv03towgs84() }
                          >LV03 zu WGS84</Button>
                      </TooltipTrigger>
                      <TooltipContent className="tooltip"><p className="text">Auswahl Koordinatenformat:<br />Wähle für Easting & Northing Werte in folgenden Bereichen:<br />Easting: [485000; 834000]<br />Northing: [75000; 296000]</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
                <li className="menu-item">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="trigger">
                        <form action="https://burgdorferbier.ch/" target="_blank">
                          <button
                          // onMouseEnter={() => handletoolbar()}
                          // onMouseLeave={() => handletoolbarhidden()}
                          id='MUItoCSS'
                          >BD99</button>
                        </form>
                      </TooltipTrigger>
                      <TooltipContent className="tooltip"><p className="text">Auswahl Koordinatenformat:<br />Wähle für X- & Y-Koordinaten Werte in folgenden Bereichen:<br />X-Koordinaten: xx.xx.xx<br />Y-Koordinaten: yy.yy.yy</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
              </ul>
            ) : null}
        </div>
        </div>
      </div><br/><br/>
           

      {data && 
          <>
          
            <div >
            <div className='pizza-tim2'>
              <p>Transformed to: {convertedto} </p></div>


              <div className='output'>
              <div className="output_one"><TextField sx={{"& label.Mui-focused":{color: 'black'}, "& .MuiFilledInput-underline:after": {borderBottomColor: 'black'}}} value={Math.round(data.ost*10000)/10000} variant="filled" label="Easting/Longitude" readOnly></TextField></div>
              <div className="output_two"><TextField sx={{"& label.Mui-focused":{color: 'black'}, "& .MuiFilledInput-underline:after": {borderBottomColor: 'black'}}} value={Math.round(data.nord*10000)/10000} variant="filled" label="Northing/Latitude" readOnly></TextField></div>
              </div>
            </div>
      </>
      }
    
    </div>
    <div className="error">
          {error &&
            <p>Fehler... Prüfen Sie ihre Internetverbindung! (Fehlercode: 404)</p>
          }
        </div>
        <div id='Appbar2'>
          <Names />
          {/* <Footer/> WIRD NOCH WEITERENTWICKELT*/} 
        </div>
  </div>

</> 
}

export default App;