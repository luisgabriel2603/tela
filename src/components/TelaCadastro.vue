<template>
    <div class="container">
        <form v-if="!mostrarResultado" @submit.prevent="submitForm" class="mt-4">
            <div class="mb-3">
                <label for="nome" class="form-label">Nome:</label>
                <input type="text" id="nome" v-model="nome" required class="form-control" />
            </div>
            <div class="mb-3">
                <label for="sobrenome" class="form-label">Sobrenome:</label>
                <input type="text" id="sobrenome" v-model="sobrenome" required class="form-control" />
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" id="email" v-model="email" required
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}" class="form-control" />
            </div>
            <div class="mb-3">
                <label for="telefoneCelular" class="form-label">Telefone Celular:</label>
                <input type="tel" id="telefoneCelular" v-model="telefoneCelular"
                    @input="mascararTelefone(telefoneCelular, 'telefoneCelular')" class="form-control"
                    placeholder="(99) 99999-9999" />
            </div>
            <div class="mb-3">
                <label for="telefoneFixo" class="form-label">Telefone Fixo:</label>
                <input type="tel" id="telefoneFixo" v-model="telefoneFixo"
                    @input="mascararTelefone(telefoneFixo, 'telefoneFixo')" class="form-control"
                    placeholder="(99) 9999-9999" />
            </div>
            <span class="my-3">{{ validarNumero() }}</span>
            <div class="mb-3">
                <label class="form-label">Gênero:</label>
                <div>
                    <div class="form-check">
                        <input type="radio" id="masculino" value="Masculino" v-model="genero" class="form-check-input" />
                        <label for="masculino" class="form-check-label">Masculino</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" id="feminino" value="Feminino" v-model="genero" class="form-check-input" />
                        <label for="feminino" class="form-check-label">Feminino</label>
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <label for="dataNascimento" class="form-label">Data de Nascimento:</label>
                <input type="date" id="dataNascimento" v-model="dataNascimento" required class="form-control" />
            </div>
            <div class="mb-3">
                <label for="idade" class="form-label">Faixa Etária:</label>
                <span id="idade">{{ calcularIdade(dataNascimento) }}</span>
            </div>
            <div class="mb-3">
                <label for="cep" class="form-label">CEP:</label>
                <input type="text" maxlength="9" id="cep" v-model="cep" @input="buscarEnderecoPorCEP"
                    class="form-control" />
            </div>
            <div class="mb-3">
                <label for="numero" class="form-label">Numero:</label>
                <input type="text" id="numero" v-model="numero" class="form-control" />
            </div>

            <div class="mb-3">
                <label for="logradouro" class="form-label">Logradouro:</label>
                <input type="text" id="logradouro" v-model="logradouro" class="form-control" />
            </div>
            <div class="mb-3">
                <label for="cidade" class="form-label">Cidade:</label>
                <input type="text" id="cidade" v-model="cidade" class="form-control" />
            </div>
            <div class="mb-3">
                <label for="estado" class="form-label">Estado:</label>
                <input type="text" id="estado" v-model="estado" class="form-control" />
            </div>
            <div class="exibirQtdCadastros mb-3 border-radius rounded">
                <p>Quantidade de cadastros realizados: {{ cadastros.length }}/4</p>
            </div>
            <div class="mb-3 d-flex flex-row">
                <div class="mx-1">
                    <button type="submit" class="btn btn-primary ">Enviar</button>
                </div>
                <div class="mx-1">
                    <button type="reset" class="btn btn-secondary ">Limpar</button>
                </div>
            </div>

        </form>
        <ResultadoExibicao v-if="mostrarResultado" :cadastros="cadastros" />
    </div>
</template>

<script>
import ResultadoExibicao from "./ResultadoExibicao.vue";
import axios from 'axios';



