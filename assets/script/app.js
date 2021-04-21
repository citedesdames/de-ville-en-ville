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

/*--------------------- Paramétrage de la carte et des villes ---------------------*/
/*--------------------- Paramétrage de la carte et des villes ---------------------*/
/*--------------------- Paramétrage de la carte et des villes ---------------------*/

// Paramétrage de la vue sur la carte
let mymap = L.map('mapid');

mymap.setView([47, 3], 6);

// Ajout du fond de carte
L.tileLayer('https://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
    attribution: '',
    maxZoom: 18,
}).addTo(mymap); 

// https://docs.google.com/spreadsheets/d/e/2PACX-1vTcjDAvojPXjqX9rpfZ0QMKjbq9mTxfKQZTxroaFBFzvyNMkhtfgx5LngTCn7135uAgGSY_cBgb2_wc/pub?gid=1773657079&single=true&output=csv
// Tableau regroupant les villes et leurs coordonnées
let data = [
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
]

const demarre = new Promise((resolve, reject) => {
  Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vTcjDAvojPXjqX9rpfZ0QMKjbq9mTxfKQZTxroaFBFzvyNMkhtfgx5LngTCn7135uAgGSY_cBgb2_wc/pub?gid=1773657079&single=true&output=csv', {
      download: true,
      header: true,
      complete: function (results) {
          console.log(results);
          addStep(results.data);
      }
  });
  setTimeout(() => {
      resolve()
  }, 2000)
})



// Fonction lors de l'ouverture et la fermeture du volet
function ChangeClass() {
    // Séléction de tous les éléments qui vont être modifié lors de l'ouverture ou la fermeture du volet
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
      mymap.flyTo([47,11], mymap.getZoom(), {
        "animate": true,
        "duration": 1
      });
    }
    else {
      mymap.flyTo([47,3], mymap.getZoom(), {
        "animate": true,
        "duration": 1
      });
    };

    // Animation du titre lors de l'ouverture et fermeture du volet
    let el = document.querySelector("header h1");
    if(el.classList.contains('is-hidden')){
        fadeIn(el);
      }
      else {
        fadeOut(el);
        setTimeout(function(){fadeIn(el)}, 1000);
    };

    // Animation de la timeline lors de l'ouverture et fermeture du volet
    let timeline = document.querySelector(".timeline");
    if(timeline.classList.contains("timeline-open")) {
      timeline.classList.remove("timeline-open");
    }
    else {
      setTimeout(function() {
        timeline.classList.add("timeline-open");
      }, 1000);
    };
}
// Fin fonction

// Marqueur Bleu
let blueMarkIcon = L.icon({
  iconUrl: 'https://zupimages.net/up/21/16/pcxc.png',
  iconSize: [25.5, 50] 
}); 

// Marqueur Vert
let greenMarkIcon = L.icon({
  iconUrl: 'https://zupimages.net/up/21/16/wnre.png',
  iconSize: [25.5, 50]
})

// Tableau qui va contenir les marqueurs
let markers = [];

// Fonction pour créer les marqueurs sur la carte et dans la timeline
function createMarkers() {
// Séléction de la timeline
let e = document.querySelector('.timeline');
// Itération pour chacune des villes dans le tableau data
for(i=0; i<data.length;i++) {
  // Création du marqueur sur la carte
  let mark = L.marker([data[i].lat, data[i].lng], {icon: blueMarkIcon});
  mark.addTo(mymap);
  // Création du marqueur sur la timeline
  e.insertAdjacentHTML("beforeend",
  '<a id="mark'+i+'" data-latlng="'+data[i].lat+', '+data[i].lng+'" onclick="onMarker(this.id)"><img class="timeline-marker" src="https://zupimages.net/up/21/16/pcxc.png" alt=""></a>');
  // Insertion du marqueur créé dans le tableau markers
  markers.push(mark);
}
e.insertAdjacentHTML("beforeend",'<div class="blue-line"></div>');
}

// Appel de la fonction pour créer les marqueurs
createMarkers()

// Fonction qui agit lors du clic sur un marqueur dans la timeline
function onMarker(id) {
  // Séléction du marqueur cliqué dans la timeline
  let e = document.querySelector("#"+id);
  // Ainsi que son image
  let child = document.querySelector("#"+id+" img");
  // Itération pour trouver quel marqueur de la carte est associé au marqueur de la timeline grâce aux coordonnées
  for(i=0; i<data.length;i++) {
    let mark = markers[i];
    // Si le marqueur de la carte est le même que le marqueur cliqué, alors on le passe en vert, s'il est vert, on le passe en bleu
    if(mark.getLatLng().lat.toString()+", "+mark.getLatLng().lng.toString() == e.getAttribute("data-latlng")) {
      if(mark.getIcon() == blueMarkIcon) {
        mark.setIcon(greenMarkIcon);
        child.setAttribute("src", "https://zupimages.net/up/21/16/wnre.png");
      }
      else {
        mark.setIcon(blueMarkIcon);
        child.setAttribute("src", "https://zupimages.net/up/21/16/pcxc.png");
      }
    }  
  }
}