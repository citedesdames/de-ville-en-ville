/*--------------------- Paramétrage de la carte ---------------------*/
/*--------------------- Paramétrage de la carte ---------------------*/
/*--------------------- Paramétrage de la carte ---------------------*/

// Paramétrage de la vue sur la carte
let mymap = L.map('mapid');

mymap.setView([47, 3], 6);
mymap.zoomControl.setPosition('topright');
// Ajout du fond de carte https://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg http://tile.stamen.com/terrain/{z}/{x}/{y}.png
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', {
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
 
// https://docs.google.com/spreadsheets/d/e/2PACX-1vTcjDAvojPXjqX9rpfZ0QMKjbq9mTxfKQZTxroaFBFzvyNMkhtfgx5LngTCn7135uAgGSY_cBgb2_wc/pub?&output=csv
/* let file = ["https://docs.google.com/spreadsheets/d/e/2PACX-1vTcjDAvojPXjqX9rpfZ0QMKjbq9mTxfKQZTxroaFBFzvyNMkhtfgx5LngTCn7135uAgGSY_cBgb2_wc/pub?gid=129227231&single=true&output=csv","https://docs.google.com/spreadsheets/d/e/2PACX-1vTcjDAvojPXjqX9rpfZ0QMKjbq9mTxfKQZTxroaFBFzvyNMkhtfgx5LngTCn7135uAgGSY_cBgb2_wc/pub?gid=1773657079&single=true&output=csv","https://docs.google.com/spreadsheets/d/e/2PACX-1vTcjDAvojPXjqX9rpfZ0QMKjbq9mTxfKQZTxroaFBFzvyNMkhtfgx5LngTCn7135uAgGSY_cBgb2_wc/pub?gid=0&single=true&output=csv"];
let data = [];
for(i=0;i<file.length;i++) {
  Papa.parse(file[i], {
      download: true,
      header: true,
      complete: function (results) {
        setTimeout(function() {
          console.log("oui");
          data.push(results.data);
        }, 3000);
      }
  });

};
setTimeout(function() {
  console.log(data[0]);
  console.log(data[1]);
  console.log(data[2]);
  createMarkers(data);
}, 4000); */


// Tableaux qui vont contenir les données des .csv
let dataintro = [];
let dataetape = [];
let datadocs = [];

// Appel des .csv et push dans les tableaux correspondants
Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vTcjDAvojPXjqX9rpfZ0QMKjbq9mTxfKQZTxroaFBFzvyNMkhtfgx5LngTCn7135uAgGSY_cBgb2_wc/pub?gid=129227231&single=true&output=csv", {
  download: true,
  header: true,
  complete: function (results) {
    dataintro.push(results.data);
  }
})
Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vTcjDAvojPXjqX9rpfZ0QMKjbq9mTxfKQZTxroaFBFzvyNMkhtfgx5LngTCn7135uAgGSY_cBgb2_wc/pub?gid=1773657079&single=true&output=csv", {
  download: true,
  header: true,
  complete: function (results) {
    dataetape.push(results.data);
  }
})
Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vTcjDAvojPXjqX9rpfZ0QMKjbq9mTxfKQZTxroaFBFzvyNMkhtfgx5LngTCn7135uAgGSY_cBgb2_wc/pub?gid=0&single=true&output=csv", {
  download: true,
  header: true,
  complete: function (results) {
    datadocs.push(results.data);
  }
})

// Appel de la fonction avec les données en entrées
setTimeout(function() {
  createMarkers(dataintro[0], dataetape[0], datadocs[0]);
}, 2500);

// Initialisation des marqueurs
// Tableau qui va contenir les marqueurs
let markers = [];

// Marqueur Bleu
let blueMarkIcon = L.icon({
  iconUrl: 'https://zupimages.net/up/21/16/bawa.png',
  iconSize: [20.5, 40],
  iconAnchor:   [10, 40]
}); 

