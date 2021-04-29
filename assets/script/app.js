/*--------------------- Paramétrage de la carte ---------------------*/
/*--------------------- Paramétrage de la carte ---------------------*/
/*--------------------- Paramétrage de la carte ---------------------*/

// Paramétrage de la vue sur la carte
let mymap = L.map('mapid');

mymap.setView([47, 3], 6);

// Ajout du fond de carte https://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg 
L.tileLayer('https://c.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
    attribution: '',
    maxZoom: 18,
}).addTo(mymap);


// Tableau de test regroupant les villes et leurs coordonnées
/* let data = [
  {
    'name': 'Paris',
    'lat':'48.85341',
    'lng':'2.3488'
  },
  {
    'name':'Lyon',
    'lat':'45.764043',
    'lng':'4.835659'
  },
  {
    'name':'Nîmes',
    'lat':'43.83333',
    'lng':'4.35'
  }
] */

// Appel du fichier csv qui contient la table étape 
const demarre = new Promise((resolve, reject) => {
  Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vTcjDAvojPXjqX9rpfZ0QMKjbq9mTxfKQZTxroaFBFzvyNMkhtfgx5LngTCn7135uAgGSY_cBgb2_wc/pub?gid=1773657079&single=true&output=csv', {
      download: true,
      header: true,
      complete: function (results) {
          createMarkers(results.data);
      }
  });
  setTimeout(() => {
      resolve()
  }, 2000)
})

// Initialisation des marqueurs
// Tableau qui va contenir les marqueurs
let markers = [];

// Marqueur Bleu
let blueMarkIcon = L.icon({
  iconUrl: 'https://zupimages.net/up/21/16/bawa.png',
  iconSize: [25.5, 50],
  iconAnchor:   [13, 48]
}); 

// Marqueur Vert
let greenMarkIcon = L.icon({
  iconUrl: 'https://zupimages.net/up/21/16/f5xz.png',
  iconSize: [30.6, 60],
  iconAnchor:   [14, 55]
})

/*--------------------- Fonctions ---------------------*/
/*--------------------- Fonctions ---------------------*/
/*--------------------- Fonctions ---------------------*/


// Fonction lors de l'ouverture et la fermeture du volet
function ChangeClass() {
    // Sélection de tous les éléments qui vont être modifié lors de l'ouverture ou la fermeture du volet
    let element1 = document.querySelector(".main_container");
    let element2 = document.getElementById("mapid");
    let element3 = document.querySelector(".gauche_link");
    let element4 = document.querySelector(".arrow-top");
    let element5 = document.querySelector(".arrow-bottom");
    let element6 = document.querySelector("header");
    let element7 = document.querySelector("section");
    element1.classList.toggle("open");
    element2.classList.toggle("short");
    element3.classList.toggle("gauche-open");
    element4.classList.toggle("arrow-top-open");
    element5.classList.toggle("arrow-bottom-open");
    element6.classList.toggle("header-open");
    element7.classList.toggle("section-open");


    // Animation de la carte lors de l'ouverture et fermeture du volet pour éviter un décalage
    if(element1.classList.contains('open') && mymap.getZoom()<7) {
      mymap.flyTo([47,11], 6, {
        "animate": true,
        "duration": 1
      });
    }
    else {
      mymap.flyTo([47,3], 6, {
        "animate": true,
        "duration": 2
      });
      uncolorMarkers();
    };

    
    let timeline = document.querySelector(".timeline");
    let overflowcard = document.querySelector(".overflow-cards");
    let card = document.querySelector(".card");
    if(timeline.classList.contains("-open")) {
      timeline.classList.remove("-open");
      card.classList.remove("-open");
      overflowcard.classList.remove("-open");
    }
    // Animation du titre lors de l'ouverture et fermeture du volet
    let el = document.querySelector("header h1");
    if(el.classList.contains('is-hidden')){
        fadeIn(el);
      }
      else {
        fadeOut(el);
        setTimeout(function(){fadeIn(el)}, 1000);
    };
}

