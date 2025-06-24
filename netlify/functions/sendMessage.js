// netlify/functions/sendMessage.js

import { getDeployStore } from '@netlify/blobs';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const store = getDeployStore();
    const message = event.body;
    
    // Save the raw message body to the blob store with a specific key
    await store.set('latest-message', message);
    
    return {
      statusCode: 200,
      body: 'Message saved successfully.',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error saving message: ${error.message}`,
    };
  }
};