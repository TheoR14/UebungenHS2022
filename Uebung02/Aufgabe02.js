//Liste [1,2,3,4,5,6] mit hilfe von Aufgabe01 erstellen
var W = [];
for (i = 1; i < 7; i++) { 
    W.push(i);
}
console.log(W);

//----------------------------

function wuerzeln(myArray) {
    var choice = W.length*Math.random();
    var index = Math.floor(choice)
    return W[index];
}
console.log(wuerzeln(W));