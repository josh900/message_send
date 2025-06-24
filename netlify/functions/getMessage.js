// netlify/functions/getMessage.js

import { getDeployStore } from '@netlify/blobs';

export const handler = async () => {
  try {
    const store = getDeployStore();
    
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