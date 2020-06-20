<template>
  <div class="Login">
    <h2>Login</h2>
    <form name="loginForm" @submit.prevent="handleLogin">
      <div id="message" v-if="message">{{message}}</div>
      <div class="form_row">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="form_row">
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="password" />
        </div>
        <div class="form_row">
            <button :disabled="submitted">
                <span>Login</span>
            </button>
        </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      submitted: false,
      message: "",
      email: "",
      password: ""
    };
  },
  methods: {
    handleLogin() {
      this.submitted = true;
      if (this.email != "" && this.password != "") {
        console.log("Sending login request");
        this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.message = "Logged in";
          })
          .catch(err => {
            console.log(err);
            this.message = "Invalid Email/Password";
            this.submitted = false;
          });
      } else {
        this.message = "Email and password required.";
        this.submitted = false;
      }
    },
  },
};
</script>