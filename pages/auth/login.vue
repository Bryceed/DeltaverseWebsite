<template>
  <div>
    <h1>Login</h1>
    <v-form>
      <v-text-field v-model="email" label="Email" required />
      <v-text-field v-model="password" label="Password" required type="password" />
      <v-btn color="primary" @click="login">
        Login
      </v-btn>
    </v-form>
    <v-btn color="primary" @click="register">
      Register
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password
        }
      })
    },
    register () {
      this.$router.push('/auth/register')
    }
  }
}
</script>