export default {

    name: "TelaCadastro",
    components: {
        ResultadoExibicao,
    },
    data() {
        return {
            nome: "",
            sobrenome: "",
            email: "",
            telefoneCelular: "",
            telefoneFixo: "",
            genero: "",
            dataNascimento: "",
            cep: "",
            logradouro: "",
            cidade: "",
            estado: "",
            numero: "",
            cadastros: [],
            mostrarResultado: false,
        };
    },

    methods: {
        submitForm() {
            const novoCadastro = {
                nome: this.nome,
                sobrenome: this.sobrenome,
                email: this.email,
                telefoneCelular: this.telefoneCelular,
                telefoneFixo: this.telefoneFixo,
                genero: this.genero,
                dataNascimento: this.dataNascimento,
                cep: this.cep,
                logradouro: this.logradouro,
                cidade: this.cidade,
                estado: this.estado,
                numero: this.numero,
            };
            this.cadastros.push(novoCadastro);
            this.nome = "";
            this.sobrenome = "";
            this.email = "";
            this.telefoneCelular = "";
            this.telefoneFixo = "";
            this.genero = "";
            this.dataNascimento = "";
            this.cep = "";
            this.logradouro = "";
            this.cidade = "";
            this.estado = "";
            this.numero = "";
            if(this.cadastros.length >=4){
                this.mostrarResultado = true;
            }


        },
        buscarEnderecoPorCEP() {
            if (this.cep.length === 8) { // Certifique-se de que o CEP tenha 8 dígitos
                axios
                    .get(`https://viacep.com.br/ws/${this.cep}/json/`)
                    .then((response) => {
                        const data = response.data;
                        this.logradouro = data.logradouro || "";
                        this.cidade = data.localidade || "";
                        this.estado = data.uf || "";
                    })
                    .catch((error) => {
                        console.error("Erro ao buscar endereço:", error);
                    });
            }
        },
        calcularIdade(dataNascimento) {
            if (!dataNascimento) return "";

            const hoje = new Date();
            const nascimento = new Date(dataNascimento);
            const idade = hoje.getFullYear() - nascimento.getFullYear();


            if (
                hoje.getMonth() < nascimento.getMonth() ||
                (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())
            ) {
                return idade - 1;
            }
            var faixa;
            if (idade < 12 & idade >= 0) {

                faixa = "Criança"

            } else if (idade >= 12 & idade < 18) {

                faixa = "Adolescente"

            } else if (idade >= 18 & idade < 60) {

                faixa = "Adulto"

            } else if (idade > 60) {

                faixa = "Idoso"

            } else {

                faixa = "Data invalida"
            }
            return faixa;
        },
        validarNumero() {
            // Limpar caracteres não numéricos dos campos de telefone
            const telefoneCelularNumeros = this.telefoneCelular.replace(/\D/g, "");
            const telefoneFixoNumeros = this.telefoneFixo.replace(/\D/g, "");

            // Verificar se os números são iguais e têm pelo menos 1 dígito
            if (telefoneCelularNumeros === telefoneFixoNumeros && telefoneCelularNumeros.length > 0) {
                return "Números iguais, por favor insira números distintos.";
            } else {
                return;
            }
        },
        mascararTelefone(telefone, campo) {
            // Remove qualquer caractere que não seja número
            const numeros = telefone.replace(/\D/g, "");

            // Aplica a máscara de acordo com o campo
            if (campo === "telefoneCelular") {
                this.telefoneCelular = this.aplicarMascara(numeros, "(##) #####-####");
            } else if (campo === "telefoneFixo") {
                this.telefoneFixo = this.aplicarMascara(numeros, "(##) ####-####");
            }
        },

        aplicarMascara(valor, mascara) {
            let textoFormatado = "";
            let contador = 0;

            for (let i = 0; i < mascara.length; i++) {
                if (mascara[i] === "#") {
                    textoFormatado += valor[contador] || "";
                    contador++;
                } else {
                    textoFormatado += mascara[i];
                }
            }

            return textoFormatado;
        },
    }
};
</script>

<style scoped>
/* Estilos específicos para este componente */
.container {
    max-width: 500px;
    margin: 0 auto;
}

.exibirQtdCadastros {
    border-radius: 1%;
    background-color: lightgray;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
}

.form-control {
    border-radius: 0;
}

.form-check-label {
    margin-left: 10px;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
}

.btn-primary:hover,
.btn-secondary:hover {
    opacity: 0.8;
}
</style>
