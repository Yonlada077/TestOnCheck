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

    <div class="up d-flex flex-column">
    <v-container class="layout">
      <div class="align-self-center text-center mrg-t">
        <HomePhoto></HomePhoto>
        <Time></Time>
      </div>

      <div class="down d-flex flex-column justify-center align-self-center" style="width:90%">
        <h4 class="text-center">กรุณาใส่เลข 4 หลัก <br>{{$route.params.id}}</h4>
        <br />
        <input type="text" class="form-control" v-model="code"/>
        <div class="d-flex justify-center">
          <v-btn width="100" height="50" color="#B9CFA0" style="margin:16px" elevation="3" @click="SubmitClass()">
            <span style="color:white">ตกลง</span></v-btn>
        </div>
      </div>
    </v-container>
  </div>
  </v-card>
  
</template>

<script>
import HomePhoto from "@/components/HomePhoto.vue";
import Time from '@/components/Time.vue';
import firebase from 'firebase'
import moment from "moment";
export default {
  name: "CheckStudent",
  components: {
    HomePhoto,
    Time
  },
  data: () => ({
    drawer: false,
    group: null,
    code:0
  }),

  watch: {
    group() {
      this.drawer = false;
    }
  },
  methods: {
    async SubmitClass() {
      const flag = await this.$store.dispatch("checkCode", {id:this.$route.params.id,code:this.code,email:this.$store.state.user.email})
      if(flag){
        this.$store.dispatch("addHistory", {email:this.$store.state.user.email, classId:this.$route.params.id, date:moment().format('llll')}) //moment().subtract(1, 'days').calendar() moment().format('llll')
        this.$router.push({ name: "CheckSuccessStudent", params:{id:this.$route.params.id} });
      }
      
    },
    goHome() {
      this.$router.push({ name: "HomeStudent" });
    },
    goDashboard() {
      this.$router.push({ name: "DashboardStudent", params:{id:this.$route.params.id} });
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
.up {
  height: 50vh;
  background-color: #ffff;
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