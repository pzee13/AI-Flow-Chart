const Flow = require('../model/flowModel');
const { callOpenRouter } = require('../services/OpenRouterService');


const askAI = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ success: false, error: 'Prompt is required' });
  }

  try {
    const answer = await callOpenRouter(prompt);
    res.status(200).json({ success: true, answer });
  } catch (error) {
    console.error('askAI error:', error.message);
    res.status(500).json({ success: false, error: error.message || 'Failed to get AI response' });
  }
};


const saveFlow = async (req, res) => {
  const { prompt, response } = req.body;

  if (!prompt || !response) {
    return res.status(400).json({ success: false, error: 'Prompt and response are required' });
  }

  try {
    const flow = await Flow.create({ prompt, response });
    res.status(201).json({ success: true, data: flow });
  } catch (error) {
    console.error('saveFlow error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to save flow' });
  }
};

module.exports = { askAI, saveFlow };