<template>
  <div class="list-group">
    <h1>Listes des concerts</h1>
    <router-link to="/Salles/SalleDetails" type="button" class="list-group-item list-group-item-action align-middle" v-for="user in users" :key="user.id">{{
      user.login }}</router-link>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      users: []
    }
  },
  mounted() {
    // Appel de l'API pour récupérer la liste des utilisateurs de GitHub
    fetch('https://api.github.com/users')
      .then(response => response.json())
      .then(data => {
        // Stockage des données dans le modèle du composant
        this.users = data;
      })
  }
}
</script>
  