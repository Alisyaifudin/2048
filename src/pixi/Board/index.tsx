import { extend, useTick } from "@pixi/react";
import { Graphics, Container } from "pixi.js";
import { useRef } from "react";
import { BOARD_STYLES, TOTAL_SIZE } from "./class";
import { CELL_SIZE, GRID_SIZE } from "@/lib/constants";

extend({
	Container,
	Graphics,
});

const cells: { x: number; y: number }[] = [];

// Calculate cell positions
for (let row = 0; row < GRID_SIZE; row++) {
	for (let col = 0; col < GRID_SIZE; col++) {
		cells.push({
			x: BOARD_STYLES.padding + col * CELL_SIZE + BOARD_STYLES.gap / 2,
			y: BOARD_STYLES.padding + row * CELL_SIZE + BOARD_STYLES.gap / 2,
		});
	}
}

const cellSize = CELL_SIZE - BOARD_STYLES.gap;

export function Board() {
	const ref = useRef<Graphics>(null);
	useTick(() => {
		// attach input
	});
	return (
		<pixiContainer ref={ref} x={0} y={0}>
			<pixiGraphics
				draw={(g) => {
					// Main board background with rounded corners
					g.roundRect(0, 0, TOTAL_SIZE, TOTAL_SIZE, BOARD_STYLES.cornerRadius * 2).fill(
						BOARD_STYLES.background,
					);
					// Grid cells
					cells.forEach((pos) => {
						g.roundRect(pos.x, pos.y, cellSize, cellSize, BOARD_STYLES.cornerRadius).fill(
							BOARD_STYLES.cellBackground,
						);
					});
				}}
			/>
		</pixiContainer>
	);
}
