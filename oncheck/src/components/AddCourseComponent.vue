<template>
  <div class="card" style="width:90%;">
    <div class="card-body">
      <v-alert v-show="isAlert" type="success">
      Add Course Success.
    </v-alert>
      <h3>สร้างรายวิชา</h3>
      
      <form>
        <div class="form-group">
          <label for="formGroupExampleInput">รหัสวิชา</label>
          <input type="text" class="form-control" v-model="courseId" />
        </div>
        <div class="form-group">
          <label for="formGroupExampleInput2">ชื่อวิชา</label>
          <input type="text" class="form-control" v-model="courseName" />
        </div>
        <div class="form-group">
          <label for="formGroupExampleInput3">ปีการศึกษา</label>
          <input type="text" class="form-control" v-model="courseYear" />
        </div>
        <div class="form-group">
          <label for="formGroupExampleInput4">รหัสผ่าน</label>
          <input type="text" class="form-control" v-model="coursePswd" />
        </div>
        <div class="d-flex justify-content-end">
          <v-btn width="70" height="40" color="#E97B6E" style="margin:16px" elevation="3" @click="cancleCreateClass()">
            <span style="color:white">ยกเลิก</span></v-btn>
            <v-btn width="70" height="40" color="#B9CFA0" style="margin:16px" elevation="3" @click="insertToCourse()">
            <span style="color:white">ตกลง</span></v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "AddCourseComponent",

  data(){
      return{
        isAlert:false,
          courses: {},
          courseId: "",
          courseName: "",
          courseYear: "",
          coursePswd: ""
      };
  },
  methods: {
     async insertToCourse(){
          let data = {
              courseId: this.courseId, 
              courseName: this.courseName,
              courseYear: this.courseYear,
              coursePswd: this.coursePswd,
              createdby: this.$store.state.user.email
          };
          console.log("in");
          await this.$store.dispatch("addCourse", data)
          // location.reload();
          
          this.isAlert = true;
          // clear form
          this.courseId = ""
          this.courseName = ""
          this.courseYear = ""
          this.coursePswd = ""




          // this.$router.push({ name: "HomeTeacher" });
          
      },

     cancleCreateClass() {
      this.$router.push({ name: "HomeTeacher" });
    
  }
  },
//   mounted() {
//     firebase.on("value", snapshot => {
//       this.courses = snapshot.val();
//     });
//   }
};
</script>

<style scoped lang="scss">
.card {
    // background-color:#F2F5F9 !important;
    // border-radius: 25px;
    box-shadow: 15px 17px 20px -7px rgba(0,0,0,0.34);

}
</style>
