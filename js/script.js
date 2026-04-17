//PEGANDO ELEMENTOS DO DOM
const formulario = document.querySelector('#formulario')
const divLista = document.querySelector('#div-lista')

//CRIANDO O ARRAY DE PESSOAS
const pessoas = []

//CAPTURANDO O EVENTO SUBMIT DO FORMULÁRIO
formulario.addEventListener('submit', (evt) => {
    evt.preventDefault()

    const dadosPessoa = new FormData(formulario)

    const dadoPeso = dadosPessoa.get('peso').replaceAll(',', '.')
    const dadoAltura = dadosPessoa.get('altura').replaceAll(',', '.')

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

    addPessoa(Pessoa)

    formulario.reset()

    listarPessoa()

})

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

//ADICIONAR OBJETO PESSOA
const addPessoa = (objPessoa) => {
    if (objPessoa != null) {
        pessoas.push(objPessoa)
    }
}

//EXCLUIR OBJETO PESSOA
const excluirPessoa = (pos) => {
    if (pos >= 0) {
        pessoas.splice(pos, 0)
        
        listarPessoa()
    }

}

//LISTAR PESSOAS
const listarPessoa = () => {
    divLista.innerHTML = ''

    let sitClass = ''
    pessoas.forEach((elem, i) => {
        
        const divPessoaItem = document.createElement('div')
        
        sitClass = elem.imc < 19 ? 'ax' : elem.imc < 25 ? 'n' : elem.imc < 30 ? 'sb' : elem.imc < 35 ? 'o1' : elem.imc < 40 ? 'o2' : 'o3'
        
        divPessoaItem.setAttribute('class', `div-pessoa-item ${sitClass}`)
        divPessoaItem.innerHTML = `<span> ${i + 1} - ${elem.nome} - ${elem.sexo} - ${elem.idade}anos -${parseFloat(elem.imc).toFixed(2).replaceAll('.', ',')} - ${elem.situacao}</span>`

        const btnExcluir = document.createElement('img')
        btnExcluir.setAttribute('src', 'imagens/btn_excluir.png')
        btnExcluir.setAttribute('alt', `Excluir ${elem.nome}?`)
        btnExcluir.setAttribute('title', `Excluir ${elem.nome}?`)
        btnExcluir.addEventListener('click',()=>{
            if(confirm(`Tem certeza que deseja exlcuir ${elem.nome}`)){
                excluirPessoa(i)
            }
        })

        divPessoaItem.appendChild(btnExcluir)

        divLista.appendChild(divPessoaItem)

    })

}



