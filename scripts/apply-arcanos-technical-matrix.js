const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/majorArcanaTalismans.ts');

const TECHNICAL_MATRIX = [
  {
    arcanoNumber: "0",
    name: "Arcano 0 · El Loco (Howlita Blanca & Ónix Mate)",
    archetype: "Nuevos comienzos, libertad y aventura",
    mainBody: "Howlita blanca (vetas grises) (19 ctas - 8 mm)",
    lateralBeads: "Ónix negro mate (2 ctas - 8 mm)",
    centerPiece: "Hematita gris metálica (1 cta - 10 mm)",
    stoneType: "Howlita Blanca, Ónix Mate & Hematita Metálica",
    badge: "ARCANO 0 · LIBERTAD & AVENTURA",
    tagline: "Nuevos comienzos · Libertad · Aventura. Talismán del salto de fe con howlita blanca y anclaje de ónix y hematita.",
    description: "Una pieza consagrada para recordar la valentía de emprender nuevos caminos sin temor al abismo. 19 cuentas de howlita blanca con vetas naturales, flanqueadas por ónix negro mate y coronadas por una cuenta central de hematita gris metálica de 10 mm.",
  },
  {
    arcanoNumber: "I",
    name: "Arcano I · El Mago (Ónix Brillante & Lapislázuli)",
    archetype: "Manifestación, voluntad y concentración",
    mainBody: "Ónix negro brillante (19 ctas - 8 mm)",
    lateralBeads: "Sodalita azul o Lapislázuli (2 ctas - 8 mm)",
    centerPiece: "Hematita dorada (o Pirita) (1 cta - 10 mm)",
    stoneType: "Ónix Negro Brillante, Lapislázuli & Pirita / Hematita Dorada",
    badge: "ARCANO I · MANIFESTACIÓN & VOLUNTAD",
    tagline: "Manifestación · Voluntad · Concentración. Talismán del poder creador que une cielo y tierra.",
    description: "Una joya ceremonial que sintoniza con la capacidad de canalizar la voluntad en obra viva. 19 cuentas de ónix negro brillante de alta protección, dos laterales de lapislázuli real y una pieza central de pirita / hematita dorada de 10 mm.",
  },
  {
    arcanoNumber: "II",
    name: "Arcano II · La Sacerdotisa (Cuarzo Blanco & Amatista)",
    archetype: "Intuición, misterio y sabiduría interior",
    mainBody: "Cuarzo blanco / lechoso (19 ctas - 8 mm)",
    lateralBeads: "Amatista (2 ctas - 8 mm)",
    centerPiece: "Opalina / Piedra Luna iridiscente (1 cta - 10 mm)",
    stoneType: "Cuarzo Blanco Lechoso, Amatista & Piedra Luna / Opalina",
    badge: "ARCANO II · INTUICIÓN & MISTERIO",
    tagline: "Intuición · Misterio · Sabiduría interior. Talismán de quietud y conexión con las aguas sagradas del alma.",
    description: "Diseñado para aquietar la mente y escuchar la voz del templo interior. 19 cuentas de cuarzo blanco lechoso de pureza lunar, laterales de amatista de transmutación y una gema central de piedra luna / opalina iridiscente de 10 mm.",
  },
  {
    arcanoNumber: "III",
    name: "Arcano III · La Emperatriz (Cuarzo Rosa & Jade Verde)",
    archetype: "Abundancia, creatividad y naturaleza",
    mainBody: "Cuarzo rosa (19 ctas - 8 mm)",
    lateralBeads: "Jade verde (o Aventurina) (2 ctas - 8 mm)",
    centerPiece: "Aventurina verde (1 cta - 10 mm)",
    stoneType: "Cuarzo Rosa, Jade Verde & Aventurina Verde",
    badge: "ARCANO III · ABUNDANCIA & NATURALEZA",
    tagline: "Abundancia · Creatividad · Naturaleza. Talismán de la fertilidad creadora y el amor incondicional.",
    description: "Canaliza el pulso nutridor de la Madre Tierra. 19 cuentas de cuarzo rosa natural de alta vibración afectiva, dos cuentas simétricas de jade verde noble y una aventurina verde central de 10 mm para abrir las puertas de la prosperidad.",
  },
  {
    arcanoNumber: "IV",
    name: "Arcano IV · El Emperador (Jaspe Rojo & Ojo de Tigre)",
    archetype: "Autoridad, estructura y liderazgo",
    mainBody: "Jaspe rojo (19 ctas - 8 mm)",
    lateralBeads: "Ónix negro brillante (2 ctas - 8 mm)",
    centerPiece: "Ojo de tigre dorado (1 cta - 10 mm)",
    stoneType: "Jaspe Rojo, Ónix Brillante & Ojo de Tigre Dorado",
    badge: "ARCANO IV · AUTORIDAD & ESTRUCTURA",
    tagline: "Autoridad · Estructura · Liderazgo. Talismán de solidez terrenal y dominio consciente.",
    description: "Representa el trono de la estabilidad y la disciplina rectora. 19 cuentas de jaspe rojo telúrico para arraigar la fuerza vital, laterales de ónix negro brillante y un ojo de tigre dorado central de 10 mm para enfocar la visión de mando.",
  },
  {
    arcanoNumber: "V",
    name: "Arcano V · El Hierofante (Sodalita Azul & Ojo de Tigre)",
    archetype: "Sabiduría tradicional y guía espiritual",
    mainBody: "Sodalita azul (19 ctas - 8 mm)",
    lateralBeads: "Ojo de tigre (2 ctas - 8 mm)",
    centerPiece: "Hematita dorada (1 cta - 10 mm)",
    stoneType: "Sodalita Azul, Ojo de Tigre & Hematita Dorada",
    badge: "ARCANO V · SABIDURÍA & GUÍA ESPIRITUAL",
    tagline: "Sabiduría tradicional · Guía espiritual · Verdad. Talismán del puente sagrado entre cielo y tierra.",
    description: "Simboliza las enseñanzas ancestrales y la alineación con la verdad superior. 19 cuentas de sodalita azul de claridad mental, dos laterales de ojo de tigre y una hematita dorada ceremonial de 10 mm como sello sacerdotal.",
  },
  {
    arcanoNumber: "VI",
    name: "Arcano VI · Los Enamorados (Cornalina & Cuarzo Rosa)",
    archetype: "Amor, unión, elección y armonía",
    mainBody: "Cornalina naranja (19 ctas - 8 mm)",
    lateralBeads: "Cuarzo rosa (2 ctas - 8 mm)",
    centerPiece: "Jaspe rojo (1 cta - 10 mm)",
    stoneType: "Cornalina Naranja, Cuarzo Rosa & Jaspe Rojo",
    badge: "ARCANO VI · AMOR & ARMONÍA",
    tagline: "Amor · Unión · Elección · Armonía. Talismán de la devoción consciente y la concordia del corazón.",
    description: "La sagrada comunión entre el deseo pasional y la ternura incondicional. 19 cuentas de cornalina naranja de fuego creador, laterales de cuarzo rosa y una cuenta central de jaspe rojo de 10 mm que ancla la elección del alma.",
  },
  {
    arcanoNumber: "VII",
    name: "Arcano VII · El Carro (Ojo de Tigre & Hematita)",
    archetype: "Determinación, avance y triunfo",
    mainBody: "Ojo de tigre dorado (19 ctas - 8 mm)",
    lateralBeads: "Ónix negro brillante (2 ctas - 8 mm)",
    centerPiece: "Hematita gris metálica (1 cta - 10 mm)",
    stoneType: "Ojo de Tigre Dorado, Ónix Brillante & Hematita Gris Metálica",
    badge: "ARCANO VII · DETERMINACIÓN & TRIUNFO",
    tagline: "Determinación · Avance · Triunfo. Talismán de la victoria sobre los impulsos opuestos.",
    description: "El vehículo del triunfo forjado con riendas de acero y voluntad invencible. 19 cuentas de ojo de tigre dorado de avance intrépido, laterales de ónix negro brillante y una pieza central de hematita gris metálica de 10 mm.",
  },
  {
    arcanoNumber: "VIII",
    name: "Arcano VIII · La Fuerza (Jaspe Paisaje & Ojo de Buey)",
    archetype: "Dominio interior, paciencia y valentía",
    mainBody: "Jaspe paisaje o Dálmata (19 ctas - 8 mm)",
    lateralBeads: "Ónix negro mate (o Cuarzo ahumado) (2 ctas - 8 mm)",
    centerPiece: "Ojo de buey / Ojo de tigre rojo (1 cta - 10 mm)",
    stoneType: "Jaspe Paisaje / Dálmata, Ónix Mate & Ojo de Buey Rojo",
    badge: "ARCANO VIII · VALENTÍA & DOMINIO INTERIOR",
    tagline: "Dominio interior · Paciencia · Valentía. Talismán de la compasión que doma al león interno.",
    description: "La fuerza que no destruye sino que transfigura la naturaleza animal en nobleza pura. 19 cuentas de jaspe paisaje / jaspe dálmata, laterales de ónix mate y un ojo de buey rojo ardiente de 10 mm en el centro.",
  },
  {
    arcanoNumber: "IX",
    name: "Arcano IX · El Ermitaño (Cuarzo Ahumado & Labradorita)",
    archetype: "Introspección, paciencia y sabiduría",
    mainBody: "Cuarzo ahumado (o Ágata gris) (19 ctas - 8 mm)",
    lateralBeads: "Ónix negro mate (2 ctas - 8 mm)",
    centerPiece: "Hematita gris o Labradorita (1 cta - 10 mm)",
    stoneType: "Cuarzo Ahumado / Ágata Gris, Ónix Mate & Labradorita",
    badge: "ARCANO IX · INTROSPECCIÓN & SABIDURÍA",
    tagline: "Introspección · Paciencia · Sabiduría. Talismán de la linterna interior que alumbra en la oscuridad.",
    description: "El retiro sagrado de quien camina con su propia lámpara en la noche del mundo. 19 cuentas de cuarzo ahumado / ágata gris, laterales de ónix negro mate y una labradorita espectral de 10 mm en el corazón del talismán.",
  },
  {
    arcanoNumber: "X",
    name: "Arcano X · La Rueda de la Fortuna (Aventurina & Citrino)",
    archetype: "Ciclos, oportunidades y prosperidad",
    mainBody: "Aventurina verde (19 ctas - 8 mm)",
    lateralBeads: "Citrino / Cuarzo amarillo (2 ctas - 8 mm)",
    centerPiece: "Hematita dorada (o Pirita) (1 cta - 10 mm)",
    stoneType: "Aventurina Verde, Citrino Dorado & Pirita Dorada",
    badge: "ARCANO X · PROSPERIDAD & CICLOS",
    tagline: "Ciclos · Oportunidades · Prosperidad. Talismán de la sincronicidad y el giro favorable del destino.",
    description: "El constante devenir del cosmos sintonizado con la fortuna y la abundancia. 19 cuentas de aventurina verde de buena ventura, laterales de citrino solar y una pirita / hematita dorada de 10 mm como imán de oportunidades.",
  },
  {
    arcanoNumber: "XI",
    name: "Arcano XI · La Justicia (Hematita Gris & Ónix Brillante)",
    archetype: "Equilibrio, verdad y responsabilidad",
    mainBody: "Hematita gris (19 ctas - 8 mm)",
    lateralBeads: "Howlita blanca (2 ctas - 8 mm)",
    centerPiece: "Ónix negro brillante (1 cta - 10 mm)",
    stoneType: "Hematita Gris, Howlita Blanca & Ónix Negro Brillante",
    badge: "ARCANO XI · EQUILIBRIO & VERDAD",
    tagline: "Equilibrio · Verdad · Responsabilidad. Talismán de la espada de la lucidez y la balanza armónica.",
    description: "El fiel de la balanza que sopesa causas y consecuencias con objetividad incorruptible. 19 cuentas de hematita gris metálica de rectitud, laterales de howlita blanca de serenidad de juicio y un ónix negro brillante central de 10 mm.",
  },
  {
    arcanoNumber: "XII",
    name: "Arcano XII · El Colgado (Cuarzo Azul & Sodalita)",
    archetype: "Pausa, perspectiva y transformación",
    mainBody: "Ágata azul claro / Cuarzo azul (19 ctas - 8 mm)",
    lateralBeads: "Cuarzo blanco / lechoso (2 ctas - 8 mm)",
    centerPiece: "Sodalita azul marino (1 cta - 10 mm)",
    stoneType: "Ágata Azul Claro / Cuarzo Azul, Cuarzo Lechoso & Sodalita Marina",
    badge: "ARCANO XII · PERSPECTIVA & TRANSFORMACIÓN",
    tagline: "Pausa · Perspectiva · Transformación. Talismán de la rendición consciente y la visión invertida.",
    description: "La sabiduría de soltar el control para que la perspectiva sagrada ilumine lo esencial. 19 cuentas de cuarzo azul / ágata azul claro de quietud, laterales de cuarzo blanco lechoso y una sodalita azul marino central de 10 mm.",
  },
  {
    arcanoNumber: "XIII",
    name: "Arcano XIII · La Muerte (Ónix Brillante & Lava Volcánica)",
    archetype: "Transformación, cierre y renacimiento",
    mainBody: "Ónix negro brillante (19 ctas - 8 mm)",
    lateralBeads: "Hematita gris oscura / negra (2 ctas - 8 mm)",
    centerPiece: "Ónix negro mate o Lava volcánica (1 cta - 10 mm)",
    stoneType: "Ónix Brillante, Hematita Oscura & Lava Volcánica / Ónix Mate",
    badge: "ARCANO XIII · TRANSFORMACIÓN & RENACIMIENTO",
    tagline: "Transformación · Cierre · Renacimiento. Talismán de la poda sagrada que libera espacio a lo nuevo.",
    description: "La alquimia del soltar para renacer renovado desde la raíz. 19 cuentas de ónix negro brillante de liberación profunda, laterales de hematita gris oscura de corte kármico y una pieza central de lava volcánica / ónix mate de 10 mm.",
  },
  {
    arcanoNumber: "XIV",
    name: "Arcano XIV · La Templanza (Amatista & Cuarzo Cristal)",
    archetype: "Armonía, moderación y equilibrio",
    mainBody: "Amatista (19 ctas - 8 mm)",
    lateralBeads: "Howlita blanca (2 ctas - 8 mm)",
    centerPiece: "Cuarzo cristal transparente (1 cta - 10 mm)",
    stoneType: "Amatista Púrpura, Howlita Blanca & Cuarzo Cristal Transparente",
    badge: "ARCANO XIV · ARMONÍA & EQUILIBRIO",
    tagline: "Armonía · Moderación · Equilibrio. Talismán de la alquimia interior que funde opuestos en gracia.",
    description: "El ángel de las dos copas vertiendo las aguas de la serenidad entre cielo y tierra. 19 cuentas de amatista púrpura de transmutación, laterales de howlita blanca de ecuanimidad y un cuarzo cristal puro central de 10 mm.",
  },
  {
    arcanoNumber: "XV",
    name: "Arcano XV · El Diablo (Jaspe Rojo Oscuro & Ónix)",
    archetype: "Deseo, pasión y poder material",
    mainBody: "Jaspe rojo oscuro / Ágata vino (19 ctas - 8 mm)",
    lateralBeads: "Ónix negro brillante (2 ctas - 8 mm)",
    centerPiece: "Hematita negra / gris (1 cta - 10 mm)",
    stoneType: "Jaspe Rojo Oscuro / Ágata Vino, Ónix Brillante & Hematita Negra",
    badge: "ARCANO XV · PASIÓN & PODER MATERIAL",
    tagline: "Deseo · Pasión · Poder material. Talismán del reconocimiento y dominio de las pulsiones primarias.",
    description: "Integración de las sombras y el fuego instintivo para convertirlos en fuerza creadora. 19 cuentas de jaspe rojo oscuro / ágata vino, laterales de ónix negro brillante y una hematita negra central de 10 mm.",
  },
  {
    arcanoNumber: "XVI",
    name: "Arcano XVI · La Torre (Lava Volcánica & Jaspe Rojo)",
    archetype: "Ruptura, revelación y liberación",
    mainBody: "Lava volcánica negra (19 ctas - 8 mm)",
    lateralBeads: "Jaspe rojo (2 ctas - 8 mm)",
    centerPiece: "Hematita dorada (o Pirita) (1 cta - 10 mm)",
    stoneType: "Lava Volcánica Negra, Jaspe Rojo & Pirita / Hematita Dorada",
    badge: "ARCANO XVI · REVELACIÓN & LIBERACIÓN",
    tagline: "Ruptura · Revelación · Liberación. Talismán del rayo de la verdad que desmorona lo falso.",
    description: "El rayo de la lucidez que derriba las estructuras rígidas para permitir que nazca la verdad. 19 cuentas de lava volcánica negra nacidas del magma, laterales de jaspe rojo de coraje y una pirita dorada central de 10 mm.",
  },
  {
    arcanoNumber: "XVII",
    name: "Arcano XVII · La Estrella (Turquesa & Piedra Luna)",
    archetype: "Esperanza, inspiración y renovación",
    mainBody: "Turquesa comercial (Howlita azul) (19 ctas - 8 mm)",
    lateralBeads: "Cuarzo cristal transparente (2 ctas - 8 mm)",
    centerPiece: "Opalina / Piedra Luna (1 cta - 10 mm)",
    stoneType: "Turquesa / Howlita Azul, Cuarzo Cristal & Piedra Luna / Opalina",
    badge: "ARCANO XVII · ESPERANZA & RENOVACIÓN",
    tagline: "Esperanza · Inspiración · Renovación. Talismán del manantial celeste que nutre el espíritu.",
    description: "El bálsamo de las estrellas que infunde fe luminosa en el porvenir. 19 cuentas de turquesa / howlita azul de serenidad, laterales de cuarzo cristal de claridad estelar y una piedra luna / opalina de 10 mm de esperanza renovada.",
  },
  {
    arcanoNumber: "XVIII",
    name: "Arcano XVIII · La Luna (Piedra Luna Gris & Amatista)",
    archetype: "Intuición, sueños y mundo interior",
    mainBody: "Piedra Luna gris / Ágata gris (19 ctas - 8 mm)",
    lateralBeads: "Cuarzo ahumado (2 ctas - 8 mm)",
    centerPiece: "Amatista (1 cta - 10 mm)",
    stoneType: "Piedra Luna Gris / Ágata Gris, Cuarzo Ahumado & Amatista Púrpura",
    badge: "ARCANO XVIII · SUEÑOS & MUNDO INTERIOR",
    tagline: "Intuición · Sueños · Mundo interior. Talismán del cruce nocturno por las aguas del inconsciente.",
    description: "El descenso a las profundidades del inconsciente y el misterio onírico. 19 cuentas de piedra luna gris / ágata gris de reflejos nocturnos, laterales de cuarzo ahumado protector y una amatista púrpura profunda de 10 mm.",
  },
  {
    arcanoNumber: "XIX",
    name: "Arcano XIX · El Sol (Citrino Solar & Ojo de Tigre)",
    archetype: "Vitalidad, alegría y éxito",
    mainBody: "Cuarzo amarillo / Citrino comercial (19 ctas - 8 mm)",
    lateralBeads: "Cornalina naranja (2 ctas - 8 mm)",
    centerPiece: "Ojo de tigre dorado (1 cta - 10 mm)",
    stoneType: "Citrino Solar / Cuarzo Amarillo, Cornalina Naranja & Ojo de Tigre Dorado",
    badge: "ARCANO XIX · VITALIDAD & ÉXITO",
    tagline: "Vitalidad · Alegría · Éxito. Talismán de la plenitud radiante, calidez y celebración de la vida.",
    description: "El abrazo del sol estival que ilumina el sendero con dicha y éxito rotundo. 19 cuentas de citrino solar / cuarzo amarillo de júbilo, laterales de cornalina naranja creadora y un ojo de tigre dorado central de 10 mm.",
  },
  {
    arcanoNumber: "XX",
    name: "Arcano XX · El Juicio (Fluorita Multicolor & Amatista)",
    archetype: "Despertar y transformación personal",
    mainBody: "Fluorita multicolor (o Ágata musgosa) (19 ctas - 8 mm)",
    lateralBeads: "Amatista (2 ctas - 8 mm)",
    centerPiece: "Cuarzo cristal transparente (1 cta - 10 mm)",
    stoneType: "Fluorita Multicolor / Ágata Musgosa, Amatista & Cuarzo Cristal",
    badge: "ARCANO XX · DESPERTAR & TRANSFORMACIÓN",
    tagline: "Despertar · Transformación personal · Resurrección. Talismán del clarín que llama a la consciencia superior.",
    description: "El llamado inapelable del espíritu a despertar del letargo y vivir con autenticidad. 19 cuentas de fluorita multicolor / ágata musgosa de apertura dimensional, laterales de amatista y un cuarzo cristal de 10 mm de pureza renovada.",
  },
  {
    arcanoNumber: "XXI",
    name: "Arcano XXI · El Mundo (7 Minerales de Integración & Ónix)",
    archetype: "Integración, plenitud y culminación",
    mainBody: "7 Minerales en armonía (19 ctas - 8 mm)",
    lateralBeads: "Ónix negro mate (2 ctas - 8 mm)",
    centerPiece: "Conector metálico (Infinito / Laurel) (1 cta - 10 mm)",
    stoneType: "7 Minerales en Armonía, Ónix Mate & Conector Sagrado",
    badge: "ARCANO XXI · INTEGRACIÓN & PLENITUD",
    tagline: "Integración · Plenitud · Culminación. Talismán de la danza cósmica y la totalidad consumada.",
    description: "La corona de la Gran Obra alquímica: todos los elementos integrados en un círculo perfecto. 19 cuentas que armonizan 7 minerales sagrados, laterales de ónix negro mate de cierre y un conector sagrado de Infinito / Corona de Laurel de 10 mm.",
  },
];

