export interface NavLink {
  key?: string;
  label: string;
  href: string;
}

export const headerNavLinks: NavLink[] = [
  { key: "nav.home", label: "Inicio", href: "/" },
  { key: "nav.shop", label: "Tienda", href: "/tienda/" },
  { key: "nav.readings", label: "Lecturas", href: "/lecturas/" },
  { key: "nav.natalChart", label: "Carta Astral", href: "/carta-astral/" },
  { key: "nav.synastry", label: "Sinastría", href: "/sinastria/" },
  { key: "nav.arcana", label: "Arcanos", href: "/arcanos/" },
  { key: "nav.dailyCard", label: "Carta del Día", href: "/carta-del-dia/" },
  { key: "nav.academy", label: "Academia", href: "/academia/" },
  { key: "nav.blog", label: "Blog", href: "/blog/" },
  { key: "nav.contact", label: "Contacto", href: "/contacto/" },
];

export const footerNavLinks = {
  explorar: [
    { key: "footer.links.boutiqueAndStones", label: "Boutique & Piedras de Río", href: "/tienda/" },
    { key: "footer.links.natalChartEphemeris", label: "Carta Astral (Efemérides)", href: "/carta-astral/" },
    { key: "footer.links.coupleSynastry", label: "Sinastría de Pareja", href: "/sinastria/" },
    { key: "footer.links.tarotReadings", label: "Lecturas de Tarot", href: "/lecturas/" },
    { key: "footer.links.the22Arcana", label: "Los 22 Arcanos", href: "/arcanos/" },
    { key: "footer.links.esotericAcademy", label: "Academia Esotérica", href: "/academia/" },
    { key: "footer.links.virtualClassroomAlumni", label: "Aula Virtual (Alumnos)", href: "/academia/mi-panel/" },
    { key: "footer.links.loveTarot", label: "Tarot del Amor", href: "/tarot-del-amor/" },
    { key: "footer.links.professionalTarot", label: "Tarot Profesional", href: "/tarot-profesional/" },
    { key: "footer.links.dailyArcana", label: "Carta del Día", href: "/carta-del-dia/" },
  ],
  santuario: [
    { key: "footer.links.yourExperience", label: "Tu Experiencia", href: "/experiencia/" },
    { key: "footer.links.theTarotist", label: "Quien Lee los Arcanos", href: "/#el-tarotista" },
    { key: "footer.links.magazineBlog", label: "Revista Editorial & Blog", href: "/blog/" },
    { key: "footer.links.faq", label: "Preguntas Frecuentes", href: "/#faq" },
    { key: "footer.links.directContact", label: "Contacto Directo", href: "/contacto/" },
    { key: "footer.links.bookSession", label: "Reservar Lectura", href: "/reservar/" },
  ],
  legal: [
    { key: "footer.links.privacyPolicy", label: "Aviso de Privacidad", href: "/privacidad/" },
    { key: "footer.links.termsAndConditions", label: "Términos y Condiciones", href: "/terminos/" },
    { key: "footer.links.cancellationPolicy", label: "Política de Cancelación", href: "/cancelaciones/" },
  ],
};
