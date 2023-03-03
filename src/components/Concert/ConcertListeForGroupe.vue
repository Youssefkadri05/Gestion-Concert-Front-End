
<template>
  <div class="about">
    <!-- Créer un titre pour la liste des concerts -->
    <h1 class="text-center">Liste des concerts</h1>
    <!-- Créer une carte avec un texte en bleu et en gras -->
    <div class="card bg-primary fw-bold text-white text-center">
      <!-- Afficher le texte "Concerts à venir" dans la carte -->
      <div class="card-body">Concerts à venir</div>

    </div>
    <!-- Créer une liste non ordonnée -->
    <ul>
      <!-- Faire une boucle sur le tableau upcomingConcerts et afficher le nom de chaque concert avec un lien vers sa page de détails -->
      <li v-for="concert in upcomingConcerts" :key="concert.id">
      <router-link class="salleLink" :to="{ name: 'ConcertDetails', params: { id: concert.con_id } }">
        {{ concert.con_nom }}
      </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// Importer la bibliothèque axios pour faire des requêtes HTTP
import axios from 'axios';

export default {
  data() {
    return {
      // Définir une variable pour stocker les concerts à venir
      upcomingConcerts: [],
      // Récupérer l'identifiant du groupe passé en paramètre dans l'URL
      id_groupe: this.$route.params.id,
    };
  },
  created() {
    // Faire une requête GET pour obtenir les concerts du groupe
    axios.get(`http://localhost:8080/concert/groupe/${this.id_groupe}/concert`)
      .then(response => {
        // Stocker les données de la réponse dans une variable
        const concerts = response.data;
        // Obtenir la date actuelle en millisecondes
        const now = Date.now();

        // Filtrer les concerts pour ne garder que ceux dont la date est supérieure à la date actuelle
        this.upcomingConcerts = concerts.filter(concert => new Date(concert.con_date_heure_debut) > now);
      })
      .catch(error => {
        // Afficher l'erreur dans la console en cas de problème
        console.error(error);
      });
  },
};
</script>
<style>
.salleLink {
  /* Supprimer le soulignement du lien */
  text-decoration-line: none;
  /* Mettre la couleur du texte en noir */
  color: black;
  /* Mettre le texte en gras */
  font-weight: bold;
}
</style>