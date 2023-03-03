import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArtisteGestion from '../components/Artiste/ArtisteGestion.vue'
import GestionGroupe from '../components/Groupe/GestionGroupe.vue'
import SalleDetails from '../components/Salle/SalleDetails.vue'
import SalleGestion from '../components/Salle/SalleGestion.vue'
import ConcertDetails from '../components/Concert/ConcertDetails.vue'
import CreateArtiste from '../components/Artiste/CreateArtiste.vue'
import ConcertListeForArtiste from '../components/Concert/ConcertListeForArtiste.vue'
import ConcertListeForGroupe from '../components/Concert/ConcertListeForGroupe.vue'
import CreateBillet from '../components/Ticket/CreateBillet.vue'
import ConnexionHTTP from '../components/Connexion/ConnexionHTTP.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Artistes',
    name: 'ArtistesGestion',
    component: ArtisteGestion
  },
  {
    path: '/CreateArtiste',
    name: 'CreateArtiste',
    component: CreateArtiste
  },
  {
    path: '/Groupes',
    name: 'GroupesGestion',
    component: GestionGroupe
  },
  {
    path: '/Salles',
    name: 'SalesGestion',
    component: SalleGestion
  },
  {
    path: '/Salles/SalleDetails/:id',
    name: 'SalleDetails',
    component: SalleDetails
  },
  {
    path: '/ConcertDetails/:id',
    name: 'ConcertDetails',
    component: ConcertDetails
  },
  {
    path: '/ConcertListeForArtiste/:id',
    name: 'ConcertListeForArtiste',
    component: ConcertListeForArtiste
  },
  {
    path: '/ConcertListeForGroupe/:id',
    name: 'ConcertListeForGroupe',
    component: ConcertListeForGroupe
  },
  {
    path: '/Tickets/Acheter/:idSoiree',
    name: 'AchterTicket',
    component: CreateBillet
  },
  {
    path: '/Connexion',
    name: 'Connexion',
    component: ConnexionHTTP
  },
  {
    path: '/About',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Concert/ListeConcerts.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
