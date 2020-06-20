<template>
  <div class="SignUp">
    <h2>SignUp</h2>
    <!-- We don't want to refresh the page -->
    <form name="signUpForm" @submit.prevent="handleSignup"> 
        <div v-if="message" id="message">{{message}}</div>
        <div class="form_row">
            <label for="email">Email</label>
            <input type="email" name="email" v-model="email" />
        </div>
        <div class="form_row">
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="password" />
        </div>
        <div class="form_row">
            <button :disabled="submitted">
                <span>Sign Up</span>
            </button>
        </div>
    </form>
  </div>
</template>
<script>
export default {
    name: "SignUp",
    data() {
        return {
            submitted: false,
            message: "",
            email: "",
            password: ""
        };
    },
    methods: {
        handleSignup() {
            console.log("Sign Up Pressed");
            this.submitted = true;
            if (this.email != "" && this.password != "") {
                this.message = "I should send data to API";
            } else {
                this.message = "Email and Password requried.";
                this.submitted = false;
            }
        }
    }
};
</script>