// RESET creation
if (window.location.href.includes("https://movie-form-list.netlify.app/filmlist")) {
    let reset = document.getElementById("reset");
    let ajout = document.getElementById("ajout");

    reset.addEventListener("click", () => {
        let cardCollection = document.getElementById('card-collection');
        let filmCard = document.getElementById('film-card');
        let filmCard1 = document.getElementById('film-card1');
        localStorage.clear();
        cardCollection.removeChild(filmCard);
        cardCollection.removeChild(filmCard1);
        // window.location.href = "index.html";
    });

    ajout.addEventListener("click", () => {
        window.location.href = "https://movie-form-list.netlify.app/";
    });
}




// INIT
function init() {
    let cardCollection = document.getElementById('card-collection');
    let id = JSON.parse(localStorage.getItem("id"));

    for (let w = 0; w <= id; w++) {
        let filmData = JSON.parse(localStorage.getItem("film " + w));
        if (filmData) {
            // Film Card
            let filmCard = document.createElement("div");
            filmCard.className = 'film-card';
            cardCollection.appendChild(filmCard);


            // Scroll Icon
            let scrollIcon = document.createElement("i");
            scrollIcon.className = 'fa fa-arrows-v scroll';
            scrollIcon.ariaHidden = 'true';
            filmCard.appendChild(scrollIcon);


            //Poster Conainter
            let posterContainer = document.createElement("div");
            posterContainer.className = 'poster-container';
            filmCard.appendChild(posterContainer);

                let poster = document.createElement("img");
                poster.className = 'poster';
                poster.alt = filmData.titre + ' movie-poster';
                poster.src = filmData.poster;
                posterContainer.appendChild(poster);

                //Edit Icon creation
                let deleteIcon = document.createElement('i');
                deleteIcon.className = 'fa fa-times delete';
                deleteIcon.id = w;
                deleteIcon.ariaHidden = 'true';
                posterContainer.appendChild(deleteIcon);

                //Edit Icon creation
                let edit = document.createElement('i');
                edit.className = 'fa fa-pencil edit';
                edit.id = w;
                edit.ariaHidden = 'true';
                posterContainer.appendChild(edit);


            // Info Container
            let infoContainer = document.createElement("div");
            infoContainer.className = 'info-container';
            filmCard.appendChild(infoContainer);


            // info film
            let infoFilm = document.createElement("div");
            infoFilm.className = 'film-info';
            infoContainer.appendChild(infoFilm);


            // titre
            let titreLabel = document.createElement("p");
            titreLabel.className = 'card-label1';
            titreLabel.innerText = 'Titre';
            infoFilm.appendChild(titreLabel);

                let titre = document.createElement("h2");
                titre.className = 'titre-film';
                titre.innerText = filmData.titre;
                infoFilm.appendChild(titre);



            // realisateur
            let realisateurLabel = document.createElement("p");
            realisateurLabel.className = 'card-label';
            realisateurLabel.innerText = 'realisateur-film';
            infoFilm.appendChild(realisateurLabel);

                let realisateur = document.createElement("p");
                realisateur.className = 'realisateur';
                realisateur.innerText = filmData.realisateur;
                infoFilm.appendChild(realisateur);


            // genre
            let genreLabel = document.createElement("p");
            genreLabel.className = 'card-label no-margin';
            genreLabel.innerText = 'Genre';
            infoFilm.appendChild(genreLabel);

                let genreContainer = document.createElement("div");
                genreContainer.className = 'boulle-container';
                infoFilm.appendChild(genreContainer);

                let genres = JSON.parse(localStorage.getItem("genres" + w));
                for (let k = 0; k < genres.length; k++) {
                    let genreNew = document.createElement("p");
                    genreNew.className = 'genre-film boulle';
                    genreNew.id = 'genre' + k;
                    genreNew.innerText = genres[k];
                    genreContainer.appendChild(genreNew);
                }



            // actors
            let actorsLabel = document.createElement("p");
            actorsLabel.className = 'card-label no-margin';
            actorsLabel.innerText = 'Acteurs';
            infoFilm.appendChild(actorsLabel);

                let actorsContainer = document.createElement("div");
                actorsContainer.className = 'boulle-container';
                infoFilm.appendChild(actorsContainer);

                let actors = JSON.parse(localStorage.getItem("actors" + w));
                for ( let a = 0; a < actors.length; a++) {
                    let actorsNew = document.createElement("p");
                    actorsNew.className = 'actors-film boulle';
                    actorsNew.id = 'actors' + a;
                    actorsNew.innerText = actors[a];
                    actorsContainer.appendChild(actorsNew);
                }


            // description
            let descriptionLabel = document.createElement("p");
            descriptionLabel.className = 'card-label';
            descriptionLabel.innerText = 'Description';
            infoFilm.appendChild(descriptionLabel);

                let description = document.createElement("p");
                description.className = 'description-film';
                description.innerText = filmData.description;
                infoFilm.appendChild(description);

            
            // duree
            let dureeLabel = document.createElement("p");
            dureeLabel.className = 'card-label';
            dureeLabel.innerText = 'Durée';
            infoFilm.appendChild(dureeLabel);

                let duree = document.createElement("p");
                duree.className = 'duree-film';
                duree.innerText = filmData.duree;
                infoFilm.appendChild(duree);


            // pays
            let paysLabel = document.createElement("p");
            paysLabel.className = 'card-label';
            paysLabel.innerText = 'Pays';
            infoFilm.appendChild(paysLabel);

                let pays = document.createElement("p");
                pays.className = 'pays-film';
                pays.innerText = filmData.pays;
                infoFilm.appendChild(pays);

            // date de sortie
            let dateLabel = document.createElement("p");
            dateLabel.className = 'card-label';
            dateLabel.innerText = 'Date de sortie';
            infoFilm.appendChild(dateLabel);

                let date = document.createElement("p");
                date.className = 'date-film';
                date.innerText = filmData.date;
                infoFilm.appendChild(date);

            editFilm(edit);

            deleteFilm(deleteIcon);
        }
    }
}


// EDIT creation
// => EDIT FILM
function editFilm(edit) {
    edit.addEventListener('click', () => {
        window.location.href  = 'https://movie-form-list.netlify.app?id=' + edit.id;
    });
}

// DELETE creation
// => DELETE FILM
function deleteFilm(deleteIcon) {
    deleteIcon.addEventListener('click', () => {
        let id = deleteIcon.id;
        localStorage.removeItem("film " + id);
        localStorage.removeItem("genres" + id);
        localStorage.removeItem("actors" + id);
        window.location.href = "https://movie-form-list.netlify.app/filmlist";
    });
}