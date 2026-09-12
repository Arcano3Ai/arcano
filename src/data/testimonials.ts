export interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  initials: string;
  serviceUsed: string;
  quote: string;
  isVerifiedClientPlaceholder: boolean;
}

export const testimonialsList: Testimonial[] = [
  {
    id: "test-01",
    clientName: "Mariana V.",
    location: "Ciudad de México",
    initials: "MV",
    serviceUsed: "Lectura Profunda (75 min)",
    quote: "La lectura con ARCANO no tuvo nada que ver con predicciones alarmistas. Fue una conversación serena que puso palabras exactas a cosas que yo sentía profundamente pero no lograba ordenar.",
    isVerifiedClientPlaceholder: true,
  },
  {
    id: "test-02",
    clientName: "Sebastián R.",
    location: "Buenos Aires",
    initials: "SR",
    serviceUsed: "Trabajo y Propósito",
    quote: "Llegué en medio de una transición laboral muy desgastante. La tirada me ayudó a entender qué miedos eran heredados y dónde radicaba mi verdadero valor diferencial.",
    isVerifiedClientPlaceholder: true,
  },
  {
    id: "test-03",
    clientName: "Elena G.",
    location: "Madrid",
    initials: "EG",
    serviceUsed: "Amor y Relaciones",
    quote: "Una mirada madura y profundamente respetuosa sobre los vínculos. Me aportó paz, claridad para poner límites sanos y una enorme gratitud.",
    isVerifiedClientPlaceholder: true,
  },
  {
    id: "test-04",
    clientName: "Carlos D.",
    location: "Guadalajara",
    initials: "CD",
    serviceUsed: "Lectura General",
    quote: "La delicadeza con la que abordan cada símbolo y la precisión de sus preguntas te devuelven el protagonismo de tu propia vida. Absolutamente recomendable.",
    isVerifiedClientPlaceholder: true,
  },
];
