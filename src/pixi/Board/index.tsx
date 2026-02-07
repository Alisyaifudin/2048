import { extend, useTick } from "@pixi/react";
import { Graphics, Container } from "pixi.js";
import { useEffect, useRef } from "react";
import { board, BOARD_STYLES } from "./class";
import { GRID_SIZE, SCREEN_SIZE, TILE_SIZE } from "@/lib/constants";

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
		if (ref.current === null) return;
		board.ref = ref.current;
		board.init();
	}, [ref]);
	useTick(() => {
		// attach input
	});
	return (
		<pixiContainer ref={ref}>
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
