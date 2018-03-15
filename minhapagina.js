window.onload = function(){
var mapa = L.map("meumapa").setView([-25.45,-49.27],12); //quando nao fala nada esta em wgs 84
// o valor 11 eh correspondente ao zoom

//Open Street Map
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapa);

var ponto = L.marker([-25.45,-49.27]).addTo(mapa);
}