// Leer contenido actual
let currentCode = fs.readFileSync(filePath, 'utf8');

// Aplicar matriz técnica a cada arcano
TECHNICAL_MATRIX.forEach(spec => {
  // Regex para encontrar el bloque del arcano
  const arcanoPattern = new RegExp(
    `(\\{[\\s\\S]*?arcanoNumber:\\s*"${spec.arcanoNumber}"[\\s\\S]*?\\})`,
    'g'
  );

  currentCode = currentCode.replace(arcanoPattern, (block) => {
    // 1. Reemplazar name
    block = block.replace(/name:\s*"[^"]+"/, `name: "${spec.name}"`);
    
    // 2. Reemplazar tagline
    block = block.replace(/tagline:\s*"[^"]+"/, `tagline: "${spec.tagline}"`);
    
    // 3. Reemplazar badge
    block = block.replace(/badge:\s*"[^"]+"/, `badge: "${spec.badge}"`);
    
    // 4. Reemplazar stoneType
    block = block.replace(/stoneType:\s*"[^"]+"/, `stoneType: "${spec.stoneType}"`);
    
    // 5. Reemplazar description si existe
    block = block.replace(/description:\s*"[^"]+"/, `description: "${spec.description}"`);

    // 6. Actualizar details con el desglose exacto de 22 cuentas
    const newDetails = [
      `Cuerpo Principal: ${spec.mainBody}`,
      `Laterales Simétricos: ${spec.lateralBeads}`,
      `Pieza Central Focal: ${spec.centerPiece}`,
      `Total: 22 cuentas consagradas ensambladas a mano a tu medida exacta`
    ];
    const detailsReplacement = `details: [\n` + newDetails.map(d => `      "${d}",`).join('\n') + `\n    ]`;
    block = block.replace(/details:\s*\[[\s\S]*?\]/, detailsReplacement);

    // 7. Insertar o actualizar beadMatrix
    const beadMatrixCode = `beadMatrix: {\n      archetype: "${spec.archetype}",\n      mainBody: "${spec.mainBody}",\n      lateralBeads: "${spec.lateralBeads}",\n      centerPiece: "${spec.centerPiece}",\n      totalBeads: 22,\n    },`;
    
    if (block.includes('beadMatrix:')) {
      block = block.replace(/beadMatrix:\s*\{[\s\S]*?\},/, beadMatrixCode);
    } else {
      block = block.replace(/(arcanoNumber:\s*"[^"]+",)/, `$1\n    ${beadMatrixCode}`);
    }

    return block;
  });
});

fs.writeFileSync(filePath, currentCode, 'utf8');
console.log('✅ Matriz Técnica de los 22 Arcanos aplicada exitosamente a majorArcanaTalismans.ts');
