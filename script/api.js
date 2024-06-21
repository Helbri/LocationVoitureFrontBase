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
                  <h2>${element.modele.tarif}/jour</h2>
                  <!-- titre de valeur d'importance 2 -->
                </div>
                <!-- fin partie gauche carte -->

                <!-- partie droite carte -->
                <div class="col-lg-6 col-sm-6 col-12 mt-5 bordureMagenta">
                  <div class="row">
                    <!-- row: élément bootstrap pour indiquer et obliger le contenu à l'intérieur de la div à être en ligne -->
                    <!-- au-dessous, en alternance les attributs de la voiture et en face le renseignement correspondant -->
                    <div class="col-6 bordureBlack">1 Marque</div>
                    <div class="col-6 bordureBlack">${element.modele.marque.nom}</div>
                    <div class="col-6 bordureBlack">3 Modèle</div>
                    <div class="col-6 bordureBlack">${element.modele.nom}</div>
                    <div class="col-6 bordureBlack">5 Classe</div>
                    <div class="col-6 bordureBlack">${element.modele.type.nom}</div>
                    <div class="col-6 bordureBlack">7 Portes</div>
                    <div class="col-6 bordureBlack">${element.modele.nbrPorte}</div>
                    <div class="col-6 bordureBlack">9 Places</div>
                    <div class="col-6 bordureBlack">${element.modele.nombrePlaces}</div>
                    <div class="col-6 bordureBlack">11 Carburant</div>
                    <div class="col-6 bordureBlack">12 SP 98 ou SP 95</div>
                    <div class="col-6 bordureBlack">13 Boîte</div>
                    <div class="col-6 bordureBlack">14 Boîte Manuelle</div>
                    <div class="col-6 bordureBlack">15 Consommation</div>
                    <div class="col-6 bordureBlack">16 5 L / 100 km</div>
                  </div>
                </div>
                <!-- fin partie droite carte -->
              </div>
            </article>
            <!-- FIN VOITURE -->`;
      });
    });
}

document
  .querySelector("#recherche")
  .addEventListener("submit", rechercher, true);
