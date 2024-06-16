const tubes: Tube[] = [];

export const Color = {
	Red: "Red", // 赤
	Grn: "Grn", // 緑
	Blu: "Blu", // 青
	Ylw: "Ylw", // 黄
	Ppl: "Ppl", // 紫
	Org: "Org", // オレンジ
} as const;

export type Color = (typeof Color)[keyof typeof Color];

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

	get nowSize() {
		return this.colors.length;
	}

	// 一番上の色
	get lastOne(): Color {
		return this.colors[this.colors.length - 1];
	}


	insertLastBlock(block: Color[]): void {
		if (this.isFull()) throw new Error("Oops! This tube is full.");
		if (this.nowSize + block.length > this.maxSize)
			throw new Error("Oops! The number of colors cannot exceed the max size.");

		for (const color of block) this.colors.push(color);
	}

	popLastBlock(): Color[] {
		if (this.isEmpty()) throw new Error("Oops! This is Empty tube.");

		const res: Color[] = [];
		const last = this.colors.pop() as Color; // undefinedでないことは保証されてる
		res.push(last);
		for (let i = this.nowSize - 1; i >= 0; i--) {
			if (this.colors[i] !== last) {
				break;
			}
			const pop = this.colors.pop() as Color;
			res.push(pop);
		}
		return res;
	}

	popLast(): Color {
		if (this.isEmpty())
			throw new Error("Oops! Can't pop because this is empty tube.");
		return this.colors.pop() as Color;
	}

	// これだとtoTubeが値コピーになる。参照コピーではない
	transfer(toTube: Tube) {
		if (this.lastOne !== toTube.lastOne)
			throw Error(
				`Oops! Cant transfer. Same color is allowed. from: ${this.lastOne}, to: ${toTube.lastOne}`,
			);
		const transferColor = toTube.lastOne;
		let canMove = true;
		while (canMove) {
			const pop = this.popLast();
			toTube.colors.push(pop);

			// ループ終了条件
			if (this.lastOne !== transferColor) {
				canMove = false;
			}
			if (toTube.isFull()) {
				canMove = false;
			}
		}
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
