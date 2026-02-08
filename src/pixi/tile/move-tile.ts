import { GRID_SIZE } from "@/lib/constants";
import { TileClass } from ".";
import { Direction } from "../interaction";

export function moveTile({
	allowCombine,
	from,
	to,
	direction,
}: {
	direction: Direction;
	allowCombine: boolean;
	from: TileClass;
	to?: TileClass;
}) {
	let combined = false;
	const coord = coordMap[direction];
	if (to === undefined) {
		from[coord] = edgeTarget[direction];
		from.direction = direction;
	} else if (from.number === to.number && allowCombine) {
		from[coord] = to[coord];
		from.combineWith = to;
		combined = true;
		from.direction = direction;
	} else {
		const nextDoor = nexDoorTarget(to)[direction];
		if (nextDoor !== from[coord]) {
			from[coord] = nextDoor;
			from.direction = direction;
		} else {
			from.direction = null;
		}
	}
	return combined;
}

const nexDoorTarget = (to: TileClass) => ({
	[Direction.Left]: to.x + 1,
	[Direction.Right]: to.x - 1,
	[Direction.Up]: to.y + 1,
	[Direction.Down]: to.y - 1,
});

const coordMap = {
	[Direction.Left]: "x",
	[Direction.Right]: "x",
	[Direction.Up]: "y",
	[Direction.Down]: "y",
} as const;

const edgeTarget = {
	[Direction.Left]: 0,
	[Direction.Right]: GRID_SIZE - 1,
	[Direction.Up]: 0,
	[Direction.Down]: GRID_SIZE - 1,
};