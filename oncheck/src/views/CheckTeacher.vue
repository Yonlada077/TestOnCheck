<template>
  <v-card class="mx-auto overflow-y-auto overflow-x-hidden" height="100vh" width="100%">
    <v-app-bar class="dark-blue accent-4 h-70 d-flex justify-center flex-column position-fixed" dark prominent>
      <v-toolbar-title>
        <img src="../assets/logo2.svg" width="150px" @click="goHome()"/>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-flex align-self-center"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute right temporary style="width:300px;">
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
          class="d-flex flex-column"
        >
          <div class="align-self-center text-center mrg-t">
            <HomePhoto></HomePhoto>
          </div>

          <v-list-item @click="goHome()">
            <v-list-item-title class="menu d-flex align-items-center">
              <div style="margin:10px;">
                <img src="../assets/home-run.svg" width="30px" />
              </div>
              <div>Home</div>
            </v-list-item-title>
          </v-list-item>

          <v-list-item @click="goDashboard()">
            <v-list-item-title class="menu d-flex align-items-center">
              <div style="margin:10px;">
                <img src="../assets/edit.svg" width="30px" />
              </div>
              <div>Dashboard</div>
            </v-list-item-title>
          </v-list-item>

          <v-list-item @click="logOut()">
            <v-list-item-title class="menu d-flex align-items-center" style="color:#E97B6E;">
              <div style="margin:10px;">
                <img src="../assets/logout.svg" width="30px" />
              </div>
              <div>log out</div>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <div class="bg d-flex flex-column">
      <v-container class="layout">
        <div class="align-self-center text-center mrg-t">
          <HomePhoto></HomePhoto>
          <Time></Time>
        </div>

        <div
          class="d-flex flex-column justify-center align-items-center align-self-center"
          style="margin-top:80px;"
          
        >
          <h1 style="letter-spacing: 5px;">{{randNum}}</h1>
          <br />
          <div class="d-flex justify-center">
            <v-btn width="100" height="50" color="#E97B6E" elevation="3" @click="finish()">
              <span style="color:white">สิ้นสุด</span>
            </v-btn>
          </div>
        </div>
      </v-container>
    </div>
  </v-card>
</template>

<script>
import HomePhoto from "@/components/HomePhoto.vue";
import Time from "@/components/Time.vue";
import firebase from 'firebase'
export default {
  name: "CheckTeacher",
  components: {
    HomePhoto,
    Time
  },
  data: () => ({
    drawer: false,
    group: null,
    randNum:0
  }),
  created(){
    this.randNumber()
  },
  watch: {
    randNum(){
      this.$store.dispatch("randNum", {id:this.$route.params.id,randNum:this.randNum})
    },
    group() {
      this.drawer = false;
    }
  },
  methods: {
    randNumber(){
      this.randNum =  Math.floor(10000 + Math.random() * 90000);
      setInterval(()=>{
          this.randNum =  Math.floor(10000 + Math.random() * 90000);
      },10000)
    },
    async finish() {
      this.$store.commit("SET_FALSE_SEARCH")
      this.$router.push({ name: "DashboardTeacher"  , params:{id:this.$route.params.id}});
    },
    goHome() {
      this.$router.push({ name: "HomeTeacher" });
    },
    goDashboard() {
      this.$router.push({ name: "DashboardTeacher"});
    },
    async logOut() {
       await firebase.auth().signOut()
             this.$store.commit("CLEAR_STATE")
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style scoped lang="scss">
.bg {
  height: 100vh;
  background: #ffff;
}
.down {
  height: 50vh;
  width: 100vw;
}
.layout {
    height: 100vh;
  display: flex;
  flex-direction: column;
}
.mrg-t {
  margin-top: 5rem !important;
}
.dark-blue {
  background: #3b5185 !important;
}
.h-70 {
  height: 70px !important;
}
.menu {
  font-size: 1.2rem !important;
  padding: 20px !important;
}
</style>