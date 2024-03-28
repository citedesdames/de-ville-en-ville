/*--------------------- Paramétrage de la carte ---------------------*/
/*--------------------- Paramétrage de la carte ---------------------*/
/*--------------------- Paramétrage de la carte ---------------------*/

// Récupération de l'URL au chargement de la page
let url = window.location.href.split('?');
let url2;
let etape;
let parametresUrl;
let siteId = 1;

// Ajout de paramètres dans l'URL s'il n'y en a pas
if(typeof url[1] == "undefined") {
  window.history.pushState({site: 0}, '', "?site=0");
  url2 = window.location.href.split('?');
  etape = undefined;
  
  parametresUrl = {
    "site": url2[1].split("=")[1],
    "etape": etape
  }
}

// Récupération des paramètres de l'URL s'il y en a
else {
  url = url[1].split("&");
  if(url.length>1) {
    etape = url[1].split("=")[1];
    etape = parseInt(etape) - 1;
    document.querySelector(".img-header").classList.remove("img-header-hidden");
  }
  else {
    etape = undefined;
  }
  parametresUrl = {
    "site": url[0].split("=")[1],
    "etape": etape
  }
}

siteId = parametresUrl.site;

// Paramétrage de la vue sur la carte
let mymap = L.map('mapid');

mymap.setView([47, 3], 6);
mymap.zoomControl.setPosition('topright');
if((siteId == 0)||(siteId == 1)){
// Ajout du fond de carte https://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg http://tile.stamen.com/terrain/{z}/{x}/{y}.png
L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a>, © <a href="https://stamen.com/" target="_blank">Stamen Design</a>, © <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a>, © <a href="https://www.openstreetmap.org/about/" target="_blank">OpenStreetMap contributors</a>',
    maxZoom: 14,
    minZoom: 3
}).addTo(mymap);
} else {
if(siteId == 4){

// Test of the code from https://geohistoricaldata.org/assets/js/geohistoricaldata.js
function layerWMS(service_url, _layers, _opts){
	opts = Object.assign(_opts,{layers:_layers});
	return new L.TileLayer.WMS(service_url,opts);
}

var ghd={
	wms:{
		url:'http://geohistoricaldata.org/geoserver/wms',
		opts_default:{
			style:'raster',
			attribution: "Map data &copy; <a href='http://geohistoricaldata.org/'>http://geohistoricaldata.org/</a> &amp; <a href='http://ladehis.ehess.fr/index.php?355'>LDH-EHESS</a>",
			transparent:true,
			format:'image/png',
			maxZoom:14,
			minZoom: 3,
			tileSize:512
		}
	}
};

var level_france={
	//RASTERS 
	//from GHD
  ghd_cassini:layerWMS(ghd.wms.url,'cassini-ehess:CASSINI',ghd.wms.opts_default),

	//VECTORS
	//from GeoHistoricalData
	cassini_assemblage:layerWMS(ghd.wms.url,'cassini-vectors:france_cassini_table_assemblage',ghd.wms.opts_default),
	cassini_routes:layerWMS(ghd.wms.url,'cassini-vectors:france_cassini',ghd.wms.opts_default),
	cassini_surfaces:layerWMS(ghd.wms.url,'cassini-vectors:france_cassini_taches_urbaines',ghd.wms.opts_default),
	cassini_hydro_lines:layerWMS(ghd.wms.url,'cassini-vectors:france_cassini_hydro',ghd.wms.opts_default),
	cassini_hydro_surfaces:layerWMS(ghd.wms.url,'cassini-vectors:france_cassini_surfaces_hydro',ghd.wms.opts_default),
	cassini_toponyms:layerWMS(ghd.wms.url,'cassini-vectors:france_cassini_toponyms',ghd.wms.opts_default),
	cassini_chefslieux:layerWMS(ghd.wms.url,'cassini-vectors:france_cassini_chefs_lieux_valides',ghd.wms.opts_default),
	cassini_forets:layerWMS(ghd.wms.url,'cassini-vectors:france_cassini_forets',ghd.wms.opts_default)
};

layerWMS(ghd.wms.url,'cassini-ehess:CASSINI',ghd.wms.opts_default).addTo(mymap);

} else{

L.tileLayer.wms('https://ws.sogefi-web.com/wms?', {
    layers: 'Carte_Cassini',
    attribution : 'Univ. Eiffel, EHESS/IGN ; données distribuées par SOGEFI',
    maxZoom: 14,
    minZoom: 3
}).addTo(mymap);

}
}

// Tableaux qui vont contenir les données des .csv

let dataintro = [];
let dataetape = [];
let datatexts = [];
let datamedia = [];

let DocParEtape = {}

// Création des tableaux qui vont stocker les contenus
let cardcontent = [];
let carddoc = [];
let test = [];
let vignette = "assets/thumbnails/thumbnail-default.jpg";

/* -------------------------- IMPORT DES DONNEES -------------------------- */
/* -------------------------- IMPORT DES DONNEES -------------------------- */
/* -------------------------- IMPORT DES DONNEES -------------------------- */

