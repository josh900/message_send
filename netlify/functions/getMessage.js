// netlify/functions/getMessage.js

import { getStore } from '@netlify/blobs';

export const handler = async () => {
  try {
    // USE getStore() to read from the same persistent store
    const store = getStore('messages');
    
    // Retrieve the message by its key
    const message = await store.get('latest-message');
    
    return {
      statusCode: 200,
      body: message || 'Waiting for the first message...', // Send a default message if empty
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error fetching message: ${error.message}`,
    };
  }
};