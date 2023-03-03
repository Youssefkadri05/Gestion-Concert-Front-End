<template>
  <!-- Vue du composant "About" -->
  <div class="about">
    <!-- Titre de la page -->
    <h1 class="text-center">Liste des concerts</h1>

    <!-- Carte "Concerts passés" -->
    <div class="card bg-secondary fw-bold text-white text-center">
      <div class="card-body">Concerts passés</div>
    </div>

    <!-- Liste des concerts passés -->
    <ul>
      <li v-for="concert in pastConcerts" :key="concert.id">
        <router-link class="salleLink" :to="{ name: 'ConcertDetails', params: { id: concert.con_id } }">
          {{ concert.con_nom }}
        </router-link>
      </li>
    </ul>

    <!-- Carte "Concerts en cours" -->
    <div class="card bg-success fw-bold text-white text-center">
      <div class="card-body">Concerts en cours</div>
    </div>

    <!-- Liste des concerts en cours -->
    <ul>
      <li v-for="concert in currentConcerts" :key="concert.id">
        <router-link class="salleLink" :to="{ name: 'ConcertDetails', params: { id: concert.con_id } }">
          {{ concert.con_nom }}
        </router-link>
      </li>
    </ul>

    <!-- Carte "Concerts à venir" -->
    <div class="card bg-primary fw-bold text-white text-center">
      <div class="card-body">Concerts à venir</div>
    </div>

    <!-- Liste des concerts à venir -->
    <ul>
      <li v-for="concert in upcomingConcerts" :key="concert.id">
        <router-link class="salleLink" :to="{ name: 'ConcertDetails', params: { id: concert.con_id } }">
          {{ concert.con_nom }}
        </router-link>
      </li>
    </ul>
  </div>

  <!-- Affichage des informations sur la salle -->
  <div id="infoSalle">
    <h1 class="display-6">Salle        :  {{ salle.sal_nom }}</h1>
    <h1 class="display-6">Addresse     :  {{ salle.sal_adresse }} </h1>
    <h1 class="display-6">Capacité     :  {{ salle.sal_capacite }}</h1>
    <h1 class="display-6">Gestionnaire :  {{ salle.sal_nom_gestionnaire }}</h1>
  </div>

  <!-- Affichage de la carte OpenStreetMap -->
  <div id="map"></div>
</template>

<script>
import L from 'leaflet'; // Importation de la bibliothèque Leaflet pour créer la carte OpenStreetMap
import axios from 'axios'; // Importation de la bibliothèque Axios pour effectuer des requêtes HTTP

export default {
  data() {
    return {
      loading: false, // Indicateur pour savoir si les données de la salle ont été chargées
      salle: {}, // Les données de la salle récupérées depuis l'API
      id_salle: this.$route.params.id, // ID de la salle passée en paramètre de l'URL
      pastConcerts: [], // Liste des concerts passés
      currentConcerts: [], // Liste des concerts en cours
      upcomingConcerts: [], // Liste des concerts à venir
    };
  },
  created() {
    axios.get(`http://localhost:8080/salle/salles/${this.id_salle}/concerts`)
      .then(response => {
        const concerts = response.data;
        const now = Date.now();

        this.pastConcerts = concerts.filter(concert => new Date(concert.con_date_heure_fin) < now);
        this.currentConcerts = concerts.filter(concert => new Date(concert.con_date_heure_fin) >= now && new Date(concert.con_date_heure_debut) <= now);
        this.upcomingConcerts = concerts.filter(concert => new Date(concert.con_date_heure_debut) > now);
      })
      .catch(error => {
        console.error(error);
      });
  },
  mounted() {
   
    this.getSalleData(this.id_salle);
  },
  methods: {
    getSalleData(id_salle) {
      fetch(`http://localhost:8080/salle/${id_salle}`)
        .then(response => response.json())
        .then(data => {
          this.loading = true;
          this.salle = data;
          const address = this.salle.sal_adresse;
          this.getMapData(address);
        })
        .catch(error => console.error(error));
    },
    getMapData(address) {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const lat = data[0].lat;
          const lon = data[0].lon;

          const map = L.map('map').setView([lat, lon], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
          }).addTo(map);
          L.marker([lat, lon]).addTo(map);
        })
        .catch(error => console.log(error));
    },
  },
};
</script>

<style>
#map {
  height: 400px;
  width: 50%;
  float: right;
}
#infoSalle {
  float: left;
}
</style>
