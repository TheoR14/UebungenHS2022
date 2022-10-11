"use strict"
function datetime(event) {
    setInterval(datetime, 500);

    var d = new Date(); //gegeben
    var ts = d.toLocaleTimeString();  // ein eine Zeichenkette schreiben
    var ds = d.toDateString();

    var zeit = document.querySelector("#zeit");
    var datum = document.querySelector("#datum");

    zeit.innerHTML = ts;
    datum.innerHTML = ds;
}