import { createRequire } from 'module'

import themeConfig from '@/configs/themeConfig';

const require = createRequire(import.meta.url)
const axios = require('axios');

function parseTextToHTML(input) {
  let lines = input.split('\n');

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '<table>') {
      lines[i] = '<div style="overflow-x: auto;">' + lines[i];
    } else if (lines[i] === '</table>') {
      lines[i] = lines[i] + '</div>';
    }
  }

  input = lines.join('');

  return input.replace(/\n/g, '').replace('```html', '').replace('```', ''); 
}

const sendPromptToChatGPT = async (prompt) => {
  const apiKey = themeConfig.openAI_apiKey
  const endpoint = themeConfig.openAI_endpoint;

  try {
    const response = await axios.post(
      endpoint,
      {
        model: 'gpt-3.5-turbo', // You can use 'gpt-4' if you have access
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log(response.data.choices[0].message)
    
    return parseTextToHTML(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error communicating with ChatGPT:', error.response?.data || error.message);
  }
}

export default sendPromptToChatGPT
