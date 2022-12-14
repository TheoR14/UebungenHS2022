import React, {Component} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class Timer2 extends Component { //toujours comme ça !
    constructor(props) {
        super(props);

        this.state = {count: this.props.countdown, end: '', render: true}; //ajout de rendre: true, pour mettre/enelever la zone de text; text où lon rentre le temps souhaité en secondes
        // initialisieren von count !
        this.interval = null

        // Event Handler registrieren
        this.decrease = this.decrease.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this)

    }

    buttonClicked(event){
        this.setState({render: !this.state.render}) //quand le bouton est cliquer, la zone de texte doit disparaitre

        this.setState({count: this.state.countdown, end: ''});
        if(this.interval != null){                      
            clearInterval(this.interval);}

        
        this.interval = setInterval(this.decrease, 1000);   //1000 pour les secondes; quand on clique sur Start, le chrono descend avec la fonction decrease a la vitesse 1000
            
    }
    
    decrease() {                                        // descendre automatiquement
        this.setState({count: this.state.count - 1});   // compte de -1 en -1
        if (this.state.count <= 1) {                    //quand le chiffre est plus petit/égale 1
            this.setState({end: "Fertig !"});           //set -> Fertig 
            this.setState({count:''});                  //rien ecrire où les chiffres étaient: '' vide
            clearInterval(this.interval);               //cleareInterval arrête le chrono 
            this.interval = null;
            this.setState({render: true}) // remet l'endroit où on peut ecrire du texte / inverse denouveau '!this.state.render'

            }
    }

    
    render() { //gibt ein Titel, ein Timer(mit Zahlen) und schreibt Fertig wenn es fertig ist.
        return (
        <>
            <div>
                <h1 style={{margin: 20, color: '#FF6600'}}>{this.state.count}</h1>                           
                <h1 style={{margin: 20, color: '#FF6600'}}>{this.state.end}</h1>
            </div>

            {this.state.render &&
            <Grid container>
                <Grid style={{margin: 20}}>
                    <TextField
                    onChange={this.state.count}
                    label="Sekunden" 
                    variant='filled' 
                    color='warning'
                    inputProps={{ type: 'number'}}>
                    </TextField>
                </Grid>
            </Grid>
            }

            
            <Button onClick={this.buttonClicked}
            variant='contained'
            color='warning'
            style={{margin: 20}}>
                Start
            </Button>



        </>);
    }

}

export default Timer2;