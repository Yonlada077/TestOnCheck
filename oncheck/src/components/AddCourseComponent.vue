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
          <button type="button" class="btn btn-danger m-3">ยกเลิก</button>
          <button type="button" class="btn btn-success m-3" @click="insertToCourse()">ตกลง</button>
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
          location.reload();
          
          this.isAlert = true;
      }
  },
//   mounted() {
//     firebase.on("value", snapshot => {
//       this.courses = snapshot.val();
//     });
//   }
};
</script>

<style>
</style>
