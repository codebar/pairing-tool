<template>
  <div id="student-list">
    <h1>Student List</h1>
    <div id="list">
      <ul>
        <li>
          <p>Name: {{ this.userData.fName }} {{ userData.lName }}</p>
          <p>Email: {{ userData.email }}</p>
        </li>
      </ul>
    </div>
    <form>
      <div class="form-group">
        <label for="fname">First Name</label>
        <input
          type="text"
          id="fname"
          class="form-control"
          aria-describedby="first-name"
          placeholder="First Name"
          v-model="userData.fName"
        />
        <label for="email">Last Name</label>
        <input
          type="text"
          id="lname"
          class="form-control"
          aria-describedby="last-name"
          placeholder="Last Name"
          v-model="userData.lName"
        />
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          :value="userData.email"
          @input="userData.email = $event.target.value"
        />
      </div>
      <div>
        <button
          id="add-student"
          class="btn btn-primary"
          @click.prevent="submitted"
        >
          + Add Student!
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        fName: "",
        lName: "",
        email: ""
      },
      isSubmitted: false
    };
  },
  methods: {
    submitted() {
      this.isSubmitted = true;
    }
  }
};
</script>
