import { GAP, ROUND_CORNER, TILE_SIZE } from "@/lib/constants";
import { TileNumber } from "@/lib/types";
import { Container, Graphics, Text, TextStyle } from "pixi.js";

export class TileClass {
	ref: Container;
	constructor(
		public number: TileNumber,
		public x: number,
		public y: number,
	) {
		const container = new Container({
			x: x * TILE_SIZE + (x + 1) * GAP,
			y: y * TILE_SIZE + (y + 1) * GAP,
		});
		const color = COLORS[number];
		const style = new TextStyle({
			fontFamily: "Arial, sans-serif",
			fontSize: FONT_SIZE[number],
			fontWeight: "bold",
			fill: color.text,
		});
		this.ref = container;
		const graphics = new Graphics()
			.roundRect(0, 0, TILE_SIZE, TILE_SIZE, ROUND_CORNER)
			.fill(color.bg);
		container.addChild(graphics);
		const text = new Text({
			text: number.toString(),
			style,
			x: TILE_SIZE / 2,
			y: TILE_SIZE / 2,
			anchor: 0.5,
		});
		container.addChild(text);
	}
}

const COLORS: Record<TileNumber, { bg: string; text: string }> = {
	2: { bg: "#eee4da", text: "#776e65" },
	4: { bg: "#ede0c8", text: "#776e65" },
	8: { bg: "#f2b179", text: "#f9f6f2" },
	16: { bg: "#f59563", text: "#f9f6f2" },
	32: { bg: "#f67c5f", text: "#f9f6f2" },
	64: { bg: "#f65e3b", text: "#f9f6f2" },
	128: { bg: "#edcf72", text: "#f9f6f2" },
	256: { bg: "#edcc61", text: "#f9f6f2" },
	512: { bg: "#edc850", text: "#f9f6f2" },
	1024: { bg: "#edc53f", text: "#f9f6f2" },
	2048: { bg: "#edc22e", text: "#f9f6f2" },
	4096: { bg: "#3c3a32", text: "#f9f6f2" },
	8192: { bg: "#3c3a32", text: "#f9f6f2" },
} as const;

const FONT_SIZE: Record<TileNumber, number> = {
	2: 48,
	4: 48,
	8: 48,
	16: 40,
	32: 40,
	64: 40,
	128: 32,
	256: 32,
	512: 32,
	1024: 24,
	2048: 24,
	4096: 20,
	8192: 20,
};
