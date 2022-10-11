// Farbe des Text wechseln
function color_change() {
    var p = document.querySelector("#Text");
    //var button = document.querySelector("#mybutton");
    //var text = document.querySelector("#src");

    var random_color = Math.floor(Math.random()*16777216-1).toString(16);
    var farbe = "#" + random_color; //"#" nur für zB. #00FF00
    
    p.innerHTML = document.querySelector("#src").value; // die Werte die win in #src eingeben wieder schreiben
    p.style["color"] = farbe;
    p.style["font-size"] = "35px";
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