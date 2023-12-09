<template>
  <div>
    <h1>Painel ADM!</h1>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ processRole(user.role) }}</td>
            <td>
              <router-link :to="{name: 'edit', params: {id: user.id}}">
                <button class="button is-success spaceright">Editar</button>
              </router-link>
              <button class="button is-danger" @click="modal(user.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div :class="{modal: true, 'is-active': showModal}">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Você realmente deseja deletar este usuário?</p>
            </header>
            <div class="card-content">
              <div class="content">
                Ao deletar o usuário, esta ação não poderá ser desfeita e as informações nele contidas serão perdidas.
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item" @click="hideModal">Cancelar</a>
              <a href="#" class="card-footer-item" @click="deleteUser">Sim, quero deletar</a>
            </footer>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="hideModal"></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  created() {
    let req = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios
      .get('http://localhost:8686/user', req)
      .then((res) => {
        console.log(res);
        this.users = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      users: [],
      showModal: false,
      deleteUserId: -1
    };
  },
  methods: {
    processRole: function (value) {
      if (value == 0) {
        return 'Usuário comum';
      } else {
        return 'Administrador';
      }
    },
    hideModal() {
    this.showModal = false;
  },
    modal(id) {
      this.deleteUserId = id;
      this.showModal = true;
  },
  deleteUser() {

    let req = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios.delete("http://localhost:8686/user/" + this.deleteUserId, req).then(res => {
      console.log(res);
      this.modal = false;
      //window.location.reload(true);
      this.users = this.users.filter(u => u.id != this.deleteUserId.id);
    }).catch(err => {
      console.log(err);
      this.modal = false;
    })
  }
  },
  
};
</script>

<style>
.spaceright {
  margin-right: 10px;
}
</style>
