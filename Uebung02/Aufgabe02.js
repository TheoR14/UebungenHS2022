//Liste [1,2,3,4,5,6] mit hilfe von Aufgabe01 erstellen
var W = [];
for (i = 1; i < 7; i++) { 
    W.push(i);
}
//console.log(W);

function wuerfel() {
    var choice = W.length*Math.random();
    var index = Math.floor(choice);
    return W[index];
}
console.log(wuerfel(W));

//----------------------------

function wuerfel2() {
    var zahl = Math.floor(5*Math.random()+1);
    //Math.random -> entre [0; 1[
    //*5: entre [0; 5[
    //+1: entre [1; 6[ (comme un dé) mais pas seulement des 'integer' par exemple aussi 5.68906...
    //Math.floor -> arrondie en dessous
    console.log(zahl);
}
wuerfel2();

//----------------------------

function de(){
    var alea = 6*Math.random()+1;
    var chiffre = Math.floor(alea);
    console.log(alea);
    console.log(chiffre);
}
de();