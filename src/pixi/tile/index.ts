import { GAP, ROUND_CORNER, SPEED, TILE_SIZE } from "@/lib/constants";
import { TileNumber } from "@/lib/types";
import { Container, Graphics, PointData, Text, TextStyle } from "pixi.js";
import { Direction } from "../interaction";
import { v } from "@/lib/valibot";

export class TileClass {
	ref: Container;
	direction: Direction | null = null;
	combineWith: null | TileClass = null;
	text: Text;
	graphics: Graphics;
	position: PointData;
	get number(): TileNumber {
		return this._number;
	}
	set number(v: number) {
		this._number = v as TileNumber;
		this.render();
	}
	constructor(
		private _number: TileNumber,
		public x: number,
		public y: number,
	) {
		this.position = { x, y };
		const container = new Container({
			x: x * TILE_SIZE + (x + 1) * GAP,
			y: y * TILE_SIZE + (y + 1) * GAP,
		});
		const color = COLORS[_number];
		const style = new TextStyle({
			fontFamily: "Arial, sans-serif",
			fontSize: FONT_SIZE[_number],
			fontWeight: "bold",
			fill: color.text,
		});
		this.ref = container;
		this.graphics = new Graphics()
			.roundRect(0, 0, TILE_SIZE, TILE_SIZE, ROUND_CORNER)
			.fill(color.bg);
		container.addChild(this.graphics);
		this.text = new Text({
			text: _number.toString(),
			style,
			x: TILE_SIZE / 2,
			y: TILE_SIZE / 2,
			anchor: 0.5,
		});
		container.addChild(this.text);
	}
	render() {
		const color = COLORS[this.number];
		const style = new TextStyle({
			fontFamily: "Arial, sans-serif",
			fontSize: FONT_SIZE[this.number],
			fontWeight: "bold",
			fill: color.text,
		});
		this.text.text = this.number.toString();
		this.text.style = style;
		this.graphics.clear();
		this.graphics.roundRect(0, 0, TILE_SIZE, TILE_SIZE, ROUND_CORNER).fill(color.bg);
	}
	move(dt: number) {
		if (this.direction === null) return;
		const coord = coordMap[this.direction];
		const sign = signMap[this.direction];
		const checkFn = checkMap[this.direction];
		const proposed = this.position[coord] + sign * dt * SPEED;
		if (checkFn(proposed, this[coord])) {
			this.direction = null;
			this.position[coord] = this[coord];
		} else {
			this.position[coord] = proposed;
		}
		this.ref[coord] = this.position[coord] * TILE_SIZE + (this.position[coord] + 1) * GAP;
	}
	upgrade() {
		if (this.number === 8192) throw new Error("too big");
		this.number *= 2;
	}
	encode() {
		return {
			x: this.x,
			y: this.y,
			number: this.number,
		};
	}
	static decode(val: unknown) {
		return v.safeParse(tileSchema, val);
	}
}

export const tileSchema = v.object({
	x: v.pipe(v.number(), v.integer()),
	y: v.pipe(v.number(), v.integer()),
	number: v.picklist([2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192]),
});

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
	2: 192,
	4: 192,
	8: 192,
	16: 160,
	32: 160,
	64: 160,
	128: 128,
	256: 128,
	512: 128,
	1024: 96,
	2048: 96,
	4096: 80,
	8192: 80,
};

const coordMap = {
	[Direction.Left]: "x",
	[Direction.Right]: "x",
	[Direction.Up]: "y",
	[Direction.Down]: "y",
} as const;

const signMap = {
	[Direction.Left]: -1,
	[Direction.Right]: 1,
	[Direction.Up]: -1,
	[Direction.Down]: 1,
} as const;

const checkMap = {
	[Direction.Left]: (proposed: number, target: number) => {
		return proposed <= target;
	},
	[Direction.Right]: (proposed: number, target: number) => {
		return proposed >= target;
	},
	[Direction.Up]: (proposed: number, target: number) => {
		return proposed <= target;
	},
	[Direction.Down]: (proposed: number, target: number) => {
		return proposed >= target;
	},
} as const;
