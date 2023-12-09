import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import UserRegister from '../views/UserRegister.vue'
import UserLogin from '../views/UserLogin.vue'
import User from '../views/User.vue'
import axios from 'axios';
import UserEdit from '../views/UserEdit.vue'

function AdminAuth(to, from, next) {
  if(localStorage.getItem("token") != undefined) {

    let req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };

    axios.post("http://localhost:8686/validate", {}, req).then(res => {
      console.log(res);
      next();
    }).catch(err => {
      console.log(err);
      alert("Você não tem permissão para acessar esta url");
      next("/login");
    });
  } else {
    next("/login");
  }
}


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: UserRegister
  },
  {
    path: '/login',
    name: 'login',
    component: UserLogin,
  },
  {
    path: '/admin/user',
    name: 'user',
    component: User,
    beforeEnter: AdminAuth
  },
  {
    path: '/admin/user/edit/:id',
    name: 'edit',
    component: UserEdit,
    beforeEnter: AdminAuth
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
}); 

export default router
