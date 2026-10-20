const fs = require('fs');
const path = require('path');

const shopPath = path.join(__dirname, '../src/data/shop.ts');
let content = fs.readFileSync(shopPath, 'utf8');

const beadMatrixDef = `export interface BeadMatrixSpecification {
  archetype: string;
  mainBody: string;      // 19 cuentas - 8 mm
  lateralBeads: string;  // 2 cuentas - 8 mm
  centerPiece: string;   // 1 cuenta - 10 mm
  totalBeads: number;    // 22 cuentas
}

`;

if (!content.includes('interface BeadMatrixSpecification')) {
  content = content.replace(/export interface ShopProduct \{/, beadMatrixDef + 'export interface ShopProduct {');
  content = content.replace(/arcanoStory\?: string;/, 'arcanoStory?: string;\n  beadMatrix?: BeadMatrixSpecification;');
  fs.writeFileSync(shopPath, content, 'utf8');
  console.log('Successfully updated shop.ts with BeadMatrixSpecification');
} else {
  console.log('BeadMatrixSpecification already present');
}
