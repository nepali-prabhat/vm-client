import pepsi from "@/assets/images/pepsi.png";
import dew from "@/assets/images/dew.png";
import coke from "@/assets/images/coca.png";

export const SCREEN_DIMENSIONS = {
  width: 1000,
  height: 800,
};

export type DrinkType = "pepsi" | "coke" | "dew";
type DrinkDetail = { id: number; name: DrinkType; src: string; cost: number };
export const DRINKS: DrinkDetail[]  = [
  { id: 1, name: "pepsi", src: pepsi, cost: 25 },
  { id: 2, name: "coke", src: coke, cost: 20 },
  { id: 3, name: "dew", src: dew, cost: 30 },
];
