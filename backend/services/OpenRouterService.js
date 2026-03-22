const AI_MODEL = 'google/gemma-3n-e4b-it:free'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const callOpenRouter = async (prompt) => {
  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'AI Flow App',
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || `OpenRouter error: ${response.status}`);
  }

  const answer = data.choices?.[0]?.message?.content;
  if (!answer) throw new Error('No response from AI');

  return answer;
};

module.exports = { callOpenRouter };