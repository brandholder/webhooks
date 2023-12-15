const dotenv = require('dotenv');
dotenv.config();
Object.assign(process.env, dotenv.config({ path: `.env.${process.env.NODE_ENV}` }));

async function webhook() {
  const url = process.env.JANDI_WEBHOOK_URL;
  if (url) {
    const text = `[${process.env.NODE_ENV}] ${process.argv[2] || process.env.body || ''}`.trim();
    const message = (process.argv[3] || process.env.message)?.replace(/\r?\n|\r/g, ' ');
    if (!text && !message) return;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.tosslab.jandi-v2+json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        body: text,
        connectColor: process.env.NODE_ENV === 'production' ? '#1BFA22' : '#FAC11B',
        connectInfo: [
          {
            title: process.env.title,
            description: message,
            imageUrl: process.env.imageUrl, // req.headers.referer,
          },
        ],
      }),
    });
    return await res.json();
  }
}
webhook().then(res => console.log('Webhook sent successfully.'));
