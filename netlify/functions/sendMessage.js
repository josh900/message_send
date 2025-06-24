// netlify/functions/sendMessage.js

import { getStore } from '@netlify/blobs';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    // USE getStore() for persistent, site-wide storage
    const store = getStore('messages');
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