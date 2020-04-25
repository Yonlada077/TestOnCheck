<template>
  <div>
     <br>
        <v-img
          src="../assets/logo1.svg"
          
          aspect-ratio="1.4" contain
        ></v-img>
        <br>
        <br>
        <v-btn color="white"  elevation="3"
          @click="signIn()"><span style="color:#3B5185">Sign In With Google Account</span></v-btn
        >
        
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: "LoginComponent",
    methods:{
        async signIn(){
          const provider = new firebase.auth.GoogleAuthProvider()
          const result = await firebase.auth().signInWithPopup(provider)
          let flag = true
          if(result){
              this.$store.commit("ADD_USER", result.user)
              const datas = await this.$store.dispatch("getUser")
              
             datas.forEach(data => {
               if (data.email == result.user.email){
                 
                 if(data.type == "student"){
                   
                   flag = false;
                  this.$router.push({name:"HomeStudent"})
                 }
                  if(data.type == "teacher"){
                    flag = false;
                   this.$router.push({name:"HomeTeacher"})
                 }
               }
               
             });
             if(flag){ this.$router.push({name:"Status"})}
             
          }
          else{
              alert("Cannot Login")
          }
        }
        
    }

};
</script>

<style lang="scss" scoped>

</style>
