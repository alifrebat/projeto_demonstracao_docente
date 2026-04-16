//PEGANDO ELEMENTOS DO DOM
const formulario = document.querySelector('#formulario')
const divLista = document.querySelector('#div-lista')

//CRIANDO O ARRAY DE PESSOAS
const pessoas = []

//CAPTURANDO O EVENTO SUBMIT DO FORMULÁRIO
formulario.addEventListener('submit', (evt) => {
    evt.preventDefault()
    
    const dadosPessoa = new FormData(formulario)

    const dadoPeso = dadosPessoa.get('peso').replaceAll(',','.')
    const dadoAltura = dadosPessoa.get('altura').replaceAll(',','.')

    const idade = calcIdade(dadosPessoa.get('data-nascimento'))

    const resultadoIMC = calcIMC(dadoPeso, dadoAltura)

    const resultadoSituacao = situacaoIMC(resultadoIMC)

    const Pessoa = {
        nome: dadosPessoa.get('nome'),
        sexo: dadosPessoa.get('sexo'),
        idade: idade,
        peso: dadoPeso,
        altura: dadoAltura,
        imc: resultadoIMC,
        situacao: resultadoSituacao,
    }

    console.log(Pessoa)

    addPessoa(Pessoa)

    formulario.reset()

    listarPessoa()

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

//IDENTIFICANDO A SITUAÇÃO
const situacaoIMC = (imc) => {
    if (imc < 18.5){
        return 'Abaixo do peso'
    }else if(imc < 25){
        return  'Normal' 
    }else if(imc < 30){
        return 'Sobrepeso'        
    }else if(imc < 35){
        return 'Obesidade I'        
    }else if(imc < 40){
        return 'Obesidade II'        
    }else{
        return 'Obesidade III'
    }
}


//CALCULANDO IMC
const calcIMC = (peso, altura) => {
    const imc = peso / (altura * altura)

    return imc
}

//ADICIONAR OBJETO PESSOA
const addPessoa = (objPessoa) => {
    if (objPessoa != null) {
        pessoas.push(objPessoa)
    }
}

//LISTAR PESSOAS
const listarPessoa = () =>{
    divLista.innerHTML = ''

    let sitClass = ''
    pessoas.forEach((elem, i)=>{
        const divPessoaItem = document.createElement('div')
        
        sitClass = elem.imc < 19 ? 'ax' : elem.imc < 25 ? 'n' : elem.imc < 30 ? 'sb' : elem.imc < 35 ? 'o1' : elem.imc < 40 ? 'o2' : 'o3'

        divPessoaItem.setAttribute('class', `div-pessoa-item ${sitClass}`)
        divPessoaItem.innerHTML = `<span> ${i + 1} - ${elem.nome} - ${elem.sexo} - ${elem.idade}anos -${parseFloat(elem.imc).toFixed(2).replaceAll('.',',')} - ${elem.situacao}</span> <img src='imagens/btn_excluir.png' alt='Remover' title='Remover'/> `

        divLista.appendChild(divPessoaItem)

    })

}



