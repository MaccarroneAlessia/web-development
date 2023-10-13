let contatoreTerminale = 0;
let isSpostamentoAttivo = false;
let spostamentoOffsetX = 0;
let spostamentoOffsetY = 0;

//La funzione creaTerminale() viene chiamata quando l'utente fa clic sull'icona per aprire un nuovo terminale. 
//Questa funzione crea gli elementi HTML che costituiscono il terminale, inclusa l'intestazione, il titolo e il corpo del terminale.
function creaTerminale() {
    const terminale = document.createElement("div");
    terminale.className = "terminale";
    terminale.id = "terminale" + contatoreTerminale;
    terminale.style.zIndex = 1;

    const intestazione = document.createElement("div");
    intestazione.className = "intestazione draggable";
    intestazione.addEventListener("mousedown", iniziaSpostamento); //secondo elemento una callback

    const titolo = document.createElement("span");
    titolo.className = "titolo";
    titolo.textContent = " ale@ubuntu: ~ " + contatoreTerminale;

    //icone di riduzione e ingrandimento nella barra dell'intestazione del terminale
    //gli event listener per gestire i clic su queste icone
    const minIcona = document.createElement("i");
    minIcona.className = "fa-solid fa-circle-minus grigio";
    minIcona.style.float = "right";
    minIcona.style.cursor = "pointer";
    minIcona.addEventListener("click", function(event) {
        riduciTerminale(event);
    });
    /*minIcona.addEventListener("click", function(event) {
        modificaDimensioneTerminale(event, "300px", "200px");
    });*/

    const maxIcona = document.createElement("i");
    maxIcona.className = "fa-solid fa-circle-stop grigio";
    maxIcona.style.float = "right";
    maxIcona.style.cursor = "pointer";
    maxIcona.addEventListener("click", function(event) {
        modificaDimensioneTerminale(event, "100%", "100%");
    });
    //maxIcona.addEventListener("click", ingrandisciTerminale);

    const chiudiIcona = document.createElement("i");
    chiudiIcona.className = "fa-solid fa-circle-xmark rosso";
    chiudiIcona.style.float = "right";
    chiudiIcona.style.cursor = "pointer";
    //evento di click per rimuovere il terminale quando l'icona viene cliccata 
    chiudiIcona.addEventListener("click", chiudiTerminale);
    /*chiudiIcona.onclick = function() {
        terminale.remove();
    };*/

    intestazione.appendChild(titolo);
    intestazione.appendChild(chiudiIcona);
    intestazione.appendChild(maxIcona);
    intestazione.appendChild(minIcona);

    const corpo = document.createElement("div");
    corpo.className = "corpo";

    const titoloSezione = document.createElement("div");
    titoloSezione.className = "titolo";

    const testoVerde = document.createElement("div");
    testoVerde.className = "verde";
    testoVerde.textContent = "ale@ubuntu:~$ ";

    titoloSezione.appendChild(testoVerde);

    const inputComandi = document.createElement("div");
    inputComandi.classList.add("comandi", "my-input");
    //inputComandi.textContent = "scrivi un comando";
    inputComandi.contentEditable = true;
    inputComandi.align = "left";

    const bufferComandi = document.createElement("div");
    bufferComandi.className = "comEs";
    bufferComandi.id = "comandi" + contatoreTerminale;
    //bufferComandi.textContent = "comandi eseguiti";

    corpo.appendChild(bufferComandi);
    corpo.appendChild(titoloSezione);
    corpo.appendChild(inputComandi);


    terminale.appendChild(intestazione);
    terminale.appendChild(corpo);

    posizioneRandom(terminale, corpo);

    document.body.appendChild(terminale);

    // Seleziona l'elemento div con l'ID "tOpen"
    const tOpen = document.getElementById("tOpen");

    // Crea l'icona associata al terminale cliccabile
    const icona = document.createElement("img");
    icona.src = "./assets/image/iconaOpen.png";
    icona.className = "iconaT iconaOpen";
    icona.id = contatoreTerminale;
    icona.addEventListener("click", function() {
        visTerminale("terminale" + this.id);
    });

    // Aggiungi l'icona al div con l'ID "tOpen"
    tOpen.appendChild(icona);

    contatoreTerminale++;
}

//chiamata quando l'utente fa clic sull'intestazione del terminale per spostarlo
//memorizza la posizione iniziale del clic per consentire lo spostamento del terminale.
function iniziaSpostamento(event) {
    const terminale = event.target.closest(".terminale");
    isSpostamentoAttivo = true;

    const rect = terminale.getBoundingClientRect(); //restituisce un oggetto DOMRect che rappresenta la posizione e le dimensioni dell'elemento "terminale" rispetto alla finestra di visualizzazione
    spostamentoOffsetX = event.clientX - rect.left;
    spostamentoOffsetY = event.clientY - rect.top;

    //terminale.style.zIndex = "999";
    contatoreTerminale++; // Incrementa il contatore dei terminali creati + il numero di volte che si clicca un terminale
    terminale.style.zIndex = contatoreTerminale;
}

