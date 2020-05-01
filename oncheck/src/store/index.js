import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import createPersistedState from "vuex-persistedstate";
import moment from "moment";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    courses: [],
    students: null,
    isSearch:false,
    histories:[]
  },
  mutations: {
    CLEAR_STATE(state) {
      let clearstate = {
        user: null,
        courses: [],
        students: null,
        isSearch:false,
        histories:[]
      };
      Object.assign(state, clearstate);
    },
    SET_TRUE_SEARCH(state){
      state.isSearch = true 
    },
    SET_FALSE_SEARCH(state){
      state.isSearch = false
    },
    SET_HISTORY(state, data){
      state.histories = data
    },
    ADD_USER(state, data) {
      state.user = data;
    },
    PUSH_COURSES(state, data) {
      state.courses = data;
    },
    DELETE_STUDENT(state, data) {
      let course = state.courses.filter((course) => {
        return course.id == data.id;
      });

      course = course[0];
      const student = course.students.filter((email) => {
        return email != data.student;
      });

      course.students = student;

      state.courses.push(course);
    },
    SET_STUDENTS(state, data) {
      state.students = data;
    },
  },
  actions: {
    async addTypeUser({ commit }, obj) {
      const db = firebase.firestore();
      const ref = db.collection("User_data").doc();
      const Id = ref.id;
      const data = { email: obj.email, type: obj.type, userId: Id };
      await db
        .collection("User_data")
        .doc(Id)
        .set(data);
      commit("");
    },
    async getUser({ commit }) {
      const db = firebase.firestore();
      let data = [];
      const snapshot = await db.collection("User_data").get();
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      commit("");
      return data;
    },
    async addCourse({ commit }, obj) {
      const db = firebase.firestore();
      const ref = db.collection("Courses").doc();
      const Id = ref.id;
      const data = { id: Id, ...obj };
      await db
        .collection("Courses")
        .doc(Id)
        .set(data);
      commit("");
    },
    async getCoursesByEmail({ commit }, email) {
      const db = firebase.firestore();
      let data = [];
      const snapshot = await db
        .collection("Courses")
        .where("createdby", "==", email)
        .get();
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      commit("PUSH_COURSES", data);
    },
    async getCourses({ commit }) {
      const db = firebase.firestore();
      let data = [];
      const snapshot = await db.collection("Courses").get();
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      commit("PUSH_COURSES", data);
    },
    async addStudentToClass({ commit }, obj) {
      const db = firebase.firestore();
      let students;
      const snapshot = await db
        .collection("Courses")
        .doc(obj.id)
        .get();
      students = snapshot.data().students;
      if (!students) {
        students = [];
      }
      if (students.indexOf(obj.email) == -1) {
        students.push(obj.email);
        await db
          .collection("Courses")
          .doc(obj.id)
          .update({
            students: students,
          });
      } else {
        alert("Students already in class");
      }

      commit("");
    },
    async deleteStudent({ commit }, obj) {
      const db = firebase.firestore();
      let students;
      const snapshot = await db
        .collection("Courses")
        .doc(obj.id)
        .get();
      students = snapshot.data().students;

      students = students.filter((email) => {
        return email != obj.student;
      });
      await db
        .collection("Courses")
        .doc(obj.id)
        .update({
          students: students,
        });
      commit("DELETE_STUDENT", obj);
    },
    randNum({ commit }, obj) {
      const database = firebase.database();
      const randNumRef = database.ref("/rand/" + obj.id);
      randNumRef.set(obj.randNum);
      commit("");
    },
    async checkCode({ commit }, obj) {
      const database = firebase.database();
      const db = firebase.firestore();
      let emails = [];
      // const date = moment().subtract(10, 'days').calendar(moment().format('L'));
      const date = moment().format("L");
      const randNumRef = database.ref("/rand/" + obj.id);
      const snapshotRand = await randNumRef.once("value");
      const snapshot_col = await db.collection("StudentsInClass").get();
      let id = "dummyId";
      snapshot_col.forEach((doc) => {
        if (doc.exists) {
          if (doc.data().classId == obj.id) {
            if (doc.data().date == date) {
              id = doc.data().id;
            }
          }
        }
      });
      let snapshot;
      if (snapshotRand.val() == obj.code) {
        snapshot = await db
          .collection("StudentsInClass")
          .doc(id)
          .get();
        if (!snapshot.exists) {
          // Create new obj
          const ref = db.collection("StudentsInClass").doc();
          const Id = ref.id;
          emails.push(obj.email.slice(0, 8));
          snapshot = await db
            .collection("StudentsInClass")
            .doc(Id)
            .set({
              id: Id,
              classId: obj.id,
              students: emails,
              date,
            });
            return true
        } else {
          // Update obj
          emails = snapshot.data().students;
          let time = snapshot.data().date;
          if (time == date) {
            if (emails.indexOf(obj.email.slice(0, 8)) == -1) {
              emails.push(obj.email.slice(0, 8));
              await db
                .collection("StudentsInClass")
                .doc(id)
                .update({
                  students: emails,
                });
                return true
            } else {
              alert("Students already in class");
              return false
            }
          }
        }
      } else {
        alert("incorrect code");
        return false
      }
      commit("");
    },
    // async getStudents({ commit, getters }, id) {
    //   const db = firebase.firestore();
    //   const listStudents = [];
    //   if(!getters.getIsSearch()){
    //     const snapshot = await db
    //     .collection("StudentsInClass")
    //     .doc(id)
    //     .get();
    //   snapshot.data().students.forEach((student) => {
    //     listStudents.push(student);
    //   });
    //   console.log(listStudents)
    //   commit("SET_STUDENTS", listStudents);
    //   }
    //   else{
    //     commit("")
    //   }
      
    // },
    async getStudentsFromDate({commit},obj){
      const db = firebase.firestore();
      let listStudents = [];
      const datas = [] 
      const snapshot = await db
        .collection("StudentsInClass")
        .get();
      snapshot.forEach((doc) => {
         datas.push(doc.data())
      });
      const data = datas.filter((d)=>{
        return d.classId == obj.id && d.date == obj.date
      })
      if(data[0]){
        // console.log(data[0].students)
        listStudents = data[0].students
        commit("SET_STUDENTS", listStudents)
      }
      else{
        alert("Not Students In Class")
        commit("SET_STUDENTS",[])
      }
     
    },

   async addHistory({commit}, obj){
    const db = firebase.firestore();
    const snapshot_col = await db.collection("StudentHistory").get();
    let times = []
    let id = "dummyId";
    snapshot_col.forEach((doc) => {
      if (doc.exists) {
        if (doc.data().classId == obj.classId) {
          if (doc.data().email == obj.email) {
            id = doc.data().id;
          }
        }
      }
    });
    // End if
    let snapshot = await db
    .collection("StudentHistory")
    .doc(id)
    .get();

    if (!snapshot.exists) {
      // Create new obj
      const ref = db.collection("StudentHistory").doc();
      const Id = ref.id;
     times.push(obj.date);
      snapshot = await db
        .collection("StudentHistory")
        .doc(Id)
        .set({
          id: Id,
          classId: obj.classId,
          times,
          email:obj.email,
        }); 
    }else{
      times = snapshot.data().times;
      if (times.indexOf(obj.date == -1)) {
       times.push(obj.date);
          await db
            .collection("StudentHistory")
            .doc(id)
            .update({
              times,
          });
        }
    } // End else
    commit("")
   },
   async getHistory({commit}, obj){
    const db = firebase.firestore();
    const snapshot = await db.collection("StudentHistory").get();
    let times = [];
    snapshot.forEach((doc) => {
      if (doc.exists) {
        if (doc.data().classId == obj.classId) {
          if (doc.data().email == obj.email) {
            times = doc.data().times
          }
        }
      }
    });
    commit("SET_HISTORY", times)
   }
  },
  modules: {},
  getters:{
    getIsSearch:state=>()=>{
      return state.isSearch;
    },
    getStudents:state=>()=>{
      return state.students;
    },
    getHistories:state=>()=>{
      return state.histories;
    }
  },
  plugins: [createPersistedState()],
});
