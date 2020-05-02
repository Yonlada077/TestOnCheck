<template>
  <v-card class="mx-auto overflow-y-auto overflow-x-hidden" height="100vh" width="100%">
    <v-app-bar
      class="dark-blue accent-4 h-70 d-flex justify-center flex-column position-fixed"
      dark
      prominent
    >
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

    <div class="up d-flex align-content-around flex-column">
      <v-container class="layout">
        <h2 class="text-center mrg-t">Dashboard</h2>
        <!-- <div class="align-self-center text-center mrg-t">
        <HomePhoto></HomePhoto>
        </div>-->
        <div class="align-self-center" style="width:90%;">
          <DropdownSubject></DropdownSubject>
          <!-- <SelectDate></SelectDate> -->
        </div>
        <div class="d-flex justify-content-between" style="margin-top:30px;">
          <h5 class="text-left" style="opacity:0.5; margin-top:5px;">รายชื่อ</h5>
        </div>

        <!-- card ประวัติเช็คชื่อ -->

        <div
          class="d-flex align-items-center flex-column"
          style="margin-top:15px; overflow-y: auto; width:100%; height:330px;"
        >
          <div
            v-for="(student, index) in students"
            :key="index"
            class="card border-0 rounded-pill"
            style="width:100%; margin-bottom: 20px; height:65px;"
          >
            <div class="card-body d-flex justify-content-between">
              <div class="card-title">
                <h6>{{student}}</h6>
              </div>
              <div>
                <h6>INCLASS</h6>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end">
          <v-btn
            style="margin:20px;"
            width="100"
            height="50"
            color="#8DAAC8"
            elevation="3"
            @click="exportFile()"
          >
            <span style="color:white">EXPORT</span>
          </v-btn>
        </div>
      </v-container>
    </div>
  </v-card>
</template>

<script>
import HomePhoto from "@/components/HomePhoto.vue";
import DropdownSubject from "@/components/DropdownSubject.vue";
import { ExportToCsv } from "export-to-csv";
// import SelectDate from "@/components/SelectDate.vue";
import moment from "moment";
import firebase from "firebase";
export default {
  name: "DashboardTeacher",

  components: {
    HomePhoto,
    DropdownSubject
    // SelectDate
  },
  data: () => ({
    drawer: false,
    group: null,
    students: null
  }),
  created() {
    this.getStudents();
  },
  watch: {
    group() {
      this.drawer = false;
    }
  },
  methods: {
    async getStudents() {
      if (!this.$store.getters.getIsSearch) {
        await this.$store.dispatch("getStudentsFromDate", {
          id: this.$route.params.id,
          date: moment().format("L")
        });
      }
      this.$store.commit("SET_TRUE_SEARCH");
      this.students = this.$store.getters.getStudents();
    },
    exportFile() {
      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "รายชื่อนักเรียน",
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
      };
      const data = this.students.map(s => {
        return { studentId: s };
      });
      const csvExporter = new ExportToCsv(options);
      csvExporter.generateCsv(data);
    },
    goHome() {
      this.$router.push({ name: "HomeTeacher" });
    },
    goDashboard() {
      this.$router.push({ name: "DashboardTeacher" });
    },
    async logOut() {
      await firebase.auth().signOut();
      this.$store.commit("CLEAR_STATE");
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style lang="scss" scoped>
.up {
  // height: 100vh;
  background: #ffff;
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