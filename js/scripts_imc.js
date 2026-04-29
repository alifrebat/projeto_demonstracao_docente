import { salvarDados, consultarPessoas } from "./script_api.js"

//PEGANDO ELEMENTOS DO DOM
const formImc = document.querySelector("#formulario")
const btnEnviar = document.querySelector("#btn-enviar")
const divLista = document.querySelector("#div-lista")

//ARRAY PESSOA
let pessoas = []

//CAPTURANDO O EVENTO DE CLICK NO BOTÃO ENVIAR
btnEnviar.addEventListener('click', async (evt) => {
    evt.preventDefault()

    const formPessoa = new FormData(formImc)

    const objPessoa = {
        nome: formPessoa.get('nome'),
        sexo: formPessoa.get('sexo'),
        data_nascimento: formPessoa.get('data-nascimento'),
        peso: formPessoa.get('peso'),
        altura: formPessoa.get('altura').replaceAll(',', '.')
    }

    const resultadoSalvar = await salvarDados(objPessoa)

    formImc.reset()

})

//LISTA OS DADOS NA DIV LISTA
const listarPessoa = async () => {
    divLista.innerHTML = ''

    pessoas =  await consultarPessoas()

    pessoas.forEach((elem, i) => {
        const divPessoa = document.createElement('div')
        divPessoa.setAttribute('class', 'div-pessoa-item')
        divPessoa.innerHTML = `<span> ${elem.idpessoa} - ${elem.nome} - ${elem.sexo} - ${elem.data_nascimento} - ${elem.peso} - ${elem.altura} - ${(parseFloat(elem.peso)/(parseFloat(elem.altura) * parseFloat(elem.altura))).toFixed(2).replaceAll('.',',')} - FALTA SITUAÇÃO </span>`

        const btnExcluir = document.createElement('img')
        btnExcluir.setAttribute('src', 'imagens/btn_excluir.png')
        btnExcluir.setAttribute('alt', 'Excluir')
        btnExcluir.setAttribute('title', 'Excluir')

        btnExcluir.addEventListener('click',()=>{
            alert('Recurso em construção')
        })

        divPessoa.appendChild(btnExcluir)

        divLista.appendChild(divPessoa)
        
    })

}

listarPessoa()
