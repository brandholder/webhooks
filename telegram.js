const axios = require('axios');
const dotenv = require('dotenv');
const { expand } = require('dotenv-expand');

expand(dotenv.config({ path: `.env.${process.env.NODE_ENV}` }));
expand(dotenv.config({ path: '.env' }));

if (process.env.TELEGRAM_TOKEN) {
  const message = (process.argv[2] || process.env.message)?.replace(/\r?\n|\r/g, ' ');
  if (!message) return;

  axios
    .post(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: process.env.TELEGRAM_TO,
      text: message,
      // parse_mode: 'markdown',
    })
    .then(function (response) {
      console.log(JSON.stringify(response.data, null, 2));
    })
    .catch(function (error) {
      console.log(error);
    });
}
