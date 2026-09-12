export interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Sesiones" | "Ética y Filosofía";
}

export const faqList: FAQItem[] = [
  {
    question: "¿Qué es una lectura de tarot en ARCANO?",
    answer: "Una lectura de tarot es un diálogo estructurado a través de símbolos arquetípicos universales. En ARCANO no la concebimos como un acto de adivinación determinista, sino como un espejo sagrado que refleja las corrientes inconscientes, motivaciones, miedos y posibilidades que rodean tu momento actual, facilitando la toma de decisiones conscientes.",
    category: "General",
  },
  {
    question: "¿Necesito preparar alguna pregunta antes de mi sesión?",
    answer: "No es estrictamente obligatorio, pero suele enriquecer la experiencia. Si tienes un tema que te preocupa (vínculos, proyectos, vocación), te recomendamos llegar con una intención clara o una pregunta abierta (por ejemplo: '¿Qué dinámica necesito comprender respecto a...?'). Si no tienes una pregunta específica, la Lectura General explorará el mapa completo de tu presente.",
    category: "Sesiones",
  },
  {
    question: "¿Cuánto dura una sesión?",
    answer: "Las sesiones oscilan entre los 30 y los 90 minutos según la modalidad que elijas. Nuestra Lectura General dura 45 minutos, las lecturas temáticas de Amor y Trabajo 50 minutos, la Lectura Profunda 75 minutos, y la Lectura Privada de inmersión total 90 minutos.",
    category: "Sesiones",
  },
  {
    question: "¿Las lecturas son presenciales o en línea?",
    answer: "La mayoría de nuestras consultas se realizan en línea a través de videoconferencia privada en alta definición, lo que permite conectar con consultantes de todo el mundo hispanohablante. La Lectura Privada de 90 minutos dispone además de opción presencial en nuestro santuario según disponibilidad y previa confirmación.",
    category: "Sesiones",
  },
  {
    question: "¿Puedo hacer una pregunta específica?",
    answer: "Sí. Para dilemas concretos disponemos del servicio 'Pregunta Específica', donde abordamos puntualmente tu situación mediante una tríada reveladora, enviándote un análisis minucioso en audio de alta fidelidad y fotografía en alta resolución de las cartas.",
    category: "Sesiones",
  },
  {
    question: "¿Puedo regalar una lectura?",
    answer: "Por supuesto. Puedes adquirir un certificado digital ceremonial de obsequio. La persona agasajada recibirá un código de reserva personal para coordinar su sesión en la fecha y horario que mejor se adapte a su ritmo de vida.",
    category: "General",
  },
  {
    question: "¿Qué ocurre después de reservar?",
    answer: "Al confirmar tu reserva, recibirás un correo electrónico de confirmación con el enlace de acceso seguro a la sala de videoconferencia (o detalles de envío en caso de modalidad por audio), junto con una breve guía preparatoria para crear una atmósfera de quietud previa a tu cita.",
    category: "General",
  },
  {
    question: "¿El tarot predice el futuro?",
    answer: "En ARCANO mantenemos una postura ética rigurosa: el futuro no es un libreto sellado e inmutable. El tarot no predice acontecimientos de forma fatalista ni sustituye el criterio médico, psicológico, financiero o legal. El tarot describe las tendencias energéticas que se desprenden de tus hábitos y decisiones presentes: si comprendes la raíz de lo que vives hoy, tienes el poder absoluto de moldear tu mañana.",
    category: "Ética y Filosofía",
  },
];
