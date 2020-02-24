<template>
  <div id="workshop" class="row">
    <div class="col-12">
      <h1>Codebar's Super Great and Awesome: Pairing Tool!!!</h1>
      <hr />
      <form>
        <div class="form-group col-4">
          <h3>Student's Form</h3>
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
          <div class="m-2">
            <button
              id="add-student"
              class="btn btn-primary"
              @click.prevent="submitted"
            >
              + Add Student!
            </button>
          </div>
        </div>
      </form>
      <div id="student-list" class="col-4">
        <h2>Student List</h2>
        <ul>
          <li>
            <p>
              Name: {{ userData.fName }} {{ userData.lName }} Email:
              {{ userData.email }}
            </p>
          </li>
        </ul>
      </div>
    </div>
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
