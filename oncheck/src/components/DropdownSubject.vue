<template>

  <div>
  <v-select
        :items="items"
        :menu-props="{ bottom: true, offsetY: true }"
        label="รายวิชา"
      ></v-select>

        
</div>

</template>

<script>
export default {
    name: "DropdownSubject",
    data: () => ({
      items: ['06016346 WEB DESIGN AND DEVELOPMENT',
             '06016306 INFORMATION SYSTEMS ANALYSIS AND DESIGN', 
             '06016348 ADVANCED GAME DEVELOPMENT', 
             '06016307 INFORMATION TECHNOLOGY PROJECT MANAGEMENT'],
    })
}
</script>

<style lang="scss" scoped>

</style>