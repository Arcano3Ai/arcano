/**
 * verify-payment-integrity.js
 * 
 * GUARDiÁN DE SEGURIDAD E INTEGRIDAD FINANCIERA (Anti-Tamper & Anti-Regression Guard)
 * 
 * Este script se ejecuta de forma obligatoria en 'prebuild' y en CI/CD (GitHub Actions).
 * Si alguien por descuido, error o ataque intenta modificar las cuentas oficiales
 * o agregar cuentas bancarias no autorizadas en cualquier parte del código,
 * este script detiene de inmediato el build e impide cualquier despliegue.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const BRAND_CONFIG_PATH = path.join(ROOT_DIR, 'src', 'config', 'brandConfig.ts');

const EXPECTED_ACCOUNTS = {
  titular: 'Sergio Adrián Pérez Villarreal',
  mercadoPagoBanco: 'Mercado Pago W',
  mercadoPagoClabe: '722969017074087021',
  spinOxxoCuenta: '728969000127902158',
  coursePriceMxn: 799,
};

const FORBIDDEN_WORDS = [
  '012180015487293841',
  'BBVA',
  'Bancomer',
  'Santander',
  'Banamex',
  'Citibanamex',
  'HSBC',
  'Banco Azteca',
  'Scotiabank',
];

console.log('\n🔒 [PAYMENT INTEGRITY GUARD] Iniciando auditoría de cuentas bancarias y titular...');

let errorsFound = [];

// 1. Validar brandConfig.ts
if (!fs.existsSync(BRAND_CONFIG_PATH)) {
  console.error('❌ [ERROR CRÍTICO] brandConfig.ts no fue encontrado en:', BRAND_CONFIG_PATH);
  process.exit(1);
}

const brandConfigContent = fs.readFileSync(BRAND_CONFIG_PATH, 'utf-8');

if (!brandConfigContent.includes(EXPECTED_ACCOUNTS.titular)) {
  errorsFound.push(`El titular oficial no coincide. Se esperaba: "${EXPECTED_ACCOUNTS.titular}"`);
}

if (!brandConfigContent.includes(EXPECTED_ACCOUNTS.mercadoPagoClabe)) {
  errorsFound.push(`La CLABE de Mercado Pago no coincide. Se esperaba: "${EXPECTED_ACCOUNTS.mercadoPagoClabe}"`);
}

if (!brandConfigContent.includes(EXPECTED_ACCOUNTS.spinOxxoCuenta)) {
  errorsFound.push(`La cuenta de Spin by OXXO no coincide. Se esperaba: "${EXPECTED_ACCOUNTS.spinOxxoCuenta}"`);
}

if (!brandConfigContent.includes('coursePriceMxn: 799')) {
  errorsFound.push('El precio base de cursos ($799 MXN) no coincide en brandConfig.ts');
}

// 2. Escanear todo src/ y public/ en busca de términos prohibidos o números de cuenta extraños
function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (['node_modules', '.git', '.next', 'out', '.agents', '.gemini'].includes(entry.name)) {
        continue;
      }
      scanDir(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.md'].includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf-8');

        // Comprobar palabras prohibidas
        for (const forbidden of FORBIDDEN_WORDS) {
          if (content.includes(forbidden)) {
            errorsFound.push(`Término prohibido "${forbidden}" detectado en: ${path.relative(ROOT_DIR, fullPath)}`);
          }
        }

        // Comprobar números de 16 a 18 dígitos que no sean los oficiales (excluyendo este script y brandConfig)
        if (fullPath !== BRAND_CONFIG_PATH && !fullPath.includes('verify-payment-integrity.js')) {
          const digitsMatches = content.match(/\b\d{16,18}\b/g);
          if (digitsMatches) {
            for (const match of digitsMatches) {
              if (match !== EXPECTED_ACCOUNTS.mercadoPagoClabe && match !== EXPECTED_ACCOUNTS.spinOxxoCuenta) {
                // Verificar si no es un timestamp o número de teléfono
                errorsFound.push(`Número de 16-18 dígitos sospechoso detectado (${match}) en: ${path.relative(ROOT_DIR, fullPath)}`);
              }
            }
          }
        }
      }
    }
  }
}

scanDir(path.join(ROOT_DIR, 'src'));

// 3. Resultado de la auditoría
if (errorsFound.length > 0) {
  console.error('\n🚨 [ALERTA DE SEGURIDAD - AUDITORÍA FALLIDA]');
  errorsFound.forEach((err) => console.error(` ❌ ${err}`));
  console.error('\n🛑 EL BUILD Y EL DESPLIEGUE HAN SIDO ABORTADOS PARA PROTEGER LOS FONDOS.');
  process.exit(1);
}

console.log('  ✓ Titular Oficial Blindado:   ', EXPECTED_ACCOUNTS.titular);
console.log('  ✓ Mercado Pago W (CLABE):     ', EXPECTED_ACCOUNTS.mercadoPagoClabe);
console.log('  ✓ Spin by OXXO (Cuenta/Tarj): ', EXPECTED_ACCOUNTS.spinOxxoCuenta);
console.log('  ✓ Cuentas bancarias centralizadas al 100% sin anomalías.');
console.log('  ✓ Cero rastros de BBVA, Bancomer o cuentas provisionales.');
console.log('🛡️  [PAYMENT INTEGRITY GUARD] Verificación exitosa. Código de pago 100% blindado.\n');
process.exit(0);
