import { createRouter, createWebHistory } from 'vue-router'
import PapersList from '@/pages/PapersList.vue'
import PaperPage from "@/pages/PaperPage.vue";
import StartPage from "@/pages/StartPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: StartPage
    },
    {
      path: '/papers',
      name: 'papers',
      component: PapersList
    },
    {
      path: '/paper/:paperNumber',
      name: 'paper',
      component: PaperPage,
      props: true
    },
  ]
})

export default router
