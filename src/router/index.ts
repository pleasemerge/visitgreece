import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListHotelsView from '../views/ListHotels.vue'
import ShowHotel from '../views/Hotel/Show.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/hotels',
      name: 'list-hotels',
      component: ListHotelsView
    },
    {
      path: '/hotels/:name',
      name: 'show-hotel',
      component: ShowHotel
    }
  ]
})

export default router
