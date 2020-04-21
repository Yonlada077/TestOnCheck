<template>
<div class="bg d-flex flex-column justify-center align-items-center">
    <AddCourseComponent></AddCourseComponent>
</div>
  
</template>

<script>
import AddCourseComponent from '@/components/AddCourseComponent.vue'
export default {
    name: 'AddCourse',
  components: {
    AddCourseComponent
  }

}
</script>

<style scoped lang="scss">
.bg{
    height: 100vh;
    background: #3B5185;
}
</style>