// Marqueur Vert
let greenMarkIcon = L.icon({
  iconUrl: 'https://zupimages.net/up/21/16/f5xz.png',
  iconSize: [30.6, 60],
  iconAnchor:   [14, 55]
});

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
    let intro1 = document.querySelector(".introduction");
    let intro2 = document.getElementById("card");
    let about = document.querySelector(".img-header");
    element1.classList.toggle("open");
    element2.classList.toggle("short");
    element3.classList.toggle("gauche-open");
    element4.classList.toggle("arrow-top-open");
    element5.classList.toggle("arrow-bottom-open");
    element6.classList.toggle("header-open");
    element7.classList.toggle("section-open");

    // Affichage de la page "d'accueil"
    if(element1.classList.contains("open")) {      
      setTimeout(function() {
        intro1.classList.add("-open");
        intro2.classList.add("-open");
        about.classList.add("-open");
      },1000);
    }
    else {
      intro1.classList.remove("-open");
      intro2.classList.remove("-open");
      about.classList.remove("-open");
    }
    
    // Animation de la carte lors de l'ouverture et fermeture du volet pour éviter un décalage
    if(element1.classList.contains('open') && mymap.getZoom()<7) {
      mymap.flyTo([47,11], 6, {
        "animate": true,
        "duration": 1
      });
    }
    else {
      mymap.flyTo([47,3], mymap.getZoom(), {
        "animate": true,
        "duration": 2
      });
      uncolorMarkers();
    };
 
    // Affichage des timelines et cards 
    let timeline = document.querySelector(".overflow-tl");
    let overflowcard = document.querySelector(".overflow-cards");
    let card = document.querySelector(".card");
    if(timeline.classList.contains("-open")) {
      timeline.classList.remove("-open");
      card.classList.remove("-open");
      overflowcard.classList.remove("-open");
      intro1.classList.remove("-open");
      intro2.classList.remove("-open");
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
};

// Fonction pour les animations si le volet est ouvert depuis un pop-up
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

  console.log(e.length);
  console.log(markers.length);
  // Animation du titre lors de l'ouverture et fermeture du volet
  let el = document.querySelector("header h1");
  if(e.length == markers.length && !element6.classList.contains("header-open")) {
  fadeOut(el);
  setTimeout(function(){fadeIn(el)}, 1000);
  };

  element6.classList.add("header-open");
  // Animation de la timeline lors de l'ouverture et fermeture du volet
    let timeline = document.querySelector(".overflow-tl");
    let overflowcard = document.querySelector(".overflow-cards");
      setTimeout(function() {
        timeline.classList.add("-open");
        overflowcard.classList.add("-open");
      }, 1000);
};

