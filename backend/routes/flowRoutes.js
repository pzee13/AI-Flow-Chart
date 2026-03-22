const express = require('express');
const router = express.Router();
const {
  askAI,
  saveFlow,
  getHistory
} = require('../controllers/flowController');
 
//AI
router.post('/ask-ai', askAI);
 
// Database
router.post('/save', saveFlow);

router.get('/history', getHistory);
 
module.exports = router;
 