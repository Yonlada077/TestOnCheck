<template>
  <div>

      <b-img  rounded="circle" alt="Circle image" class="rounded-circle" :src="user.photoURL" width="80" height="80"></b-img>
    <br>
    <br>
    <h5 class="">{{user.displayName}}</h5>
    <br>
   </div>  
        
  
</template>

<script>

export default {
    name: "HomePhoto",
  components: {},
  data() {
    return {
      user: this.$store.state.user,
    };
        
  } 
};
</script>

<style lang="scss" scoped>

</style>