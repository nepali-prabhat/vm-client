import pepsi from "@/assets/images/pepsi.png";
import dew from "@/assets/images/dew.png";
import coke from "@/assets/images/coca.png";

export const STATS = [
  { name: "Coins", value: 100 },
  { name: "Cash", value: 200 },
  { name: "Pepsi", value: 10 },
  { name: "Coke", value: 10 },
  { name: "Dew", value: 10 },
];

export const SCREEN_DIMENSIONS = {
  width: 1000,
  height: 800,
};

export type DrinkType = "pepsi" | "coke" | "dew";
type DrinkDetail = { id: number; name: DrinkType; src: string; cost: number };
export const DRINKS: [DrinkDetail, ...DrinkDetail[]] = [
  { id: 1, name: "pepsi", src: pepsi, cost: 25 },
  { id: 2, name: "coke", src: coke, cost: 20 },
  { id: 3, name: "dew", src: dew, cost: 30 },
];
export const DRINK_NAMES: [DrinkType, ...DrinkType[]] = DRINKS.map(
  (v) => v.name,
) as [DrinkType, ...DrinkType[]]; // Because DRINKS's type ensures that there is at least one value, this is safe inferrence.


