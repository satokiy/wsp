import { problems } from "./problems";

function main() {
	const id = 2;
	const problem = problems.find((p) => p.id === id)?.problem;

	if (problem === undefined) {
		throw Error("No problem found.");
	}

	problem.play();
}

main();
