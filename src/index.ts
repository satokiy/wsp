import { problems } from "./problems";

function main() {
	const id = process.argv[2];
	const problem = problems.find((p) => p.id === Number(id))?.problem;

	if (problem === undefined) {
		throw Error("No problem found.");
	}

	problem.check();

	console.time("timer");
	problem.play();
	console.timeEnd("timer");
}

main();
