import type { Color } from "./color";

const tubes: Tube[] = [];

// いったん現実的な値で。
type TubeSize = 2 | 3 | 4 | 5 | 6 | 7 | 8;

export class Tube {
	constructor(
		public colors: Color[],
		public maxSize: TubeSize,
	) {
		if (colors.length > maxSize) {
			throw new Error(
				"The number of colors cannot exceed the max size of the Tube",
			);
		}

		this.colors = colors; // このTubeに入っている色達
		this.maxSize = maxSize; // このTubeの最大長
	}

	copy() {
		const newTube = new Tube([...this.colors], this.maxSize);
		return newTube;
	}

	// 一番上の色
	get lastOne(): Color | undefined {
		return this.colors[this.colors.length - 1];
	}

	popLast(): Color {
		if (this.isEmpty())
			throw new Error("Oops! Can't pop because this is empty tube.");
		return this.colors.pop() as Color;
	}

	isFull() {
		return this.colors.length === this.maxSize;
	}
	notFull() {
		return !this.isFull();
	}

	filledSameColor(): boolean {
		return this.colors.every((c) => c === this.lastOne);
	}

	isCompleted() {
		return this.isFull() && this.filledSameColor();
	}

	notCompleted() {
		return !this.isCompleted();
	}

	isEmpty() {
		return this.colors.length === 0;
	}
	notEmpty() {
		return !this.isEmpty();
	}
}
