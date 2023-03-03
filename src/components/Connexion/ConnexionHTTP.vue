<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <!-- Créer un formulaire pour saisir l'email et le mot de passe -->
            <form>
              <div class="mb-3">
                <!-- Afficher un label pour l'email -->
                <label for="email" class="form-label">Email:</label>
                <!-- Créer un champ de type email lié à la variable email -->
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
              <div class="mb-3">
                <!-- Afficher un label pour le mot de passe -->
                <label for="password" class="form-label">Password:</label>
                <!-- Créer un champ de type mot de passe lié à la variable password -->
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <!-- Afficher un message d'erreur si la variable errorMessage est définie -->
              <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
              <!-- Créer un bouton qui appelle la méthode login au clic -->
              <button type="button" class="btn btn-primary" @click="login">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importer la bibliothèque axios pour faire des requêtes HTTP
import axios from 'axios';

export default {
  data() {
    return {
      // Définir les variables email, password et errorMessage
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    // Définir une méthode asynchrone pour se connecter
    async login() {
      try {
        // Faire une requête POST pour envoyer l'email et le mot de passe au serveur
        const response = await axios.post('http://localhost:8088/test/Admins?operation=login', {
          email: this.email,
          password: this.password
        });
        // Récupérer les données de l'administrateur renvoyées par le serveur
        const admin = response.data;
        // Stocker les données de l'administrateur dans le sessionStorage du navigateur
        sessionStorage.setItem('admin', JSON.stringify(admin));
        // Rediriger l'utilisateur vers la page d'accueil ou une autre page de l'application
        window.location.href = 'http://localhost:8081/';
      } catch (error) {
        // Définir le message d'erreur en cas d'échec de la connexion
        this.errorMessage = 'Identifiant ou mot de passe incorrect.';
      }
    }
  }
};
</script>