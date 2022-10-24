import React from 'react';
import Button from '@mui/material/Button';
import Timer from './Timer.js';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/ToolBar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function App() {

    return (
    <> 
    <AppBar position="sticky" color="warning">
      <ToolBar>
        <Typography variant="h4">Counter</Typography>
      </ToolBar>
    </AppBar>

    <Timer/>
    </>);
}

export default App;