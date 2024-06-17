const tubes: Tube[] = [];

export const Color = {
	Red: "Red", // 赤
	Grn: "Grn", // 緑
	Blu: "Blu", // 青
	Ylw: "Ylw", // 黄
	Ppl: "Ppl", // 紫
	Org: "Org", // オレンジ
	Cyn: "Cyn", // シアン
	Pnk: "Pnk", // ピンク
	Lym: "Lym", // ライム
	Gry: "Gry", // グレー
	Ygn: "Ygn", // 黄緑
	Brn: "Brn", // 茶
} as const;

export type Color = (typeof Color)[keyof typeof Color];

export const ColorCodes = {
	Red: "\x1b[38;5;196m", // 赤
	Grn: "\x1b[38;5;28m", // 緑
	Blu: "\x1b[38;5;21m", // 青
	Ylw: "\x1b[38;5;226m", // 黄
	Ppl: "\x1b[38;5;129m", // 紫
	Org: "\x1b[38;5;208m", // オレンジ
	Cyn: "\x1b[38;5;51m", // シアン
	Pnk: "\x1b[38;5;213m", // ピンク
	Lym: "\x1b[38;5;35m", // ライム
	Gry: "\x1b[38;5;245m", // グレー
	Ygn: "\x1b[38;5;40m", // 黄緑
	Brn: "\x1b[38;5;130m", // 茶
	Reset: "\x1b[0m", // リセット
	Non: "\x1b[38;5;0m", // 黒（空の表示用）
};

export function printColoredText(color: Color) {
	const colorText = color + " ".repeat(3 - color.length);
	return ColorCodes[color] + colorText + ColorCodes.Reset;
}

export function emptyColor() {
	return ColorCodes.Non + "AAA" + ColorCodes.Reset;
}

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
