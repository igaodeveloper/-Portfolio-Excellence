// Express server para rodar API OpenAI localmente
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/api/openai', async (req, res) => {
  let topic = '';
  try {
    if (typeof req.body === 'string') {
      const parsed = JSON.parse(req.body);
      topic = parsed.topic || '';
    } else if (typeof req.body === 'object' && req.body !== null) {
      topic = req.body.topic || '';
    }
  } catch (err) {
    return res.status(400).json({ error: 'Invalid JSON in request body.' });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Você é um especialista em projetos de software e inovação. Gere ideias criativas e completas para projetos fictícios.'
          },
          {
            role: 'user',
            content: topic
              ? `Gere uma ideia de projeto fictícia na área de: ${topic}. Descreva o projeto, a stack sugerida e etapas de desenvolvimento.`
              : 'Gere uma ideia de projeto fictícia inovadora. Descreva o projeto, a stack sugerida e etapas de desenvolvimento.'
          }
        ],
        max_tokens: 400,
        temperature: 1.1
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(500).json({ error });
    }

    const data = await response.json();
    const idea = data.choices?.[0]?.message?.content || 'Não foi possível gerar uma ideia.';
    return res.status(200).json({ idea });
  } catch (err) {
    return res.status(500).json({ error: err && err.message ? err.message : 'Erro inesperado.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
