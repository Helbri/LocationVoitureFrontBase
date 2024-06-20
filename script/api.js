function rechercher(event) {
  // on empêche l'envoi du formulaire pour éviter
  //le rechargement de la page.
  event.preventDefault();
  let form = event.currentTarget; //permet de récupérer le
  //formulaire complet qui déclenche l'évènement

  // on récupère les données de l'api.
  fetch(
    form.action, //permet d'appeler l'api. "form.action"
    //contient l'adresse.
    {
      headers: {
        Accept: "application/ld+json", //permet de filtrer
        //le type code qui a le droit d'être renvoyé
      },
    }
  )
    .then((response) => {
      return response.json(); //permet de récupérer la réponse de l'api
    })
    .then((data) => {
      // console.debug(data["hydra:member"]);
      document.querySelector("#listeVoiture").innerHTML = "";
      //cherche tous le contenu lié à la classe listeVoiture,
      //et l'efface ensuite
      data["hydra:member"].forEach((element) => {
        //console.log("Element:", element); // Ajout de cette ligne pour
        // afficher tout l'objet element console.log("Couleur:", element.couleur);
        // Ajout de cette ligne
        document.querySelector(
          "#listeVoiture"
        ).innerHTML += `<div class="col-lg-3 col-sm-6 col-12 mt-5"> <!-- à suivre: 
      élément de html contenant la partie html agrémentée 
      de variables cherchant les valeurs des différents objets js -->
      <img
                class="img-fluid"
                src="http://127.0.0.1:8000/assets/images/marque/modele/${
                  element.modele.image
                }"
                alt=""
              />
              <h2>${element.modele.tarif}€/jour</h2>
            </div>
            <div class="col-lg-3 col-sm-6 col-12 mt-5">
              <div class="row">
                <div class="col-6">Marque</div>
                <div class="col-6">${element.modele.marque.nom}</div>
                <div class="col-6">Modèle</div>
                <div class="col-6">${element.modele.nom}</div>
                <div class="col-6">Classe</div>
                <div class="col-6">${element.modele.type.nom}</div>
                <div class="col-6">Portes</div>
                <div class="col-6">${element.modele.nbrPorte}</div>
                <div class="col-6"> Places</div>
                <div class="col-6">${element.modele.nombrePlaces}</div>
                <div class="col-6">Motorisation</div>
                <div class="col-6">${element.modele.motorisation.nom}</div>
                <div class="col-6">Boîte</div>
                <div class="col-6">${
                  element.modele.boiteAuto ? "Auto" : "Manuelle"
                }</div>
                <div class="col-6">15 Consommation</div>
                <div class="col-6">16 5 L / 100 km</div>
                <div class="col-6">4 roues motrices</div>
                <div class="col-6">${
                  element.modele.quatreRouesMotrices ? "oui" : "non"
                }</div>
                <div class="col-6">Capacité coffre</div>
                <div class="col-6">${element.modele.capaciteCoffre}</div>
                <div class="col-6">Autonomie</div>
                <div class="col-6">${element.modele.autonomie}</div>
            </div>`;
      });
    });
}

document
  .querySelector("#recherche")
  .addEventListener("submit", rechercher, true);
