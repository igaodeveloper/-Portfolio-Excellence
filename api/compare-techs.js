// API Route: /api/compare-techs
// Recebe duas techs e retorna análise GPT-4 (prós, contras, código, opinião)
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let techA = '', techB = '';
  try {
    if (typeof req.body === 'string') {
      const parsed = JSON.parse(req.body);
      techA = parsed.techA || '';
      techB = parsed.techB || '';
    } else if (typeof req.body === 'object' && req.body !== null) {
      techA = req.body.techA || '';
      techB = req.body.techB || '';
    }
  } catch (err) {
    return res.status(400).json({ error: 'Invalid JSON in request body.' });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured.' });
  }

  try {
    const prompt = `Compare as tecnologias ${techA} e ${techB} para desenvolvimento web. Liste prós e contras de cada uma, mostre um exemplo de código típico de cada, e dê sua opinião honesta sobre quando usar cada uma. Responda em JSON no formato: { prosA: [], consA: [], prosB: [], consB: [], codeA: '', codeB: '', opinion: '' }`;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Você é um especialista em arquitetura de software.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 900,
        temperature: 1.0
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(500).json({ error });
    }

    const data = await response.json();
    // Tenta extrair JSON da resposta da IA
    let result = null;
    try {
      result = JSON.parse(data.choices?.[0]?.message?.content || '{}');
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao interpretar resposta da IA.' });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err && err.message ? err.message : 'Erro inesperado.' });
  }
}
