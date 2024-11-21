import { createRequire } from 'module'

import themeConfig from '@/configs/themeConfig';

const require = createRequire(import.meta.url)
const axios = require('axios');

function parseTextToHTML(input) {
  const lines = input.split('\n');
  let html = '';
  let inList = false;

  for (let line of lines) {
      line = line.trim();

      if (line === '```html' || line === '```') {
        continue;
      }

      if (line.startsWith('**')) {
          // Replace ** with <h1> and </h1>
          html += `<h1>${line.replace(/\*\*(.*?)\*\*/, '$1')}</h1>`;
      } else if (line.startsWith('-')) {
          // Handle list items
          if (!inList) {
              html += '<ul>';
              inList = true;
          }

          html += `<li>${line.replace(/- /, '')}</li>`;
      } else {
          if (inList) {
              // Close the list if we're outside of list items
              html += '</ul>';
              inList = false;
          }

          if (line) {
              html += `<p>${line}</p>`;
          }
      }
  }

  // Close any unclosed list
  if (inList) {
      html += '</ul>';
  }

  return html;
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
