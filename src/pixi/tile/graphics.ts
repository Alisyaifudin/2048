import { ROUND_CORNER, TILE_SIZE } from "@/lib/constants";
import { TileNumber } from "@/lib/types";
import { Graphics } from "pixi.js";
import { COLORS } from "./constants";

export function getGraphics(number: TileNumber, graphics?: Graphics) {
	graphics ??= new Graphics();
	return graphics.roundRect(0, 0, TILE_SIZE, TILE_SIZE, ROUND_CORNER).fill(COLORS[number].bg);
}
