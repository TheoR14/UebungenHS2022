import React, {Component} from 'react';

class Timer extends Component { //toujours comme ça !
    constructor(props) {
        super(props);

        this.state = {count: this.props.countdown, end: ''}; //this.props.countdown -> prends la valeure de countdown="..." in App.js; end:'' met aucune valeure 'Fertig' quand ça recommence
    
        this.interval = null

        // Event Handler registrieren
        this.decrease = this.decrease.bind(this);
        this.click = this.click.bind(this);

    }
    
    decrease() {                                        // descendre automatiquement
        this.setState({count: this.state.count - 1});   // compte de -1 en -1
        if (this.state.count <= 1) {                    //quand le chiffre est plus petit/égale 1
            this.setState({end: "Fertig !"});           //set -> Fertig 
            this.setState({count:''});                  //rien ecrire où les chiffres étaient: '' vide
            clearInterval(this.interval);               //cleareInterval arrête le chrono 
            this.interval = null;
            }

    }
    click(){                                            //quand Start est cliquer
        this.setState({count: this.props.countdown, end: ''});
        if(this.interval != null){                      //si on click alors que ce n'est pas égale à 0
            clearInterval(this.interval);               //on remet le compteur a 0 (ici 50 dans l'exo)
        }
        this.interval = setInterval(this.decrease, 1000);   //1000 pour les secondes; quand on clique sur Start, le chrono descend avec la fonction decrease a la vitesse 1000
        }
    
    render() { //gibt ein Titel, ein Timer(mit Zahlen) und schreibt Fertig wenn es fertig ist.
        return (<>
        <hr/>
        <div><center>
            <h1>Timer {this.props.countdown} Sekunden</h1>
            <p>{this.state.count}</p>                           
            <p>{this.state.end}</p>
            <button onClick={this.click}>Start</button>
        </center></div>
            <hr/>
        </>);
    }

}

export default Timer;