import { GAP, TILE_SIZE } from "@/lib/constants";

export function calcDim(v: number) {
	return v * TILE_SIZE + (v + 1) * GAP;
}
