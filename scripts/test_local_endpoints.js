const routes = [
  '/',
  '/tienda',
  '/carta-del-dia',
  '/lecturas',
  '/academia',
  '/carta-astral',
  '/sinastria',
  '/tarot-del-amor',
  '/tarot-profesional',
  '/blog',
  '/contacto',
  '/privacidad',
  '/terminos',
  '/cancelaciones',
  '/reservar'
];

async function testRoutes() {
  console.log('🧪 Iniciando verificación de rutas reales en http://localhost:3000...\n');
  let hasError = false;

  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    const start = Date.now();
    try {
      const res = await fetch(url);
      const time = Date.now() - start;
      const text = await res.text();
      const titleMatch = text.match(/<title[^>]*>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : 'Sin título';
      
      if (res.status === 200) {
        console.log(`✓ [200 OK] ${route.padEnd(22)} (${time.toString().padStart(4, ' ')}ms) - ${title.slice(0, 60)}...`);
      } else {
        console.error(`✗ [${res.status}] ${route} (${time}ms)`);
        hasError = true;
      }
    } catch (err) {
      console.error(`✗ [ERROR] ${route} - ${err.message}`);
      hasError = true;
    }
  }

  console.log('\n----------------------------------------');
  if (hasError) {
    console.error('⚠️  Algunas rutas fallaron.');
    process.exit(1);
  } else {
    console.log('🎉 100% de las rutas verificadas con éxito en local.');
  }
}

testRoutes();
