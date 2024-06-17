import { Problem } from "./problem";
import { Color, Tube } from "./tube";

export const problems: { id: number; problem: Problem }[] = [
	{
		id: 1,
		problem: new Problem([
			new Tube([Color.Ylw, Color.Ylw, Color.Ylw, Color.Grn], 4),
			new Tube([Color.Blu, Color.Blu, Color.Blu, Color.Ylw], 4),
			new Tube([Color.Grn, Color.Grn, Color.Grn, Color.Blu], 4),
			new Tube([], 4),
		]),
	},
	{
		id: 2,
		problem: new Problem([
			new Tube([Color.Grn, Color.Blu, Color.Blu, Color.Ylw], 4),
			new Tube([Color.Org, Color.Ppl, Color.Org, Color.Ylw], 4),
			new Tube([Color.Grn, Color.Grn, Color.Ylw, Color.Blu], 4),
			new Tube([Color.Org, Color.Ppl, Color.Grn, Color.Blu], 4),
			new Tube([Color.Ppl, Color.Ppl, Color.Org, Color.Ylw], 4),
			new Tube([], 4),
			new Tube([], 4),
		]),
	},
];
