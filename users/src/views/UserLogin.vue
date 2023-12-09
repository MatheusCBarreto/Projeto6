<template>
  <div>
    <h1>Login</h1>
    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error != undefined">
          <div class="notification is-danger">
            {{ error }}
          </div>
        </div>
        <input class="input" type="email" name="" id="" placeholder="Informe seu email" v-model="email"/>
        <input class="input" type="password" name="" id="" placeholder="Senha" v-model="password"/>
        <button class="button is-success" @click="login">Entrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: '',
      password: '',
      error: undefined,
    }
  },
  methods: {
    login() {
      axios.post("http://localhost:8686/login", {
        email: this.email,
        password: this.password
      }).then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        this.$router.push({name: 'home'});
      }).catch(err => {
        console.log(err);
        let msgErr = err.response.data.err;
        this.error = msgErr;
      });
    }
  }

};
</script>

<style></style>
