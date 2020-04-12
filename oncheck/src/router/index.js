import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Status from '../views/Status.vue'


import AddCourse from '../views/AddCourse.vue'

import HomeStudent from '../views/HomeStudent.vue'
import HomeTeacher from '../views/HomeTeacher.vue'
import store from '../store/index'



Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/status',
    name: 'Status',
    component: Status
  },
  {
    path: '/homeStudent',
    name: 'HomeStudent',
    component: HomeStudent
  },
  {
    path: '/homeTeacher',
    name: 'HomeTeacher',
    component: HomeTeacher
  },
  {
    path: '/addCourse',
    name: 'AddCourse',
    component: AddCourse
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name == 'Status' && !store.state.user) next({ name: 'Login' })
  else if (to.name == 'HomeTeacher' && !store.state.user) next({ name: 'Login' })
  else if (to.name == 'HomeStudent' && !store.state.user) next({ name: 'Login' })
  else if (to.name == 'AddCourse' && !store.state.user) next({ name: 'Login' })
  else next()
})

export default router
