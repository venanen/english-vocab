import { createRouter, createWebHistory } from 'vue-router'
import PapersList from '@/layouts/PapersList.vue'
import Paper from "@/components/Paper.vue";
import StartPage from "@/layouts/StartPage.vue";

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
      component: Paper,
      props: true
    },
  ]
})

export default router
