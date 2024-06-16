import { problems } from "./problems";

function main() {
  const id = 1
  const problem = problems.find(p => p.id === id)?.problem;
  if (problem !== undefined) {
    problem.play()
  }
}

main();
