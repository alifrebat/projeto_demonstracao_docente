import { salvarDados } from "./script_api.js"

//PEGANDO ELEMENTOS DO DOM
const formImc = document.querySelector("#formulario")
const btnEnviar = document.querySelector("#btn-enviar")
const divLista = document.querySelector("#div-lista")

//ARRAY PESSOA
const pessoas = []

//CAPTURANDO O EVENTO DE CLICK NO BOTÃO ENVIAR
btnEnviar.addEventListener('click', (evt) => {
    evt.preventDefault()

    const formPessoa = new FormData(formImc)

    const objPessoa = {
        nome: formPessoa.get('nome'),
        sexo: formPessoa.get('sexo'),
        data_nascimento: formPessoa.get('data-nascimento'),
        peso: formPessoa.get('peso'),
        altura: formPessoa.get('altura')
    }

    const resultadoSalvar = await salvarDados(objPessoa);

    formImc.reset()

})