function ChangeClassFromMark(e) {
  let element1 = document.querySelector(".main_container");
  let element2 = document.getElementById("mapid");
  let element3 = document.querySelector(".gauche_link");
  let element4 = document.querySelector(".arrow-top");
  let element5 = document.querySelector(".arrow-bottom");
  let element6 = document.querySelector("header");
  let element7 = document.querySelector("section");
  element1.classList.add("open");
  element2.classList.add("short");
  element3.classList.add("gauche-open");
  element4.classList.add("arrow-top-open");
  element5.classList.add("arrow-bottom-open");
  element7.classList.add("section-open");

  // Animation du titre lors de l'ouverture et fermeture du volet
  let el = document.querySelector("header h1");
  if(e.length == 3 && !element6.classList.contains("header-open")) {
  fadeOut(el);
  setTimeout(function(){fadeIn(el)}, 1000);
  }

  element6.classList.add("header-open");

  // Animation de la timeline lors de l'ouverture et fermeture du volet
    // Animation de la timeline lors de l'ouverture et fermeture du volet
    let timeline = document.querySelector(".timeline");
    let overflowcard = document.querySelector(".overflow-cards");
      setTimeout(function() {
        timeline.classList.add("-open");
        overflowcard.classList.add("-open");
      }, 1000);
}

// Fonction pour créer les marqueurs sur la carte et dans la timeline
function createMarkers(data) {
  // Sélection de la timeline
  let e = document.querySelector('.timeline');
  let card = document.querySelector(".overflow-cards");
  var latlngs = [];
  // Itération pour chacune des villes dans le tableau data
  for(i=0; i<3;i++) {
    // Création du marqueur sur la carte
    let mark = L.marker([data[i].latitude, data[i].longitude], {icon: blueMarkIcon, riseOnHover: true}).on("click", onMarkerMap);
    mark.addTo(mymap);
    mark.bindPopup('<div class="popup-container"><div class="vignette">'+data[i].lieu+'</div><div><p class="date">'+data[i].date+'</p><p id="popup'+i+'" class="more" data-latlng="'+data[i].latitude+', '+data[i].longitude+'" onclick="onPopup(this)" >En savoir plus</p></div></div>', {offset: new L.Point(0, -45)}); //onclick="onPopup(this.id)" 
    // Création du marqueur sur la timeline
    e.insertAdjacentHTML("beforeend",
    '<a id="mark'+i+'" class="marker" data-latlng="'+data[i].latitude+', '+data[i].longitude+'" onclick="onMarkerTimeline(this.id)"><img class="timeline-marker" src="https://zupimages.net/up/21/16/pcxc.png" alt=""></a>');
    card.insertAdjacentHTML("afterbegin", '<div id="card'+i+'"class="card">'+data[i].lieu+'</div>');
    // Insertion du marqueur créé dans le tableau markers
    markers.push(mark);
    latlngs.push([data[i].latitude, data[i].longitude]);
  }
  var polyline = L.polyline(latlngs, {color: '#004262'});
  polyline.addTo(mymap);
  e.insertAdjacentHTML("beforeend",'<div class="blue-line"></div>');
}

