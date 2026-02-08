import { TextStyle } from "pixi.js";
import { COLORS, FONT_SIZE } from "./constants";
import { TileNumber } from "@/lib/types";

export function getTextStyle(number: TileNumber) {
	return new TextStyle({
		fontFamily: "Arial, sans-serif",
		fontSize: FONT_SIZE[number],
		fontWeight: "bold",
		fill: COLORS[number].text,
	});
}
