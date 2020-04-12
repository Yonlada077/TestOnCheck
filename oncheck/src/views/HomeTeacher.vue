<template>
  
  <div class="up d-flex align-content-around flex-column">
    <v-container class="layout">
    <br>
    <br>
    <br>
    <div class="align-self-center text-center"><HomePhoto></HomePhoto></div>
    
    <div class="d-flex justify-content-between" style="margin-left:5%; margin-right:5%">
      <h5 class="text-left" style="opacity:0.5">รายวิชา</h5>      
      <v-btn class="mx-2" fab dark small color="#C0E08C" elevation="3" @click="CreateClass()">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </div>
    <!-- card รายวิชา -->
    <!-- <div class="d-flex align-items-center flex-column">
      <div class="card " style="width: 90%; height: 20%; margin:10px;">
        <div class="card-body">
          <h6 class="card-title">06016346 Web design and development</h6>
        </div>
      </div>
      <div class="card " style="width: 90%; height: 20%; margin:10px;">
        <div class="card-body">
          <h6 class="card-title">06016346 Web design and development</h6>
        </div>
      </div>
      <div class="card " style="width: 90%; height: 20%; margin:10px;">
        <div class="card-body">
          <h6 class="card-title">06016346 Web design and development</h6>
        </div>
      </div>
    </div> -->
    </v-container>
  </div>
  
</template>



<script>
import HomePhoto from '@/components/HomePhoto.vue'
export default {
    name:"HomeTeacher",
  components: {
    HomePhoto
  },
  methods: {
    async CreateClass(){ 
     this.$router.push({name:"AddCourse"})

    }
  }
}
</script>

<style lang="scss" scoped>
.up {
  height: 100vh;
  background-color: #f5d6b2;
}

.layout {
    // height: 80vh;
  display: flex;
  flex-direction: column;
  
}
</style>