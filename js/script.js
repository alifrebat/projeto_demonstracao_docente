//PEGANDO ELEMENTOS DO DOM
const formulario = document.querySelector('#formulario')
const divLista = document.querySelector('#div-lista')

//CRIANDO O ARRAY DE PESSOAS
const pessoas = []

//CAPTURANDO O EVENTO SUBMIT DO FORMULÁRIO
formulario.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const dadosPessoa = new FormData(formulario)

    let idade = calcIdade(dadosPessoa.get('data-nascimento'))

    const Pessoa = {
        nome: dadosPessoa.get('nome'),
        sexo: dadosPessoa.get('sexo'),
        idade: idade,
        peso: dadosPessoa.get('peso'),
        altura: dadosPessoa.get('altura')
    }


    console.log(Pessoa)

    addPessoa(Pessoa)

})

//CALCULANDO A IDADE
const calcIdade = (dataNascimento) => {

    const nascimento = new Date(dataNascimento)
    const hoje = new Date()

    let idade = hoje.getFullYear() - nascimento.getFullYear()

    if ((nascimento > hoje)) {
        idade--
    } 

    return idade
}



//ADICIONAR OBJETO PESSOA
const addPessoa = (objPessoa) => {
    if (objPessoa != null) {
        pessoas.push(objPessoa)
    }
}



