import { createRouter, createWebHistory } from 'vue-router'
import SuccessPage from '@/views/success/success.vue'
import index from '@/views/index/Index.vue'
import shouye from '@/views/index/shouye.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'shouye',
      component: shouye
    },{
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/success',
      name: 'success',
      component: SuccessPage
    }
  ]
})

export default router