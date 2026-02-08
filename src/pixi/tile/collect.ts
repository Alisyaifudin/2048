import { GRID_SIZE } from "@/lib/constants";
import { TileClass } from ".";
import { Direction } from "../interaction";

const coordCollectMap = {
	[Direction.Left]: ["y", "x", 1],
	[Direction.Right]: ["y", "x", -1],
	[Direction.Up]: ["x", "y", 1],
	[Direction.Down]: ["x", "y", -1],
} as const;

export function collectTiles(direction: Direction, tiles: TileClass[]): TileClass[][] {
	const collect: TileClass[][] = Array.from({ length: GRID_SIZE }).map(() => []);
	const [first, second, sign] = coordCollectMap[direction];
	for (const tile of tiles) {
		collect[tile[first]].push(tile);
	}
	collect.forEach((row) => {
		row.sort((a, b) => sign * (a[second] - b[second]));
	});
	return collect;
}