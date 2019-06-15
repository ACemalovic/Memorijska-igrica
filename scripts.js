const cards = document.querySelectorAll('.memory-card');

let OkretanjeKartice = false;
//Zaključavamo tablu, kako bi se dovršilo okretanje kartica (koje se ne poklapaju) ka naličju:
let ZakljucavanjeTable = false;
let PrvaKartica, DrugaKartica;

function flipCard() {
  //Sprečavamo duple klikove koji onemogućavaju da se kartica vrati u prvobitnu poziciju.
  if (ZakljucavanjeTable) return;
  if (this === PrvaKartica) return;


  this.classList.add('flip');

  if (!OkretanjeKartice) {
    // Prvi klik:
    OkretanjeKartice = true;
    PrvaKartica = this;

    return; //prekida izvođenje funkcije
  }

  // Drugi klik:
  DrugaKartica = this;
  //Provera da li su kartice iste:
  ProveraPoklapanja();
}

function ProveraPoklapanja () {
  //Uvođenje ternarnog operatora:
  let Poklapanje = PrvaKartica.dataset.framework === DrugaKartica.dataset.framework;

  Poklapanje ? BlokadaKartice () : ZatvaranjeKartice();
}
//Ako su kartice iste:
function BlokadaKartice () {
  PrvaKartica.removeEventListener('click', flipCard);
  DrugaKartica.removeEventListener('click', flipCard);
  ResetTable();
}
//Ako se kartice ne poklapaju:
function ZatvaranjeKartice () {
  ZakljucavanjeTable = true;

  setTimeout(() => {
    PrvaKartica.classList.remove('flip');
    DrugaKartica.classList.remove('flip');

    ResetTable();
  }, 1500);
}

function ResetTable() {
  [OkretanjeKartice, ZakljucavanjeTable] = [false, false];
  [PrvaKartica, DrugaKartica] = [null, null];
}
//Nasumično raspoređivanje kartica:
(function MesanjeKartica() {
  cards.forEach(card => {
    let NasumicniBroj = Math.floor(Math.random() * 12);
    card.style.order = NasumicniBroj;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
