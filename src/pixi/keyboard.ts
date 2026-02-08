import { Container, PointData } from "pixi.js";
import { Direction } from "./interaction";

type Callback = (direction: Direction) => void;

export class Keyboard {
	container?: Container = undefined;
	callbacks: Callback[] = [];
	addListener(cb: Callback) {
		this.callbacks.push(cb);
	}
	notify(direction: Direction) {
		this.callbacks.forEach((listener) => listener(direction));
	}
	down: PointData = { x: 0, y: 0 };
	handleKeydown!: (e: KeyboardEvent) => void;
	init(container: Container) {
		this.container = container;
		this.handleKeydown = (e) => {
			switch (e.key) {
				case "ArrowUp":
					this.notify(Direction.Up);
					break;
				case "ArrowDown":
					this.notify(Direction.Down);
					break;
				case "ArrowLeft":
					this.notify(Direction.Left);
					break;
				case "ArrowRight":
					this.notify(Direction.Right);
					break;
			}
		};
		window.addEventListener("keydown", this.handleKeydown);
	}
	cleanup() {
		if (this.container === undefined) return;
		window.removeEventListener("keydown", this.handleKeydown);
	}
}

export const keyboard = new Keyboard();
