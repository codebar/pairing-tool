<template>
    <div id="workshop" class="row">
        <div class="col-12">
            <h1>Codebar's Super Great and Awesome: Pairing Tool!!!</h1>
            <form class="m-2">
                <div class="form-group form-border col-4">
                    <h3>Student's Form</h3>
                    <label for="firstName">First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        class="form-control"
                        aria-describedby="first-name"
                        placeholder="First Name"
                        v-model="userData.firstName"
                    />
                    <label for="email">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        class="form-control"
                        aria-describedby="last-name"
                        placeholder="Last Name"
                        v-model="userData.lastName"
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
                            class="btn btn-dark"
                            @click.prevent="submitted"
                        >
                            + Add Student
                        </button>
                    </div>
                </div>
            </form>

            <div id="student-list" class="col-4">
                <h2>Student List</h2>
                <ul>
                    <li>
                        <p>
                            <strong>Name:</strong>
                            {{ userData.firstName }}
                            {{ userData.lastName }}
                            <strong>Email:</strong>
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
                firstName: "",
                lastName: "",
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
<style scoped>
.form-border {
    border-right: 3px dotted black;
}
</style>
