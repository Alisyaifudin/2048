import { Container, FederatedPointerEvent, PointData } from "pixi.js";

export enum Direction {
	Up,
	Down,
	Left,
	Right,
}

const MIN_DISTANCE = 50;

type Callback = (direction: Direction) => void;

export class Interaction {
	container!: Container;
	callbacks: Callback[] = [];
	addListener(cb: Callback) {
		this.callbacks.push(cb);
	}
	notify(direction: Direction) {
		this.callbacks.forEach((listener) => listener(direction));
	}
	down: PointData = { x: 0, y: 0 };
	handlePointerDown!: (e: FederatedPointerEvent) => void;
	handlePointerUp!: (e: FederatedPointerEvent) => void;
	init(container: Container) {
		this.container = container;
		this.handlePointerDown = (e) => {
			const local = e.getLocalPosition(container);
			this.down = {
				x: local.x,
				y: local.y,
			};
		};
		this.handlePointerUp = (e) => {
			const local = e.getLocalPosition(container);
			const dx = local.x - this.down.x;
			const dy = local.y - this.down.y;
			if (Math.abs(dx) > Math.abs(dy)) {
				if (Math.abs(dx) < MIN_DISTANCE) return;
				if (dx >= 0) {
					this.notify(Direction.Right);
				} else {
					this.notify(Direction.Left);
				}
			} else {
				if (Math.abs(dy) < MIN_DISTANCE) return;
				if (dy >= 0) {
					this.notify(Direction.Down);
				} else {
					this.notify(Direction.Up);
				}
			}
		};
		container.on("pointerdown", this.handlePointerDown);
		container.on("pointerup", this.handlePointerUp);
	}
	cleanup() {
		if (this.container === undefined) return;
		this.container.off("pointerdown", this.handlePointerDown);
		this.container.off("pointerup", this.handlePointerUp);
	}
}

export const interaction = new Interaction();
