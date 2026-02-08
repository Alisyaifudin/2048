import { TileNumber } from "@/lib/types";
import { Text } from "pixi.js";
import { getTextStyle } from "./text-style";
import { TILE_SIZE } from "@/lib/constants";

export function getText(number: TileNumber) {
  const style = getTextStyle(number)
	return new Text({
		text: number.toString(),
		style,
		x: TILE_SIZE / 2,
		y: TILE_SIZE / 2,
		anchor: 0.5,
	});
}
