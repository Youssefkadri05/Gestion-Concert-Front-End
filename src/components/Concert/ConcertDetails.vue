<template>
  <div class="about">
  <!-- Créer un titre avec le texte "Informations du concert" -->
  <h1 class="text-center">Informations du concert</h1>
  <div>
    <!-- Afficher les données du concert avec des balises span -->
    <span class="display-6 fw-bold fs-5">Nom du concert           :  </span> {{ concert.con_nom }} <br/>
    <span class="display-6 fw-bold fs-5">Description              :  </span> {{ concert.con_description }} <br/>
    <span class="display-6 fw-bold fs-5">date et heure de début   :  </span> {{ concert.con_date_heure_debut }} <br/>
    <span class="display-6 fw-bold fs-5">date et heure de fin     :  </span> {{ concert.con_date_heure_fin }} <br/>
  </div>
  
</div>
<!-- Créer un lien pour acheter un ticket avec le paramètre id de la salle -->
<router-link class="btn btn-primary" :to="'/Tickets/Acheter/' + concert.soi_id">Achter un ticket</router-link>
</template>

<script>

export default {
  data() {
    return {
      loading: false,
      // Définir une variable pour stocker les données du concert
      concert: {},
      // Récupérer l'id du concert depuis l'URL
      id_concert: this.$route.params.id
    };
  },
  mounted() {

   
    // Appeler la méthode getConcertData au chargement du composant
    this.getConcertData(this.id_concert);
  },
  methods: {
    // Définir une méthode pour récupérer les données du concert depuis une API
    getConcertData(id_concert) {
      // Envoyer une requête HTTP GET à l'URL de l'API avec l'id du concert
      fetch(`http://localhost:8080/concert/${id_concert}`)
        // Convertir la réponse en JSON
        .then(response => response.json())
        // Stocker les données dans la variable concert
        .then(data => {
          this.loading = true;
          this.concert = data;
        })
        // Afficher une erreur en cas de problème
        .catch(error => console.error(error));
    },
  },
};
</script>