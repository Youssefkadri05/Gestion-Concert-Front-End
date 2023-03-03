<template>
    <div class="list-group">
        <!-- Crée un titre centré avec le texte "Listes des groupes" -->
        <h1 class="text-center">Listes des groupes</h1>
        <!-- Crée un lien vers la route "ConcertListeForGroupe" avec l'id du groupe comme paramètre pour chaque groupe dans la liste des groupes -->
        <router-link :to="{ name: 'ConcertListeForGroupe', params: { id: groupe.grp_id } }" type="button" class="list-group-item list-group-item-action align-middle"
            v-for="groupe in groupes" :key="groupe.grp_id">{{
                groupe.grp_nom }}</router-link>
    </div>
    <!-- Crée un bouton qui redirige vers la route "/CreateArtiste" -->
    <router-link class="btn btn-primary" to="/CreateArtiste">Ajouter un groupe</router-link>
</template>
    
<script>
export default {
    data() {
        return {
            // Définit une propriété "groupes" qui contient un tableau vide
            groupes: []
        }
    },
    mounted() {
        // Quand le composant est monté, fait une requête HTTP vers l'URL 'http://localhost:8080/groupe'
        fetch('http://localhost:8080/groupe')
            .then(response => response.json())
            .then(data => {
                // Quand la réponse est reçue, met à jour la propriété "groupes" avec les données JSON
                this.groupes = data;
            })
    }
}
</script>