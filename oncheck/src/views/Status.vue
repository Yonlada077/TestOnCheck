<template>
  <div>
    <div class="up d-flex justify-center flex-wrap flex-column">
      <img src="../assets/logo.png" width="200px" class="align-self-center" style="margin:20px;">
      <!-- <v-img
        class="layout"
        src="../assets/logo.png"
        max-width="200"
        max-height="200"
      ></v-img> -->
      <h4 class="text-center">ยินดีต้อนรับ<br>{{ user.displayName }}</h4>
    </div>
    <div class="down d-flex justify-center">
      <div>
        <br />
        <h4 class="text-center">เลือกสถานะ</h4>
        <br />
        <v-btn width="170" color="#f7ac80" elevation="3"
           @click="joinStudent()"><span style="color:white">นักศึกษา</span></v-btn
        >
        <br />
        <br />

        <v-btn width="170" color="#c0ba97" elevation="3"
           @click="joinTeacher()"><span style="color:white">อาจารย์</span></v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Status",
  components: {},
  data() {
    return {
      user: this.$store.state.user,
    };

  },
  methods: {
    async joinStudent(){ 
     await this.$store.dispatch("addTypeUser", {email:this.user.email, type:"student"})
     this.$router.push({name:"HomeStudent"})

    },
     async joinTeacher(){
      await this.$store.dispatch("addTypeUser", {email:this.user.email, type:"teacher"})
     this.$router.push({name:"HomeTeacher"})
     }
  }
};
</script>

<style lang="scss" scoped>
.up {
  height: 50vh;
  background-color: #f5d6b2;
}
.down {
  height: 50vh;
  width: 100vw;
}
.layout {
  // height: 25vh;

  flex-direction: column;
  align-self: center;
}
.layout-down {
  width: 100vw;
  margin: 0 auto;
}
</style>
