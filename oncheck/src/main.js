import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCdLFrqn1OkxVuVvntlQq-DK_r7Ja3RIxg",
    authDomain: "oncheck-9ac3f.firebaseapp.com",
    databaseURL: "https://oncheck-9ac3f.firebaseio.com",
    projectId: "oncheck-9ac3f",
    storageBucket: "oncheck-9ac3f.appspot.com",
    messagingSenderId: "679563553402",
    appId: "1:679563553402:web:a0c6b21792474f0255a9c3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
