import { Listener } from "@/lib/types";
import { board } from "./class";
import { useSyncExternalStore } from "react";

let snapshot = {
	board,
};

const listeners: Set<Listener> = new Set();

const store = {
	getSnapshot() {
		return snapshot;
	},
	subscribe(callback: Listener) {
		listeners.add(callback);
		return () => {
			listeners.delete(callback);
		};
	},
	notify() {
		snapshot = { board };
		for (const listener of listeners.values()) {
			listener();
		}
	},
};

board.addListener(store.notify);

export function useBoard() {
	const { board } = useSyncExternalStore(store.subscribe, store.getSnapshot);
	return board;
}
