<template>
  <!-- Création d'un composant de liste avec le framework Vue.js -->
  <div class="list-group">
    <!-- Ajout d'un titre centré à la liste -->
    <h1 class="text-center">Listes des artistes</h1>
    <!-- Boucle pour afficher chaque artiste de la liste avec un lien vers sa page de concerts -->
    <router-link :to="{ name: 'ConcertListeForArtiste', params: { id: artiste.art_id } }" type="button" class="list-group-item list-group-item-action align-middle" v-for="artiste in artistes" :key="artiste.art_id">{{ artiste.art_nom +" "+artiste.art_prenom }}</router-link>
  </div>
  <!-- Ajout d'un bouton pour ajouter un nouvel artiste -->
  <router-link class="btn btn-primary" to="/CreateArtiste">Ajouter un artiste</router-link>
</template>
  
<script>
export default {
  data() {
    return {
      // Création d'une propriété artistes pour stocker la liste des artistes
      artistes: []
    }
  },
  mounted() {
    // Utilisation de l'API Fetch pour récupérer la liste des artistes à partir de l'adresse http://localhost:8080/artiste
    fetch('http://localhost:8080/artiste')
      .then(response => response.json()) // Conversion de la réponse en format JSON
      .then(data => {
        this.artistes = data; // Affectation des données JSON récupérées à la propriété artistes
      })
  }
}
</script>
