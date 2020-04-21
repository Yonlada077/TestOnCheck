<template>
  <h3>{{ time }}</h3>
</template>

<script>
// import moment from "moment";
import { crono } from 'vue-crono';
export default {
  name: "Time",
  mixins: [crono],
  data() {
      return {
          time: undefined
      }    
  },
  methods:{
    load(){
        this.time = (new Date().toLocaleTimeString());
    }
	},
  mounted(){
      this.load();
  },
  cron:{
      time: 1000,
      method: 'load'
  }
};
</script>

<style>
</style>