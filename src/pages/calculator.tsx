import { useState } from "react";

const inputButtons = [
	["7", "8", "9", "/"],
	["4", "5", "6", "*"],
	["1", "2", "3", "-"],
	["0", ".", "=", "+"],
];

const operators = ["+", "-", "*", "/"];

export function Calculator() {
	const [displayValue, setDisplayValue] = useState("0");

	function handleButtonClick(value: string) {
		switch (value) {
			case "CE":
				setDisplayValue("0");
				break;
			case "=":
				try {
					const prevResult = eval(displayValue);
					setDisplayValue(prevResult.toString());
				} catch (error) {
					setDisplayValue("Error");
					console.error("Erro ao avaliar expressão:", error);
				}
				break;
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
			case "0":
				setDisplayValue((prev) =>
					prev === "0" || prev === "Error" || prev === "NaN"
						? value
						: prev + value,
				);
				break;
			case "+":
			case "-":
			case "*":
			case "/":
				// const newOperation = havingOperatorOnLastCharacter(value);
				setDisplayValue(
					(prev) => havingOperatorOnLastCharacter(prev, value) + " ",
				);
				break;
			case ".":
				if (
					!isDotOnLastNumber(displayValue) &&
					!isOperatorOnLastCharacter(displayValue)
				) {
					setDisplayValue((prev) => prev + value);
				} else if (isOperatorOnLastCharacter(displayValue)) {
					setDisplayValue((prev) => `${prev} 0${value}`);
				}
				break;
			default:
				break;
		}
	}

	function havingOperatorOnLastCharacter(
		prevValue: string,
		newOperation?: string,
	) {
		const lastCharacter = prevValue.trim().slice(-1);

		if (operators.includes(lastCharacter)) {
			const validOperator =
				lastCharacter === newOperation ? lastCharacter : newOperation;

			const newValueDisplay = prevValue.slice(0, -3) + " " + validOperator;
			return newValueDisplay;
		}
		return prevValue + (newOperation ? " " + newOperation : "");
	}

	function isDotOnLastNumber(prevValue: string) {
		const separatorOparators = prevValue.split(/[+\-*/]/);
		const lastNumber = separatorOparators[separatorOparators.length - 1];
		return lastNumber.includes(".");
	}

	function isOperatorOnLastCharacter(prevValue: string) {
		const lastCharacter = prevValue.trim().slice(-1);
		return operators.includes(lastCharacter);
	}

	return (
		<div className="max-w-sm">
			<h1>Calculadora</h1>
			<form onSubmit={(e) => e.preventDefault()}>
				<div className="flex items-center justify-center mb-4 gap-2 pr-5">
					<input
						type="text"
						className="h-12 p-2 text-right bg-gray-700 text-green-600 border border-gray-300 rounded"
						placeholder="0"
						value={displayValue}
						onChange={(e) => setDisplayValue(e.target.value)}
					/>
					<button
						type="button"
						className={`w-12 h-12 rounded border border-gray-300 
              hover:bg-gray-200 hover:text-green-950 hover:font-bold 
              cursor-pointer transition 
              active:translate-y-0.5 active:shadow-inner`}
						onClick={() => handleButtonClick("CE")}
					>
						CE
					</button>
				</div>

				<div>
					{inputButtons.map((row, index) => (
						<div key={index} className="grid grid-cols-4 mt-2">
							{row.map((button, buttonIndex) => (
								<button
									key={buttonIndex}
									className={`w-12 h-8 rounded 
                              border border-gray-300 
                              hover:bg-gray-200 hover:text-green-950 hover:font-bold 
                              cursor-pointer transition 
                              active:translate-y-0.5 active:shadow-inner`}
									type="button"
									onClick={() => handleButtonClick(button)}
								>
									{button}
								</button>
							))}
						</div>
					))}
				</div>
			</form>
			<div></div>
		</div>
	);
}
