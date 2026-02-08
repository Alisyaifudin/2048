import { TileNumber } from "@/lib/types";

export const COLORS: Record<TileNumber, { bg: string; text: string }> = {
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

export const FONT_SIZE: Record<TileNumber, number> = {
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

