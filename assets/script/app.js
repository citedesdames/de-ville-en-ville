
// Paramétrage de la vue sur la carte
var mymap = L.map('mapid').setView([47, 2], 6);


// Ajout du fond de carte
L.tileLayer('http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
    attribution: '',
    maxZoom: 18,
}).addTo(mymap); 


function ChangeClass() {
    var element1 = document.querySelector(".main_container");
    var element2 = document.getElementById("mapid");
    var element3 = document.querySelector(".arrow");
    var element4 = document.querySelector(".arrow-top");
    var element5 = document.querySelector(".arrow-bottom");
    var element6 = document.querySelector("header");
    var element7 = document.querySelector("section");
    element1.classList.toggle("open");
    element2.classList.toggle("short");
    element3.classList.toggle("arrow-open");
    element4.classList.toggle("arrow-top-open");
    element5.classList.toggle("arrow-bottom-open");
    element6.classList.toggle("header-open");
    element7.classList.toggle("section-open");

    var el = document.querySelector("header h1");
    if(el.classList.contains('is-hidden')){
        fadeIn(el);
      }
      else {
        fadeOut(el);
        setTimeout(function(){fadeIn(el)}, 1000);
    }
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
      var val = parseFloat(el.style.opacity);
      if (!((val += .1) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }