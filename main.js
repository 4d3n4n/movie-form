let posterUpload = document.getElementById('poster-upload');
let titreInput = document.getElementById('titre');
let realisateurInput = document.getElementById('realisateur');

let genreInput = document.getElementById('genre');
let addGenre = document.getElementById('add-genre');

let descriptionInput = document.getElementById('description');
let dureeInput = document.getElementById('duree');

let actorsInput = document.getElementById('actors');
let addActor = document.getElementById('add-actor');

let paysInput = document.getElementById('pays');
let dateInput = document.getElementById('date');

let creation = document.getElementById('creation');

let cardCollection = document.getElementById('card-collection');

let i = 0;

let posterUrl = null;

creation.disabled = true;




// upload poster settings
let customPosterUpload = document.getElementById('custom-file-upload');
let deleteUpload = document.getElementById('delete-upload');
let posterForm = document.getElementById('form-uploaded-poster');
function uploadMessage() {
    if (posterUpload.value === '') {
        customPosterUpload.innerHTML = 'Choosir le poster du film<i class="fa fa-upload" id="upload-icon" aria-hidden="true"></i>';
        deleteUpload.style.display = 'none';
        posterForm.style.display = 'none';
        posterUrl = null;
    } else {
        customPosterUpload.innerHTML = 'Poster chargé';
        deleteUpload.style.display = 'inline';
        let posterFormUrl = posterUpload.value.replace("C:\\fakepath\\", "/images/");
        posterForm.src = posterFormUrl;
        posterForm.style.display = 'block';
        posterUrl = posterUpload.value.replace("C:\\fakepath\\", "/images/");
        updatePosterUrl();
    }
    emptyControl();
}
posterUpload.addEventListener('change', uploadMessage);
deleteUpload.addEventListener('click', () => {
    posterUpload.value = '';
    customPosterUpload.innerHTML = 'Choosir le poster du film<i class="fa fa-upload" id="upload-icon" aria-hidden="true"></i>';
    deleteUpload.style.display = 'none';
    posterForm.style.display = 'none';
    posterUrl = null;
    emptyControl();
});






// creation boulles : genre
addGenre.addEventListener('click', addGenreBoulle);
const genreBoulleContainer = document.getElementById('genre-boulle-form-container')
let x = 0;
let genres = []; // Assurez-vous de déclarer le tableau genres en dehors de votre fonction

function addGenreBoulle() {
    const genreValue = genreInput.value;
    
    if (genreValue !== '' && !valueExists(genreValue, genres)) {
        let genreBoulle = document.createElement('p');
        genreBoulle.className = 'genre-film boulle-form';
        genreBoulle.id = 'genre-film' + x;
        genreBoulle.innerText = genreValue;
        genreBoulleContainer.appendChild(genreBoulle);

        let close = document.createElement('i');
        close.className = 'fa fa-times-circle-o';
        close.id = 'close' + x;
        close.ariaHidden = 'true';
        genreBoulle.appendChild(close);

        x++;
        genreInput.value = '';
        addGenre.disabled = true;

        close.addEventListener('click', () => {
            genreBoulleContainer.removeChild(genreBoulle);
            x--;
            genres.splice(genres.indexOf(genreValue), 1);
            adjustIndicesGenre();
            emptyControl();
        });

        genres.push(genreValue);
        emptyControl();
    }
}

function adjustIndicesGenre() {
    const genreBoulles = document.querySelectorAll('.genre-film');
    for (let i = 0; i < genreBoulles.length; i++) {
        genreBoulles[i].id = 'genre-film' + i;
    }
}

genreInput.addEventListener('keyup', emplyInputGenre);
addGenre.disabled = true;
function emplyInputGenre() {
    if (genreInput.value === '') {
        addGenre.disabled = true;
    } else {
        addGenre.disabled = false;
    }
}


// creation boulles : actors
addActor.addEventListener('click', addActorsBoulle);
const actorsBoulleContainer = document.getElementById('actors-boulle-form-container');
let j = 0;
let actors = []; // Assurez-vous de déclarer le tableau actors en dehors de votre fonction

