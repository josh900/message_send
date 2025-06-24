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
    // Explicitly use the environment variables to connect to the store
    const store = getStore({
      name: 'messages',
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_BLOBS_TOKEN,
    });
    
    const message = event.body;
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