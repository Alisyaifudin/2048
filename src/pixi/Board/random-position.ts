import { PointData } from "pixi.js";
import { TileClass } from "../tile";
import { GRID_SIZE } from "@/lib/constants";

export function getRandomPosition(tiles: TileClass[]) {
	let position: PointData | null = null;
	let count = 0;
	for (let x = 0; x < GRID_SIZE; x++) {
		for (let y = 0; y < GRID_SIZE; y++) {
			if (tiles.some((tile) => tile.x === x && tile.y === y)) continue;
			count++;
			if (Math.random() < 1 / count) {
				position = { x, y };
			}
		}
	}
	return position;
}
