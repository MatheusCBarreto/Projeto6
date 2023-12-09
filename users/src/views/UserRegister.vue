<template>
  <div>
    <h1>Registro de usuário</h1>
    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error != undefined">
          <div class="notification is-danger">
            {{ error }}
          </div>
        </div>
        <input class="input" type="text" name="" id="" placeholder="Nome de usuário" v-model="name"/>
        <input class="input" type="email" name="" id="" placeholder="Informe seu email" v-model="email"/>
        <input class="input" type="password" name="" id="" placeholder="Senha" v-model="password"/>
        <button class="button is-success" @click="register">Cadastrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: undefined,
    }
  },
  methods: {
    register() {
      axios.post("http://localhost:8686/user", {
        name: this.name,
        email: this.email,
        password: this.password
      }).then(res => {
        console.log(res);
        this.$router.push({name: 'home'})
      }).catch(err => {
        console.log(err)
        let msgErr = err.response.data;
        this.error = msgErr;
      });
    }
  }

};
</script>

<style></style>
