// Il registro dei voti - soluzione

function registra() {
  // Leggo i dati inseriti dall'utente
  let nome = document.getElementById("nome").value;
  let testoVoto = document.getElementById("voto").value;
  let voto = Number(testoVoto);
  let messaggio = document.getElementById("messaggio");

  // 1. Controllo dei dati
  if (nome == "") {
    messaggio.textContent = "Inserisci il nome dell'alunno";
    return;
  }

  if (testoVoto == "" || voto < 1 || voto > 10) {
    messaggio.textContent = "Il voto deve essere un numero da 1 a 10";
    return;
  }

  // I dati sono corretti: cancello eventuali messaggi di errore
  messaggio.textContent = "";

  // 2. Il giudizio
  let giudizio;
  if (voto <= 5) {
    giudizio = "Insufficiente";
  } else if (voto == 6) {
    giudizio = "Sufficiente";
  } else if (voto <= 8) {
    giudizio = "Buono";
  } else {
    giudizio = "Ottimo";
  }

  // 3. L'immagine
  let immagine = document.getElementById("immagine");
  if (giudizio == "Insufficiente") {
    immagine.src = "img/insufficiente.svg";
    immagine.alt = "Semaforo rosso";
  } else if (giudizio == "Sufficiente") {
    immagine.src = "img/sufficiente.svg";
    immagine.alt = "Semaforo giallo";
  } else if (giudizio == "Buono") {
    immagine.src = "img/buono.svg";
    immagine.alt = "Semaforo verde";
  } else if (giudizio == "Ottimo") {
    immagine.src = "img/ottimo.svg";
    immagine.alt = "Stella";
  }

  // 4. L'elenco
  let riga = document.createElement("li");
  riga.textContent = nome + " – " + voto + " (" + giudizio + ")";
  riga.classList.add(giudizio.toLowerCase());
  document.getElementById("elenco").appendChild(riga);

  // 5. La tabella
  let cella = document.getElementById("conta-" + giudizio.toLowerCase());
  cella.textContent = Number(cella.textContent) + 1;
}
