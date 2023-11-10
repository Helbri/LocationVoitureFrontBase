function rechercher(event) {
  // on empeche l'envoi du formulaire pour éviter le rechargement de la page.
  event.preventDefault();
  let form = event.currentTarget;

  // on récupère les données de l'api.
  fetch(form.action, {
    accept: "application/ld+json",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.debug(data["hydra:member"]);
      // Ajout de ces deux lignes pour déboguer
      console.log("Data:", data);
      console.log("Keys:", Object.keys(data["hydra:member"][0]));
      //fin de l'ajout des deux lignes
      document.querySelector("#listeVoiture").innerHTML = "";
      data["hydra:member"].forEach((element) => {
        console.log("Element:", element); // Ajout de cette ligne pour afficher tout l'objet element
        console.log("Couleur:", element.couleur); // Ajout de cette ligne
        document.querySelector(
          "#listeVoiture"
        ).innerHTML += `<div class="col-lg-3 col-sm-6 col-12 mt-5">
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