function addActorsBoulle() {
    const actorValue = actorsInput.value;

    if (actorValue !== '' && !valueExists(actorValue, actors)) {
        let actorsBoulle = document.createElement('p');
        actorsBoulle.className = 'actors-film boulle-form';
        actorsBoulle.id = 'actors-film' + j;
        actorsBoulle.innerText = actorValue;
        actorsBoulleContainer.appendChild(actorsBoulle);

        let close = document.createElement('i');
        close.className = 'fa fa-times-circle-o';
        close.id = 'close' + j;
        close.ariaHidden = 'true';
        actorsBoulle.appendChild(close);

        j++;
        actorsInput.value = '';
        addActor.disabled = true;

        close.addEventListener('click', () => {
            actorsBoulleContainer.removeChild(actorsBoulle);
            j--;
            actors.splice(actors.indexOf(actorValue), 1);
            adjustIndicesActors();
            emptyControl();
        });

        actors.push(actorValue); // Ajoutez le nouvel acteur au tableau
        emptyControl();
    }
}

function adjustIndicesActors() {
    const actorsBoulles = document.querySelectorAll('.actors-film');
    for (let i = 0; i < actorsBoulles.length; i++) {
        actorsBoulles[i].id = 'actors-film' + i;
    }
}


actorsInput.addEventListener('keyup', emplyInputActors);
addActor.disabled = true;
function emplyInputActors() {
    if (actorsInput.value === '') {
        addActor.disabled = true;
    } else {
        addActor.disabled = false;
    }
}

// Function qui verifie si la valeur existe dans le tableau
// Utilisé dans la fonction addGenreBoulle et addActorsBoulle
function valueExists(value, array) {
    return array.includes(value);
}




// VALIDATE OBJECT CREATION
function valider() {
    if (localStorage.getItem("id") === null || localStorage.getItem("id") === "") {
        localStorage.setItem("id", 0);
    }


    let id = localStorage.getItem("id");

    // Stockage des genres
    let genres = [];
    for (let a = 0; a < x; a++) {
        let genre = document.getElementById('genre-film' + a).textContent;
        genres.push(genre);
    }

    // Stockage des acteurs
    let actors = [];
    for (let b = 0; b < j; b++) {
        let actor = document.getElementById('actors-film' + b).textContent;
        actors.push(actor);
    }

    let filmData = {
        poster: posterUrl,
        titre: titreInput.value,
        realisateur: realisateurInput.value,
        description: descriptionInput.value,
        duree: dureeInput.value,
        pays: paysInput.value,
        date: dateInput.value,
        x: x,
        j: j,
    };
    
    id++;
    localStorage.setItem("genres" + id, JSON.stringify(genres));
    localStorage.setItem("actors" + id, JSON.stringify(actors));
    localStorage.setItem("film " + id, JSON.stringify(filmData));

    localStorage.setItem("id", id);

    window.location.href = "filmList.html";
}









// EDIT FIELDS
function editFields(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
        const filmData = JSON.parse(localStorage.getItem("film " + id));
        let genres = JSON.parse(localStorage.getItem("genres" + id));
        let actors = JSON.parse(localStorage.getItem("actors" + id));



        if (filmData) {
            customPosterUpload.innerHTML = 'Poster chargé';
            deleteUpload.style.display = 'inline';
            posterForm.src = filmData.poster;
            posterForm.style.display = 'block';


            if (filmData.poster) {
                posterUrl = filmData.poster;
                posterForm.src = posterUrl;
                posterForm.style.display = 'block';
            } else {
                posterForm.style.display = 'none';
            }


            titre.value = filmData.titre;
            realisateur.value = filmData.realisateur;
            description.value = filmData.description;
            duree.value = filmData.duree;
            pays.value = filmData.pays;
            date.value = filmData.date;
            x = genres.length;
            j = actors.length;
            posterUrl = filmData.poster;

            creation.disabled = false;

            creation.className = "modifier";
            creation.innerText = "Modifier";


            // Récupérer et afficher les genres
            let genreBoulleContainer = document.getElementById('genre-boulle-form-container');
            genreBoulleContainer.innerHTML = '';

            if (genres) {
                for (let k = 0; k < genres.length; k++) {
                    let genreBoulleMod = document.createElement('p');
                    genreBoulleMod.className = 'genre-film boulle-form';
                    genreBoulleMod.id = 'genre-film' + k;
                    genreBoulleMod.innerText = genres[k];
                    genreBoulleContainer.appendChild(genreBoulleMod);

                    let close = document.createElement('i');
                    close.className = 'fa fa-times-circle-o';
                    close.id = 'close' + k;
                    close.ariaHidden = 'true';
                    genreBoulleMod.appendChild(close);

                    close.addEventListener('click', () => {
                        genreBoulleContainer.removeChild(genreBoulleMod);
                        x--;
                        genres.splice(genres.indexOf(genreBoulleMod.innerText), 1);
                        adjustIndicesGenre();
                        emptyControl();
                    });
                }
            }

            // Récupérer et afficher les acteurs
            let actorsBoulleContainer = document.getElementById('actors-boulle-form-container');
            actorsBoulleContainer.innerHTML = '';
            if (actors) {
                for (let a = 0; a < actors.length; a++) {
                    let actorsBoulleMod = document.createElement('p');
                    actorsBoulleMod.className = 'actors-film boulle-form';
                    actorsBoulleMod.id = 'actors-film' + a;
                    actorsBoulleMod.innerText = actors[a];
                    actorsBoulleContainer.appendChild(actorsBoulleMod);

                    let close = document.createElement('i');
                    close.className = 'fa fa-times-circle-o';
                    close.id = 'close' + a;
                    close.ariaHidden = 'true';
                    actorsBoulleMod.appendChild(close);

                    close.addEventListener('click', () => {
                        actorsBoulleContainer.removeChild(actorsBoulleMod);
                        j--;
                        actors.splice(actors.indexOf(actorsBoulleMod.innerText), 1);
                        adjustIndicesActors();
                        emptyControl();
                    });
                }
            }

        }
    }
}

