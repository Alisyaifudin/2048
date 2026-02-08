import { Container, FederatedPointerEvent, Graphics } from "pixi.js";

const POINTER_STYLE = {
	alpha: 0.5,
	color: "#bbada0",
};

const CIRCLE_RADIUS = 80;

export class Pointer {
	circle = new Graphics();
	handlePointerMove!: (e: FederatedPointerEvent) => void;
	handlePointerOut!: () => void;
	container!: Container;
	init(container: Container) {
		this.container = container;
		container.addChild(this.circle);
		this.handlePointerMove = (e: FederatedPointerEvent) => {
			// Get local position relative to container
			const localPos = e.getLocalPosition(this.container);

			// Clear and redraw circle at pointer position
			this.circle.clear();
			this.circle.circle(localPos.x, localPos.y, CIRCLE_RADIUS);
			this.circle.fill(POINTER_STYLE);
		};
		this.handlePointerOut = () => {
			this.circle.clear();
		};
		container.on("pointermove", this.handlePointerMove);
		container.on("pointerout", this.handlePointerOut);
	}
	cleanup() {
		this.container.off("pointermove", this.handlePointerMove);
		this.container.off("pointerout", this.handlePointerOut);
		this.container.removeChild(this.circle);
	}
}

export const pointer = new Pointer();
