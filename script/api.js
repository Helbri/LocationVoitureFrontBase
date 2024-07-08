// VARIABLES

const form = document.querySelector("form");
// permet de récupérer le formulaire complet qui déclenche l'évènement
// la constante form prend pour valeur la première balise form trouvée

const selectModele = document.querySelector("#modele"); // selectModele prend la sélection de la balise ayant l'id modele
let listeModeles = ""; // listeModeles prend temporairement une valeur vide

const selectMarque = document.querySelector("#marque"); // selectMarque prend la sélection de la balise ayant l'id marque
let listeMarques = ""; // listeMarques prend temporairement une valeur vide

// FONCTION

function rechercher(event) {
  // création de la fonction rechercher. Se déclenche si l'événement à écouter décrit en fin de feuille se déclenche

  event.preventDefault();
  // empêche l'action normale de l'événement (rechargement de la page lié à l'événement submit du formulaire)

  // on récupère les données de l'api.
  fetch(
    // méthode globale, récupère une ressource et prend deux arguments.
    // commence le processus de recherche d'une ressource du réseau, en renvoyant une "promise" (promesse) qui est remplie une fois la "response" disponible

    // contient ici plusieurs arguments
    // premier argument de fetch
    `${form.action}?modele=${form["modele"].value}&marque=${form["marque"].value}`, //permet d'appeler l'api. "form.action"
    //contient l'adresse renseignée pour l'attribut action. Après le ? se trouvent les paramètres passés. 1 pour chaque menu déroulant séparés par un &
    //les paramètres (modèle, marque), = valeur des paramètres.

    // second argument de fetch
    {
      headers: {
        // headers: en-tête, prend des paramètres d'en-tête à rajouter aux requêtes HTTP
        Accept: "application/ld+json",
        // fait référence au type de média qu'est l'application
        // permet de filtrer le type code qui a le droit d'être renvoyé (ici ld+json)
        // LD+JSON signifie JavaScript Object Notation for Linked Data, méthode permettant d'encoder des données structurées
        // ces informations sont disponibles sur la page de notre base de donnée, côté api
      },
    }
  )
    .then((response) => {
      return response.json(); //permet de récupérer la réponse de l'api en json
    })
    .then((data) => {
      //console.debug(data["hydra:member"]);  ------------- enlever /!\ /!\ /!\ /!\ /!\ /!\ /!\ enlever ------------
      document.querySelector("#listeVoiture").innerHTML = "";
      //modifie le contenu de l'élément défini par l'id listeVoiture et l'efface
      data["hydra:member"].forEach((element) => {
        //console.log("Element:", element); // Ajout de cette ligne pour
        //afficher tout l'objet element console.log("Couleur:", element.couleur);
        document.querySelector(
          "#listeVoiture"
        ).innerHTML += `<!-- DEBUT VOITURE -->
            <article class="col-lg-6 col-12 premVoiture bordureBrown">
              <div class="row">
                <!-- partie gauche carte -->
                <div class="col-lg-6 col-sm-6 col-12 mt-5 bordureBlue">
                  <!-- éléments bootstrap col->column lg->large sm->small mt->margin bottom, les chiffres pour lg et sm indiquent le nombre de colonnes de la grilles prisent dans le contenant sur un total de 12. Le chiffre associé à mt l'épaisseur du margin sur la partie supérieure de la boîte -->
                  <img
                    class="img-fluid"
                    src="http://127.0.0.1:8000/assets/images/marque/modele/${element.modele.image}"
                    alt="dessin représentant une 2 chevaux de couleur rouge bordeaux et noir"
                  /><!-- img est une balise d'image, img-fluid est l'élément bootstrap qui gère le responsive automatique d'une image en fonction de la taille du conteneur -->
                  <!-- l'attribut src contient le chemin de l'image pour l'afficher -->
                  <!-- l'attribut alt contient une description textuelle de l'image-->
                  <h2>${element.modele.tarif}€/jour</h2>
                  <!-- titre de valeur d'importance 2 -->
                </div>
                <!-- fin partie gauche carte -->

                <!-- partie droite carte -->
                <div class="col-lg-6 col-sm-6 col-12 mt-5 bordureMagenta">
                  <div class="row">
                    <!-- row: élément bootstrap pour indiquer et obliger le contenu à l'intérieur de la div à être en ligne -->
                    <!-- au-dessous, en alternance les attributs de la voiture et en face le renseignement correspondant -->
                    <div class="col-6 bordureBlack">Marque</div>
                    <div class="col-6 bordureBlack">${element.modele.marque.nom}</div>
                    <div class="col-6 bordureBlack">Modèle</div>
                    <div class="col-6 bordureBlack">${element.modele.nom}</div>
                    <div class="col-6 bordureBlack">Classe</div>
                    <div class="col-6 bordureBlack">${element.modele.type.nom}</div>
                    <div class="col-6 bordureBlack">Portes</div>
                    <div class="col-6 bordureBlack">${element.modele.nbrPorte}</div>
                    <div class="col-6 bordureBlack">Places</div>
                    <div class="col-6 bordureBlack">${element.modele.nombrePlaces}</div>
                    <div class="col-6 bordureBlack">Carburant</div>
                    <div class="col-6 bordureBlack">${element.modele.motorisation.nom}</div>
                    <div class="col-6 bordureBlack">Boîte</div>
                    <div class="col-6 bordureBlack">${element.modele.boiteAuto}</div>
                    <div class="col-6 bordureBlack">Autonomie</div>
                    <div class="col-6 bordureBlack">${element.modele.autonomie} km</div>
                  </div>
                </div>
                <!-- fin partie droite carte -->
              </div>
            </article>
            <!-- FIN VOITURE -->`;
      });
    });
}

fetch("https://127.0.0.1:8000/api/modeles") //permet d'appeler l'api. plus précisément la table contenant tous les modèles
  // .then((response) => response.json())
  .then(function (response) {
    return response.json();
  }) //la méthode de promesse .then()
  .then((data) => {
    data["hydra:member"].forEach((modele) => {
      const id = modele["@id"].replace("/api/modeles/", "");
      const name = modele.nom;

      listeModeles += `<option value="${id}">${name}</option>`;
    });

    selectModele.innerHTML += listeModeles;
  });

/*.then(function (data) {
    return data["hydra:member"].forEach(function(modele) {
      const id = modele["@id"].replace("/api/modeles/", "");
      const name = modele.nom; // cette ligne doit être ici

      listeModeles += `<option value="${id}">${name}</option>`;
    });
    selectModele.innerHTML += listeModeles;
  });*/

fetch("https://127.0.0.1:8000/api/marques") //permet d'appeler l'api. plus précisément la table contenant tous les marques
  .then((response) => response.json())
  .then((data) => {
    data["hydra:member"].forEach((marques) => {
      const id = marques["@id"].replace("/api/marques/", "");
      const name = marques.nom;

      listeMarques += `<option value="${id}">${name}</option>`;
    });

    selectMarque.innerHTML += listeMarques;
  });

// ********************************************************************************************************

document
  .querySelector("#recherche")
  .addEventListener("submit", rechercher, true);