//aggiorna la posizione del terminale in base alla posizione corrente del mouse.
function spostaDiv(event) {
    const terminale = event.target.closest(".terminale");
    if (isSpostamentoAttivo && terminale != null) {
        terminale.style.left = `${event.clientX - spostamentoOffsetX}px`;
        terminale.style.top = `${event.clientY - spostamentoOffsetY}px`;
    }
    /*else if(terminale != null){//se passo sopra un terminale anche senza cliccarlo
            contatoreTerminale++; // Incrementa il contatore dei terminali creati + il numero di volte che si clicca un terminale
            terminale.style.zIndex = contatoreTerminale;
        }*/

    // Impedisce la selezione di testo durante lo spostamento del terminale
    event.preventDefault();
}

function visTerminale(terminaleId) {
    //se è chiuso lo apre se è aperto lo chiude
    const terminale = document.getElementById(terminaleId);

    idIcona = terminaleId.replace(/[^0-9]?/g, "");
    const iconaTerminale = document.getElementById(idIcona);
    // Verifica se il terminale è attualmente visibile o nascosto
    if (terminale.style.display === "none") {
        // Se è nascosto, lo apre
        terminale.style.display = "block";

        if (iconaTerminale) {
            iconaTerminale.classList.add("iconaOpen");
        }
    } else {
        // Se è visibile, lo chiude
        terminale.style.display = "none";

        if (iconaTerminale) {
            iconaTerminale.classList.remove("iconaOpen");
        }
    }
}

function riduciTerminale(event) {
    const terminale = event.target.closest(".terminale");
    const terminaleId = terminale.id;

    visTerminale(terminaleId);
}

function chiudiTerminale(event) {
    const terminale = event.target.closest(".terminale");
    const terminaleId = terminale.id;

    terminale.remove();
    //eliminare anche l'icona del terminale associata 
    idIcona = terminaleId.replace(/[^0-9]?/g, "");
    //alert(idIcona); // lascia solo i numeri
    const iconaTerminale = document.getElementById(idIcona);
    if (iconaTerminale) {
        iconaTerminale.remove();
    }
}

//quando l'utente fa clic sull'icona di riduzione o ingrandimento del terminale. 
function modificaDimensioneTerminale(event, width, height) {
    const terminale = event.target.closest(".terminale");
    const corpo = event.target.closest(".terminale").querySelector(".corpo");

    if (terminale.classList.contains("fullscreen")) {
        minTerminale(terminale);
    } else {
        maxTerminale(terminale, corpo, width, height);
    }
}

//modifica la dimensione del corpo del terminale in base ai parametri width e height.
function maxTerminale(terminale, corpo, width, height) { //non usata
    //Se i parametri contengono il simbolo "%", la dimensione viene calcolata in base alla percentuale della dimensione della finestra del browser.
    if (width.includes("%")) { //cambiamo la dimensione del corpo del terminale 
        const windowWidth = window.innerWidth;
        const calculatedWidth = parseInt(width) / 100 * windowWidth;
        corpo.style.width = calculatedWidth - 18 + "px";
    } else {
        corpo.style.width = width;
    }
    if (height.includes("%")) {
        const windowHeight = window.innerHeight;
        const calculatedHeight = parseInt(height) / 100 * windowHeight;
        corpo.style.height = calculatedHeight - 72 + "px"; //meno barra e intestazione terminale
    } else {
        corpo.style.height = height;
    }

    //cambiamo la posizione del terminale 
    terminale.style.left = "49.33%";
    var topValue = "calc(50% + 7px)";
    terminale.style.top = topValue;
    terminale.style.transform = "translate(-50%, -50%)";

    // Aggiungi la classe fullscreen al terminale
    terminale.classList.add("fullscreen");
}

function minTerminale(terminale) {
    terminale.classList.remove("fullscreen");

    const corpo = terminale.querySelector(".corpo");

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const maxLeft = windowWidth - 18; // Considera la larghezza della barra di scorrimento verticale
    const maxTop = windowHeight - 72; // Considera l'altezza della barra del titolo del terminale

    const calculatedWidth = corpo.scrollWidth;
    const calculatedHeight = corpo.scrollHeight;

    // Verifica se le dimensioni calcolate superano le dimensioni della finestra
    if (calculatedWidth > maxLeft) {
        const fixedWidth = windowWidth - 250; // Calcola la larghezza fissa sottraendo 250 pixel dalla larghezza della finestra
        corpo.style.width = fixedWidth + "px"; // Imposta la larghezza fissa del corpo del terminale se supera la larghezza massima consentita
    } else {
        corpo.style.width = calculatedWidth + "px"; // Altrimenti, utilizza la larghezza calcolata
    }

    if (calculatedHeight > maxTop) {
        const fixedHeight = windowHeight - 300; // Calcola l'altezza fissa sottraendo 300 pixel dall'altezza della finestra
        corpo.style.height = fixedHeight + "px"; // Imposta l'altezza fissa del corpo del terminale se supera l'altezza massima consentita
    } else {
        corpo.style.height = calculatedHeight + "px"; // Altrimenti, utilizza l'altezza calcolata
    }

    posizioneRandom(terminale, corpo);
}

