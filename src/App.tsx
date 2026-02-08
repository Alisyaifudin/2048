import { Control } from "./components/control";
import { PixiApp } from "./components/pixi-app";
import { Screen } from "./components/screen";
// import { Control } from "./Control";
import { Board } from "./pixi/Board";

export default function App() {
	return (
		<main className="flex h-screen items-center justify-between w-full flex-col gap-1">
			<div>
				<h1 className="text-5xl font-bold">2048</h1>
			</div>
			<PixiApp>
				<Screen>
					<Board />
				</Screen>
			</PixiApp>
			<Control />
			<div />
		</main>
	);
}
