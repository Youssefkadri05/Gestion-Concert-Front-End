<template>
  <div class="about">
    <!-- Créer un titre avec le texte "Liste des concerts" -->
    <h1 class="text-center">Liste des concerts</h1>
    <!-- Créer une carte avec le texte "Concerts à venir" -->
    <div class="card bg-primary fw-bold text-white text-center">
      <div class="card-body">Concerts à venir</div>

    </div>
    <!-- Créer une liste non ordonnée -->
    <ul>
      <!-- Faire une boucle sur les concerts à venir et afficher leur nom avec un lien vers les détails -->
      <li v-for="concert in upcomingConcerts" :key="concert.id">
      <router-link class="salleLink" :to="{ name: 'ConcertDetails', params: { id: concert.con_id } }">
        {{ concert.con_nom }}
      </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      // Définir une variable pour stocker les concerts à venir
      upcomingConcerts: [],
      // Récupérer l'id de l'artiste depuis l'URL
      id_artiste: this.$route.params.id,
    };
  },
  created() {
    // Envoyer une requête HTTP GET à l'URL de l'API avec l'id de l'artiste
    axios.get(`http://localhost:8080/artiste/artiste/${this.id_artiste}/concerts`)
      .then(response => {
        // Récupérer les données des concerts
        const concerts = response.data;
        // Obtenir la date actuelle
        const now = Date.now();

        // Filtrer les concerts qui ont lieu après la date actuelle
        this.upcomingConcerts = concerts.filter(concert => new Date(concert.con_date_heure_debut) > now);
      })
      // Afficher une erreur en cas de problème
      .catch(error => {
        console.error(error);
      });
  },
};
</script>
<style>
.salleLink {
  /* Définir le style du lien vers les détails du concert */
  text-decoration-line: none;
  color: black;
  font-weight: bold;
}
</style>