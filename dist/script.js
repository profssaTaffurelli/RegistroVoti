"use strict";
// Servono per la media: stanno fuori dalla funzione così mantengono il valore tra una registrazione e l'altra
let sommaVoti = 0;
let numeroVoti = 0;
function registra() {
    const campoNome = document.getElementById("nome");
    const campoVoto = document.getElementById("voto");
    const messaggio = document.getElementById("messaggio");
    const immagine = document.getElementById("immagine");
    const elenco = document.getElementById("elenco");
    const media = document.getElementById("media");
    const campoMateria = document.getElementById("materia");
    if (messaggio === null) {
        console.error("Elemento messaggio non trovato");
        return;
    }
    let nome = campoNome.value.trim();
    let testoVoto = campoVoto.value.trim();
    let voto = Number(testoVoto);
    let materia = campoMateria.value;
    // 1. Controllo dei dati
    if (nome === "") {
        messaggio.innerHTML = "<strong>Inserisci il nome dell'alunno</strong>";
        return;
    }
    if (testoVoto === "" || Number.isNaN(voto) || !Number.isInteger(voto) || voto < 1 || voto > 10) {
        messaggio.innerHTML = "<strong>Il voto deve essere un numero da 1 a 10</strong>";
        return;
    }
    // 9. Tipo di verifica (radio button)
    // Radio button: chiedo al gruppo "quale è stato scelto?" (null se nessuno)
    const scelto = document.querySelector('input[name="tipo"]:checked');
    if (scelto === null) {
        messaggio.innerHTML = "<strong>Scegli il tipo di verifica</strong>";
        return;
    }
    let tipo = scelto.value; // "Scritto", "Orale" o "Pratico"
    // Simbolo per il tipo: una sola scelta possibile → if / else if / else
    let simboloTipo;
    if (tipo === "Scritto") {
        simboloTipo = "✏️";
    }
    else if (tipo === "Orale") {
        simboloTipo = "🗣️";
    }
    else {
        simboloTipo = "💻"; // Pratico
    }
    // 10. Opzioni (checkbox): possono essere spuntate insieme → if separati
    // Checkbox: chiedo a ognuna "sei spuntata?"
    const ritardo = document.getElementById("ritardo");
    const facoltativo = document.getElementById("facoltativo");
    const recupero = document.getElementById("recupero");
    if (ritardo.checked) {
        voto = voto - 1;
    }
    if (facoltativo.checked) {
        voto = voto + 1;
    }
    if (voto > 10) {
        voto = 10;
    }
    else if (voto < 1) {
        voto = 1;
    }
    // I dati sono corretti: cancello eventuali messaggi di errore
    messaggio.textContent = "";
    // 2. Il giudizio (calcolato sul voto già modificato dalle checkbox)
    let giudizio;
    if (voto <= 5) {
        giudizio = "Insufficiente";
    }
    else if (voto === 6) {
        giudizio = "Sufficiente";
    }
    else if (voto <= 8) {
        giudizio = "Buono";
    }
    else {
        giudizio = "Ottimo";
    }
    // 3. L'immagine
    switch (giudizio) {
        case "Insufficiente":
            immagine.src = "img/insufficiente.svg";
            immagine.alt = "Semaforo rosso";
            break;
        case "Sufficiente":
            immagine.src = "img/sufficiente.svg";
            immagine.alt = "Semaforo giallo";
            break;
        case "Buono":
            immagine.src = "img/buono.svg";
            immagine.alt = "Semaforo verde";
            break;
        case "Ottimo":
            immagine.src = "img/ottimo.svg";
            immagine.alt = "Stella";
            break;
    }
    // 8. Materia - Simbolo diverso per ogni materia
    let simbolo;
    if (materia === "Matematica") {
        simbolo = "📐";
    }
    else if (materia === "Italiano") {
        simbolo = "📖";
    }
    else {
        simbolo = "🌍"; // Geografia
    }
    // Il voto da scrivere nell'elenco è quello finale, non quello digitato
    let votoElenco = String(voto);
    // 7. Lode: solo se il voto è 10
    if (voto === 10) {
        votoElenco = votoElenco + " e lode";
    }
    // 4. L'elenco
    let testo = simbolo + " " + materia + " – " + nome + " – " + votoElenco +
        " (" + giudizio + ") – " + simboloTipo + " " + tipo;
    if (recupero.checked) {
        testo = testo + " (recupero)";
    }
    const riga = document.createElement("li");
    riga.textContent = testo;
    riga.className = giudizio.toLowerCase(); // colore della riga da style.css
    elenco.appendChild(riga);
    // 5. La tabella
    // textContent è una stringa: la converto in numero, sommo 1 e la riconverto
    const cella = document.getElementById("conta-" + giudizio.toLowerCase());
    cella.textContent = String(Number(cella.textContent) + 1);
    // 6. La media
    sommaVoti = sommaVoti + voto;
    numeroVoti++;
    const valoreMedia = sommaVoti / numeroVoti;
    let esito;
    if (valoreMedia >= 6) {
        esito = "Classe promossa";
    }
    else {
        esito = "Classe da recuperare";
    }
    // toFixed(2) mostra la media con due cifre decimali
    media.innerHTML = "<strong>Media: " + valoreMedia.toFixed(2) + " – " + esito + "</strong>";
}
//# sourceMappingURL=script.js.map