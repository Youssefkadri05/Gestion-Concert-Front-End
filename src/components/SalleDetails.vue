<template>
    
  <div class="about">
  <h1 class="text-center">Liste des concerts</h1>
  <div class="card bg-secondary fw-bold text-white text-center">
    <div class="card-body">Concerts passées</div>
  </div>
  <div class="card bg-success fw-bold text-white text-center">
    <div class="card-body">Concerts en cours</div>
  </div>
  <div class="card bg-primary fw-bold text-white text-center">
    <div class="card-body">Concerts à venir</div>
  </div>
</div>
  <div id="infoSalle">
    <h1 class="display-6">Salle        :  {{ user.login }}</h1> 
    <h1 class="display-6">Addresse     :  {{ user.login }} </h1>
    <h1 class="display-6">Capacité     :  {{ user.login }}</h1>
    <h1 class="display-6">Gestionnaire :  {{ user.login }}</h1>
  </div>
  <div id="map"></div>
</template>

<script>
import L from 'leaflet';

export default {
  data() {
    return {
      loading: false,
      user: {},
    };
  },
  mounted() {
    const address = "14 rue borda, brest France";
    const username = "mojombo"; // Remplacez par le nom d'utilisateur GitHub souhaité

    this.getUserData(username);
    this.getMapData(address);
  },
  methods: {
    getUserData(username) {
      fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
          this.loading = true;
          this.user = data;
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
