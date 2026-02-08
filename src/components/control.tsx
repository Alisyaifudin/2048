import { useBoard } from "@/pixi/Board/use-board";
import { Button } from "./ui/button";

export function Control() {
	const board = useBoard();
	return (
		<div className="justify-between w-full max-w-xl px-1 flex flex-col gap-2">
			<div className="flex justify-between items-center gap-1">
				<Button onClick={() => board.reset()}>Reset</Button>
				<div className="flex  gap-2 items-center">
					<div>Score {board.score}</div>
					<div className="p-2 bg-red-500 rounded-md text-white">Highscore {board.highscore}</div>
				</div>
			</div>
		</div>
	);
}
