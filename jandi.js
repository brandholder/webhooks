const axios = require('axios');
const dotenv = require('dotenv');
const { expand } = require('dotenv-expand');

expand(dotenv.config({ path: `.env.${process.env.NODE_ENV}` }));
expand(dotenv.config({ path: '.env' }));

if (process.env.JANDI_WEBHOOK_URL) {
  const body = `[${process.env.NODE_ENV}] ${process.argv[2] || process.env.body || ''}`.trim();
  const message = (process.argv[3] || process.env.message)?.replace(/\r?\n|\r/g, ' ');
  if (!title && !message) return;

  axios
    .post(process.env.JANDI_WEBHOOK_URL, {
      headers: {
        Accept: 'application/vnd.tosslab.jandi-v2+json',
        'Content-Type': 'application/json',
      },
      body: body,
      connectColor: process.env.NODE_ENV === 'production' ? '#1BFA22' : '#FAC11B',
      connectInfo: [
        {
          title: process.env.title,
          description: message,
          imageUrl: process.env.imageUrl, // req.headers.referer,
        },
      ],
    })
    .then(function (response) {
      console.log('Webhook sent successfully.');
    })
    .catch(function (error) {
      console.log(error);
    });
}
