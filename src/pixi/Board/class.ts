import { Container } from "pixi.js";
import { TileClass } from "../Tile/class";
import { CELL_SIZE, GRID_SIZE } from "@/lib/constants";
import { getRandomPosition } from "./random-position";

type Status = "over" | "game"

class BoardClass {
	score: number = 0;
	ref!: Container;
	status: Status = "game";
	tiles: TileClass[] = [];
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
	padding: 8,
	gap: 8,
	cellBackground: COLORS.cell,
	cornerRadius: 3,
} as const;

export const TOTAL_SIZE = GRID_SIZE * CELL_SIZE + BOARD_STYLES.padding * 2;