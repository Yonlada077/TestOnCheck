<template>
  <div class="bg d-flex flex-column justify-center align-items-center">
    <div class="card" style="width:90%;">
      <div class="card-body">
        <v-alert v-show="isAlert" type="success">Add Course Success.</v-alert>
        <h3>เพิ่มรายวิชา</h3><br/>
        <h5>ชื่อวิชา: {{showCourse.courseName}}</h5><br/>

        <form>
          <div class="form-group">
            <label for="formGroupExampleInput">รหัสวิชา</label>
            <input v-model="courseId" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput4">รหัสผ่าน</label>
            <input v-model="password" type="text" class="form-control" />
          </div>
          <div class="d-flex justify-content-end">
            <v-btn
              width="70"
              height="40"
              color="#E97B6E"
              style="margin:16px"
              elevation="3"
              @click="cancleRegistClass()"
            >
              <span style="color:white">ยกเลิก</span>
            </v-btn>
            <v-btn
              width="70"
              height="40"
              color="#B9CFA0"
              style="margin:16px"
              elevation="3"
              @click="confirmRegistClass()"
            >
              <span style="color:white">ตกลง</span>
            </v-btn>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegistCourse",

  data() {
    return { courseId: null, password: null };
  },
  methods: {
    async cancleRegistClass() {
      this.$router.push({ name: "HomeStudent" });
    },
    async confirmRegistClass() {
      let myCourse;
      if (this.courseId && this.password) {
        myCourse = this.$store.state.courses.filter(course => {
          return (
            course.courseId == this.courseId &&
            course.coursePswd == this.password
          );
        });
        if (myCourse[0]) {
          await this.$store.dispatch("addStudentToClass", {
            id: myCourse[0].id,
            email: this.$store.state.user.email
          });
          this.$router.push({ name: "HomeStudent" });
        }
      }
    }
  },
  computed: {
    showCourse() {
      if (this.courseId) {
        return this.$store.state.courses.filter(course => {
          return course.courseId == this.courseId;
        })[0];
      }
      return "";
    }
  }
};
</script>

<style scoped lang="scss">
.bg {
  height: 100vh;
  background: #3b5185;
}

.card {
  // background-color:#F2F5F9 !important;
  // border-radius: 25px;
  box-shadow: 15px 17px 20px -7px rgba(0, 0, 0, 0.34);
}
</style>