import { TileClass, tileSchema } from "../tile";
import { v } from "@/lib/valibot";

const KEY = "__GAME";

export function setLocal(tiles: TileClass[]) {
	const hashes = tiles.map((tile) => tile.encode());
	localStorage.setItem(KEY, JSON.stringify(hashes));
}

export function getLocal() {
	const raw = localStorage.getItem(KEY);
	if (raw === null) return null;
	const [errMsg, json] = safeJSON(raw);
	if (errMsg) {
		localStorage.removeItem(KEY);
		return null;
	}
	const parsed = v.safeParse(v.array(tileSchema), json);
	if (!parsed.success) {
		localStorage.removeItem(KEY);
		return null;
	}
	return parsed.output.map((tile) => new TileClass(tile.number, tile.x, tile.y));
}

function safeJSON(raw: string) {
	try {
		const json = JSON.parse(raw) as unknown;
		return [null, json] as const;
	} catch {
		return ["Failed to parse json", null] as const;
	}
}
