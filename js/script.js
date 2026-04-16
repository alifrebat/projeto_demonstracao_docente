//PEGANDO ELEMENTOS DO DOM
const formulario = document.querySelector('#formulario')
const divLista = document.querySelector('#div-lista')

//CRIANDO O ARRAY DE PESSOAS
const pessoas = []

//CAPTURANDO O EVENTO SUBMIT DO FORMULÁRIO
formulario.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const dadosPessoa = new FormData(formulario)

    let sexoSelecionado = dadosPessoa.get(sexo).checked
    
    let idade = calcIdade(dadosPessoa.get('data-nascimento'))

    const Pessoa = {
        nome : dadosPessoa.get('nome'),
        sexo : sexoSelecionado,
        idade : idade,
        peso : dadosPessoa.get('peso'),
        altura : dadosPessoa.get('altua')
    }

})

//CALCULANDO A IDADE
const calcIdade = ( dataNascimento)=>{
    const hoje = new Date()

    let idade = hoje.getFullYear() - dataNascimento.getFullYear()

    return idade
}



