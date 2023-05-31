const express = require('express');
const router = express.Router();
const axios = require('axios');
// import axios from 'axios';

// OpenAI API 연동 엔드포인트
router.post('/openai', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const response = await axios.post(apiUrl, {
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    // 처리된 결과를 클라이언트에 반환
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;
