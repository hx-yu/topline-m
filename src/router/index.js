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
  },
  {
    path: '/article/:articleId',
    name: 'Article',
    component: () => import('@/views/article'),
    props: true
  },
  {
    path: '/edituserprofile',
    name: 'UserProfile',
    component: () => import('@/views/userprofile')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('@/views/chat')
  }
]

const router = new VueRouter({
  routes
})

export default router
