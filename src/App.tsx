import { PixiApp } from "./components/pixi-app";
import { Screen } from "./Screen";
// import { Control } from "./Control";
import { Board } from "./pixi/Board";

export default function App() {
	return (
		<main className="flex flex-col gap-1">
			<PixiApp>
				<Screen>
					<Board />
				</Screen>
			</PixiApp>
			{/* <Control /> */}
		</main>
	);
}
