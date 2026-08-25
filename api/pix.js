export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    const { zapValue } = req.body;

    try {
        const resposta = await fetch('https://escamablack.com/api/v1/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': 'pk_live_536e764c80cedbc5a50e28990517e86d92e8db9ae0a67858'
            },
            body: JSON.stringify({
                method: "pix",
                amount: 2500,
                customer: {
                    name: "Cliente VIP",
                    email: `zap${zapValue}@email.com`,
                    document: "00000000000"
                }
            })
        });

        const dados = await resposta.json();
        return res.status(resposta.status).json(dados);

    } catch (error) {
        return res.status(500).json({ message: 'Erro interno de servidor.' });
    }
}
