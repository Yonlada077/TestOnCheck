<template>
  <div class="Login">
      <v-container class="layout">
          <LoginComponent></LoginComponent>
      </v-container>
      
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue'
export default {
    name: 'Login',
  components: {
    LoginComponent
  }

}
</script>

<style lang="scss" scoped>
.Login{
    height: 100vh;
    background-color: #f5d6b2;
    
}
.layout {
    height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}



</style>
