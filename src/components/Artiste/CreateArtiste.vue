<template>
  <!-- container for the form -->
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <!-- title for the form -->
        <h2 class="text-center mb-4">Ajouter un nouveau Artiste</h2>
        <!-- form section -->
        <form @submit.prevent="handleSubmit" class="p-4 border rounded">
          <!-- input for artist name -->
          <div class="mb-3">
            <label for="nom" class="form-label">Nom:</label>
            <input type="text" v-model="nom" required class="form-control" id="nom" />
          </div>
          <!-- input for artist last name -->
          <div class="mb-3">
            <label for="prenom" class="form-label">Prénom:</label>
            <input type="text" v-model="prenom" required class="form-control" id="prenom" />
          </div>
          <!-- input for artist email -->
          <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" v-model="email" required class="form-control" id="email" />
          </div>
          <!-- input for artist password -->
          <div class="mb-3">
            <label for="password" class="form-label">Mot de passe:</label>
            <input type="password" v-model="password" required class="form-control" id="password" />
          </div>
          <!-- input for artist photo -->
          <div class="mb-3">
            <label for="photo" class="form-label">Photo:</label>
            <input type="file" ref="photo" @change="handleFileChange" class="form-control" id="photo" />
          </div>
          <!-- submit button for the form -->
          <button type="submit" class="btn btn-primary">Ajouter</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        nom: '',
        prenom: '',
        email: '',
        password: '',
        photo: null,
      };
    },
    methods: {
      // méthode pour gérer la soumission du formulaire
      handleSubmit() {
        // crée une nouvelle instance de FormData pour stocker les données du formulaire
        const formData = new FormData();
        formData.append('nom', this.nom);
        formData.append('prenom', this.prenom);
        formData.append('email', this.email);
        formData.append('password', this.password);
        // ajoute la photo au FormData si elle est disponible
        if (this.photo) {
          formData.append('photo', this.photo);
        }
        // envoie une requête POST au serveur avec les données du formulaire
        axios.post('/api/clients', formData)
          .then(() => {
            // redirige vers la liste des clients après une soumission réussie
            this.$router.push({ name: 'liste-clients' });
          })
          .catch((error) => {
            // affiche l'erreur dans la console si la soumission a échoué
            console.error(error);
          });
      },
      // méthode pour gérer le changement de fichier
      handleFileChange(event) {
        // définit la variable photo sur le fichier sélectionné
        this.photo = event.target.files[0];
      },
    },
  };
</script>
