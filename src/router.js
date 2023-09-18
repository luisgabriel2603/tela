// src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import TelaCadastro from '@/components/TelaCadastro.vue'; // Use '@' para indicar o diretório 'src'
import Resultado from '@/components/ResultadoExibicao.vue'; // Use '@' para indicar o diretório 'src'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TelaCadastro',
    component: TelaCadastro
  },
  {
    path: '/resultado',
    name: 'Resultado',
    component: Resultado
  }
]

const router = new VueRouter({
  routes
})

export default router
