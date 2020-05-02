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
      </div>

      <div class="d-flex flex-column justify-center align-items-center" style="margin-top:40px;">
        <img
          src="../assets/correct.svg"
          width="90px"
          class="align-self-center"
          style="margin:20px;"
        />
        <h4 class="text-center">เช็คชื่อเรียบร้อยแล้ว</h4>
        <br />
        <div class="d-flex justify-center">
          <v-btn width="100" height="50" color="#8DAAC8" style="margin:16px" elevation="3" @click="dashboardStu()">
            <span style="color:white">ย้อนกลับ</span></v-btn>
        </div>
      </div>
    </v-container>
  </div>
  </v-card>
  
</template>

<script>
import HomePhoto from "@/components/HomePhoto.vue";
import firebase from 'firebase'
export default {
  name: "CheckSuccessStudent",
  components: {
    HomePhoto
  },
  data: () => ({
    drawer: false,
    group: null
  }),

  watch: {
    group() {
      this.drawer = false;
    }
  },
  methods: {
    async dashboardStu() {
      await this.$store.dispatch("getHistory",{classId:this.$route.params.id,email:this.$store.state.user.email})
      this.$router.push({ name: "DashboardStudent" });
    },
    goHome() {
      this.$router.push({ name: "HomeStudent" });
    },
    goDashboard() {
      this.$router.push({ name: "DashboardStudent" });
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
  //   height: 80vh;
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
