import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from "@/layouts/Menu";
import login from "@/views/login";
Vue.use(VueRouter)

function guardMyroute (to, from, next) {
  var isAuthenticated = false
  isAuthenticated = !!localStorage.getItem('LoggedUser');
  if (isAuthenticated) {
    next() // allow to enter route
  } else {
    next('/login') // go to '/login';
  }
}

const routes = [
  {
    path: '*',
    redirect: 'dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/',
    redirect: 'dashboard',
    component: Menu,
    //beforeEnter: guardMyroute,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/components/admin/index.vue')
      },
      {
        path: '/entree',
        name: 'entree',
        component: () => import('@/components/entree/index.vue')
      },
    
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: "active", // active class for non-exact links.
  linkExactActiveClass: "active", // active class for *exact* links.
  routes
})

export default router
