export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email } = req.body;
        
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbw6-Q92J0TviB8_Mper70-3wnnLVZg-JdaISQOl6jkbdvyp6TOHAMcGiz5Msue_11WuBg/exec'; 
        try {
            await fetch(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });

            res.status(200).json({ message: 'Dados recebidos com sucesso!' });
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            res.status(500).json({ message: 'Erro ao enviar dados.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
