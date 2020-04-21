<template>
  <!-- <div>
    <v-app-bar class="dark-blue h-70 accent-4 d-flex justify-center flex-column" dense dark>
      <v-toolbar-title>
        <img src="../assets/logo2.svg" width="150px"/>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

    </v-app-bar>
  </div> -->
  <v-card
    class="mx-auto overflow-hidden"
    height="100vh"
    width="100%"
  >
    <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

    <v-app-bar
      color="dark-blue accent-4 h-70 d-flex justify-center flex-column"
      dark
      prominent
    >

      <v-toolbar-title><img src="../assets/logo2.svg" width="150px"/></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-flex align-self-center"></v-app-bar-nav-icon>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-filter</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- <v-card-text>
      The navigation drawer will appear from the bottom on smaller size screens.
    </v-card-text> -->
  </v-card>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
      drawer: false,
      group: null,
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
};
</script>

<style lang="scss" scoped>
.dark-blue{
  background: #3B5185 !important;
}
.h-70{
  height: 70px !important;
}
</style>