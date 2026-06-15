bash

cat /mnt/user-data/outputs/oneport-sales/netlify/functions/proxy.js
Output

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const apiKey = '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'

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: event.body
    });

    const data = await response.json();
    return {
      statusCode: response.status,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: { message: 'Proxy error: ' + err.message } })
    };
  }
};