// Fonction pour créer les marqueurs sur la carte et dans la timeline
function createMarkers(dataintro, dataetape, datadocs) {
  // Sélection de la timeline
  let e = document.querySelector('.timeline');
  let card = document.querySelector(".overflow-cards");
  let intro = document.querySelector(".introduction");
  var latlngs = [];
  // Itération pour chacune des villes dans le tableau data
  for(i=0; i<dataetape.length;i++) {
    if(dataetape[i].latitude !== '' && dataetape[i].longitude !== '') {
    // Création du marqueur sur la carte
    let mark = L.marker([dataetape[i].latitude, dataetape[i].longitude], {icon: blueMarkIcon, riseOnHover: true}).on("click", onMarkerMap);
    mark.addTo(mymap);          
    // Création du marqueur sur la timeline
    e.insertAdjacentHTML("beforeend",
    '<a id="mark'+i+'" class="marker" data-latlng="'+dataetape[i].latitude+', '+dataetape[i].longitude+'" onclick="onMarkerTimeline(this.id)"><img class="timeline-marker" src="https://zupimages.net/up/21/16/pcxc.png" alt=""></a>');

    // Création des tableaux qui vont stocker les contenus
    let cardcontent = [];
    let carddoc = [];
    // Boucle For pour parcourir les documents reliés à l'étape
    for(n=0; n<datadocs.length;n++) {
      if(parseInt(datadocs[n].etape, 10) == i+1) {
        // Si un document est une vignette, alors
        if(datadocs[n].vignette == "1") {
          // Push au début du tableau la ligne qu'il faudra mettre dans l'html
          cardcontent.unshift('<div class="card-header"><img class="card-minia" src="'+datadocs[n].miniature+'" alt""><h2 class="card-title">'+dataetape[i].lieu+'</h2></div>');
          // Création du pop up du marqueur sur la carte
          mark.bindPopup('<div class="popup-wrapper"><div class="vignette" style="background-image: url('+datadocs[n].miniature+');">'+dataetape[i].lieu+'</div><div class="popup-container"><p class="date">'+dataetape[i].date+'</p><p id="popup'+i+'" class="more" data-latlng="'+dataetape[i].latitude+', '+dataetape[i].longitude+'" onclick="onPopup(this)" >En savoir plus</p></div></div>', {offset: new L.Point(0, -45)});
        }
        else {
          // Push dans le tableau une ligne par défaut
          cardcontent.push('<div class="card-header"><h2>'+dataetape[i].lieu+'</h2></div>');
        }

        // Push du titre du document /!\ ICI CHANGER LE CONTENU POUR LES DOCUMENTS
        if(datadocs[n].type == "image") {
          console.log(datadocs[n].titre_document_original.replace("<a href",'<a target="_blank" href'));
          if(datadocs[n].url_creation.search(/http/) !== 0 && datadocs[n].titre_document_original.search(/\<a href+/) !== 0) {
            carddoc.push('<div><p class="title-doc">'+datadocs[n].titre_document+'</p><p class="subtitle-doc">'+datadocs[n].titre_document_original.replace("<a href",'<a target="_blank" href')+'</p><img src="'+datadocs[n].url_document+'" width="400px" margin="0 auto"></div>');
          }
          else {
            carddoc.push('<div><p class="title-doc">'+datadocs[n].titre_document+'</p><p class="subtitle-doc">'+datadocs[n].titre_document_original.replace("<a href",'<a target="_blank" href')+'</p><a class="img-doc" target="_blank" href="'+datadocs[n].url_creation+'" alt=""><img src="'+datadocs[n].url_document+'" width="400px"></a></div>');
          }

        }
        else {
          if(datadocs[n].titre_document !== '') {
            carddoc.push('<div><p>'+datadocs[n].titre_document+'</p></div>');
          }
          else {
            carddoc.push('<div><p>'+datadocs[n].titre_document_original+'</p></div>');
          }
        }
        
      }
    }
    carddoc = carddoc.toString().replace(/<\/p>\,/g,'</p>');
    // Insertion dans l'html des lignes définies plus tôt
    card.insertAdjacentHTML("beforeend", '<div id="card'+i+'"class="card">'+cardcontent[0]+'<div class="card-content">'+(carddoc.toString().replace(/<\/div>\,/g,'</div>'))+'</div></div>');
   
    // Insertion du marqueur créé dans le tableau markers
    markers.push(mark);
    // Insertion de chaque coordonnées dans le tableau latlngs
    latlngs.push([dataetape[i].latitude, dataetape[i].longitude]);
    }
  };
  // Insertion dans l'html le texte et titre d'introduction
  intro.insertAdjacentHTML("beforeend", '<div id="card" class="card-intro content"><h2 class="title-intro">'+dataintro[0].nom_itineraire+'</h2><p>'+dataintro[0].description_itineraire+'</p></div>')
  // Insertion dans l'html le bouton Commencer
  intro.insertAdjacentHTML("beforeend", '<div class="button-start"><a class="etape-start -open" onclick="changeStep(this)">Commencer</a></div>')
  // Insertion dans l'html les boutons suivant et précédent
  card.insertAdjacentHTML("beforeend", '<div class="buttons"><a class="etape-prev -open" onclick="changeStep(this)">Étape précédente</a><a class="etape-suiv -open" onclick="changeStep(this)">Étape suivante</a></div>');

  // Création du About
  let about = document.querySelector(".about");
  console.log(dataintro[0]);
  about.insertAdjacentHTML("beforeend","<div class='card-about'><div class='content'><h2 class='title-about'>À propos</h2>"+dataintro[0].a_propos+"</div></div>");
  about.insertAdjacentHTML("beforeend", '<div class="button-start"><a class="etape-start -open" onclick="AboutPage()">Retour</a></div>');
  // Création des lignes qui relient les marqueurs
  let polyline = L.polyline(latlngs, {color: '#004262'});
  polyline.addTo(mymap);
  document.querySelector(".overflow-tl").insertAdjacentHTML("beforeend",'<div class="blue-line"></div>');
};

