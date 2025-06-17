import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.post('/api/mentoria', async (req, res) => {
  let question = '';
  try {
    if (typeof req.body === 'string') {
      const parsed = JSON.parse(req.body);
      question = parsed.question || '';
    } else if (typeof req.body === 'object' && req.body !== null) {
      question = req.body.question || '';
    }
  } catch (err) {
    return res.status(400).json({ error: 'Invalid JSON in request body.' });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured.' });
  }

  try {
    const prompt = `Você é um mentor experiente chamado Igao Developer. Responda à pergunta a seguir como se estivesse ajudando um desenvolvedor júnior, usando exemplos práticos, dicas de carreira e baseando-se nos seus próprios tutoriais, experiências e visão de mercado. Seja didático, empático e motivador. Pergunta: "${question}"`;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Você é um mentor sênior brasileiro, especialista em front-end e carreira dev.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 1.05
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(500).json({ error });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || 'Não foi possível gerar uma resposta.';
    return res.status(200).json({ answer });
  } catch (err) {
    return res.status(500).json({ error: err && err.message ? err.message : 'Erro inesperado.' });
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`API Mentoria rodando em http://localhost:${PORT}`));
