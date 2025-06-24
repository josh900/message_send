// netlify/functions/getMessage.js

import { getStore } from '@netlify/blobs';

export const handler = async () => {
  try {
    // Explicitly use the environment variables to connect to the store
    const store = getStore({
      name: 'messages',
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_BLOBS_TOKEN,
    });
    
    const message = await store.get('latest-message');
    
    return {
      statusCode: 200,
      body: message || 'Waiting for the first message...',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error fetching message: ${error.message}`,
    };
  }
};