// Fonction qui agit lors du clic sur un marqueur dans la timeline
function onMarkerTimeline(id) {
  // Sélection du marqueur cliqué dans la timeline
  let e = document.querySelector("#"+id);
  // Ainsi que son image
  let child = document.querySelector("#"+id+" img");
  // Itération pour trouver quel marqueur de la carte est associé au marqueur de la timeline grâce aux coordonnées
  for(i=0; i<3;i++) {
    let mark = markers[i];
    let card = document.querySelector("#card"+i);
    // Si le marqueur de la carte est le même que le marqueur cliqué, alors on le passe en vert, s'il est vert, on le passe en bleu
    if(mark.getLatLng().lat.toString()+", "+mark.getLatLng().lng.toString() == e.getAttribute("data-latlng")) {
      if(mark.getIcon() == blueMarkIcon) {
        uncolorMarkers();
        mark.setIcon(greenMarkIcon);
        child.setAttribute("src", "https://zupimages.net/up/21/16/wnre.png");      
        mymap.flyTo([mark.getLatLng().lat, mark.getLatLng().lng+.5], 10, {
          "animate": true,
          "duration": 1.5
        });
        card.classList.add("-open");
        let scrollitem = document.querySelector(".overflow-cards");
        scrollitem.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      else {
        mark.setIcon(blueMarkIcon);
        child.setAttribute("src", "https://zupimages.net/up/21/16/pcxc.png");
      }
    }  
  }
}

// Fonction qui agit lors du clic sur un marqueur dans la carte /!\ A CHANGER /!\
function onMarkerMap(mark) {
  for(i=0;i<3;i++) {
    let marker = markers[i];
    if(marker.getLatLng().lat.toString()+", "+marker.getLatLng().lng.toString() == mark.latlng.lat.toString()+", "+mark.latlng.lng.toString()) {

      let scrollitem = document.querySelector(".overflow-cards");
      if(document.querySelector(".main_container").classList.contains('open')) {
        mymap.flyTo([marker.getLatLng().lat, marker.getLatLng().lng+.5], 10, {
          "animate": true,
          "duration": 1.5
        });
      }
      else {
        mymap.flyTo([marker.getLatLng().lat, marker.getLatLng().lng], 10, {
          "animate": true,
          "duration": 1.5
        });
      }
      scrollitem.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}

function onPopup(e) {
  for(i=0;i<3;i++){
    let marker = markers[i];
    if(marker.getLatLng().lat.toString()+", "+marker.getLatLng().lng.toString() == e.getAttribute("data-latlng")) {
      let tab = uncolorMarkers();
      let img = document.querySelector("#mark"+i+" img");
      let card = document.querySelector("#card"+i);
      let scrollitem = document.querySelector(".overflow-cards");
      img.setAttribute("src", "https://zupimages.net/up/21/16/wnre.png");
      marker.setIcon(greenMarkIcon);
      ChangeClassFromMark(tab);
      card.classList.add("-open");
      if(document.querySelector(".main_container").classList.contains('open')) {
        mymap.flyTo([marker.getLatLng().lat, marker.getLatLng().lng+.5], 10, {
          "animate": true,
          "duration": 1.5
        });
      }
      else {
        mymap.flyTo([marker.getLatLng().lat, marker.getLatLng().lng], 10, {
          "animate": true,
          "duration": 1.5
        });
      }
      scrollitem.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }  
}

// Fonction lors du clic sur les boutons étape suivante ou étape précédente
function changeStep(e) {
  let card = document.querySelector(".overflow-cards .-open");
  let scrollitem = document.querySelector(".overflow-cards");
  // Clic sur étape suivante
  if(e.getAttribute("class")=="etape-suiv") {
    for(i=0;i<3;i++) {
      if(card.getAttribute("id") == "card"+i) {
        if(i+1 < 3) {
          uncolorMarkers();
          let newcard = document.querySelector("#card"+(i+1));
          newcard.classList.add("-open");
          let child = document.querySelector("#mark"+(i+1)+" img");
          let mark = markers[i+1];
          mark.setIcon(greenMarkIcon);
          child.setAttribute("src", "https://zupimages.net/up/21/16/wnre.png");      
          mymap.flyTo([mark.getLatLng().lat, mark.getLatLng().lng+.5], 10, {
            "animate": true,
            "duration": 1.5
          });
          scrollitem.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }
    }
  }
  // Clic sur étape précédente
  else {
    for(i=0;i<3;i++) {
      if(card.getAttribute("id") == "card"+i) {
        if(i-1>-1) {
          uncolorMarkers();
          let newcard = document.querySelector("#card"+(i-1));
          newcard.classList.add("-open");
          let child = document.querySelector("#mark"+(i-1)+" img");
          let mark = markers[i-1];
          mark.setIcon(greenMarkIcon);
          child.setAttribute("src", "https://zupimages.net/up/21/16/wnre.png");      
          mymap.flyTo([mark.getLatLng().lat, mark.getLatLng().lng+.5], 10, {
            "animate": true,
            "duration": 1.5
          });
          scrollitem.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }
    }
  }
}


// Fonction pour retirer les couleurs de tous les marqueurs (timeline et carte)
function uncolorMarkers() {
  let tab = [];
  for(a=0; a<3; a++) {
    let prevmark = markers[a];
    let prevcard = document.querySelectorAll(".card");
    if(prevmark.getIcon().options.iconUrl == "https://zupimages.net/up/21/16/f5xz.png") {
      let img = document.querySelectorAll(".timeline-marker");
      for (b=0;b<3;b++) {
        img[b].setAttribute("src", "https://zupimages.net/up/21/16/pcxc.png");
        prevcard[b].classList.remove("-open");
      }
      prevmark.setIcon(blueMarkIcon);
    }
    else {
      tab.push("1");
    }
  }
  return tab;
}

// Fonction pour fadeOut en JS Vanilla
function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= 1) < 0) {
      el.style.display = 'none';
      el.classList.add('is-hidden');
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

// Fonction pour fadeIn en JS Vanilla
function fadeIn(el, display){
  if (el.classList.contains('is-hidden')){
    el.classList.remove('is-hidden');
  }
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    let val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}
