import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
//   const tokenExpiry = localStorage.getItem('tokenExpiry')

//   if (to.name !== 'login' && (!token || Date.now() > tokenExpiry)) {
//     next({ name: 'login' })
//   } else {
//     next()
//   }
// })

export default router
