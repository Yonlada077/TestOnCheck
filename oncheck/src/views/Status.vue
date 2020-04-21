<template>
  <div>
    <div class="up d-flex justify-center flex-wrap flex-column">
      <img src="../assets/logo1.1.svg" width="200px" class="align-self-center" style="margin:20px;">
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
        <v-btn width="170" height="50" color="#B7B8BA" elevation="3"
           @click="joinStudent()" style="color:#ffffff;margin:20px;font-size:1em;">นักศึกษา</v-btn
        >
        <br/>
        <v-btn width="170" height="50" color="#8DAAC8" elevation="3"
           @click="joinTeacher()" style="color:#ffffff;margin:20px;font-size:1em;">อาจารย์</v-btn
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
  background-color: #ffffff;
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
