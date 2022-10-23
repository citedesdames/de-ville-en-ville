/*--------------------- Paramétrage de la carte ---------------------*/
/*--------------------- Paramétrage de la carte ---------------------*/
/*--------------------- Paramétrage de la carte ---------------------*/


// Récupération de l'URL au chargement de la page
let url = window.location.href.split('?');
let url2;
let etape;
let parametresUrl;

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
    //document.querySelector(".img-header").classList.remove("img-header-hidden");
  }
  else {
    etape = undefined;
  }
  parametresUrl = {
    "site": url[0].split("=")[1],
    "etape": etape
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
  createMarkers(dataintro[0], dataetape[0], datatexts[0], datamedia[0]);
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
console.log(doc);
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

          if(doc.url_document.length>0){
             codeHTML += '<a href="' + doc.url_document + '">' + doc.titre_document + '</a>';
          }else{
             codeHTML += doc.titre_document;
          }
          
          if(doc.legende.length>0){
             codeHTML += ', '+doc.legende;
          }
          
          if(doc.copyright.length>0){
             codeHTML += ', '+doc.copyright;
          }

          let url_image = doc.url_document;
          if(doc.miniature.length > 0){
             url_image = doc.miniature;
          }
          
          let icon = "image";
          
          // Document is a video
          if(doc.type == "vidéo"){
             icon = "video";
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
             icon = "video";
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
          carddoc.push('<div class="doc" title="Document ajouté par ' + doc.contexte_ajout_ligne.replace("\"","") + '" onclick="ClicSurDoc(this)"><h3 class="title-doc"><span>&gt;</span><span><img src="assets/images/' + icon + '-small.png" alt=""></span> ' + auteurSansLien + doc.titre_document+'</h3><div class="hidden-doc">' + codeHTML + '</div></div>');
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
          carddoc.push('<div class="doc" title="Document ajouté par ' + doc.contexte_ajout_ligne.replace("\"","") + '" onclick="ClicSurDoc(this)"><h3 class="title-doc"><span>&gt;</span><span><img src="assets/images/texte-small.png" alt=""></span> ' + auteurSansLien + doc.titre_document+'</h3><div class="hidden-doc">' + codeHTML + '</div></div>');
          
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
    if (DocParEtape[datatexts[n].id_etape] in DocParEtape){
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
  // Itération pour chacune des villes dans le tableau data
  for(i=0; i<dataetape.length;i++) {
    if(dataetape[i].latitude !== '' && dataetape[i].longitude !== '') {
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
    // Insertion de chaque coordonnées dans le tableau latlngs
    latlngs.push([dataetape[i].latitude, dataetape[i].longitude]);
    }
  };
  
  // Insertion dans l'html le texte et titre d'introduction
  intro.insertAdjacentHTML("beforeend", '<div id="card" class="card-intro content"><h2 class="title-intro">'+dataintro[0].nom_itineraire+'</h2><p>'+dataintro[0].description_itineraire+'</p></div>')

  // Création du About
  let about = document.querySelector(".about");
  about.insertAdjacentHTML("beforeend","<div class='card-about'><div class='content'><h2 class='title-about'>À propos</h2>"+dataintro[0].a_propos+"</div></div>");
  
  document.querySelector(".main_container").style.width="800px";
  document.querySelector(".main_container").style.backgroundColor="white";
  document.querySelector(".introduction").style.display="block";
  document.querySelector(".introduction .content").style.height="auto";
  document.querySelector(".about").style.display="block";
  document.querySelector(".card-about").style.display="block";
  document.querySelector(".card-about .content").style.height="auto";
  document.querySelector(".card-intro").style.display="block";
  document.querySelector(".overflow-cards").style.display="block";
  document.querySelectorAll(".card").forEach(function(e){e.style.display = "block";});
  document.querySelectorAll(".hidden-doc").forEach(function(e){e.classList.add("doc-open");});
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

