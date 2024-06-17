import { Problem } from "./problem";
import { Tube } from "./tube";
import { Color } from "./color";

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
	{
		id: 23,
		problem: new Problem([
			new Tube([Color.Blu, Color.Grn, Color.Blu, Color.Org], 4),
			new Tube([Color.Ylw, Color.Grn, Color.Ppl, Color.Ylw], 4),
			new Tube([Color.Ylw, Color.Blu, Color.Org, Color.Grn], 4),
			new Tube([Color.Ylw, Color.Grn, Color.Org, Color.Ppl], 4),
			new Tube([Color.Org, Color.Ppl, Color.Blu, Color.Ppl], 4),
			new Tube([], 4),
			new Tube([], 4),
		]),
	},
	{
		id: 105,
		problem: new Problem([
			new Tube([Color.Cyn, Color.Cyn, Color.Grn, Color.Blu], 4),
			new Tube([Color.Gry, Color.Lym, Color.Pnk, Color.Ppl], 4),
			new Tube([Color.Brn, Color.Red, Color.Ppl, Color.Org], 4),
			new Tube([Color.Org, Color.Red, Color.Pnk, Color.Org], 4),
			new Tube([Color.Blu, Color.Ylw, Color.Red, Color.Grn], 4),
			new Tube([Color.Grn, Color.Brn, Color.Grn, Color.Ylw], 4),
			new Tube([Color.Ygn, Color.Red, Color.Ppl, Color.Brn], 4),
			new Tube([Color.Ygn, Color.Pnk, Color.Ppl, Color.Ygn], 4),
			new Tube([Color.Blu, Color.Cyn, Color.Gry, Color.Lym], 4),
			new Tube([Color.Lym, Color.Gry, Color.Ylw, Color.Brn], 4),
			new Tube([Color.Blu, Color.Ygn, Color.Ylw, Color.Gry], 4),
			new Tube([Color.Org, Color.Pnk, Color.Cyn, Color.Lym], 4),
			new Tube([], 4),
			new Tube([], 4),
		]),
	},
];
