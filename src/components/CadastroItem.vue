<template>
    <div class="m-5">
        <div class="btn btn-primary">
            <h2 @click="toggleDetails">Cadastro {{ index + 1 }}</h2>
        </div>

        <ul v-show="showDetails">
            <div class="mt-3">

                <li><strong>Nome:</strong> {{ cadastro.nome }}</li>
                <li><strong>Sobrenome:</strong> {{ cadastro.sobrenome }}</li>
                <li><strong>Email:</strong> {{ cadastro.email }}</li>
                <li><strong>Telefone Celular:</strong> {{ cadastro.telefoneCelular }}</li>
                <li><strong>Telefone Fixo:</strong> {{ cadastro.telefoneFixo }}</li>
                <li><strong>Gênero:</strong> {{ cadastro.genero }}</li>
                <li><strong>Data de Nascimento:</strong> {{ cadastro.dataNascimento }}</li>
                <li><strong>CEP:</strong> {{ cadastro.cep }}</li>
                <li><strong>Logradouro:</strong> {{ cadastro.logradouro }}</li>
                <li><strong>Cidade:</strong> {{ cadastro.cidade }}</li>
                <li><strong>Estado:</strong> {{ cadastro.estado }}</li>
                <li><strong>Número:</strong> {{ cadastro.numero }}</li>
                <button @click="editCadastro" class="mt-2 btn btn-secondary">Editar</button>
            </div>
        </ul>
    </div>
</template>
  
<script>
export default {
    props: {
        cadastro: Object,
        index: Number,
    },
    data() {
        return {
            showDetails: false,
        };
    },
    methods: {
        toggleDetails() {
            this.showDetails = !this.showDetails;
        },
    },
};
</script>
  