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

export const BackColorCodes = {
	Red: "\x1b[48;5;196m", // 赤
	Grn: "\x1b[48;5;28m", // 緑
	Blu: "\x1b[48;5;21m", // 青
	Ylw: "\x1b[48;5;226m", // 黄
	Ppl: "\x1b[48;5;129m", // 紫
	Org: "\x1b[48;5;208m", // オレンジ
	Cyn: "\x1b[48;5;51m", // シアン
	Pnk: "\x1b[48;5;213m", // ピンク
	Lym: "\x1b[48;5;35m", // ライム
	Gry: "\x1b[48;5;245m", // グレー
	Ygn: "\x1b[48;5;40m", // 黄緑
	Brn: "\x1b[48;5;130m", // 茶
	Reset: "\x1b[0m", // リセット
	Non: "\x1b[48;5;0m", // 黒（空の表示用）
};

export function coloredText(color: Color) {
	const colorText = color + " ".repeat(3 - color.length);
	return (
		ColorCodes[color] + BackColorCodes[color] + colorText + ColorCodes.Reset
	);
}

export function coloredEmpty() {
	return ColorCodes.Non + BackColorCodes.Non + "   " + ColorCodes.Reset;
}
