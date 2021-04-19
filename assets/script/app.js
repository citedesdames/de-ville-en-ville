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


// Paramétrage de la vue sur la carte
let mymap = L.map('mapid');

mymap.setView([47, 3], 6);

// Ajout du fond de carte
L.tileLayer('http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
    attribution: '',
    maxZoom: 18,
}).addTo(mymap); 


function ChangeClass() {
    let element1 = document.querySelector(".main_container");
    let element2 = document.getElementById("mapid");
    let element3 = document.querySelector(".arrow");
    let element4 = document.querySelector(".arrow-top");
    let element5 = document.querySelector(".arrow-bottom");
    let element6 = document.querySelector("header");
    let element7 = document.querySelector("section");
    element1.classList.toggle("open");
    element2.classList.toggle("short");
    element3.classList.toggle("arrow-open");
    element4.classList.toggle("arrow-top-open");
    element5.classList.toggle("arrow-bottom-open");
    element6.classList.toggle("header-open");
    element7.classList.toggle("section-open");

    // Animation de la carte lors de l'ouverture et fermeture du volet
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

// Création des marqueurs
let Mark1 =  L.marker([48.85, 2.5],{icon: blueMarkIcon});
let Mark2 =  L.marker([45.764043, 4.835659],{icon: blueMarkIcon});

Mark1.addTo(mymap);
Mark2.addTo(mymap);

// Fonction lors du clic sur un marqueur de la timeline
function onMarker(id) {
  let e = document.querySelector("#"+id);
  let child = document.querySelector("#"+id+" img");
  if(Mark1.getLatLng().lat.toString()+", "+Mark1.getLatLng().lng.toString() == e.getAttribute("data-latlng")) {
    if(Mark1.getIcon() == blueMarkIcon) {
      Mark1.setIcon(greenMarkIcon);
      child.setAttribute("src", "https://zupimages.net/up/21/16/wnre.png");
    }
    else {
      Mark1.setIcon(blueMarkIcon);
      child.setAttribute("src", "https://zupimages.net/up/21/16/pcxc.png");
    }
  }
  if(Mark2.getLatLng().lat.toString()+", "+Mark2.getLatLng().lng.toString() == e.getAttribute("data-latlng")) {
    if(Mark2.getIcon() == blueMarkIcon) {
      Mark2.setIcon(greenMarkIcon);
      child.setAttribute("src", "https://zupimages.net/up/21/16/wnre.png");
    }
    else {
      Mark2.setIcon(blueMarkIcon);
      child.setAttribute("src", "https://zupimages.net/up/21/16/pcxc.png");
    }
  }
  
}