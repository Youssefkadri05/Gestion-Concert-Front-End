import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArtisteGestion from '../views/ArtisteGestion.vue'
import SalleDetails from '../components/SalleDetails.vue'
import SallesGestion from '../components/SallesGestion.vue'


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
    path: '/Groupes',
    name: 'GroupesGestion',
    component: ArtisteGestion
  },
  {
    path: '/Salles',
    name: 'SalesGestion',
    component: SallesGestion
  },
  {
    path: '/Salles/SalleDetails',
    name: 'SalleDetails',
    component: SalleDetails
  },
  {
    path: '/About',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
