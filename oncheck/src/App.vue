<template>
  <v-app class="app">
   <router-view/>

  </v-app>
</template>

<script>
export default {
  
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
.app{
  font-family: 'Kanit', sans-serif !important;
}
</style>
