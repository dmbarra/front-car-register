<template>
  <div class="ev-login col-sm-4 offset-sm-4">
    <spinner v-show="loggingIn" message="Logging in..."></spinner>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input
        type="text"
        data-id="login.username"
        class="form-control js-login__username"
        placeholder="Enter your username"
        v-model="credentials.username"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        data-id="login.password"
        class="form-control js-login__password "
        placeholder="Enter your password"
        v-model="credentials.password"
      >
    </div>
    <button
      data-id="login.submit"
      class="btn btn-primary solid blank js-login__submit"
      @click="submit()"
    >
      Login &nbsp; <i class="fa fa-arrow-circle-o-right"></i>
    </button>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner'

export default {
  name: 'Login',
  components: { Spinner },

  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      loggingIn: false,
      error: ''
    }
  },
  methods: {
    submit () {
      this.loggingIn = true
      if (this.credentials.username == "barra" && this.credentials.password == "barra") {
        this.$router.push('HelloWorld')
        this.loggingIn = false
      } else {
        this.error = "Errou Otario!!"
        this.loggingIn = false
      }
      // Auth.login() returns a promise. A redirect will happen on success.
      // For errors, use .then() to capture the response to output
      // error_description (if exists) as shown below:
      // this.$auth.login(credentials, 'dashboard').then((response) => {
      //   this.loggingIn = false
      //   this.error = utils.getError(response)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.ev-login {
  margin-top: 100px;
}

</style>
