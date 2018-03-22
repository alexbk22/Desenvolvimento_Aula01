window.onload = function(){

  //Janela do mapa
  var mapa = L.map("mapa_teresopolis").setView([-22.31,-42.95],11);

  //Base OpenStreetMap
  var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapa);

  //Base MapBox
  var mapbox = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
  //https://www.mapbox.com/api-documentation/#maps
  // o id do estilo tem de ir em mapbox -> documentation -> map API
  id: "mapbox.emerald",
  //minha chave de acesso -> disponivel em account
  accessToken: "pk.eyJ1IjoiYWxleGJrMjIiLCJhIjoiY2pmMnJiNXd3MDVuMjMybDN1ZGVramRnbiJ9.i19TgQdhvVBZMCqKTUngDQ"
  });



}
