const dotenv = require('dotenv');
dotenv.config();
Object.assign(process.env, dotenv.config({ path: `.env.${process.env.NODE_ENV}` }));

async function webhook() {
  if (process.env.GOOGLE_CHAT_WEBHOOK_URL) {
    let text = `[${process.env.NODE_ENV}] ${process.argv[2] || process.env.body || ''}`.trim();
    let message = (process.argv[3] || process.env.message)?.replace(/\r?\n|\r/g, ' ');
    if (!text && !message) return;

    if (text) text = '\r\n' + text;
    if (message) text = message + text;
    if (process.env.title) text = process.env.title + '\r\n' + text;

    const res = await fetch(process.env.GOOGLE_CHAT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ text }),
    });
    return await res.json();
  }
}
webhook().then(res => console.log(res));
