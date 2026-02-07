import { Application } from "@pixi/react";
import { useRef } from "react";

export function PixiApp({ children }: { children?: React.ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<div id="root" ref={ref}>
			<Application
				resizeTo={ref} // Let Pixi handle it
				className="absolute inset-0 w-full h-full" // Force fill
			>
				{children}
			</Application>
		</div>
	);
}
