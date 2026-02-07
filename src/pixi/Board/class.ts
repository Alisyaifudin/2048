import { Container } from "pixi.js";
import { TileClass } from "../Tile/class";
import { getRandomPosition } from "./random-position";
import { GAP, ROUND_CORNER } from "@/lib/constants";

type Status = "over" | "game";

class BoardClass {
	score: number = 0;
	ref!: Container;
	status: Status = "game";
	tiles: TileClass[] = [];
	init() {
		for (const tile of this.tiles) {
			this.ref.removeChild(tile.ref);
		}
		this.tiles = [];
		this.status = "game";
		this.spawnNewTile();
	}
	spawnNewTile() {
		if (this.status !== "game") return;
		const number = Math.random() > 0.2 ? 2 : 4;
		const position = getRandomPosition(this.tiles);
		const tile = new TileClass(number, position.x, position.y);
		this.tiles.push(tile);
		this.ref.addChild(tile.ref);
	}
}

export const board = new BoardClass();

const COLORS = {
	bg: "#bbada0",
	cell: "rgba(238, 228, 218, 0.35)",
};

export const BOARD_STYLES = {
	background: COLORS.bg,
	padding: GAP,
	cellBackground: COLORS.cell,
	cornerRadius: ROUND_CORNER,
} as const;
