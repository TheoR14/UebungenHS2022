"use strict"
function datetime() {
    setInterval(datetime, 500);

    var d = new Date(); /*nur 'Date()' ist gleich
        aber 'new' ist für ts und ds benutzt*/

    // in eine Zeichenkette schreiben
    var ts = d.toLocaleTimeString(); 
    var ds = d.toDateString();

    var zeit = document.querySelector("#zeit");
    var datum = document.querySelector("#datum");

    zeit.innerHTML = ts;
    datum.innerHTML = ds;
}