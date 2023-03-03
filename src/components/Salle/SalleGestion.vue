<template>
    <div class="list-group">
        <h1 class="text-center">Listes des salles</h1>
        <router-link :to="{ name: 'SalleDetails', params: { id: salle.sal_id } }" type="button" class="list-group-item list-group-item-action align-middle"
            v-for="salle in salles" :key="salle.sal_id">{{
                salle.sal_nom }}</router-link>
    </div>
    <router-link class="btn btn-primary" to="/Salles/SalleDetails">Ajouter un salle</router-link>
</template>
    
<script>
export default {
    data() {
        return {
            salles: []
        }
    },
    mounted() {
       
        fetch('http://localhost:8080/salle')
            .then(response => response.json())
            .then(data => {
                
                this.salles = data;
            })
    }
}
</script>
    