// IMPORT DU FICHIER JSON
fetch('./itineraires.json')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    // UTILISATION DES DONNEES DU FICHIERS JSON

    // Appel des .csv et push dans les tableaux correspondants
      Papa.parse(data[parametresUrl.site].proprietes, {
        download: true,
        header: true,
        complete: function (results) {
          dataintro.push(results.data);
          Papa.parse(data[parametresUrl.site].etapes, {
            download: true,
            header: true,
            complete: function (results) {
              dataetape.push(results.data);
              Papa.parse(data[parametresUrl.site].textes, {
                download: true,
                header: true,
                complete: function (results) {
                  datatexts.push(results.data);
                  Papa.parse(data[parametresUrl.site].multimedia, {
                    download: true,
                    header: true,
                    complete: function (results) {
                      datamedia.push(results.data);
                      
                      // Initialisation de l'itinéraire
                      document.querySelector("title").textContent = dataintro[0][0].title;
                      document.querySelector("h1").innerHTML += dataintro[0][0].titre_court;
                      document.querySelector("head").insertAdjacentHTML("beforeend",'<link rel="icon" type="image/png" href="'+dataintro[0][0].favicon+'" />');

                      // Création des marqueurs
                      Start();
                      // Appel des textes des itinéraires
                      file_get_contents(dataintro[0][0].url_texte_code, text_treatment, dataintro[0][0].class_texte);
                      if(parametresUrl.etape==undefined){
                         ChangeClass();
                      }
                    }
                  })
                }
              })
            }
          })
        }
      })
});

// Fonction avec les données en entrées
function Start() {
  //console.log(dataetape);
  createMarkers(dataintro[0], dataetape[0], datatexts[0], datamedia[0]);
  let load = document.querySelector(".loader");
  load.classList.add("load-open");
  if(typeof(etape) == "number") {
    let autreEtape = etape-1;
    if(etape==0){
       autreEtape = etape+1;
    }
    
    document.querySelectorAll(".leaflet-marker-icon")[0].click();
    document.getElementById("popup"+dataetape[0][0].id_etape).click();
    setTimeout(function(){
    /*
    document.querySelectorAll(".leaflet-marker-icon")[etape].click();
    console.log("étape voulue : " + etape)
    console.log(dataetape[0][etape].id_etape)
    document.getElementById("popup"+dataetape[0][etape].id_etape).click();
    */
    
    onMarkerTimeline("mark"+dataetape[0][etape].id_etape);
    },1000)
    
  }


}

// Fonction qui effectue l'appel
function file_get_contents(uri, callback, class_text) {
  fetch(uri)
  .then(res => res.text())
  .then(text=> callback(text, class_text));
}

// Fonction qui change la string obtenue en élément HTML -> page HTML dans une variable
function text_treatment(str, class_text) {
  let parser = new DOMParser();
	let doc = parser.parseFromString(str, 'text/html');
  let container = document.querySelector(".overflow-texte");
  container.appendChild(doc.querySelector(class_text));
  //console.log(doc.querySelector(class_text));
}

// Initialisation des marqueurs
// Tableau qui va contenir les marqueurs
let markers = [];

function blueMarkIcon(number){
// Marqueur Bleu
/*
return L.icon({
  iconUrl: 'assets/images/blue-shadow.png',
  iconSize: [20.5, 40],
  iconAnchor:   [10, 40],
  number: number
});
*/
return L.ExtraMarkers.icon({
      icon: 'fa-number',
      number: number,
      markerColor: 'blue',
      shape: 'square',
      prefix: 'fa'
      }); 
}

function greenMarkIcon(number){
// Marqueur Vert
/*
return L.icon({
  iconUrl: 'assets/images/green-shadow.png',
  iconSize: [30.6, 60],
  iconAnchor:   [14, 55],
  number: number
});
*/
return L.ExtraMarkers.icon({
      icon: 'fa-number',
      number: number,
      markerColor: 'green',
      shape: 'square',
      prefix: 'fa'
      }); 
}

/*--------------------- Fonctions ---------------------*/
/*--------------------- Fonctions ---------------------*/
/*--------------------- Fonctions ---------------------*/


