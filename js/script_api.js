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

export { salvarDados, consultarPessoas }

