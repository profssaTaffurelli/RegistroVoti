
// I quattro giudizi possibili: TypeScript non accetta altre stringhe
type Giudizio = "Insufficiente" | "Sufficiente" | "Buono" | "Ottimo";
 
// Servono per la media: stanno fuori dalla funzione così mantengono il valore tra una registrazione e l'altra
let sommaVoti: number = 0;
let numeroVoti: number = 0;
 
function registra(): void {
  const campoNome = document.getElementById("nome") as HTMLInputElement;
  const campoVoto = document.getElementById("voto") as HTMLInputElement;
  const messaggio: HTMLElement | null = document.getElementById("messaggio");
  const immagine = document.getElementById("immagine") as HTMLImageElement;
  const elenco = document.getElementById("elenco") as HTMLUListElement;
  const media = document.getElementById("media") as HTMLElement;
  const campoMateria = document.getElementById("materia") as HTMLSelectElement;
 
 
  if (messaggio === null) {
    console.error("Elemento messaggio non trovato");
    return;
  }
 
  let nome: string = campoNome.value.trim();
  let testoVoto: string = campoVoto.value.trim();
  let voto: number = Number(testoVoto);
  let materia: string = campoMateria.value;
 
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
  const scelto = document.querySelector<HTMLInputElement>('input[name="tipo"]:checked');

  if (scelto === null) {
    messaggio.innerHTML = "<strong>Scegli il tipo di verifica</strong>";
    return;
  }
 
  let tipo: string = scelto.value;   // "Scritto", "Orale" o "Pratico"
  // Simbolo per il tipo: una sola scelta possibile → if / else if / else
  let simboloTipo: string;
  if (tipo === "Scritto") {
    simboloTipo = "✏️";
  } else if (tipo === "Orale") {
    simboloTipo = "🗣️";
  } else {
    simboloTipo = "💻";   // Pratico
  }
 
  // 10. Opzioni (checkbox): possono essere spuntate insieme → if separati
  // Checkbox: chiedo a ognuna "sei spuntata?"
  const ritardo = document.getElementById("ritardo") as HTMLInputElement;
  const facoltativo = document.getElementById("facoltativo") as HTMLInputElement;
  const recupero = document.getElementById("recupero") as HTMLInputElement;
  if (ritardo.checked) {
    voto = voto - 1;
  }
  if (facoltativo.checked) {
    voto = voto + 1;
  }
  if (voto > 10) {
    voto = 10;
  } else if (voto < 1) {
    voto = 1;
  }
 
  // I dati sono corretti: cancello eventuali messaggi di errore
  messaggio.textContent = "";
 
  // 2. Il giudizio (calcolato sul voto già modificato dalle checkbox)
  let giudizio: Giudizio;
  if (voto <= 5) {
    giudizio = "Insufficiente";
  } else if (voto === 6) {
    giudizio = "Sufficiente";
  } else if (voto <= 8) {
    giudizio = "Buono";
  } else {
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
  let simbolo: string;
  if (materia === "Matematica") {
    simbolo = "📐";
  } else if (materia === "Italiano") {
    simbolo = "📖";
  } else {
    simbolo = "🌍"; // Geografia
  }
 
  // Il voto da scrivere nell'elenco è quello finale, non quello digitato
  let votoElenco: string = String(voto);
 
  // 7. Lode: solo se il voto è 10
  if (voto === 10) {
    votoElenco = votoElenco + " e lode";
  }
 
  // 4. L'elenco
  let testo: string = simbolo + " " + materia + " – " + nome + " – " + votoElenco +
    " (" + giudizio + ") – " + simboloTipo + " " + tipo;
  if (recupero.checked) {
    testo = testo + " (recupero)";
  }
 
  const riga: HTMLLIElement = document.createElement("li");
  riga.textContent = testo;
  riga.className = giudizio.toLowerCase(); // colore della riga da style.css
  elenco.appendChild(riga);
 
  // 5. La tabella
  // textContent è una stringa: la converto in numero, sommo 1 e la riconverto
  const cella = document.getElementById("conta-" + giudizio.toLowerCase()) as HTMLTableCellElement;
  cella.textContent = String(Number(cella.textContent) + 1);
 
  // 6. La media
  sommaVoti = sommaVoti + voto;
  numeroVoti++;
  const valoreMedia: number = sommaVoti / numeroVoti;
 
  let esito: string;
  if (valoreMedia >= 6) {
    esito = "Classe promossa";
  } else {
    esito = "Classe da recuperare";
  }
 
  // toFixed(2) mostra la media con due cifre decimali
  media.innerHTML = "<strong>Media: " + valoreMedia.toFixed(2) + " – " + esito + "</strong>";
}
 
