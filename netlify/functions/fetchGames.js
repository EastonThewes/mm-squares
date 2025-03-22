// netlify/functions/fetchGames.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { year, month, day } = event.queryStringParameters;

  const apiUrl = `https://ncaa-api.henrygd.me/scoreboard/basketball-men/d1/${year}/${month}/${day}/all-conf`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: 'Error fetching data' })
      };
    }
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching data', error: error.message })
    };
  }
};
