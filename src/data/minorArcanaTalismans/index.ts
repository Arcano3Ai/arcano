import { bastosTalismans } from "./bastos";
import { copasTalismans } from "./copas";
import { espadasTalismans } from "./espadas";
import { orosTalismans } from "./oros";
import type { ShopProduct } from "../shop";

export { bastosTalismans } from "./bastos";
export { copasTalismans } from "./copas";
export { espadasTalismans } from "./espadas";
export { orosTalismans } from "./oros";

export const minorArcanaTalismans: ShopProduct[] = [
  ...bastosTalismans,
  ...copasTalismans,
  ...espadasTalismans,
  ...orosTalismans,
];
