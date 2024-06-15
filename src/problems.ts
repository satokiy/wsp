import { Color, Problem, Tube } from ".";

export const problems: {id: number, problem: Problem}[] = [
  {
    id: 1,
    problem: new Problem(
      [
        new Tube([Color.Ylw, Color.Ylw, Color.Ylw, Color.Grn], 4),
        new Tube([Color.Blu, Color.Blu, Color.Blu, Color.Ylw], 4),
        new Tube([Color.Grn, Color.Grn, Color.Grn, Color.Blu], 4),
        new Tube([], 4),
      ]
    )
  }
]