// Fonction qui agit lors du clic sur un marqueur dans la timeline
function onMarkerTimeline(id) {
  // Sélection du marqueur cliqué dans la timeline
  let e = document.querySelector("#"+id);
  // Ainsi que son image
  let child = document.querySelector("#"+id+" img");
  // Itération pour trouver quel marqueur de la carte est associé au marqueur de la timeline grâce aux coordonnées
  for(i=0; i<markers.length;i++) {
    let mark = markers[i];
    let card = document.querySelector("#card"+i);
    mark.closePopup();
    // Si le marqueur de la carte est le même que le marqueur cliqué, alors on le passe en vert, s'il est vert, on le passe en bleu
    if(mark.getLatLng().lat.toString()+", "+mark.getLatLng().lng.toString() == e.getAttribute("data-latlng")) {
      if(mark.getIcon() == blueMarkIcon) {
        uncolorMarkers();
        mark.setIcon(greenMarkIcon);
        child.setAttribute("src", "https://zupimages.net/up/21/16/wnre.png");      
        mymap.flyTo([mark.getLatLng().lat, mark.getLatLng().lng+.5], 10, {
          "animate": true,
          "duration": 1
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
      };
      // Conditions pour changer les boutons suivant et précédent si on est à la première ou la dernière étape
      if(i == markers.length - 1) {
        document.querySelector(".etape-suiv").classList.remove("-open");
      }
      else {
        document.querySelector(".etape-suiv").classList.add("-open");
      }
      if(i == 0) {
        document.querySelector(".etape-prev").textContent = "Retour";
      } 
      else {
        document.querySelector(".etape-prev").textContent = "Étape précédente";
      }
    };  
  };
};

// Fonction qui agit lors du clic sur un marqueur dans la carte
function onMarkerMap(mark) {
  for(i=0;i<markers.length;i++) {
    let marker = markers[i];
    if(marker.getLatLng().lat.toString()+", "+marker.getLatLng().lng.toString() == mark.latlng.lat.toString()+", "+mark.latlng.lng.toString()) {
      // Déplacement vers le marqueur un peu décallé car le volet est ouvert
      if(document.querySelector(".main_container").classList.contains('open')) {
        mymap.flyTo([marker.getLatLng().lat, marker.getLatLng().lng+.5], 10, {
          "animate": true,
          "duration": 1
        });
      }
      // Déplacement vers le marqueur sans décalage
      else {
        mymap.flyTo([marker.getLatLng().lat, marker.getLatLng().lng], 10, {
          "animate": true,
          "duration": 1
        });
      };
    };
  };
};

// Fonction qui agit lors du clic sur "En savoir plus" d'un pop up
function onPopup(e) {
  for(i=0;i<markers.length;i++){
    let marker = markers[i];
    // Condition pour avoir le marqueur et la card correspondants au pop-up
    if(marker.getLatLng().lat.toString()+", "+marker.getLatLng().lng.toString() == e.getAttribute("data-latlng")) {
      let tab = uncolorMarkers();
      let img = document.querySelector("#mark"+i+" img");
      let card = document.querySelector("#card"+i);
      let scrollitem = document.querySelector(".overflow-cards");
      img.setAttribute("src", "https://zupimages.net/up/21/16/wnre.png");
      marker.setIcon(greenMarkIcon);
      marker.closePopup();
      ChangeClassFromMark(tab);
      card.classList.add("-open");
      // Déplacement vers le marqueur un peu décallé car le volet est ouvert
      if(document.querySelector(".main_container").classList.contains('open')) {
        mymap.flyTo([marker.getLatLng().lat, marker.getLatLng().lng+.5], 10, {
          "animate": true,
          "duration": 1
        });
      }
      // Déplacement vers le marqueur sans décalage
      else {
        mymap.flyTo([marker.getLatLng().lat, marker.getLatLng().lng], 10, {
          "animate": true,
          "duration": 1
        });
      };
      scrollitem.scrollTo({
        top: 0,
        behavior: 'smooth'
      });      
      // Conditions pour changer les boutons suivant et précédent si on est à la première ou la dernière étape
      if(i == markers.length - 1) {
        document.querySelector(".etape-suiv").classList.remove("-open");
      }
      else {
        document.querySelector(".etape-suiv").classList.add("-open");
      }
      if(i == 0) {
        document.querySelector(".etape-prev").textContent = "Retour";
      } 
      else {
        document.querySelector(".etape-prev").textContent = "Étape précédente";
      }
    };
  };  
};

// Fonction lors du clic sur les boutons étape suivante ou étape précédente
function changeStep(e) {
  let card = document.querySelector(".overflow-cards .-open");
  let scrollitem = document.querySelector(".overflow-cards");
  // Clic sur étape suivante
  if(e.getAttribute("class")=="etape-suiv -open" || e.getAttribute("class") == "etape-suiv") {
    for(i=0;i<markers.length;i++) {
    let marker = markers[i];
    marker.closePopup();
      if(card.getAttribute("id") == "card"+i) {
        if(i+1 < markers.length) {
          uncolorMarkers();
          let newcard = document.querySelector("#card"+(i+1));
          newcard.classList.add("-open");
          let child = document.querySelector("#mark"+(i+1)+" img");
          let mark = markers[i+1];
          mark.setIcon(greenMarkIcon);
          child.setAttribute("src", "https://zupimages.net/up/21/16/wnre.png");      
          mymap.flyTo([mark.getLatLng().lat, mark.getLatLng().lng+.5], 10, {
            "animate": true,
            "duration": 1
          });
          scrollitem.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
           if(i+1 == markers.length - 1) {
            document.querySelector(".etape-suiv").classList.remove("-open");
          }
          if(i+1 == 1) {
            document.querySelector(".etape-prev").textContent = "Étape précédente";
          } 
        };
      };
    };
  }
  // Clic sur étape précédente
  else {
    if(e.getAttribute("class")=="etape-prev -open" || e.getAttribute("class") == "etape-prev") {
    for(i=0;i<markers.length;i++) {
    let marker = markers[i];
    marker.closePopup();
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
            "duration": 1
          });
          scrollitem.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          if(i-1 == markers.length - 2) {
            document.querySelector(".etape-suiv").classList.add("-open");
          }
          if(i-1 == 0) {
            document.querySelector(".etape-prev").textContent = "Retour";
          }
        }
        else {
          uncolorMarkers(); 
          document.querySelector(".introduction").classList.add("-open");
          document.querySelector(".card-intro").classList.add("-open");
          document.querySelector(".img-header").classList.add("-open");
          document.querySelector(".overflow-tl").classList.remove("-open");
          document.querySelector(".overflow-cards").classList.remove("-open");
          
          for(i=0;i<markers.length;i++) {
            let marker = markers[i];
            marker.closePopup();
          }
          document.querySelector(".introduction").scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }
    }
    }
    // Clic sur Commencer
    if(e.getAttribute("class")=="etape-start -open" || e.getAttribute("class") == "etape-start") {
      document.querySelector(".introduction").classList.remove("-open");
      document.querySelector(".overflow-tl").classList.add("-open");
      document.querySelector(".img-header").classList.remove("-open");
      let scrollitem = document.querySelector(".overflow-cards");
      scrollitem.classList.add("-open");
      for(i=0;i<markers.length;i++) {
      let marker = markers[i];
      marker.closePopup();
      }
      uncolorMarkers();
      let newcard = document.querySelector("#card0");
      newcard.classList.add("-open");
      let child = document.querySelector("#mark0 img");
      let mark = markers[0];
      mark.setIcon(greenMarkIcon);
      child.setAttribute("src", "https://zupimages.net/up/21/16/wnre.png");      
      mymap.flyTo([mark.getLatLng().lat, mark.getLatLng().lng+.5], 10, {
        "animate": true,
        "duration": 1
      });
      scrollitem.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      document.querySelector(".etape-prev").textContent = "Retour";
    } 
        
    
  };
};

