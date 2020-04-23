import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    courses: []
  },
  mutations: {
    ADD_USER(state, data) {
      state.user = data;
    },
    PUSH_COURSES(state, data) {
      state.courses = data;
    },
    DELETE_STUDENT(state, data) {
     let course = state.courses.filter((course)=>{
        return course.id == data.id
      });

      course = course[0]
      const student = course.students.filter((email)=>{
        return email != data.student
      })

      course.students = student

      state.courses.push(course)
    }
  },
  actions: {
    async addTypeUser({ commit }, obj) {
      const db = firebase.firestore()
      const ref = db.collection("User_data").doc();
      const Id = ref.id;
      const data = { email: obj.email, type: obj.type, userId: Id }
      await db
        .collection("User_data")
        .doc(Id)
        .set(data);
      commit("");
    },
    async getUser({ commit }) {
      const db = firebase.firestore()
      let data = []
      const snapshot = await db
        .collection("User_data")
        .get();
      snapshot.forEach(doc => {
        data.push(doc.data());
      })
      commit("");
      return data
    },
    async addCourse({ commit }, obj) {
      const db = firebase.firestore()
      const ref = db.collection("Courses").doc();
      const Id = ref.id;
      const data = { id: Id, ...obj }
      await db
        .collection("Courses")
        .doc(Id)
        .set(data);
      commit("");


    },
    async getCoursesByEmail({ commit }, email) {
      const db = firebase.firestore()
      let data = []
      const snapshot = await db
        .collection("Courses")
        .where("createdby", "==", email)
        .get();
      snapshot.forEach(doc => {
        data.push(doc.data());
      })
      commit("PUSH_COURSES", data);
    },
    async getCourses({ commit }) {
      const db = firebase.firestore()
      let data = []
      const snapshot = await db
        .collection("Courses")
        .get();
      snapshot.forEach(doc => {
        data.push(doc.data());
      })
      commit("PUSH_COURSES", data);
    },
    async addStudentToClass({ commit }, obj) {
      const db = firebase.firestore()
      let students;
      const snapshot = await db
        .collection("Courses")
        .doc(obj.id).get()
      students = snapshot.data().students
      if (!students) {
        students = []
      }
      if(students.indexOf(obj.email) == -1){
        students.push(obj.email)
        await db
          .collection("Courses")
          .doc(obj.id).update({
            students: students
          })
      }
      else{
        alert("Students already in class")
      }
     
      commit("");
    }
    ,
    async deleteStudent({commit}, obj){
      const db = firebase.firestore()
      let students;
      const snapshot = await db
        .collection("Courses")
        .doc(obj.id).get()
      students = snapshot.data().students

      students = students.filter((email)=>{
        return email != obj.student
      })
      await db
        .collection("Courses")
        .doc(obj.id).update({
          students: students
        })
      commit("DELETE_STUDENT", obj)
    },
    randNum({commit}, obj){
      const database = firebase.database()
      const randNumRef = database.ref('/rand/'+obj.id)
      randNumRef.set(obj.randNum)
      commit("")
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
