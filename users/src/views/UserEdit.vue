<template>
  <div>
    <h1>Editar usuário</h1>
    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error != undefined">
          <div class="notification is-danger">
            {{ error }}
          </div>
        </div>
        <input class="input" type="text" name="" id="" placeholder="Nome de usuário" v-model="name"/>
        <input class="input" type="email" name="" id="" placeholder="Informe seu email" v-model="email"/>
        <button class="button is-success" @click="update">Atualizar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {

    let req = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios.get("http://localhost:8686/user/" + this.$route.params.id, req).then(res => {
      console.log(res);

      this.name = res.data.name;
      this.email = res.data.email;
      this.id = res.data.id;

    }).catch(err => {
      console.log(err.response);
      this.$router.push({name: 'user'});
    });

  },
  data() {
    return {
      name: '',
      email: '',
      id: -1,
      error: undefined,
    }
  },
  methods: {
    update() {

      let req = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

      axios.put("http://localhost:8686/user", {
        name: this.name,
        email: this.email,
        id: this.id
      }, req).then(res => {
        console.log(res);
        this.$router.push({name: 'user'});
      }).catch(err => {
        console.log(err);
        let msgErr = err.response.data;
        this.error = msgErr;
      });
    }
  }
};
</script>

<style></style>