function posizioneRandom(terminale, corpo) {
    // Genera una posizione casuale all'interno dello schermo
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const maxLeft = windowWidth - corpo.offsetWidth - 440;
    const maxTop = windowHeight - corpo.offsetHeight - 220;

    const left = Math.floor(Math.random() * maxLeft) + 220;
    const top = Math.floor(Math.random() * maxTop) + 110;

    // Controlla se la posizione casuale supera i limiti della finestra
    if (left < 0) {
        left = 100; // Imposta la posizione sinistra al limite sinistro della finestra
    }

    if (top < 0) {
        top = 110; // Imposta la posizione superiore al limite superiore della finestra
    }

    // Posiziona il terminale nella posizione casuale
    terminale.style.left = left + "px";
    terminale.style.top = top + "px";
}

//aggiunge gli event listener per il movimento del mouse e il rilascio del pulsante del mouse. 
//se il mouse viene mosso, viene chiamata la funzione spostaDiv(event) per spostare il terminale. 
//se il pulsante del mouse viene rilasciato, viene impostata la variabile isSpostamentoAttivo su false per disattivare lo spostamento del terminale.
document.addEventListener("mousemove", spostaDiv);
document.addEventListener("mouseup", function() {
    isSpostamentoAttivo = false;
    const terminale = event.target.closest(".terminale");
});

//quando l'utente preme il tasto "Invio" dopo aver inserito un comando nel terminale. 
//ottiene il testo del comando, lo aggiunge all'output dei comandi e cancella l'input dei comandi per prepararlo per un nuovo comando.
function eseguiComando(idTerminale, idComandi) {
    const terminale = document.getElementById(idTerminale);
    const inputComandi = terminale.querySelector(".comandi");

    const comando = inputComandi.textContent.trim(); //per rimuovere gli spazi vuoti all'inizio e alla fine di una stringa
    const argomenti = comando.split(" "); //per suddividere una stringa in un array di sottostringhe

    if (argomenti.length >= 1) {
        const nomeComando = argomenti[0];

        switch (nomeComando) {
            case "echo":
                if (argomenti.length >= 2) {
                    let parametro = "";
                    for (let i = 1; i < argomenti.length; i++) {
                        parametro += argomenti[i] + " ";
                    }
                    terminalOutput(idTerminale, parametro);
                } else
                    terminalOutput(idTerminale, "");
                break;
            case "data":
                const data = new Date();
                const giorno = data.getDate();
                const mese = data.getMonth() + 1; // I mesi sono indicizzati da 0 a 11, quindi aggiungiamo 1 per ottenere il valore corretto del mese.
                const anno = data.getFullYear();
                const ora = data.getHours();
                const minuti = data.getMinutes();
                const secondi = data.getSeconds();
                const datetime = giorno + "/" + mese + "/" + anno + " " + ora + ":" + minuti + ":" + secondi;
                terminalOutput(idTerminale, datetime);
                break;
            case "random":
                const numeroCasuale = Math.floor(Math.random() * 100);
                terminalOutput(idTerminale, "Numero casuale: " + numeroCasuale);
                break;
            case "hello":
                terminalOutput(idTerminale, "hello");
                break;
            case "help":
                terminalOutput(idTerminale, "i comandi sono: echo, data, random,hello");
                break;
            case "":
                terminalOutput(idTerminale, "");
                break;
            default:
                terminalOutput(idTerminale, "Comando non riconosciuto");
                break;
        }
    } else {
        terminalOutput(idTerminale, "Comando non valido");
    }

    inputComandi.textContent = "";
}

function terminalOutput(idTerminale, messaggio) {
    const terminale = document.getElementById(idTerminale);
    const inputComandi = terminale.querySelector(".comandi");

    const outputComandi = document.createElement("div");
    outputComandi.classList.add("verde");
    outputComandi.textContent = "ale@ubuntu:~$ " + inputComandi.textContent.trim();

    const outputRisposta = document.createElement("div");
    outputRisposta.textContent = messaggio;

    const nuovoInput = document.createElement("div");
    //nuovoInput.classList.add("comandi");
    nuovoInput.classList.add("comandi", "my-input");
    nuovoInput.contentEditable = true;
    nuovoInput.align = "left";

    const corpo = terminale.querySelector(".corpo");
    //corpo.appendChild(outputContainer);
    const bufferComandi = terminale.querySelector(".comEs");
    bufferComandi.appendChild(outputComandi);
    bufferComandi.appendChild(outputRisposta);
    corpo.appendChild(nuovoInput);


    inputComandi.textContent = "";
    inputComandi.focus();
}

//premendo il tasto "Invio", viene chiamata la funzione eseguiComando(idTerminale) per eseguire il comando nel terminale attivo.
document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            const terminaleId = event.target.closest(".terminale").id;
            const id = terminaleId.replace(/[^0-9]?/g, "");
            const comandiId = "comandi" + id;
            eseguiComando(terminaleId, comandiId);
        }
    });
});