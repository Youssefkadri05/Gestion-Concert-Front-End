<template>
  <div class="about">
    <h1 class="text-center">Liste des concerts</h1>
    <!-- Carte pour les concerts passés -->
    <div class="card bg-secondary fw-bold text-white text-center">
      <div class="card-body">Concerts passés</div>
    </div>
    <ul>
      <!-- Afficher chaque concert passé -->
      <li v-for="concert in pastConcerts" :key="concert.id">
        <!-- Lien vers la page des détails du concert -->
        <router-link class="salleLink" :to="{ name: 'ConcertDetails', params: { id: concert.con_id } }">
          {{ concert.con_nom }} <!-- Nom du concert -->
        </router-link>
      </li>
    </ul>
    <!-- Carte pour les concerts en cours -->
    <div class="card bg-success fw-bold text-white text-center">
      <div class="card-body">Concerts en cours</div>
    </div>
    <ul>
      <!-- Afficher chaque concert en cours -->
      <li v-for="concert in currentConcerts" :key="concert.id">
        <!-- Lien vers la page des détails du concert -->
        <router-link class="salleLink" :to="{ name: 'ConcertDetails', params: { id: concert.con_id } }">
          {{ concert.con_nom }} <!-- Nom du concert -->
        </router-link>
      </li>
    </ul>
    <!-- Carte pour les concerts à venir -->
    <div class="card bg-primary fw-bold text-white text-center">
      <div class="card-body">Concerts à venir</div>
    </div>
    <ul>
      <!-- Afficher chaque concert à venir -->
      <li v-for="concert in upcomingConcerts" :key="concert.id">
        <!-- Lien vers la page des détails du concert -->
        <router-link class="salleLink" :to="{ name: 'ConcertDetails', params: { id: concert.con_id } }">
          {{ concert.con_nom }} <!-- Nom du concert -->
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
      pastConcerts: [], // Tableau pour stocker les concerts passés
      currentConcerts: [], // Tableau pour stocker les concerts en cours
      upcomingConcerts: [], // Tableau pour stocker les concerts à venir
    };
  },
  created() {
    axios.get('http://localhost:8080/concert/')
      .then(response => {
        const concerts = response.data; // Récupérer tous les concerts
        const now = Date.now(); // Obtenir la date et l'heure actuelles

        // Filtrer les concerts en fonction de leur date et heure
        this.pastConcerts = concerts.filter(concert => new Date(concert.con_date_heure_fin) < now);
        this.currentConcerts = concerts.filter(concert => new Date(concert.con_date_heure_fin) >= now && new Date(concert.con_date_heure_debut) <= now);
        this.upcomingConcerts = concerts.filter(concert => new Date(concert.con_date_heure_debut) > now);
      })
      .catch(error => {
        console.error(error);
      });
  },
};
</script>

<style>
.salleLink {
  text-decoration-line: none;
  color: black;
  font-weight: bold;
}
</style>
