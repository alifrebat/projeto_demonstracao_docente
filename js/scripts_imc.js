import { salvarDados, consultarPessoas, excluirPessoa } from "./script_api.js"

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

    if (sessionStorage.getItem('objPessoa') === null) {
        cadastroPessoa(objPessoa)
    }else{
        alert('alterar em construção')
    }

    formImc.reset()

    listarPessoa()

})

//LISTA OS DADOS NA DIV LISTA
const listarPessoa = async () => {

    divLista.innerHTML = ''

    pessoas = await consultarPessoas()

    pessoas.forEach((elem, i) => {

        let imc = calcIMC(elem.peso, elem.altura)

        let sitClass = imc < 19 ? 'ax' : imc < 25 ? 'n' : imc < 30 ? 'sb' : imc < 35 ? 'o1' : imc < 40 ? 'o2' : 'o3'

        const divPessoa = document.createElement('div')
        divPessoa.setAttribute('class', `div-pessoa-item ${sitClass}`)
        divPessoa.innerHTML = `<span class='txtNome'> ${i + 1}  ${elem.nome} </span> <span> Sexo: ${elem.sexo},  Idade: ${calcIdade(elem.data_nascimento)}anos,  Peso: ${elem.peso}, Altura: ${elem.altura} </span> <span  class='txtImc'> IMC: ${imc.toFixed(2).replaceAll('.', ',')} </span> <span class='txtImc'> Situação: ${situacaoIMC(imc)} </span>`

        const divBtns = document.createElement('div')

        const btnExcluir = document.createElement('img')
        btnExcluir.setAttribute('src', 'imagens/btn_excluir.png')
        btnExcluir.setAttribute('alt', 'Excluir')
        btnExcluir.setAttribute('title', 'Excluir')

        btnExcluir.addEventListener('click', () => {
            if (confirm(`Deseja excluir ${elem.nome}?`)) {
                excluirPessoa(elem.idpessoa)
                window.location = 'index.html'
            }
        })

        divBtns.appendChild(btnExcluir)

        const btnAlterar = document.createElement('img')
        btnAlterar.setAttribute('src', 'imagens/btn_alterar.png')
        btnAlterar.setAttribute('alt', 'Alterar')
        btnAlterar.setAttribute('title', 'Alterar')

        btnAlterar.addEventListener('click', () => {
            carregaForm(elem)
        })

        divBtns.appendChild(btnAlterar)

        divPessoa.appendChild(divBtns)

        divLista.appendChild(divPessoa)

    })

}

//CALCULANDO A IDADE
const calcIdade = (dataNascimento) => {

    const nascimento = new Date(dataNascimento)
    const hoje = new Date()

    let idade = hoje.getFullYear() - nascimento.getFullYear()

    if (nascimento.getMonth() > hoje.getMonth()) {
        idade--
    }

    return idade
}

//CALCULANDO IMC
const calcIMC = (peso, altura) => {
    const imc = peso / (altura * altura)

    return imc
}

//IDENTIFICANDO A SITUAÇÃO
const situacaoIMC = (imc) => {
    if (imc < 18.5) {
        return 'Abaixo do peso'
    } else if (imc < 25) {
        return 'Normal'
    } else if (imc < 30) {
        return 'Sobrepeso'
    } else if (imc < 35) {
        return 'Obesidade I'
    } else if (imc < 40) {
        return 'Obesidade II'
    } else {
        return 'Obesidade III'
    }
}

//CARREGANDO O FORMULÁRIO
const carregaForm = (objPessoa) => {
    document.querySelector('#nome').value = objPessoa.nome

    objPessoa.sexo === 'M' ? document.querySelector('#sexo-m').checked = true : document.querySelector('#sexo-f').checked = true

    document.querySelector('#data-nascimento').value = objPessoa.data_nascimento
    document.querySelector('#peso').value = objPessoa.peso
    document.querySelector('#altura').value = objPessoa.altura
}

//CADASTRAR PESSOA
const cadastroPessoa = async (objPessoa) => {
    const resultadoSalvar = await salvarDados(objPessoa)

    return resultadoSalvar
}

//ALTERAR PESSOA
const alterarPessoa = async (objPessoa) => {
    const resultadoAlterar = await alteraDados(objPessoa)

    return resultadoAlterar
}





listarPessoa()
