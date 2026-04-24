
const salvarDados = async (objPessoa) => {
    const endPoint = 'https://localhost:7015/api/Pessoa'

    try {
        const resposta = await fetch(
            endPoint, {
            method: 'POST',
            headers: { 'Conten-Type': "application/json" },
            body: JSON.stringify(objPessoa)
        })

        if(!resposta.ok ){
            const txtErro = await resposta.text();
                throw new Error(txtErro);
        }

        const dados = await resposta.json()
        return dados
        
    } catch (erro) {
        console.log("ERRO AO CADASTRAR ", erro)
    }
}

export{salvarDados}

