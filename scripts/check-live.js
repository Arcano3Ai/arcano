const https = require('https');

https.get('https://arcanosolutions.com', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const h1s = data.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
    console.log('LIVE PRODUCTION STATS FOR https://arcanosolutions.com:');
    console.log('Live H1 count:', h1s.length);
    h1s.forEach((h, i) => console.log(`Live H1 #${i+1}:`, h.replace(/<[^>]+>/g, '').trim()));

    const desc = data.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    if (desc) {
      console.log('Live Meta description length:', desc[1].length);
      console.log('Live Meta description content:', desc[1]);
    }
  });
}).on('error', err => console.error('Error fetching live:', err));
