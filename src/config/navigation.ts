export interface NavLink {
  label: string;
  href: string;
}

export const headerNavLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Tienda", href: "/tienda" },
  { label: "Lecturas", href: "/lecturas" },
  { label: "Carta Astral", href: "/carta-astral" },
  { label: "Sinastría", href: "/sinastria" },
  { label: "Arcanos", href: "/arcanos" },
  { label: "Carta del Día", href: "/carta-del-dia" },
  { label: "Academia", href: "/#academia" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

export const footerNavLinks = {
  explorar: [
    { label: "Inicio", href: "/" },
    { label: "Boutique & Piedras de Río", href: "/tienda" },
    { label: "Carta Astral (Efemérides)", href: "/carta-astral" },
    { label: "Sinastría de Pareja", href: "/sinastria" },
    { label: "Lecturas de Tarot", href: "/lecturas" },
    { label: "Los 22 Arcanos", href: "/arcanos" },
    { label: "Academia Esotérica", href: "/#academia" },
    { label: "Tarot del Amor", href: "/tarot-del-amor" },
    { label: "Tarot Profesional", href: "/tarot-profesional" },
    { label: "Carta del Día", href: "/carta-del-dia" },
  ],
  santuario: [
    { label: "Tu Experiencia", href: "/experiencia" },
    { label: "Quien Lee los Arcanos", href: "/#el-tarotista" },
    { label: "Revista Editorial & Blog", href: "/blog" },
    { label: "Preguntas Frecuentes", href: "/#faq" },
    { label: "Contacto Directo", href: "/contacto" },
    { label: "Reservar Lectura", href: "/reservar" },
  ],
  legal: [
    { label: "Aviso de Privacidad", href: "/privacidad" },
    { label: "Términos y Condiciones", href: "/terminos" },
    { label: "Política de Cancelación", href: "/cancelaciones" },
  ],
};
