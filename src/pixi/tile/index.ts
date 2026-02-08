import { SPEED } from "@/lib/constants";
import { TileNumber } from "@/lib/types";
import { Container, Graphics, PointData, Text } from "pixi.js";
import { Direction } from "../interaction";
import { v } from "@/lib/valibot";
import { getTextStyle } from "./text-style";
import { getGraphics } from "./graphics";
import { getText } from "./text";
import { calcDim } from "./calc-dim";

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
			x: calcDim(x),
			y: calcDim(y),
		});
		this.ref = container;
		this.graphics = getGraphics(_number);
		container.addChild(this.graphics);
		this.text = getText(_number);
		container.addChild(this.text);
	}
	render() {
		const style = getTextStyle(this.number);
		this.text.text = this.number.toString();
		this.text.style = style;
		this.graphics.clear();
		this.graphics = getGraphics(this.number, this.graphics);
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
		this.ref[coord] = calcDim(this.position[coord]);
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
