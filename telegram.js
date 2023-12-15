const dotenv = require('dotenv');
dotenv.config();
Object.assign(process.env, dotenv.config({ path: `.env.${process.env.NODE_ENV}` }));

async function webhook() {
  const token = process.env.TELEGRAM_TOKEN;
  const chat_id = process.env.TELEGRAM_TO;
  if (token) {
    const text = (process.argv[2] || process.env.message)?.replace(/\r?\n|\r/g, ' ');
    if (!text) return;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        chat_id,
        text,
        // parse_mode: 'markdown',
      }),
    });
    return await res.json();
  }
}
webhook().then(res => console.log('Webhook sent successfully.'));
