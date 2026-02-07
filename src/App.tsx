import { PixiApp } from "./components/pixi-app";
import { Screen } from "./components/screen";
// import { Control } from "./Control";
import { Board } from "./pixi/Board";

export default function App() {
	return (
		<main className="flex h-screen w-full flex-col gap-1">
			<div>
				<h1>2048</h1>
			</div>
			<PixiApp>
				<Screen>
					<Board />
				</Screen>
			</PixiApp>
			{/* <Control /> */}
		</main>
	);
}
