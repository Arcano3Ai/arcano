const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>ARCANO — Manual Maestro de Producción Audiovisual y Temarios Canónicos</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&display=swap');

    @page {
      size: A4;
      margin: 18mm 16mm 20mm 16mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: #0b0816;
      color: #ede5d8;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      page-break-after: always;
      position: relative;
      min-height: 250mm;
      padding-bottom: 15mm;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    /* Portada */
    .cover-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 255mm;
      border: 2px solid rgba(197, 160, 89, 0.4);
      outline: 1px solid rgba(197, 160, 89, 0.2);
      outline-offset: -8px;
      padding: 30px;
      background: radial-gradient(circle at center, #19122e 0%, #080611 100%);
    }

    .cover-glyph {
      font-size: 42pt;
      color: #dfb76c;
      margin-bottom: 20px;
      text-shadow: 0 0 20px rgba(223, 183, 108, 0.5);
    }

    .cover-title {
      font-family: 'Cinzel', serif;
      font-size: 28pt;
      font-weight: 900;
      color: #dfb76c;
      letter-spacing: 4px;
      line-height: 1.2;
      margin-bottom: 12px;
    }

    .cover-subtitle {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      color: #d1c4aa;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 30px;
      border-bottom: 1px solid rgba(197, 160, 89, 0.3);
      padding-bottom: 15px;
      width: 80%;
    }

    .cover-desc {
      font-size: 11pt;
      color: #b3a492;
      max-width: 520px;
      line-height: 1.7;
      margin-bottom: 40px;
    }

    .cover-badge {
      display: inline-block;
      border: 1px solid #c5a059;
      background: rgba(197, 160, 89, 0.1);
      padding: 8px 24px;
      font-size: 10pt;
      font-weight: 600;
      letter-spacing: 1.5px;
      color: #f7e7ce;
      text-transform: uppercase;
      border-radius: 4px;
      margin-bottom: 40px;
    }

    .cover-footer {
      margin-top: auto;
      font-size: 9.5pt;
      color: #8c7f70;
      letter-spacing: 1px;
    }

    /* Encabezados Generales */
    .header-bar {
      border-bottom: 1px solid rgba(197, 160, 89, 0.3);
      padding-bottom: 8px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .header-bar h2 {
      font-family: 'Cinzel', serif;
      font-size: 18pt;
      color: #dfb76c;
      letter-spacing: 1.5px;
      font-weight: 700;
    }

    .header-bar span {
      font-size: 8.5pt;
      color: #a39583;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    h3 {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      color: #dfb76c;
      margin: 18px 0 10px 0;
      letter-spacing: 0.8px;
      border-left: 3px solid #c5a059;
      padding-left: 10px;
    }

    p {
      margin-bottom: 10px;
      color: #dfd7ca;
      font-size: 10pt;
      text-align: justify;
    }

    /* Tarjetas y Contenedores */
    .card-box {
      background: rgba(26, 20, 48, 0.6);
      border: 1px solid rgba(197, 160, 89, 0.25);
      border-radius: 6px;
      padding: 14px 18px;
      margin-bottom: 14px;
      page-break-inside: avoid;
    }

    .card-box-gold {
      background: rgba(197, 160, 89, 0.08);
      border: 1px solid rgba(197, 160, 89, 0.4);
      border-radius: 6px;
      padding: 14px 18px;
      margin-bottom: 16px;
      page-break-inside: avoid;
    }

    .card-box h4 {
      font-family: 'Cinzel', serif;
      font-size: 11pt;
      color: #f3dfb5;
      margin-bottom: 6px;
    }

    /* Tablas */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0 18px 0;
      font-size: 9pt;
      page-break-inside: avoid;
    }

    th {
      background: rgba(197, 160, 89, 0.2);
      color: #f7e7ce;
      font-family: 'Cinzel', serif;
      font-size: 8.5pt;
      letter-spacing: 0.8px;
      padding: 8px 10px;
      border: 1px solid rgba(197, 160, 89, 0.35);
      text-align: left;
    }

    td {
      padding: 8px 10px;
      border: 1px solid rgba(197, 160, 89, 0.2);
      color: #dfd7ca;
      vertical-align: top;
      background: rgba(16, 12, 32, 0.5);
    }

    tr:nth-child(even) td {
      background: rgba(25, 19, 48, 0.5);
    }

    .badge-tag {
      display: inline-block;
      font-size: 7.5pt;
      font-weight: 700;
      color: #dfb76c;
      border: 1px solid rgba(197, 160, 89, 0.4);
      padding: 2px 6px;
      border-radius: 3px;
      text-transform: uppercase;
    }

    /* Listas curriculares */
    .syllabus-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 10px;
    }

    .syllabus-block {
      background: rgba(22, 17, 40, 0.7);
      border: 1px solid rgba(197, 160, 89, 0.2);
      border-radius: 5px;
      padding: 10px 14px;
      font-size: 8.5pt;
      page-break-inside: avoid;
    }

    .syllabus-block h5 {
      font-family: 'Cinzel', serif;
      font-size: 9pt;
      color: #dfb76c;
      margin-bottom: 6px;
      border-bottom: 1px solid rgba(197, 160, 89, 0.15);
      padding-bottom: 3px;
    }

    .syllabus-block ul {
      list-style-type: none;
      padding-left: 0;
    }

    .syllabus-block li {
      margin-bottom: 4px;
      color: #c9bfaf;
      padding-left: 12px;
      position: relative;
      line-height: 1.35;
    }

    .syllabus-block li::before {
      content: '•';
      color: #c5a059;
      position: absolute;
      left: 0;
      font-size: 10pt;
    }

    .checklist-table td {
      font-size: 9pt;
    }

    .check-box {
      display: inline-block;
      width: 13px;
      height: 13px;
      border: 1.5px solid #c5a059;
      border-radius: 2px;
      margin-right: 6px;
      vertical-align: middle;
    }

    .footer-note {
      font-size: 8pt;
      color: #8a7c6c;
      border-top: 1px solid rgba(197, 160, 89, 0.2);
      padding-top: 6px;
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>

  <!-- ============================================================ -->
  <!-- PÁGINA 1: PORTADA EDITORIAL                                  -->
  <!-- ============================================================ -->
  <div class="page">
    <div class="cover-container">
      <div class="cover-glyph">✦ 🎴 ☉ ⬡ ✺ ✦</div>
      <h1 class="cover-title">ARCANO</h1>
      <div class="cover-subtitle">SABIDURÍA DE LOS ARCANOS & ESCUELA ESOTÉRICA</div>
      
      <div class="cover-badge">CUADERNO DE PRODUCCIÓN AUDIOVISUAL & TEMARIOS CANÓNICOS</div>
      
      <p class="cover-desc">
        Manual integral de rodaje, especificaciones técnicas y guía curricular estandarizada para la creación de las lecciones en video de las 4 Rutas de Aprendizaje: <strong>Tarot</strong>, <strong>Astrología</strong>, <strong>Numerología</strong> y <strong>Reiki Usui</strong>.
      </p>

      <div style="margin-top: 20px; font-size: 9.5pt; color: #dfb76c;">
        <p><strong>Dirección de Escuela & Tutoría Oficial:</strong> consultas@arcanosolutions.com</p>
        <p><strong>Plataforma LMS:</strong> https://arcano-web.vercel.app/academia</p>
      </div>

      <div class="cover-footer">
        DOCUMENTO CONFIDENCIAL DE PRODUCCIÓN — EDICIÓN RECTORAL 2026
      </div>
    </div>
  </div>

  <!-- ============================================================ -->
  <!-- PÁGINA 2: FILOSOFÍA Y PROTOCOLO DE GRABACIÓN                 -->
  <!-- ============================================================ -->
  <div class="page">
    <div class="header-bar">
      <h2>I. ESTRATEGIA PEDAGÓGICA Y PROTOCOLO TÉCNICO</h2>
      <span>ARCANO • GUÍA DE PRODUCCIÓN</span>
    </div>

    <div class="card-box-gold">
      <h4>🏛️ El Fundamento de la Escuela: Textos Primero, Videos como Coronación</h4>
      <p>
        En la Academia ARCANO, la enseñanza esotérica se asienta sobre bases filosóficas rigurosas. La plataforma prioriza en primer término los <strong>Tratados Herméticos Escritos</strong> y las <strong>Sintonizaciones Acústicas Sagradas</strong>, asegurando que el estudiante absorba la doctrina con concentración y profundidad.
      </p>
      <p>
        Los videos formativos no buscan reemplazar la lectura, sino coronarla: actuar como el contacto vivo entre el Maestro y el Iniciado, demostrando en mesa la ejecución de tiradas, el cálculo de cartas natales y la imposición de manos.
      </p>
    </div>

    <h3>🎬 La "Fórmula de los 4 Bloques" (10 a 12 Minutos por Video)</h3>
    <p>
      Para evitar agotamiento en la producción y garantizar videos dinámicos y profesionales, cada lección debe seguir estrictamente este esquema cronometrado:
    </p>

    <div class="card-box">
      <p><strong>1. Apertura Litúrgica y Gancho (1 minuto):</strong></p>
      <p style="color: #b3a492; font-size: 9pt;">
        Saludo ceremonial formal (ej. <em>"Saludos iniciado, bienvenido a la lección..."</em>). Enuncia el objetivo puntual de la clase y la promesa de aprendizaje concreta.
      </p>
    </div>

    <div class="card-box">
      <p><strong>2. Doctrina y Concepto Clave (4 a 5 minutos):</strong></p>
      <p style="color: #b3a492; font-size: 9pt;">
        Plano frontal a cámara. Explicación conceptual, simbólica y arquetípica. Conexión de la teoría con la psicología humana y el principio hermético correspondiente.
      </p>
    </div>

    <div class="card-box">
      <p><strong>3. Demostración Práctica en Mesa (4 a 5 minutos):</strong></p>
      <p style="color: #b3a492; font-size: 9pt;">
        Plano cenital (o cámara enfocando la mesa). Muestra física de las cartas, el tapete, la rueda zodiacal, las cuadrículas pitagóricas o las posiciones de manos sobre el modelo o cojín.
      </p>
    </div>

    <div class="card-box">
      <p><strong>4. Tarea Acústica, Entrega de Bitácora y Bendición (1 minuto):</strong></p>
      <p style="color: #b3a492; font-size: 9pt;">
        Instrucción precisa: escuchar el himno sagrado del arcano en el aula, redactar el diario y enviar el ejercicio a <code>consultas@arcanosolutions.com</code>. Despedida ceremonial.
      </p>
    </div>

    <h3>🛠️ Configuración de Estudio & Set de Grabación</h3>
    <table>
      <thead>
        <tr>
          <th>Elemento</th>
          <th>Configuración Recomendada</th>
          <th>Detalle Ceremonial</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Cámara / Celular</strong></td>
          <td>Resolución 1080p a 30 o 60 fps (16:9)</td>
          <td>Dos planos: Frontal (rostro) y Cenital (mesa con tapete).</td>
        </tr>
        <tr>
          <td><strong>Audio</strong></td>
          <td>Micrófono de solapa (Lavalier) o condensador USB</td>
          <td>Voz cálida, serena, sin eco y sin ruido de fondo.</td>
        </tr>
        <tr>
          <td><strong>Iluminación</strong></td>
          <td>Luz principal difusa (aro o panel suave)</td>
          <td>Ambiente sobrio (*Dark Luxury*), luz cálida lateral.</td>
        </tr>
        <tr>
          <td><strong>Escenografía</strong></td>
          <td>Tapete de terciopelo morado, negro o azul noche</td>
          <td>Vela encendida fuera de encuadre riesgoso, cuarzo, incienso.</td>
        </tr>
      </tbody>
    </table>

    <div class="footer-note">
      <span>ARCANO • Escuela Iniciática</span>
      <span>Página 2</span>
    </div>
  </div>

  <!-- ============================================================ -->
  <!-- PÁGINA 3: PLAN DE RODAJE - TAROT NIVEL 1                     -->
  <!-- ============================================================ -->
  <div class="page">
    <div class="header-bar">
      <h2>II. PLAN DE RODAJE: TAROT DESDE CERO (NIVEL 1)</h2>
      <span>CURSO FUNDACIONAL EN PROMOCIÓN GRATUITA</span>
    </div>

    <p>
      Este es el primer curso que tus alumnos consumirán al registrarse de forma gratuita. Los videos deben ser impecables, acogedores y sumamente claros.
    </p>

    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Video & Lección</th>
          <th style="width: 12%;">Duración</th>
          <th style="width: 38%;">Objetivo & Demostración en Mesa</th>
          <th style="width: 25%;">Tarea & Audio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>Lección 1:</strong><br>
            Origen Histórico y Hermético
          </td>
          <td>10 - 12 min</td>
          <td>Presentación personal de la escuela. Mostrar un mazo consagrado. Desmitificar el miedo al Tarot: explicar el concepto de espejo arquetípico.</td>
          <td>
            <span class="badge-tag">Himno El Loco</span><br>
            Tres respiraciones y reflexión en diario.
          </td>
        </tr>
        <tr>
          <td>
            <strong>Lección 2:</strong><br>
            Estructura del Mazo: 78 Naipes
          </td>
          <td>12 - 14 min</td>
          <td>Separar físicamente el mazo en cámara cenital: montón de 22 Mayores y montón de 56 Menores. Explicar el mapa general.</td>
          <td>
            <span class="badge-tag">Invocación El Mago</span><br>
            Clasificar su baraja en casa.
          </td>
        </tr>
        <tr>
          <td>
            <strong>Lección 3:</strong><br>
            Arcanos Mayores vs. Menores
          </td>
          <td>12 - 15 min</td>
          <td>Comparación cara a cara: Arcano Mayor (arquetipo del alma) frente a Menor (suceso terrenal cotidiano). Ejemplos visuales claros.</td>
          <td>
            <span class="badge-tag">La Sacerdotisa</span><br>
            Elegir 1 mayor y 1 menor al azar y comparar.
          </td>
        </tr>
        <tr>
          <td>
            <strong>Lección 4:</strong><br>
            Palabras Clave y Polaridad
          </td>
          <td>11 - 13 min</td>
          <td>Demostrar cómo una misma carta tiene expresión en luz (don) y en sombra (exceso o miedo). Enseñar a no juzgar cartas como "malas".</td>
          <td>
            <span class="badge-tag">La Emperatriz</span><br>
            Ficha de luz y sombra de 3 cartas.
          </td>
        </tr>
        <tr>
          <td>
            <strong>Lección 5:</strong><br>
            Los 4 Palos y 4 Elementos
          </td>
          <td>15 - 18 min</td>
          <td>Desplegar los 4 Ases en cruz en la mesa: Bastos (Fuego), Copas (Agua), Espadas (Aire) y Oros (Tierra). Sentir la energía elemental.</td>
          <td>
            <span class="badge-tag">Los Enamorados</span><br>
            Asignar una situación personal a cada elemento.
          </td>
        </tr>
        <tr>
          <td>
            <strong>Lección 6:</strong><br>
            Consagración, Espacio y Barajado
          </td>
          <td>14 - 16 min</td>
          <td>Ritual de consagración con los 4 elementos en mesa. Mostrar técnicas de barajado respetuoso y corte con la mano izquierda receptiva.</td>
          <td>
            <span class="badge-tag">La Fuerza</span><br>
            Consagrar su mazo y enviar foto/bitácora.
          </td>
        </tr>
        <tr>
          <td>
            <strong>Lección 7:</strong><br>
            Primeras Tiradas: 1 y 3 Cartas
          </td>
          <td>16 - 20 min</td>
          <td>Demostración en vivo de una tirada de 1 carta (oráculo diario) y de 3 cartas (Pasado-Presente-Futuro). Lectura paso a paso en voz alta.</td>
          <td>
            <span class="badge-tag">El Carro</span><br>
            Hacer su primera tirada y enviarla por correo.
          </td>
        </tr>
      </tbody>
    </table>

    <div class="card-box">
      <h4>📬 Instrucción de Envío de Tareas para el Alumno</h4>
      <p style="font-size: 9pt;">
        Recuerda reiterar en cada video: <em>"Toma una fotografía de tu tirada o redacta tu informe de bitácora y envíalo directamente a nuestro correo oficial de tutoría: <strong>consultas@arcanosolutions.com</strong> para ser evaluado por los Maestros del Templo."</em>
      </p>
    </div>

    <div class="footer-note">
      <span>ARCANO • Escuela Iniciática</span>
      <span>Página 3</span>
    </div>
  </div>

  <!-- ============================================================ -->
  <!-- PÁGINA 4: PLAN DE RODAJE - ASTROLOGÍA, NUMEROLOGÍA Y REIKI   -->
  <!-- ============================================================ -->
  <div class="page">
    <div class="header-bar">
      <h2>III. PLAN DE RODAJE: ASTROLOGÍA, NUMEROLOGÍA Y REIKI</h2>
      <span>LECCIONES MAESTRAS DE LAS OTRAS 3 SENDAS</span>
    </div>

    <h3>☉ Astrología Nivel 1 (7 Videos Fundacionales)</h3>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Video</th>
          <th style="width: 50%;">Objetivo & Enfoque de Demostración</th>
          <th style="width: 25%;">Material en Cámara</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>1. El Mandala Celeste</strong></td>
          <td>Introducción a la bóveda celeste. Principio hermético *"Como es arriba, es abajo"*.</td>
          <td>Rueda zodiacal de 360° en lámina impresa.</td>
        </tr>
        <tr>
          <td><strong>2. Las 2 Luminarias</strong></td>
          <td>El Sol (conciencia, identidad, voluntad) y la Luna (matriz emocional y memoria infantil).</td>
          <td>Símbolos astronómicos ☉ y ☽ en primer plano.</td>
        </tr>
        <tr>
          <td><strong>3. Planetas Personales</strong></td>
          <td>Mercurio (intelecto), Venus (vínculo y valor) y Marte (deseo y acción).</td>
          <td>Tabla de glifos y arquetipos mitológicos.</td>
        </tr>
        <tr>
          <td><strong>4. Elementos y Modalidades</strong></td>
          <td>Fuego, Tierra, Aire y Agua; signos Cardinales, Fijos y Mutables.</td>
          <td>Matriz comparativa de 12 signos.</td>
        </tr>
        <tr>
          <td><strong>5. Las 12 Casas</strong></td>
          <td>Las 12 áreas concretas de vida humana (del Ascendente al Medio Cielo).</td>
          <td>Gráfico de carta natal dividida en 12 gajos.</td>
        </tr>
        <tr>
          <td><strong>6. Aspectos Mayores</strong></td>
          <td>Geometría sagrada celeste: Conjunción, Oposición, Trígono, Cuadratura y Sextil.</td>
          <td>Trazado de líneas de colores sobre una rueda.</td>
        </tr>
        <tr>
          <td><strong>7. Tríada Fundamental</strong></td>
          <td>Cómo sintetizar el Sol, la Luna y el Ascendente en una lectura de carta natal.</td>
          <td>Carta natal real comentada paso a paso.</td>
        </tr>
      </tbody>
    </table>

    <h3>⬡ Numerología Nivel 1 (7 Videos Fundacionales)</h3>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Video</th>
          <th style="width: 50%;">Objetivo & Enfoque de Demostración</th>
          <th style="width: 25%;">Material en Cámara</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>1. Mística del Número</strong></td>
          <td>Pitágoras y la vibración universal. El universo codificado en matemáticas sagradas.</td>
          <td>Pizarra o libreta pitagórica con fórmulas.</td>
        </tr>
        <tr>
          <td><strong>2. Tabla Alfanumérica</strong></td>
          <td>Conversión de letras a números del 1 al 9 paso a paso con el nombre del instructor.</td>
          <td>Tabla pitagórica en primer plano.</td>
        </tr>
        <tr>
          <td><strong>3. Números del 1 al 9</strong></td>
          <td>Vibración arquetípica en luz y sombra de los 9 números base.</td>
          <td>Tarjetas de cada dígito y palabras clave.</td>
        </tr>
        <tr>
          <td><strong>4. Números Maestros</strong></td>
          <td>El llamado superior y exigencia de los números 11, 22, 33 y 44.</td>
          <td>Geometrías sagradas y misiones del alma.</td>
        </tr>
        <tr>
          <td><strong>5. Deudas Kármicas</strong></td>
          <td>Orígenes y redención de los números 13/4, 14/5, 16/7 y 19/1.</td>
          <td>Desglose de ejemplos biográficos.</td>
        </tr>
        <tr>
          <td><strong>6. Sendero de Vida</strong></td>
          <td>Cálculo exacto del Camino del Destino con la fecha de nacimiento completa.</td>
          <td>Demostración de reducción teosófica en mesa.</td>
        </tr>
        <tr>
          <td><strong>7. El Mapa del Año Personal</strong></td>
          <td>Cómo calcular el ciclo anual personal y sincronizar con sus etapas.</td>
          <td>Rueda de los 9 años y calendario personal.</td>
        </tr>
      </tbody>
    </table>

    <h3>✺ Reiki Usui Nivel 1 (7 Videos Fundacionales)</h3>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Video</th>
          <th style="width: 50%;">Objetivo & Enfoque de Demostración</th>
          <th style="width: 25%;">Material en Cámara</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>1. Canal de Energía Vital</strong></td>
          <td>Qué es el Reiki, historia del Maestro Mikao Usui y el concepto de canal puro.</td>
          <td>Espacio sagrado, cojín y postura Gassho.</td>
        </tr>
        <tr>
          <td><strong>2. Los 5 Principios Gokai</strong></td>
          <td>Decretos en japonés y español; recitación diaria de armonización mental.</td>
          <td>Rollo japonés o lámina de los 5 principios.</td>
        </tr>
        <tr>
          <td><strong>3. Anatomía Sutil y Chakras</strong></td>
          <td>Los 7 vórtices principales, glándulas endocrinas y capas del aura.</td>
          <td>Lámina anatómica de los 7 centros energéticos.</td>
        </tr>
        <tr>
          <td><strong>4. Limpieza Kenyoku Ho</strong></td>
          <td>Técnica del baño seco para cortar energías densas antes y después de una sesión.</td>
          <td>Demostración física corporal de los roces.</td>
        </tr>
        <tr>
          <td><strong>5. El Símbolo Cho Ku Rei</strong></td>
          <td>Trazo sagrado del símbolo de poder, mantra y activación en palmas de manos.</td>
          <td>Trazado en el aire y en papel ceremonial.</td>
        </tr>
        <tr>
          <td><strong>6. Autotratamiento</strong></td>
          <td>Las 12 posiciones de manos sobre uno mismo (cabeza, garganta, plexo, abdomen).</td>
          <td>Demostración completa en vivo de las posturas.</td>
        </tr>
        <tr>
          <td><strong>7. Tratamiento y 21 Días</strong></td>
          <td>Cómo realizar una sesión básica a otra persona y protocolo de purificación de 21 días.</td>
          <td>Sesión sobre camilla o silla con voluntario.</td>
        </tr>
      </tbody>
    </table>

    <div class="footer-note">
      <span>ARCANO • Escuela Iniciática</span>
      <span>Página 4</span>
    </div>
  </div>

  <!-- ============================================================ -->
  <!-- PÁGINA 5: TEMARIO CANÓNICO DE TAROT (14 DIMENSIONES)         -->
  <!-- ============================================================ -->
  <div class="page">
    <div class="header-bar">
      <h2>IV. TEMARIO MAESTRO: TAROT HERMÉTICO Y EVOLUTIVO</h2>
      <span>ESTRUCTURA CURRICULAR CANÓNICA (14 MÓDULOS)</span>
    </div>

    <div class="syllabus-grid">
      <div class="syllabus-block">
        <h5>1. INTRODUCCIÓN AL TAROT</h5>
        <ul>
          <li>Objetivos del curso y misión del iniciado.</li>
          <li>Historia y origen hermético (Egipto, Marsella, Rider-Waite).</li>
          <li>Materiales: mazo consagrado, paño ritual y bitácora.</li>
          <li>Expectativas del curso y viaje formativo.</li>
        </ul>
      </div>

      <div class="syllabus-block">
        <h5>2. COMPRENDIENDO LA BARAJA</h5>
        <ul>
          <li>Estructura de 78 cartas (22 Mayores y 56 Menores).</li>
          <li>Tipos de barajas y escuelas tradicionales.</li>
          <li>Primera actividad: calibración energética del mazo.</li>
        </ul>
      </div>

      <div class="syllabus-block">
        <h5>3. LOS ARCANOS MAYORES</h5>
        <ul>
          <li>Significado profundo de los 22 Arcanos Mayores.</li>
          <li>Simbología esotérica, colores y geometría sagrada.</li>
          <li>El viaje del Loco y leyes de polaridad en luz y sombra.</li>
        </ul>
      </div>

      <div class="syllabus-block">
        <h5>4. LOS ARCANOS MENORES</h5>
        <ul>
          <li>Los 4 palos y progresión numérica del As al Diez.</li>
          <li>Significado de Copas, Espadas, Oros y Bastos.</li>
          <li>Las 16 Figuras de la Corte como tipos psicológicos.</li>
        </ul>
      </div>

      <div class="syllabus-block">
        <h5>5. MÉTODOS DE TIRADA</h5>
        <ul>
          <li>Tirada de una carta (oráculo y foco del día).</li>
          <li>Tirada de tres cartas (Pasado - Presente - Futuro).</li>
          <li>Tirada de la Cruz Celta (mapa sagrado de 10 naipes).</li>
          <li>Tiradas de decisión y tirada de vínculo afectivo.</li>
        </ul>
      </div>

      <div class="syllabus-block">
        <h5>6. INTERPRETACIÓN DE TIRADAS</h5>
        <ul>
          <li>Flujo visual, miradas e interacción entre cartas.</li>
          <li>Interpretación intuitiva vs. rigor dogmático.</li>
          <li>Ejercicios prácticos de integración narrativa.</li>
        </ul>
      </div>

      <div class="syllabus-block">
        <h5>7. ÉTICA Y RESPONSABILIDAD</h5>
        <ul>
          <li>Código de ética en la lectura profesional.</li>
          <li>Manejo de consultas sobre salud, muerte y legal.</li>
          <li>Preservación del libre albedrío del consultante.</li>
        </ul>
      </div>

      <div class="syllabus-block">
        <h5>8. PRÁCTICA Y DESARROLLO PERSONAL</h5>
        <ul>
          <li>Consejos para despertar el canal intuitivo.</li>
          <li>Ejercicios de práctica diaria y autoevaluación.</li>
          <li>Creación y custodia del Diario de Tarot.</li>
        </ul>
      </div>

      <div class="syllabus-block">
        <h5>9. RECURSOS ADICIONALES</h5>
        <ul>
          <li>Bibliografía recomendada (Pollack, Nichols, Waite).</li>
          <li>Aplicaciones y herramientas digitales de apoyo.</li>
        </ul>
      </div>

      <div class="syllabus-block">
        <h5>10. CONEXIÓN ESPIRITUAL</h5>
        <ul>
          <li>Apertura del espacio sagrado y protección psíquica.</li>
          <li>Invocación a guías y maestros antes de barajar.</li>
        </ul>
      </div>

      <div class="syllabus-block">
        <h5>11. DIFERENTES USOS DEL TAROT</h5>
        <ul>
          <li>Tarot evolutivo y terapéutico (arquetipos junguianos).</li>
          <li>Tarot oracular de tendencias energéticas.</li>
          <li>Tarot meditativo para la visualización activa.</li>
        </ul>
      </div>

      <div class="syllabus-block">
        <h5>12. TIRADAS COMENTADAS</h5>
        <ul>
          <li>Caso real 1: Desbloqueo laboral con Cruz Celta.</li>
          <li>Caso real 2: Tirada de pareja y cartas en espejo.</li>
        </ul>
      </div>

      <div class="syllabus-block">
        <h5>13. ESQUEMAS Y RESÚMENES</h5>
        <ul>
          <li>Tabla de correspondencias astrológicas y cabalísticas.</li>
          <li>Guía sintética de palabras clave en luz y sombra.</li>
          <li>Ficha de registro de tiradas imprimible.</li>
        </ul>
      </div>

      <div class="syllabus-block">
        <h5>14. CONCLUSIÓN Y CERTIFICACIÓN</h5>
        <ul>
          <li>Repaso integrador de los conceptos angulares.</li>
          <li>Siguientes pasos hacia el Nivel 2 y 3.</li>
          <li>Certificación oficial de finalización de ARCANO.</li>
        </ul>
      </div>
    </div>

    <div class="footer-note">
      <span>ARCANO • Escuela Iniciática</span>
      <span>Página 5</span>
    </div>
  </div>

  <!-- ============================================================ -->
  <!-- PÁGINA 6: TEMARIOS DE ASTROLOGÍA, NUMEROLOGÍA Y REIKI        -->
  <!-- ============================================================ -->
  <div class="page">
    <div class="header-bar">
      <h2>V. TEMARIOS MAESTROS: ASTROLOGÍA, NUMEROLOGÍA Y REIKI</h2>
      <span>MATRIZ SINTÉTICA DE LAS 14 DIMENSIONES</span>
    </div>

    <h3>☉ Astrología Hermética & Natal (14 Módulos)</h3>
    <div style="font-size: 8pt; color: #c9bfaf; margin-bottom: 15px; line-height: 1.5;">
      <strong>1. Introducción:</strong> Historia y principio "Como es arriba, es abajo" • 
      <strong>2. El Mandala:</strong> La rueda de 360°, los 12 signos y el horizonte • 
      <strong>3. Luminarias y Planetas:</strong> Sol, Luna, personales y transpersonales • 
      <strong>4. Signos y Casas:</strong> 4 Elementos, 3 Modalidades y las 12 casas natales • 
      <strong>5. Métodos de Lectura:</strong> Tríada fundamental (Sol, Luna, Ascendente) y aspectos mayores • 
      <strong>6. Interpretación:</strong> Síntesis integradora e intuición vs. cálculo • 
      <strong>7. Ética:</strong> Comunicación de tránsitos difíciles sin generar pánico • 
      <strong>8. Práctica Diaria:</strong> Seguimiento del tránsito lunar y diario astrológico • 
      <strong>9. Recursos:</strong> Libros (Greene, Sasportas, Arroyo) y software astronómico • 
      <strong>10. Conexión:</strong> Sintonización con los arquetipos planetarios • 
      <strong>11. Usos:</strong> Astrología natal, sinastría de pareja y tránsitos evolutivos • 
      <strong>12. Casos Reales:</strong> Análisis comentado de cartas con cuadraturas en T • 
      <strong>13. Esquemas:</strong> Tablas de dignidades planetarias y glifos celestes • 
      <strong>14. Conclusión:</strong> Pasos de especialización y certificación oficial.
    </div>

    <h3>⬡ Numerología Pitagórica & Sagrada (14 Módulos)</h3>
    <div style="font-size: 8pt; color: #c9bfaf; margin-bottom: 15px; line-height: 1.5;">
      <strong>1. Introducción:</strong> Pitágoras y las matemáticas sagradas universales • 
      <strong>2. Sistema Sagrado:</strong> Tabla alfanumérica y reducción teosófica • 
      <strong>3. Dígitos y Maestros:</strong> Los números base (1 al 9) y Maestros (11, 22, 33) • 
      <strong>4. Kármicos y Nombre:</strong> Deudas 13/4, 14/5, 16/7, 19/1, Alma y Personalidad • 
      <strong>5. Métodos de Cálculo:</strong> Sendero de Vida, 4 Pináculos y Desafíos • 
      <strong>6. Interpretación:</strong> Fusión armónica de fecha y nombre completo • 
      <strong>7. Ética:</strong> Asesoramiento constructivo sin sugestión negativa • 
      <strong>8. Práctica Diaria:</strong> Identificación de números espejo y bitácora pitagórica • 
      <strong>9. Recursos:</strong> Tratados clásicos y calculadoras de mapas de pináculos • 
      <strong>10. Conexión:</strong> Meditaciones con la geometría sagrada del número • 
      <strong>11. Usos:</strong> Vocación, sinastría de nombres y ciclos anuales personales • 
      <strong>12. Casos Reales:</strong> Estudio de Sendero 7 con Maestro 11 y Deuda 14/5 • 
      <strong>13. Esquemas:</strong> Fichas rápidas de equivalencias alfanuméricas • 
      <strong>14. Conclusión:</strong> Examen de integración y certificación de finalización.
    </div>

    <h3>✺ Reiki Usui Tradicional & Energía (14 Módulos)</h3>
    <div style="font-size: 8pt; color: #c9bfaf; margin-bottom: 15px; line-height: 1.5;">
      <strong>1. Introducción:</strong> Linaje Mikao Usui y el concepto de canal transparente • 
      <strong>2. Anatomía Sutil:</strong> Los 7 Chakras principales y capas del campo áurico • 
      <strong>3. Principios y Símbolos:</strong> Los 5 Gokai, rito Reiju y símbolo Cho Ku Rei • 
      <strong>4. Canales y Preparación:</strong> Meridianos, Kenyoku Ho (baño seco) y Byosen • 
      <strong>5. Métodos y Posiciones:</strong> 12 posiciones de autotratamiento y tratamiento a otros • 
      <strong>6. Interpretación:</strong> Sensibilidad en palmas sin diagnósticos médicos • 
      <strong>7. Ética:</strong> El Reiki como terapia complementaria y desapego del resultado • 
      <strong>8. Práctica Diaria:</strong> Los 21 días de purificación y meditación Gassho • 
      <strong>9. Recursos:</strong> Bibliografía de linaje Usui y frecuencias sonoras a 432Hz • 
      <strong>10. Conexión:</strong> Sintonización con la Fuente Universal y guías espirituales • 
      <strong>11. Usos:</strong> Alivio del estrés, armonización de espacios y procesos de duelo • 
      <strong>12. Casos Reales:</strong> Sesión completa comentada y manejo de catarsis emocional • 
      <strong>13. Esquemas:</strong> Guía ilustrada de posiciones de manos y tabla de chakras • 
      <strong>14. Conclusión:</strong> Juramento del canal de luz y diploma de Nivel 1.
    </div>

    <div class="footer-note">
      <span>ARCANO • Escuela Iniciática</span>
      <span>Página 6</span>
    </div>
  </div>

  <!-- ============================================================ -->
  <!-- PÁGINA 7: CHECKLIST Y BITÁCORA DE RODAJE IMPRIMIBLE          -->
  <!-- ============================================================ -->
  <div class="page">
    <div class="header-bar">
      <h2>VI. BITÁCORA DE CONTROL Y CHECKLIST DE RODAJE</h2>
      <span>HOJA DE RUTA PARA IMPRIMIR Y MARCAR DURANTE LA GRABACIÓN</span>
    </div>

    <p>
      Utiliza esta hoja para llevar el control físico de la producción de los 7 videos de <strong>Tarot Nivel 1</strong>. Tacha cada casilla conforme avances.
    </p>

    <table class="checklist-table">
      <thead>
        <tr>
          <th>Lección & Título</th>
          <th style="text-align:center;">Guion Listo</th>
          <th style="text-align:center;">Grabado</th>
          <th style="text-align:center;">Editado</th>
          <th style="text-align:center;">Subido</th>
          <th>ID / Enlace de Video</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>01. Origen Histórico y Hermético</strong></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="font-family: monospace; font-size: 8pt; color: #8a7c6c;">https://youtu.be/...</td>
        </tr>
        <tr>
          <td><strong>02. Estructura del Mazo (78 Naipes)</strong></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="font-family: monospace; font-size: 8pt; color: #8a7c6c;">https://youtu.be/...</td>
        </tr>
        <tr>
          <td><strong>03. Arcanos Mayores vs. Menores</strong></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="font-family: monospace; font-size: 8pt; color: #8a7c6c;">https://youtu.be/...</td>
        </tr>
        <tr>
          <td><strong>04. Palabras Clave y Polaridad</strong></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="font-family: monospace; font-size: 8pt; color: #8a7c6c;">https://youtu.be/...</td>
        </tr>
        <tr>
          <td><strong>05. 4 Palos y 4 Elementos</strong></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="font-family: monospace; font-size: 8pt; color: #8a7c6c;">https://youtu.be/...</td>
        </tr>
        <tr>
          <td><strong>06. Consagración y Barajado</strong></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="font-family: monospace; font-size: 8pt; color: #8a7c6c;">https://youtu.be/...</td>
        </tr>
        <tr>
          <td><strong>07. Primeras Tiradas: 1 y 3 Cartas</strong></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="text-align:center;"><span class="check-box"></span></td>
          <td style="font-family: monospace; font-size: 8pt; color: #8a7c6c;">https://youtu.be/...</td>
        </tr>
      </tbody>
    </table>

    <div class="card-box-gold" style="margin-top: 25px;">
      <h4>🚀 Cómo Activar los Videos en la Plataforma ARCANO</h4>
      <p style="font-size: 9pt;">
        1. Sube cada video a tu canal de <strong>YouTube en modo "No Listado" (Unlisted)</strong> o a tu cuenta de <strong>Vimeo / Google Drive</strong>.<br>
        2. Copia el identificador único del video (por ejemplo, en <code>https://youtube.com/watch?v=AbCdEf123</code> el ID es <code>AbCdEf123</code>).<br>
        3. Pega los IDs en el archivo del repositorio <code>src/data/academyStudyLevel1.ts</code> o indícamelo en el chat y los dejaré conectados inmediatamente.<br>
        4. Al momento de publicarse, el aviso de <em>"Material en Producción en el Templo"</em> se transformará automáticamente en el aula de video interactiva para los estudiantes.
      </p>
    </div>

    <div class="footer-note">
      <span>ARCANO • Sabiduría de los Arcanos</span>
      <span>Página 7 • Fin del Manual</span>
    </div>
  </div>

</body>
</html>
`;

async function main() {
  const outputDir = path.join(__dirname, '..', 'public', 'manuales');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const pdfPath = path.join(outputDir, 'ARCANO_Manual_Maestro_Temarios_y_Produccion_Videos.pdf');
  const tempHtmlPath = path.join(__dirname, 'temp_curriculum.html');

  fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');

  console.log('Iniciando Puppeteer Core con Google Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.goto('file://' + tempHtmlPath, { waitUntil: 'networkidle0' });

  console.log('Generando documento PDF de alta fidelidad...');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm',
    },
  });

  await browser.close();

  // Limpiar HTML temporal
  if (fs.existsSync(tempHtmlPath)) {
    fs.unlinkSync(tempHtmlPath);
  }

  console.log('✅ PDF generado exitosamente en:', pdfPath);
}

main().catch((err) => {
  console.error('Error generando PDF:', err);
  process.exit(1);
});
