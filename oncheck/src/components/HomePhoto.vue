<template>
  <div>

      <b-img  rounded="circle" alt="Circle image" class="rounded-circle" :src="user.photoURL" width="150" height="150"></b-img>
    <br>
    <br>
    <h4 class="">{{user.displayName}}</h4>
    <br>
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