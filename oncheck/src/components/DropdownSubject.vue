<template>
  <div>
    <h5 style="color:red;font-size:16px" v-show="isSelected">Subject is required</h5>
    <v-select
      v-model="subject"
      :items="items"
      :menu-props="{ bottom: true, offsetY: true }"
      label="รายวิชา"
    ></v-select>
    <v-menu
      ref="menu1"
      v-model="menu1"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="dateFormatted"
          label="เลือกวันที่"
          @blur="date = parseDate(dateFormatted)"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
    </v-menu>
    <div class="d-flex justify-content-end">
      <v-btn @click="search()">Search</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropdownSubject",
  data: vm => ({
    isSelected: false,
    isDated: false,
    items: [],
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    subject: ""
  }),
  created() {
    this.getCourses();
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  methods: {
    getCourses() {
      this.$store.state.courses.forEach(c => {
        this.items.push(c.courseId+" | "+ c.courseName);
      });
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    async search() {
      if (this.subject) {
        this.isSelected = false;
        const courseId = this.subject.split(" | ")[0]
        const course = this.$store.state.courses.filter((c)=>{
          return c.courseId == courseId
        })[0]
        // console.log(typeof(this.dateFormatted))
        let date = this.dateFormatted.split("/")
        date = date[1]+"/"+date[0]+"/"+date[2]
        this.$store.commit("SET_TRUE_SEARCH")
        await this.$store.dispatch("getStudentsFromDate",{id:course.id, date})
        location.reload()
      } else {
        this.isSelected = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>