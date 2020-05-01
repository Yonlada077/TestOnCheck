import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Status from '../views/Status.vue'


import AddCourse from '../views/AddCourse.vue'
import RegistCourse from '../views/RegistCourse.vue'

import HomeStudent from '../views/HomeStudent.vue'
import HomeTeacher from '../views/HomeTeacher.vue'
import store from '../store/index'
import SubjectDetail from '../views/SubjectDetail.vue'
import CheckStudent from '../views/CheckStudent.vue'
import CheckSuccessStudent from '../views/CheckSuccessStudent.vue'
import CheckTeacher from '../views/CheckTeacher.vue'
import DashboardStudent from '../views/DashboardStudent.vue'
import DashboardTeacher from '../views/DashboardTeacher.vue'



Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
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
  },
  {
    path: '/subjectDetail/:id',
    name: 'SubjectDetail',
    component: SubjectDetail
  },
  {
    path: '/registCourse',
    name: 'RegistCourse',
    component: RegistCourse
  },
  {
    path: '/checkStudent/:id',
    name: 'CheckStudent',
    component: CheckStudent
  },
  {
    path: '/checkSuccessStudent/:id',
    name: 'CheckSuccessStudent',
    component: CheckSuccessStudent
  },
  {
    path: '/checkTeacher/:id',
    name: 'CheckTeacher',
    component: CheckTeacher
  },
  {
    path: '/dashboardStudent',
    name: 'DashboardStudent',
    component: DashboardStudent
  },
  {
    path: '/dashboardTeacher/:id',
    name: 'DashboardTeacher',
    component: DashboardTeacher
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
