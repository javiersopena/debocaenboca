import Index from 'pages/Index.vue'
import Nearby from 'pages/Nearby'
import Messages from 'pages/Messages'
import Profile from 'pages/Profile'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: Index },
      { path: 'index', component: Index },
      { path: 'nearby', component: Nearby },
      { path: 'messages', component: Messages },
      { path: 'profile', component: Profile }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
