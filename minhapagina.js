window.onload = function(){
var mapa = L.map("meumapa").setView([-25.45,-49.27],11); //quando nao fala nada esta em wgs 84
// o valor 11 eh correspondente ao zoom

//Open Street Map
var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");//.addTo(mapa);
//o "z" esta relacionado ao zoom (como saber o numero de diretorios, pela equacao 2^z-1)
//o "x" o enderenco (local em que esta o arquivo)
//o "y" o nome da imagem

//var L.tileLayer("http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg");//.addTo(mapa);
//Pode-se tambem utilizar o "tile servers" para mudar o aspecto visual do mapa,
//pois tem o openstreetmap como base e com uma renderizacao diferente

var mapbox = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
{
//https://www.mapbox.com/api-documentation/#maps
// o id do estilo tem de ir em mapbox -> documentation -> map API
id: "mapbox.emerald",
//minha chave de acesso -> disponivel em account
accessToken: "pk.eyJ1IjoiYWxleGJrMjIiLCJhIjoiY2pmMnJiNXd3MDVuMjMybDN1ZGVramRnbiJ9.i19TgQdhvVBZMCqKTUngDQ"
}
).addTo(mapa);

//Adicionar pontos
var pontoloko = L.marker([-25.45,-49.27]);//.addTo(mapa);

//adicionar linha
var linha = L.polyline(
  [[-25.4, -49.2],
  [-25.5, -49.1]]
);//.addTo(mapa);

//adicionar poligono
var poligono = L.polygon(
  [[-25.5, -49.3],
   [-25.5, -49.5],
   [-25.6, -49.3]],
   {color: "green",
   fillColor: "cyan",
   fillOpacity: 0.3,
   weight: 2
   }
);//.addTo(mapa);

//adicionar circulo
var circulo = L.circle(
  [-25.45, -49.35],
  {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5000
  }
);//.addTo(mapa);

//http://leafletjs.com/reference-1.3.0.html
//Leaflet -> docs -> vector layers (ajuda, exemplos do codigo)

//Anexar popups
// pontoloko.bindPopup("Eu sou um ponto!");
// linha.bindPopup("Eu sou uma linha!");
// poligono.bindPopup("Eu sou um polígono!");
// circulo.bindPopup("Eu sou um círculo!");
//
// //abrir popups
// pontoloko.openPopup();
// linha.openPopup();
// poligono.openPopup();
// circulo.openPopup();
//
// //Popup em local específico do mapa
// var popup = L.popup()
// .setLatLng([-25.44, -49.51])
// .setContent("Eu sou uma popup!")
// .openOn(mapa);

//eventos funcoes executadas a partir do usuario
//http://leafletjs.com/reference-1.3.0.html#map-event
//Evento disparado após o clique do usuário
//mapa.on('click', function (evento) {
//  alert("Você clicou em: " + evento.latlng);
//});
// mapa.on("dbclick", function (evento) {
//   alert("Você clicou em: " + evento.latlng);
// });

//Evento disparado após arrastar o mapa
//mapa.on("dragend", moverMapa);

//Funçao acionada pelo evento criado
//function moverMapa (evento) {
//alert("Você moveu o mapa por : " + evento.distance.toFixed() + " pixels");
//};

//Adicionar camada WMS ao mapa
var states = L.tileLayer.wms("http://localhost:8082/geoserver/wms", {
layers: "topp:states",
transparent: "true",
format: "image/png"
});


//Grupo de camadas
//Pontos
var ponto1 = L.marker([-25.45, -49.27]);
    ponto2 = L.marker([-25.43, -49.29]);

//Linhas
var linha1 = L.polyline([[-25.4, -49.2], [-25.5, -49.1]]);
    linha2 = L.polyline([[-25.4, -49.1], [-25.5, -49.2]]);

//Tile   ###Ja esta declarado acima
//var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')

//Agrupar camadas
var pontos = L.layerGroup([ponto1, ponto2]).addTo(mapa);
var linhas = L.layerGroup([linha1, linha2]).addTo(mapa);
//var combinacao = L.layerGroup([ponto1, ponto2, linha1, linha2, osm]).addTo(mapa);

//Mapas base (fundo)
//objeto
var baseCartografica = {
"OpenStreetMap": osm,
"Mapbox Streets": mapbox
}

//Mapas de sobreposiçao
var informacaoTematica = {
"Pontos": pontos,
"Linhas": linhas,
"Poligono": poligono,
"Geoserver": states
}
//Adicionar objetos ao controle de camadas
L.control.layers(baseCartografica, informacaoTematica).addTo(mapa);

//Escala gráfica
L.control.scale({position: 'bottomright'}).addTo(mapa);



// //Adicionar camada WMS ao mapa
// L.tileLayer.wms("http://localhost:8082/geoserver/wms", {
// layers: "topp:states",
// transparent: "true",
// format: "image/png"
// }).addTo(mapa);

//Adicionar legenda WMS
var uri = "http://localhost:8082/geoserver/wms?" +
"REQUEST=GetLegendGraphic&" +
"FORMAT=image/jpeg&" +
"LAYER=topp:states";
//var uri = "http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&FORMAT=image/jpeg&LAYER=topp:states";

document.getElementById('legenda').src = uri;

}
