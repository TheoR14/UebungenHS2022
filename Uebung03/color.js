// Farbe des Text wechseln
function color_change() {

    var p = document.querySelector("#Text");
    //var button = document.querySelector("#mybutton");
    //var text = document.querySelector("#myinput");

    var random_color = Math.floor(Math.random()*16777216-1).toString(16);
    /*Die Funktion Math.floor(x) gibt die grösste ganze Zahl zurück, die 
        kleiner oder gleich einer Zahl x ist.   */
    //Math.random(): zufällige Gleitkommazahl im Intervall [0, 1[.
    /*toString(16) gehört zu: Math.floor(x).toString(16) 
        -> toString([base]) base 16 = hexadezimal.*/
    //16777216 = 256^3 -> RGB in Interval [0;255] drei Mal.

    var farbe = "#" + random_color; //"#" nur für zB. #00FF00
    
    p.innerHTML = document.querySelector("#myinput").value; 
    // die Werte (Value) die wir in #myinput eingeben wieder schreiben
    p.style["color"] = farbe;
    p.style["font-size"] = "35px";
    //p ist hier der Name unser Tag <p>...</p>
}
// einfach um schöner zu mache:
// Button einfarben, wenn man drüber geht
function button_over(){
    var button = document.querySelector("#mybutton");
    var farbe2 = "#FFFF00";
    button.style["background-color"] = farbe2;
} 
// Button zurüchsetzen
function button_out(){
    var button = document.querySelector("#mybutton");
    var farbe3 = "#DBDCDF";
    button.style["background-color"] = farbe3;
}