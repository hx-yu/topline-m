import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/tab_bar'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home')
      },
      {
        path: 'question',
        name: 'Question',
        component: () => import('@/views/question')
      },
      {
        path: 'video',
        name: 'Video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search')
  }
]

const router = new VueRouter({
  routes
})

export default router
