var mymap = L.map('mapid').setView([47, 2], 6);

L.tileLayer('http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
    attribution: '',
    maxZoom: 18,
}).addTo(mymap); 

/*         var map = L.map('mapid').setView([48.833, 2.333], 7); // LIGNE 18

var osmLayer = L.tileLayer('http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', { // LIGNE 20
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
});

map.addLayer(osmLayer); */


var polygon = L.polyline([
    [48.833593730835766, 2.515552671160623],
    [48, -4],
    [47, -1],
    [44.8378, -0.594]
]).addTo(mymap);
