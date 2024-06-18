import { problems } from "./problems";

function main() {
	const id = process.argv[2];
	const problem = problems.find((p) => p.id === Number(id))?.problem;

	if (problem === undefined) {
		throw Error("No problem found.");
	}

	if (problem.notValid()) {
		throw Error("something went wrong. fix the problem.");
	}

	const start = performance.now();
	const solved = problem.solve();
	const end = performance.now();

	if (solved) {
		problem.showAnswer();
		console.log("time: ", (end - start).toPrecision(8), "ms");
	} else {
		console.log("I can't solve 🥺");
	}
}

main();
