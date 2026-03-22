const express = require('express');
const router = express.Router();
const {
  askAI,
  saveFlow,
} = require('../controllers/flowController');
 
//AI
router.post('/ask-ai', askAI);
 
// Database
router.post('/save', saveFlow);
 
module.exports = router;
 