editFields();






// VALIDATE OBJECT CREATION
function valideEdit() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const saveFilmData = JSON.parse(localStorage.getItem("film " + id));
    const saveGenres = JSON.parse(localStorage.getItem("genres" + id));
    const saveActors = JSON.parse(localStorage.getItem("actors" + id));

    // Réinitialiser les tableaux pour éviter d'ajouter des doublons
    saveGenres.length = 0;
    for (let a = 0; a < x; a++) {
        let genre = document.getElementById('genre-film' + a).textContent;
        saveGenres.push(genre);
        // localStorage.setItem("genre" + a, genre);
    }

    saveActors.length = 0;
    for (let b = 0; b < j; b++) {
        let actor = document.getElementById('actors-film' + b).textContent;
        saveActors.push(actor);
        // localStorage.setItem("actor" + b, actor);
    }


    if (posterUrl === null || posterUrl === "" || posterUrl === saveFilmData.poster) {
        posterUrl = saveFilmData.poster;
    } else {
        posterUrl = posterUpload.value.replace("C:\\fakepath\\", "/images/");
    }

    // Mettre à jour les données du film
    saveFilmData.poster = posterUrl;
    saveFilmData.titre = titreInput.value;
    saveFilmData.realisateur = realisateurInput.value;
    saveFilmData.description = descriptionInput.value;
    saveFilmData.duree = dureeInput.value;
    saveFilmData.pays = paysInput.value;
    saveFilmData.date = dateInput.value;
    saveFilmData.x = x;
    saveFilmData.j = j;

    localStorage.setItem("genres" + id, JSON.stringify(saveGenres));
    localStorage.setItem("actors" + id, JSON.stringify(saveActors));
    localStorage.setItem("film " + id, JSON.stringify(saveFilmData));

    window.location.href = "filmList.html";
}









// VALIDER BUTTON
creation.addEventListener("click", () => {
    if (creation.className === "creation") {
        valider();
    } else if (creation.className === "modifier") {
        valideEdit();
        emptyControl();
    }
});


// controle de saisie
function emptyControl() {
    if (x > 0 && j > 0 && (posterUpload.value !== '' || posterUrl !== null) && titreInput.value !== '' && realisateurInput.value !== '' && descriptionInput.value !== '' && dureeInput.value !== '' && paysInput.value !== '' && dateInput.value !== '') {
        creation.disabled = false;
    } else {
        creation.disabled = true;
    }
}

function updatePosterUrl() {
    if (posterUpload.value === '') {
        posterUrl = null;
    } else {
        posterUrl = posterUpload.value.replace("C:\\fakepath\\", "/images/");
    }
}

posterUpload.addEventListener('change', () => {
    uploadMessage();
    updatePosterUrl();
});

// Appel de la fonction après la modification des champs
titreInput.addEventListener('keyup', emptyControl);
realisateurInput.addEventListener('keyup', emptyControl);
descriptionInput.addEventListener('keyup', emptyControl);
dureeInput.addEventListener('keyup', emptyControl);
paysInput.addEventListener('keyup', emptyControl);
dateInput.addEventListener('keyup', emptyControl);

editFields();


let filmList = document.getElementById('film-list');

filmList.addEventListener('click', displayFilmList)

function displayFilmList() {
    window.location.href = "filmList.html";
}

// if (x === 0 ) {
//     filmList.innerText = 'voir la liste des films'
//     filmList.disabled = false;
// } else {
//     filmList.innerText = 'La liste de film est vide'
//     filmList.disabled = true;
// }