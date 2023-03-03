<template>
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h2 class="text-center mb-4">Acheter un ticket</h2>
          <form @submit.prevent="handleSubmit" class="p-4 border rounded">
            <div class="mb-3">
              <label for="tic_nom" class="form-label">Nom:</label>
              <input type="text" v-model="tic_nom" required class="form-control" id="tic_nom" />
            </div>
            <div class="mb-3">
              <label for="tic_prenom" class="form-label">Prénom:</label>
              <input type="text" v-model="tic_prenom" required class="form-control" id="tic_prenom" />
            </div>
            <div class="mb-3">
              <label for="tic_prix" class="form-label">Prix de l'unité :</label>
              <input type="text" readonly value="43 Euro" required class="form-control" id="tic_prix" />
            </div>
            <div class="mb-3">
              <label for="tic_nb_personne" class="form-label">Nombre de tickets :</label>
              <input type="number" min="1" max="10" step="1" v-model="tic_nb_personne" required class="form-control" id="tic_nb_personne" />
            </div>
            <button type="submit" class="btn btn-primary">Acheter</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // Importez Axios pour effectuer la requête POST
  import axios from "axios";
  
  export default {
    data() {
      return {
        tic_nom: "",
        tic_prenom: "",
        tic_nb_personne: null,
        id_soiree: this.$route.params.idSoiree,
      };
    },
    methods: {
      handleSubmit() {
        // Créez un objet pour stocker les données du ticket
        const ticket = {
          tic_nom: this.tic_nom,
          tic_prenom: this.tic_prenom,
          tic_nb_personne: this.tic_nb_personne,
          // Ajoutez la propriété soi_id si nécessaire
          soi_id: this.id_soiree,
        };
  
        // Utilisez Axios pour envoyer une requête POST à l'API
        axios
          .post("http://localhost:8080/api/tickets", ticket)
          .then((response) => {
            // Affichez la réponse dans la console pour déboguer
            console.log(response.data);
            alert("Le ticket a été ajouté avec succès !");
          })
          .catch((error) => {
            // Affichez l'erreur dans la console pour déboguer
            console.log(error);
            alert("Erreur lors de l'ajout du ticket.");
          });
      },
    },
  };
  </script>
  