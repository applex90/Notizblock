//Globale Variablen (Arrays)
let titles = [];
let notes = [];
//Local Storage laden
load();


function render() {
    let content = document.getElementById('content');
    content.innerHTML = `
    <div class="header">
        <img class="logo" src="img/note-img.png">
        <h1>Notizblock</h1>
    </div>`;
    content.innerHTML += `
    <span id="alert" class="red-alert"></span>
    <div class="addArea" id="inputarea">
        <input class="notetitle-input" placeholder="Titel" id="notetitle" type="text" maxlength="50" autofocus>
        <textarea class="note-input" placeholder="Notiz schreiben..." id="note"></textarea>
    </div>
    <div class="position-right">
    <button class="button" onclick="addNote()"><img src="img/plus.png" class="plus-img">Hinzufügen</button>
    </div>
    <div id="no-notes" class="d-none empty-notes">
             <span>Hier werden hinzugefügte Notizen angezeigt</span>
    </div>
    <div id="card-list" class="card-bg"></div>
    `;

    let cardList = document.getElementById("card-list");
    for (let i = 0; i < titles.length; i++) {
        const notetitle = titles[i];
        const note = notes[i];

        cardList.innerHTML += `
            <div class="card">   
                <div class="cardTitle"><b>${notetitle}</b>
                </div>
                <div class="cardNote">
                ${note} <br>
                <img class="delete-img" src="img/delete.png" onclick="deleteNote(${i})">
                </div>
            </div>
            `;
    }

    if (titles.length < 1) {
        let notext = document.getElementById('no-notes');
        notext.classList.remove('d-none');
    }
}


function addNote() {
    let notetitle = document.getElementById('notetitle');
    let note = document.getElementById('note');

    if (notetitle.value && note.value) {
        titles.push(notetitle.value);
        notes.push(note.value);

        render();
        save();
    } else {
        let alerttext = document.getElementById('alert');
        let alertarea = document.getElementById('inputarea');
        alerttext.innerHTML = "Bitte Titel und Notiz eingeben.";
        alertarea.classList.add('border-red');
    }
}


function deleteNote(i) {
    titles.splice(i, 1);
    notes.splice(i, 1);
    render();
    save();
}


function save() {
    // Notiztitel speichern
    let titlesAsText = JSON.stringify(titles);
    localStorage.setItem('titles', titlesAsText);

    //Notiz speichern
    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('notes', notesAsText);
}


function load() {
    // Notiztitel laden
    let titlesAsText = localStorage.getItem('titles');
    //Notiz laden
    let notesAsText = localStorage.getItem('notes');

    //Daten in Array umwandeln
    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }
}

