<template>
    <div class="container">
      <h1>Lista de Cadastros</h1>
      <div class="">
        <cadastro-item
          v-for="(cadastro, index) in cadastros"
          :key="index"
          :cadastro="cadastro"
          :index="index"
        ></cadastro-item>
      </div>
    </div>
  </template>
  
  <script>
  import CadastroItem from "./CadastroItem.vue"; // Substitua pelo caminho correto
  
  export default {
    components: {
      CadastroItem,
    },
    props: {
      cadastros: Array,
    },
  };
  </script>
  