// Clic sur le bouton informations
function AboutPage() {
  let about = document.querySelector(".about");
  document.querySelector(".introduction").classList.remove("-open");
  console.log(dataintro[0][0].a_propos);
  if(about.classList.contains("-open")) {
    let cardabout = document.querySelector('.card-about');
    about.classList.remove('-open');
    cardabout.classList.remove("-open");
    document.querySelector(".introduction").classList.add("-open");
  }
  else {
    let cardabout = document.querySelector('.card-about');
    about.classList.add("-open");
    cardabout.classList.add("-open");
  }
}


// Fonction pour retirer les couleurs de tous les marqueurs (timeline et carte)
function uncolorMarkers() {
  let tab = [];
  for(a=0; a<markers.length; a++) {
    let prevmark = markers[a];
    let prevcard = document.querySelectorAll(".card");
    if(prevmark.getIcon().options.iconUrl == "https://zupimages.net/up/21/16/f5xz.png") {
      let img = document.querySelectorAll(".timeline-marker");
      for (b=0;b<markers.length;b++) {
        img[b].setAttribute("src", "https://zupimages.net/up/21/16/pcxc.png");
        prevcard[b].classList.remove("-open");
      };
      prevmark.setIcon(blueMarkIcon);
    }
    else {
      tab.push("1");
    };
  };
  return tab;
};

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
};

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
