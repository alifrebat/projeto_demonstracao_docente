//ADICIONAR NO BANCO DE DADOS
const salvarDados = async (objPessoa) => {
    const endPoint = 'https://localhost:7015/api/Pessoa'

    try {
        const resposta = await fetch(
            endPoint, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objPessoa)
        })

        if (!resposta.ok) {
            const txtErro = await resposta.text();
            throw new Error(txtErro);
        }

        const dados = await resposta.json()
        return dados

    } catch (erro) {
        console.log("ERRO AO CADASTRAR ", erro)
    }
}

//CONSULTAR PESSOAS
const consultarPessoas = async () => {
    const endPoint = 'https://localhost:7015/api/Pessoa'

    try {
        return await fetch(endPoint)
            .then(resp => resp.json())
            .catch(erro => {
                return []
            })

    } catch (erro) {
        console.log("ERRO AO CONSULTAR ", erro)
    }

}

//EXCLUIR PESSOA 
const excluirPessoa = async (idPessoa) => {
    const endPoint = `https://localhost:7015/api/Pessoa/${idPessoa}`

    try {
        const resposta_status = await fetch(endPoint, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })

        return resposta_status

    } catch (erro) {
        console.error("Erro ao criar:", erro)
    }
}

//ADICIONAR NO BANCO DE DADOS
const alterarDados = async (objPessoa) => {
    const endPoint = `https://localhost:7015/api/Pessoa/${objPessoa.idpessoa}`

    try {
        const resposta = await fetch(
            endPoint, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objPessoa)
        })

        if (!resposta.ok) {
            const txtErro = await resposta.text();
            throw new Error(txtErro);
        }

        const dados = await resposta.json()
        return dados

    } catch (erro) {
        console.log("ERRO AO CADASTRAR ", erro)
    }
}
export { salvarDados, consultarPessoas, excluirPessoa, alterarDados }

