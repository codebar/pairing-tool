<template>
  <div class="home">
    <StudentList />
  </div>
</template>

<script>

import StudentList from "@/components/StudentList.vue";

export default {
  name: "home",
  components: {
    //HelloWorld,
    StudentList
  }
};
</script>
