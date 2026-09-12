export interface SocialFeedItem {
  id: string;
  type: "image" | "quote" | "arcana";
  caption: string;
  imageUrl: string;
  permalink: string;
  symbol: string;
}

export const socialFeedList: SocialFeedItem[] = [
  {
    id: "post-1",
    type: "arcana",
    caption: "Apertura del espacio sagrado: el humo del copal purifica la mirada antes de que los arcanos toquen la mesa.",
    imageUrl: "/images/malachai-caliz-humo.png",
    permalink: "https://instagram.com/arcanotarot",
    symbol: "☽",
  },
  {
    id: "post-2",
    type: "quote",
    caption: "El Arcano XV en la noche: mirar la propia sombra con serenidad para desarticular las prisiones del ego.",
    imageUrl: "/images/malachai-diablo.jpg",
    permalink: "https://instagram.com/arcanotarot",
    symbol: "✦",
  },
  {
    id: "post-3",
    type: "image",
    caption: "El sahumerio ceremonial disuelve la prisa del mundo exterior. En el santuario solo habita tu verdad.",
    imageUrl: "/images/malachai-sahumerio.png",
    permalink: "https://instagram.com/arcanotarot",
    symbol: "✧",
  },
  {
    id: "post-4",
    type: "arcana",
    caption: "Lectura nocturna: la fogata de fondo, la tenue luz de las velas y el diálogo lúcido con los símbolos vivos.",
    imageUrl: "/images/malachai-lectura-nocturna.png",
    permalink: "https://instagram.com/arcanotarot",
    symbol: "◇",
  },
];
