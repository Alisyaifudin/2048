import { extend, useTick } from "@pixi/react";
import { Graphics, Container } from "pixi.js";
import { useEffect, useRef } from "react";
import { board, BOARD_STYLES } from "./class";
import { GRID_SIZE, SCREEN_SIZE, TILE_SIZE } from "@/lib/constants";
import { pointer } from "../pointer";
import { interaction } from "../interaction";
import { keyboard } from "../keyboard";

extend({
	Container,
	Graphics,
});

const cells: { x: number; y: number }[] = [];

// Calculate cell positions
for (let row = 0; row < GRID_SIZE; row++) {
	for (let col = 0; col < GRID_SIZE; col++) {
		const cell = {
			x: col * TILE_SIZE + (col + 1) * BOARD_STYLES.padding,
			y: row * TILE_SIZE + (row + 1) * BOARD_STYLES.padding,
		};
		cells.push(cell);
	}
}

export function Board() {
	const ref = useRef<Graphics>(null);
	useEffect(() => {
		const container = ref.current;
		if (container === null) return;
		board.ref = container;
		board.init();
		pointer.init(container);
		interaction.init(container);
		interaction.addListener((dir) => board.move(dir));
		keyboard.init(container);
		keyboard.addListener((dir) => board.move(dir));
		return () => {
			pointer.cleanup();
			interaction.cleanup();
			keyboard.cleanup();
		};
	}, [ref]);
	useTick((ticker) => {
		board.onAnimate(ticker.deltaTime);
	});

	return (
		<pixiContainer eventMode="static" ref={ref} width={SCREEN_SIZE} height={SCREEN_SIZE}>
			<pixiGraphics
				draw={(g) => {
					// Main board background with rounded corners
					g.roundRect(0, 0, SCREEN_SIZE, SCREEN_SIZE, BOARD_STYLES.cornerRadius).fill(
						BOARD_STYLES.background,
					);
					// Grid cells
					cells.forEach((pos) => {
						g.roundRect(pos.x, pos.y, TILE_SIZE, TILE_SIZE, BOARD_STYLES.cornerRadius).fill(
							BOARD_STYLES.cellBackground,
						);
					});
				}}
			/>
		</pixiContainer>
	);
}
