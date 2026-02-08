import { Container } from "pixi.js";
import { TileClass } from "../tile";
import { getRandomPosition } from "./random-position";
import { GAP, GRID_SIZE, ROUND_CORNER } from "@/lib/constants";
import { Direction } from "../interaction";
import { collectTiles } from "../tile/collect";
import { moveTile } from "../tile/move-tile";
import { getLocal, setLocal } from "./saved-data";
import { Listener } from "@/lib/types";
import { highscore } from "./highscore";

type Status = "over" | "game";
type Anim = "idle" | "animate";

class BoardClass {
	_score: number = 0;
	ref!: Container;
	status: Status = "game";
	tiles: TileClass[] = [];
	animation: Anim = "idle";
	listeners: Listener[] = [];
	notify() {
		this.listeners.forEach((l) => l());
	}
	addListener(cb: Listener) {
		this.listeners.push(cb);
	}
	highscore: number;
	constructor() {
		this.highscore = highscore.get();
	}
	get score() {
		return this._score;
	}
	set score(v: number) {
		if (v > this.highscore) {
			highscore.set(v);
			this.highscore = v;
		}
		this._score = v;
	}
	init() {
		for (const tile of this.tiles) {
			this.ref.removeChild(tile.ref);
		}
		this.tiles = [];
		this.status = "game";
		this.animation = "idle";
		const loadTiles = getLocal();
		if (loadTiles === null || loadTiles.length === 0) {
			this.spawnNewTile();
		} else {
			this.tiles = loadTiles;
			for (const tile of loadTiles) {
				this.ref.addChild(tile.ref);
			}
			const score = this.tiles
				.map((tile) => tile.number as number)
				.reduce((curr, acc) => curr + acc);
			this.score = score;
		}
		this.notify();
	}
	spawnNewTile() {
		if (this.status !== "game") return;
		const number = Math.random() > 0.1 ? 2 : 4;
		const position = getRandomPosition(this.tiles);
		if (position === null) {
			this.status = "over";
			return;
		}
		this.score += number;
		const tile = new TileClass(number, position.x, position.y);
		this.tiles.push(tile);
		this.ref.addChild(tile.ref);
	}
	move(direction: Direction) {
		if (this.animation === "animate" || this.status === "over") return;
		const tiles = collectTiles(direction, this.tiles);
		const coord = coordMap[direction];
		let isMoving = false;
		for (let idx = 0; idx < GRID_SIZE; idx++) {
			let hasCombined = false;
			tiles[idx].forEach((tile, i) => {
				if (tile[coord] === edges[direction]) return;
				const prev = i === 0 ? undefined : tiles[idx][i - 1];
				hasCombined = moveTile({ direction, allowCombine: !hasCombined, from: tile, to: prev });
				if (tile.x !== tile.position.x || tile.y !== tile.position.y) isMoving = true;
			});
		}
		if (isMoving) this.animation = "animate";
	}
	onAnimate(dt: number) {
		if (this.animation === "idle") return;
		let stop = true;
		this.tiles.forEach((tile) => {
			tile.move(dt);
			if (tile.direction !== null) {
				stop = false;
			}
		});

		if (stop) {
			this.stopAnimation();
		}
	}
	stopAnimation() {
		let finish = false;
		this.tiles.forEach((tile) => {
			if (tile.combineWith !== null) {
				this.ref.removeChild(tile.ref);
				tile.combineWith.upgrade();
				if (tile.combineWith.number === 8192) {
					finish = true;
				}
				this.tiles = this.tiles.filter((t) => t !== tile);
			}
		});
		this.animation = "idle";
		if (finish) {
			this.status = "over";
		} else {
			this.spawnNewTile();
		}
		setLocal(this.tiles);
		this.notify();
	}
	reset() {
		setLocal([]);
		this.score = 0;
		this.init();
	}
}

const coordMap = {
	[Direction.Left]: "x",
	[Direction.Right]: "x",
	[Direction.Up]: "y",
	[Direction.Down]: "y",
} as const;

const edges = {
	[Direction.Left]: 0,
	[Direction.Right]: GRID_SIZE - 1,
	[Direction.Up]: 0,
	[Direction.Down]: GRID_SIZE - 1,
};

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
