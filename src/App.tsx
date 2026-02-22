import { Calculator } from "./pages/calculator";
import "./assets/styles.css";

export function App() {
	return (
		<div className="w-screen h-screen flex items-center justify-center bg-gray-800 text-green-600">
			<Calculator />
		</div>
	);
}
