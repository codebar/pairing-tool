<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <StudentList>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import StudentList from "@/components/StudentList.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    StudentList
  }
};
</script>