// Fonction lors de l'ouverture et la fermeture du volet
function ChangeClass() {
    // Sélection de tous les éléments qui vont être modifiés lors de l'ouverture ou la fermeture du volet
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
    ChangeURL(-1);

    // Affichage de la page "d'accueil"
    if(element1.classList.contains("open")) {      
      setTimeout(function() {
        intro1.classList.add("-open");
        intro2.classList.add("-open");
        about.classList.remove("img-header-hidden");
      },1000);
      document.querySelector(".texte").classList.remove("text-open1");
      document.querySelector(".texte").classList.remove("text-open2");

    }
    else {
      intro1.classList.remove("-open");
      intro2.classList.remove("-open");
      about.classList.add("img-header-hidden");
    }
    
    // Animation de la carte lors de l'ouverture et fermeture du volet pour éviter un décalage
    if(element1.classList.contains('open') && mymap.getZoom()<7) {
      mymap.flyTo([47,11], 6, {
        "animate": true,
        "duration": 1
      });
    }
    else {
      if(mymap.getCenter().lat == 47 && mymap.getCenter().lng == 11) {
        mymap.flyTo([47,3], mymap.getZoom(), {
          "animate": true,
          "duration": 2
        });
      }
      else {
        let test1 = 0;
        let test2 = 0;
        for(i=0; i<markers.length;i++) {
          let mark = markers[i];
          if(mymap.getCenter().lat == mark.getLatLng().lat && mymap.getCenter().lng == mark.getLatLng().lng) {
            test1 = 1;
          }
          else {
            test2 = 2;
          }
        }
        if(test1 == 1) {
          mymap.flyTo([mymap.getCenter().lat, mymap.getCenter().lng+.5], mymap.getZoom(), {
            "animate": true,
            "duration": 2
          });
        }
        else {
          if(test2 == 2) {
            mymap.flyTo([mymap.getCenter().lat, mymap.getCenter().lng-.5], mymap.getZoom(), {
              "animate": true,
              "duration": 2
            });
          }
        }
      }
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

// Création de la liste des auteurs
function nomAuteur(insere_url, auteur1_prenom, auteur1_nom, auteur1_url, auteur2_prenom, auteur2_nom, auteur_autres){
  let chaineAuteur = "";
  
  // Ajout de l'auteur1
  if(auteur1_prenom.length>0){
     chaineAuteur += auteur1_prenom+" ";
  }
  chaineAuteur += auteur1_nom;
  
  // Ajout de l'URL pour auteur1 si elle existe et qu'on veut l'insérer
  if((auteur1_url.length>0) && (insere_url)){
     chaineAuteur = '<a href="'+auteur1_url+'">'+chaineAuteur+'</a>';
  }
  
  // Ajout de l'auteur2
  if(auteur2_prenom.length>0 || auteur2_nom.length>0){
     chaineAuteur += ", ";
  }
  if(auteur2_prenom.length>0){
     chaineAuteur += auteur2_prenom+" ";
  }
  chaineAuteur += auteur2_nom
  
  // Ajout des autres auteurs
  if(auteur_autres.length>0){
     chaineAuteur += ", ";
  }
  chaineAuteur += auteur_autres;
  
  return chaineAuteur.replace("' ","'").replace("’ ","'");
}

// Fonction pour ajouter un document
function addDocument(doc){
// DOCUMENTS
//console.log(doc);
        // Documents avec image
        if(doc.type == "image" || doc.type == "vidéo" || doc.type == "iframe") {
          let codeHTML = "";
          let auteur = "";
          let auteurSansLien = "";
          codeHTML = nomAuteur(true, doc.auteur_prenom, doc.auteur_nom, doc.auteur_url, "", "", doc.auteur_autres);
          auteurSansLien = nomAuteur(false, doc.auteur_prenom, doc.auteur_nom, doc.auteur_url, "", "", doc.auteur_autres);
          if(codeHTML.length>0){
             auteurSansLien += ", ";
             codeHTML += ", ";
          }
          auteur = codeHTML;
          
          let needComma = false;

          let icon = "image";
          if((doc.type == "vidéo")||(doc.type == "iframe")){
             icon = "video";
          }
          
          if(doc.url_document.length>0){
             //codeHTML += '<a href="' + doc.url_document + '">' + doc.titre_document + '</a>';
             //codeHTML += '<a href="' + doc.url_document + '"><span><img src="assets/images/' + icon + '.png" alt=""></span></a>';
             codeHTML += '<a href="' + doc.url_document + '">&#128462;</a> ';
          }else{
             //codeHTML += doc.titre_document;
             //codeHTML += '<span><img src="assets/images/' + icon + '.png" alt=""></span>';
          }
          
          if(doc.legende.length>0){
             codeHTML += doc.legende;
             needComma = true;
          }

          if(("annee" in doc) && (doc.annee.length>0)){
             if(needComma){codeHTML += ', ';}
             codeHTML += doc.annee;
             needComma = true;
          }
                    
          if(doc.copyright.length>0){
             if(needComma){codeHTML += ', ';}
             codeHTML += doc.copyright;
          }

          let url_image = doc.url_document;
          if(doc.miniature.length > 0){
             url_image = doc.miniature;
          }
          
          
          // Document is a video
          if(doc.type == "vidéo"){
             if(url_image.replace("youtu.be/","").length < url_image.length || url_image.replace("youtube.com/","").length < url_image.length){
                // Url de vidéo Youtube
                url_image = '<iframe width="500" height="315" src="' + url_image.replace("www.youtube.com/watch?v=","www.youtube.com/embed/").replace("youtu.be/","www.youtube.com/embed/") + '?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
             } else {
                url_image = "";
             }
             codeHTML += '<br>'+url_image;
          }
          
          // Document is an iframe
          if(doc.type == "iframe"){
             codeHTML += '<br>'+url_image;
          }

          // Document is an image
          if(doc.type == "image" && url_image.length > 0){
             if(doc.url_document != undefined){
                codeHTML += '<br><a href="' + doc.url_document + '"><img src="' + url_image + '" width="400px" margin="0 auto"></a>';
             } else {
                codeHTML += '<br><a href="' + url_image + '"><img src="' + url_image + '" width="400px" margin="0 auto"></a>';
             }
          }
          
          if(doc.texte_explicatif.length>0){
             codeHTML += '<br><small>'+doc.texte_explicatif+'</small>';
          }
          codeHTML = '<p class="subtitle-doc">' + codeHTML + '</p>';
          
          codeHTML = codeHTML.replace(/<a /gi, '<a target="_blank"');
          auteur = auteur.replace(/<a /gi, '<a target="_blank"');
          
          let annee = "";
          if(("annee" in doc) && (doc.annee.length>0)){
             annee = ", " + doc.annee;
          }
          
          carddoc.push('<div class="doc" title="Document ajouté par ' + doc.contexte_ajout_ligne.replace("\"","") + '" onclick="ClicSurDoc(this)"><h3 class="title-doc"><span>&gt;</span><span><img src="assets/images/' + icon + '.png" alt=""></span> ' //+ auteurSansLien 
          + doc.titre_document + annee +'</h3><div class="hidden-doc">' + codeHTML + '</div></div>');
        }
        // Documents avec texte 
        if(doc.type.toLowerCase() == "texte" || doc.type.toLowerCase() == "site web") {
          let codeHTML = "";
          let auteur = "";
          let auteurSansLien = "";
          codeHTML = nomAuteur(true, doc.auteur1_prenom, doc.auteur1_nom, doc.auteur1_url, doc.auteur2_prenom, doc.auteur2_nom, doc.auteur_autres);
          auteurSansLien = nomAuteur(false, doc.auteur1_prenom, doc.auteur1_nom, doc.auteur1_url, doc.auteur2_prenom, doc.auteur2_nom, doc.auteur_autres);
          if(codeHTML.length>0){
             auteurSansLien += ", ";
             codeHTML += ", ";
          }
          auteur = codeHTML;

          if(doc.url_document.length>0){
             if(doc.reference_bibliographique.length>0){
                codeHTML += '<a href="' + doc.url_document + '">' + doc.reference_bibliographique + '</a>';
             } else {
                codeHTML += '<a href="' + doc.url_document + '">' + doc.titre_document + '</a>';
             }
          }else{
             if(doc.reference_bibliographique.length>0){
                codeHTML += doc.reference_bibliographique;
             } else {
                codeHTML += doc.titre_document;
             }
          }

          let url_image = "";
          if(doc.miniature.length > 0){
             codeHTML += '<br><a href="' + doc.url_document + '"><img src="' + doc.miniature + '" width="400px" margin="0 auto"></a>';
          }          

          if(doc.texte_explicatif.length>0){
             codeHTML += '<br><small>'+doc.texte_explicatif+'</small>';
          }
          codeHTML = '<p class="subtitle-doc">' + codeHTML + '</p>';
          if(doc.texte.length>0){
             codeHTML += '<p class="subtitle-doc">' + doc.texte + '</p>';
          }
          
          codeHTML = codeHTML.replace(/<a /gi, '<a target="_blank"');
          auteur = auteur.replace(/<a /gi, '<a target="_blank"');
          carddoc.push('<div class="doc" title="Document ajouté par ' + doc.contexte_ajout_ligne.replace("\"","") + '" onclick="ClicSurDoc(this)"><h3 class="title-doc"><span>&gt;</span><span><img src="assets/images/texte.png" alt=""></span> ' + auteurSansLien + doc.titre_document+'</h3><div class="hidden-doc">' + codeHTML + '</div></div>');
          
        }
        

}

// Fonction pour créer les marqueurs sur la carte et dans la timeline
function createMarkers(dataintro, dataetape, datatexts, datamedia) {
  // Sélection de la timeline
  let e = document.querySelector('.timeline');
  let card = document.querySelector(".overflow-cards");
  let intro = document.querySelector(".introduction");
  let mediasParEtape = {};
  let textesParEtape = {};
  let vignettes = {}
  
  // Création de l'objet associant à chaque étape la liste des documents multimédia liés
  for(n=0; n < datamedia.length;n++) {
    if(DocParEtape[datamedia[n].id_etape] in DocParEtape){
      DocParEtape[datamedia[n].id_etape] += 1;
    } else {
      DocParEtape[datamedia[n].id_etape] = 1;
    }
    if(datamedia[n].id_etape in mediasParEtape){
      mediasParEtape[datamedia[n].id_etape].push(datamedia[n]);
    } else {
      mediasParEtape[datamedia[n].id_etape] = [datamedia[n]];
    }
    if(datamedia[n].vignette=="1"){
      vignettes[datamedia[n].id_etape] = datamedia[n].miniature;
    }
  }

  // Création de l'objet associant à chaque étape la liste des textes liés
  for(n=0; n < datatexts.length;n++) {
    if ([datatexts[n].id_etape] in DocParEtape){
      DocParEtape[datatexts[n].id_etape] += 1;
    } else {
      DocParEtape[datatexts[n].id_etape] = 1;
    }
    if (datatexts[n].id_etape in textesParEtape){
      textesParEtape[datatexts[n].id_etape].push(datatexts[n]);
    } else {
      textesParEtape[datatexts[n].id_etape] = [datatexts[n]];
    }
  }
  
  //DocumentsParEtape(datatexts, DocParEtape);
  //DocumentsParEtape(datamedia, DocParEtape);
  console.log("documents trouvés")
  var latlngs = [];
  var paths = [];
  var dates = [];
  // Itération pour chacune des villes dans le tableau data
  for(i=0; i<dataetape.length;i++) {
    if(dataetape[i].latitude !== '' && dataetape[i].longitude !== '') {
    // Création du marqueur sur la carte
    let mark = L.marker([dataetape[i].latitude, dataetape[i].longitude], {icon: blueMarkIcon(DocParEtape[dataetape[i].id_etape]), riseOnHover: true, title: dataetape[i].lieu + ' - ' + dataetape[i].date, id:dataetape[i].id_etape}).on("click", onMarkerMap);
    mark.addTo(mymap);        
    // Création du marqueur sur la timeline
    e.insertAdjacentHTML("beforeend",
    '<a id="mark'+dataetape[i].id_etape+'" class="marker" data-latlng="'+dataetape[i].latitude+', '+dataetape[i].longitude+'" onclick="onMarkerTimeline(this.id)"><img class="timeline-marker" src="assets/images/blue-noshadow.png" alt="" title="'+dataetape[i].lieu+' - '+dataetape[i].date+'"></a>');

    // Création des tableaux qui vont stocker les contenus
    cardcontent = [];
    carddoc = [];
    test = [];
    
    // Ajout des documents multimédia liés à l'étape
    if(dataetape[i].id_etape in mediasParEtape){
      for(n = 0; n < mediasParEtape[dataetape[i].id_etape].length; n++) {
        addDocument(mediasParEtape[dataetape[i].id_etape][n]);
      }
    }

    // Ajout des documents texte liés à l'étape
    if(dataetape[i].id_etape in textesParEtape){
      for(n = 0; n < textesParEtape[dataetape[i].id_etape].length; n++) {
        addDocument(textesParEtape[dataetape[i].id_etape][n]);
      }
    }

    carddoc = carddoc.toString().replace(/<\/p>\,/g,'</p>');
    
    let etapeLivre = "";
    if((dataetape[i].page).length > 0){
       etapeLivre = '<p class="text-click" onclick="onText(\''+dataetape[i].id_etape+'\')">Cette étape dans <u>'+dataintro[0].titre_texte+'</u></p>';
    }
    
    // Insertion dans l'html des lignes définies plus tôt et du lien vers l'ouvrage
    if((cardcontent.length) == 0){
      cardcontent.push();
    }
    
    let vignette = "assets/thumbnails/thumbnail-default.jpg";
    if(dataetape[i].id_etape in vignettes){
       vignette = vignettes[dataetape[i].id_etape];
    }
    card.insertAdjacentHTML("beforeend", '<div id="card' + dataetape[i].id_etape + '"class="card">'
      + '<div class="card-header"><img class="card-minia" src="' + vignette + '" alt""><div class="card-title"><h2>'+dataetape[i].lieu+'</h2><p>'+dataetape[i].date+'</p></div></div>'
      + '<div class="description"><p class="description-content">'+dataetape[i].description+'</p></div>'
      + etapeLivre
      +'<div class="card-content">'+(carddoc.toString().replace(/<\/div>\,/g,'</div>'))+'</div>'
      +'</div>');
    if(dataetape[i].date != "?") {
      mark.bindPopup('<div class="popup-wrapper"><div class="vignette" style="background-image: url(\''+vignette+'\');">'+dataetape[i].lieu+'</div><div class="popup-container"><p class="date">'+dataetape[i].date+'</p><p id="popup'+dataetape[i].id_etape+'" class="more" data-latlng="'+dataetape[i].latitude+', '+dataetape[i].longitude+'" onclick="onPopup(this)">En savoir plus</p></div></div>', {offset: new L.Point(0, -3)});
    } else {
      mark.bindPopup('<div class="popup-wrapper"><div class="vignette" style="background-image: url(\''+vignette+'\');">'+dataetape[i].lieu+'</div><div class="popup-container"><p class="date"></p><p id="popup'+dataetape[i].id_etape+'" class="more" data-latlng="'+dataetape[i].latitude+', '+dataetape[i].longitude+'" onclick="onPopup(this)">En savoir plus</p></div></div>', {offset: new L.Point(0, -3)});
    }

    // Insertion du marqueur créé dans le tableau markers
    markers.push(mark);
    // Insertion de chaque coordonnées dans le tableau latlngs
    latlngs.push([dataetape[i].latitude, dataetape[i].longitude]);
    // Stocker les coordonnées de l'itinéraire vers cette étape si disponibles
    if(dataetape[i]["itinéraire"] != undefined){
       paths.push(dataetape[i]["itinéraire"]);
    } else {
       paths.push("");
    }
    // Stocker la date de cette étape si disponible
    if(dataetape[i]["date"] != undefined){
       dates.push(dataetape[i]["date"]);
    } else {
       dates.push("");
    }
    }
  };

  
  e.insertAdjacentHTML("afterbegin", '<div class="slideLeft">&lt;</div>')
  e.insertAdjacentHTML("beforeend", '<div class="slideRight">&gt;</div>')
  const buttonRight = document.querySelector('.slideRight');
  const buttonLeft = document.querySelector('.slideLeft');

  buttonRight.onclick = function () {
    document.querySelector('.timeline').scrollBy({
      left: 200,
      behavior: 'smooth'
    });     
  };
  buttonLeft.onclick = function () {
    document.querySelector('.timeline').scrollBy({
      left: -200,
      behavior: 'smooth'
    });     
  };  
  // Insertion dans l'html le texte et titre d'introduction
  intro.insertAdjacentHTML("beforeend", '<div id="card" class="card-intro content"><h2 class="title-intro">'+dataintro[0].nom_itineraire+'</h2><p>'+dataintro[0].description_itineraire+'</p></div>')
  // Insertion dans l'html le bouton Commencer
  intro.insertAdjacentHTML("beforeend", '<div class="button-start"><a class="etape-start -open" onclick="changeStep(this)">Commencer</a></div>')
  // Insertion dans l'html les boutons suivant et précédent
  card.insertAdjacentHTML("beforeend", '<div class="buttons"><a class="etape-prev -open" onclick="changeStep(this)">Étape précédente</a><a class="etape-suiv -open" onclick="changeStep(this)">Étape suivante</a></div>');

  // Création du About
  let about = document.querySelector(".about");
  about.insertAdjacentHTML("beforeend","<div class='card-about'><div class='content'><h2 class='title-about'>À propos</h2>"+dataintro[0].a_propos+"</div></div>");
  about.insertAdjacentHTML("beforeend", '<div class="button-start"><a class="etape-start -open" onclick="AboutPage()">Retour</a></div>');
  // Création des lignes qui relient les marqueurs
  if(siteId > 0){
     let step = 0;
     latlngs.forEach(x => {
        let weight = 3;
        let opacity = 1;
        if(step > 0){
            // Création d'une ligne droite de la précédente étape vers l'étape actuelle
            let theLine = [latlngs[step-1],latlngs[step]];
            if(paths[step] != ""){
               // Chargement d'un itinéraire aux coordonnées personnalisées au lieu d'une ligne droite
               let thePath = JSON.parse(paths[step]);
               let firstCoord = latlngs[step];
               let lastCoord = latlngs[step-1];
               if((latlngs[step-1][0]-thePath.coordinates[0][1])*(latlngs[step-1][0]-thePath.coordinates[0][1])+(latlngs[step-1][1]-thePath.coordinates[0][0])*(latlngs[step-1][1]-thePath.coordinates[0][0]) < (latlngs[step][0]-thePath.coordinates[0][1])*(latlngs[step][0]-thePath.coordinates[0][1])+(latlngs[step][1]-thePath.coordinates[0][0])*(latlngs[step][1]-thePath.coordinates[0][0])){
                  firstCoord = latlngs[step-1];
                  lastCoord = latlngs[step];               
               }
               theLine = [firstCoord];
               thePath.coordinates.forEach(coord => {
                  theLine.push([coord[1], coord[0]])
               })  
               theLine.push(lastCoord);
               if(thePath.weight != undefined){weight = thePath.weight;}
               if(thePath.opacity != undefined){opacity = thePath.opacity;}
            }
            let color = `rgb(${255-255*(step/latlngs.length)},0,${255*(step/latlngs.length)})`;
            console.log()
            if(siteId == 4){
               let year = parseInt(dates[step].substring(dates[step].length-5, dates[step].length));
               if(year==1578){
                   color = "#e3342f";
                }
               if(year==1579){
                   color = "#f6993f";
                }
               if(year==1580){
                   color = "#ffed4a";
                }
               if(year==1581){
                   color = "#38c172";
                }
               if(year==1582){
                   color = "#4dc0b5";
                }
               if(year==1583){
                   color = "#3490dc";
                }
               if(year==1584){
                   color = "#6574cd";
                }
               if(year==1585){
                   color = "#9561e2";
                }
               if(year==1586){
                   color = "#f66d9b";
                }
            }
            let polyline = L.polyline(theLine, {weight: weight, opacity: opacity, color: color});
            polyline.addTo(mymap);
        }
        step++;
     })
  } else {
     L.polyline(latlngs, {color: '#004262'}).addTo(mymap);
  }
  
  document.querySelector(".overflow-tl").insertAdjacentHTML("beforeend",'<div class="blue-line"></div>');
};

// Clic pour voir le texte
function onText(step) {
  // Appartition du texte et disparition de l'étape
  document.querySelector(".overflow-tl").classList.remove("-open");
  document.querySelector(".overflow-cards").classList.remove("-open");
  document.querySelector(".texte").classList.add("text-open1");
  setTimeout(function (){
    document.querySelector(".texte").classList.add("text-open2");
  },100);
  setTimeout(function() {
    document.querySelector(".overflow-texte").classList.add("-open");
    document.querySelector(".overflow-texte").scrollTo(0,document.querySelector("#s"+step).offsetTop-80)
  },1100)

  // Suite



}
// Fonction qui agit lors du clic sur un marqueur dans la timeline
function onMarkerTimeline(id) {
  document.querySelector(".texte").classList.remove("text-open1");
  document.querySelector(".texte").classList.remove("text-open2");
  document.querySelector(".overflow-tl").classList.add("-open");
  document.querySelector(".overflow-cards").classList.add("-open");
  // Sélection du marqueur cliqué dans la timeline
  let e = document.querySelector("#"+id);
  let timeline = document.querySelector('.timeline');
  // Ainsi que son image
  let child = document.querySelector("#"+id+" img");
  // Itération pour trouver quel marqueur de la carte est associé au marqueur de la timeline grâce aux coordonnées
  for(i=0; i<dataetape[0].length;i++) {
    if(markers[i] != undefined){
    let mark = markers[i];
    let card = document.querySelector("#card"+dataetape[0][i].id_etape);
    mark.closePopup();
    // Si le marqueur de la carte est le même que le marqueur cliqué, alors on le passe en vert, s'il est vert, on le passe en bleu
    if("mark" + mark.options.id.toString() == e.getAttribute("id")) {
      if(mark.getIcon().options.markerColor == 'blue') {
        ChangeURL(i);
        uncolorMarkers();
        mark.setIcon(greenMarkIcon(DocParEtape[dataetape[0][i].id_etape]));
        child.setAttribute("src", "assets/images/green-noshadow.png");      
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

        timeline.scrollTo({
          left:e.offsetLeft-75,
          behavior:'smooth'
        });
      }

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
// À corriger pour ne pas sélectionner selon les coordonnées mais selon l'id
function onPopup(e) {
  //console.log(document.querySelector(".about").classList);
  if(document.querySelector(".about").classList.contains("-open")){
     AboutPage();
  }
  document.querySelector(".texte").classList.remove("text-open1");
  document.querySelector(".texte").classList.remove("text-open2");
  for(i=0;i<markers.length;i++){
    let marker = markers[i];
    // Condition pour avoir le marqueur et la card correspondant au pop-up
    if("popup" + marker.options.id.toString() == e.getAttribute("id")) {
      
      ChangeURL(i);
      document.querySelector(".introduction").classList.remove("-open");
      document.querySelector(".img-header").classList.remove("-open");
      let tab = uncolorMarkers();
      let img = document.querySelector("#mark"+dataetape[0][i].id_etape+" img");
      let card = document.querySelector("#card"+dataetape[0][i].id_etape);
      let scrollitem = document.querySelector(".overflow-cards");
      img.setAttribute("src", "assets/images/green-noshadow.png");
      marker.setIcon(greenMarkIcon(DocParEtape[dataetape[0][i].id_etape]))
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
      let timeline = document.querySelector('.timeline');
      timeline.scrollTo({
        left:document.querySelector("#mark"+dataetape[0][i].id_etape).offsetLeft-75,
        behavior:'smooth'
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
      if(card.getAttribute("id") == "card"+dataetape[0][i].id_etape) {
        if(i+1 < markers.length) {
          ChangeURL(i+1);
          uncolorMarkers();
          let newcard = card.nextSibling;
          newcard.classList.add("-open");
          let child = document.querySelector("#mark"+Number(dataetape[0][i].id_etape)).nextSibling.firstChild;
          let mark = markers[i+1];
          mark.setIcon(greenMarkIcon(DocParEtape[dataetape[0][i].id_etape]));
          child.setAttribute("src", "assets/images/green-noshadow.png");      
          mymap.flyTo([mark.getLatLng().lat, mark.getLatLng().lng+.5], 10, {
            "animate": true,
            "duration": 1
          });
          scrollitem.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          let timeline = document.querySelector('.timeline');
          timeline.scrollTo({
            left:document.querySelector("#mark"+Number(dataetape[0][i].id_etape)).nextSibling.offsetLeft-75,
            behavior:'smooth'
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
      if(card.getAttribute("id") == "card"+Number(dataetape[0][i].id_etape)) {
        if(i-1>-1) {
          ChangeURL(i-1);
          uncolorMarkers();
          let newcard = card.previousSibling;
          newcard.classList.add("-open");
          let child = document.querySelector("#mark"+Number(dataetape[0][i].id_etape)).previousSibling.firstChild;
          let mark = markers[i-1];
          mark.setIcon(greenMarkIcon(DocParEtape[dataetape[0][i].id_etape]));
          child.setAttribute("src", "assets/images/green-noshadow.png");      
          mymap.flyTo([mark.getLatLng().lat, mark.getLatLng().lng+.5], 10, {
            "animate": true,
            "duration": 1
          });
          scrollitem.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          let timeline = document.querySelector('.timeline');
          timeline.scrollTo({
            left:document.querySelector("#mark"+Number(dataetape[0][i].id_etape)).previousSibling.offsetLeft-75,
            behavior:'smooth'
          });

          if(i-1 == markers.length - 2) {
            document.querySelector(".etape-suiv").classList.add("-open");
          }
          if(i-1 == 0) {
            document.querySelector(".etape-prev").textContent = "Retour";
          }
        }
        else {
          ChangeURL(i-1);
          let timeline = document.querySelector('.timeline');
          timeline.scrollTo({
            left:0,
            behavior:'smooth'
          });
          uncolorMarkers(); 
          document.querySelector(".introduction").classList.add("-open");
          document.querySelector(".card-intro").classList.add("-open");
          document.querySelector(".img-header").classList.add("-open");
          document.querySelector(".overflow-tl").classList.remove("-open");
          document.querySelector(".overflow-cards").classList.remove("-open");
          
          for(i=0;i<markers.length;i++) {
            let marker = markers[i];
            marker.closePopup();
          };
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
      ChangeURL(0);
      let marker = markers[i];
      marker.closePopup();
      }
      uncolorMarkers();
      let newcard = document.querySelector("#card1");
      newcard.classList.add("-open");
      let child = document.querySelector("#mark1 img");
      let mark = markers[0];
      mark.setIcon(greenMarkIcon(DocParEtape[dataetape[0][0].id_etape]))
      child.setAttribute("src", "assets/images/green-noshadow.png");      
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

function closeCards(){
  document.querySelector(".overflow-tl").classList.remove("-open");
  document.querySelector(".overflow-cards").classList.remove("-open");
  
}

function HeaderClick() {
  let i = Number(document.querySelector(".card.-open").getAttribute("id").split("card")[1]);
  ChangeURL(i, "header");
  let timeline = document.querySelector('.timeline');
  timeline.scrollTo({
    left:0,
    behavior:'smooth'
  });
  uncolorMarkers(); 
  for(i=0;i<markers.length;i++) {
    let marker = markers[i];
    marker.closePopup();
  };
  closeCards();
  document.querySelector(".introduction").classList.add("-open");
  document.querySelector(".card-intro").classList.add("-open");
  document.querySelector(".img-header").classList.add("-open");
  document.querySelector(".introduction").scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Clic sur le bouton informations
function AboutPage() {
  closeCards();
  let about = document.querySelector(".about");
  document.querySelector(".introduction").classList.remove("-open");
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

// Animation lors de l'ouverture et fermeture d'un document
function ClicSurDoc(e) {
  if(!e.lastChild.classList.contains("doc-open")) {
    let doc = document.querySelectorAll(".doc");
    for (c=0;c<doc.length;c++) {
      if(doc[c].lastChild.classList.contains('doc-open')) {
        doc[c].lastChild.classList.remove('doc-open');
        doc[c].firstChild.classList.remove('title-doc-clicked');
        doc[c].firstChild.firstChild.classList.remove('rotate-span');
      }
    }
    
    setTimeout(function(){
    let scrollitem = document.querySelector(".overflow-cards");
    scrollitem.scrollTo({
      top: (e.offsetTop - scrollitem.offsetTop),
      behavior: 'smooth'
    });
    },500)
    
  }
  e.lastChild.classList.toggle("doc-open");
  e.firstChild.firstChild.classList.toggle("rotate-span");
  e.firstChild.classList.toggle("title-doc-clicked");
}

// Changement de l'URL quand on change d'étape
function ChangeURL(i, e) {
  const url = new URL(window.location);

  let urlparam = window.location.href.split('?');
  urlparam = urlparam[1].split("&");
  if(i>=0) {
    if(urlparam.length>1) {
      url.searchParams.set('etape', i+1);
      window.history.pushState({}, '', url);
    }
    else {
      url.searchParams.set('etape', i+1);
      window.history.pushState({},'', url)
    }
  }
  else {
    url.searchParams.set('etape', '');
    window.history.pushState({},'', url)
  }
  if(typeof e === "string") {
    url.searchParams.set('etape', '');
    window.history.pushState({},'', url)
  }
}


// Fonction pour retirer les couleurs de tous les marqueurs (timeline et carte)
function uncolorMarkers() {
  let tab = [];
  for(a=0; a<markers.length; a++) {
    let prevmark = markers[a];
    let prevcard = document.querySelectorAll(".card");
    let doc = document.querySelectorAll(".doc");
    if(prevmark.getIcon().options.markerColor == "green") {
      let img = document.querySelectorAll(".timeline-marker");
      for (b=0;b<markers.length;b++) {
        img[b].setAttribute("src", "assets/images/blue-noshadow.png");
        prevcard[b].classList.remove("-open");
      };
      for (c=0;c<doc.length;c++) {
        if(doc[c].lastChild.classList.contains('doc-open')) {
          doc[c].lastChild.classList.remove('doc-open');
          doc[c].firstChild.classList.remove('title-doc-clicked');
          doc[c].firstChild.firstChild.classList.remove('rotate-span');
        }
      }
      //console.log(prevmark.getIcon())
      prevmark.setIcon(blueMarkIcon(prevmark.getIcon().options.number))
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