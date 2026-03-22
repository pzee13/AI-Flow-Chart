const Flow = require('../model/flowModel');
const { callOpenRouter } = require('../services/OpenRouterService');


const askAI = async (req, res) => {
    console.log(req.body)
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

const getHistory = async (req, res) => {
  try {
    const flows = await Flow.find().sort({ createdAt: -1 }).limit(20);
    res.status(200).json({ success: true, count: flows.length, data: flows });
  } catch (error) {
    console.error('getHistory error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch history' });
  }
};
module.exports = { askAI, saveFlow, getHistory };