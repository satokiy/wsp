import { problems } from "./problems";

function main() {
	const id = 105;
	const problem = problems.find((p) => p.id === id)?.problem;

	if (problem === undefined) {
		throw Error("No problem found.");
	}

	problem.check();

	console.time("timer");
	problem.play();
	console.timeEnd("timer");
}

main();
