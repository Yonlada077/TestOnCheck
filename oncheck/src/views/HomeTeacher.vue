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

    <div class="bg d-flex align-content-around flex-column">
      <v-container class="layout">
        <div class="align-self-center text-center mrg-t">
          <HomePhoto></HomePhoto>
        </div>

        <div class="d-flex justify-content-between" style="margin-top:30px;">
          <h5 class="text-left" style="opacity:0.5">รายวิชา</h5>
          <v-btn class="mx-2" fab dark small color="#8DAAC8" elevation="3" @click="CreateClass()">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </div>
        <!-- card รายวิชา -->

        <div
          class="d-flex align-items-center flex-column"
          style="margin-top:15px; overflow-y: scroll; width:100%;"
        >
          <div
            class="card border-0 rounded-pill"
            v-for="(course, index) in courses"
            :key="index"
            style="width:100%; margin-bottom: 20px; height:65px;"
            @click="Class(course.id)"
          >
            <div class="card-body d-flex justify-content-between">
              <div class="card-title">
                <h6>{{course.courseId}} {{course.courseName}}</h6>
              </div>
            </div>
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
  name: "HomeTeacher",
  components: {
    HomePhoto
  },
  data(){
    return {
      courses:[],
      user: this.$store.state.user,
      drawer: false,
      group: null
    }    
  },
  created() {
    this.getCourses();
  },
  watch: {
    $route: "getCourses",
    group() {
      this.drawer = false;
    }
  },
  methods: {
    goHome() {
      this.$router.push({ name: "HomeTeacher" });
    },
    goDashboard() {
      this.$router.push({ name: "DashboardTeacher" });
    },
    async logOut() {
       await firebase.auth().signOut()
             this.$store.commit("CLEAR_STATE")
      this.$router.push({ name: "Login" });
    },
    async CreateClass() {
      this.$router.push({ name: "AddCourse" });
    },
    async Class(id) {
      this.$router.push({ name: "SubjectDetail", params:{id} });
    },
    async getCourses(){
      await this.$store.dispatch("getCoursesByEmail", this.user.email)
      this.courses = this.$store.state.courses
    }
  }
};
</script>

<style lang="scss" scoped>
.bg {
  background: #ffff;
  height: 100vh;
}

.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.mrg-t {
  margin-top: 5rem !important;
}
.card {
  background-color: #f2f5f9 !important;
  // border-radius: 25px;
  box-shadow: 7px 17px 8px -7px rgba(0, 0, 0, 0.09);
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