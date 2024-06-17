import { Color, Tube } from "./tube";

export class Problem {
	tubes: Tube[];
	visits: Map<string, string | null>; // 探索済みリスト
	queue: string[]; // queue
	answerPath: string[]; // 答えの探索パス

	constructor(tubes: Tube[]) {
		this.tubes = tubes;
		this.visits = new Map();
		this.queue = [];
		this.answerPath = [];
	}

	copy() {
		const newTubes = this.tubes.map((t) => t.copy());
		return new Problem(newTubes);
	}

	// queueに格納するためのスナップショット
	// NOTE: Tubeの入れ替えによって同じ盤面になる場合は探索済みと判定するため、sortする
	snapshot(): string {
		const sorted = this.tubes
			.map((tube) => ({ colors: tube.colors, maxSize: tube.maxSize }))
			.sort((a, b) => a.colors.toString().localeCompare(b.colors.toString()));
		return JSON.stringify(sorted);
	}

	// snapshotの復元
	static restore(snapshot: string) {
		const object = JSON.parse(snapshot);
		const tubes = object.map(
			(data: Tube) => new Tube(data.colors, data.maxSize),
		);
		return new Problem(tubes);
	}

	exclude(tube: Tube): Tube[] {
		return this.tubes.filter((t) => t !== tube);
	}

	visited(snapshot: string): boolean {
		return this.visits.has(snapshot);
	}

	setAnswer(goalNode: string) {
		let node = goalNode;
		while (node !== null) {
			this.answerPath.push(node);
			node = this.visits.get(node)!;
		}
	}

	// 探索終了定義
	// 空でないすべてのTubeにおいて、Fullかつ、そのTubeの色がすべて同じである
	isDone(): boolean {
		const filledTubes = this.tubes.filter((tube) => tube.notEmpty());
		return filledTubes.every((tube) => tube.isCompleted());
	}

	// queueごとの簡易チェック処理
	easyCheck(tubes: Tube[]) {
		let flat: Color[] = [];
		for (const tube of tubes) {
			tube.colors.map((color) => flat.push(color));
		}
		console.log(flat);
		const colors: { [key: string]: number } = flat.reduce((acc: any, color) => {
			acc[color] = (acc[color] || 0) + 1;
			return acc;
		}, {});
		if (Object.values(colors).some((count) => count > 4)) {
			throw Error("something went wrong");
		}
	}

	// ゲームをプレイ
	play() {
		// 初期化
		const init = this.snapshot();
		this.queue.push(init);
		this.visits.set(init, null);

		while (this.queue.length > 0) {
			// queueから1つ取得する
			let node = this.queue.shift()!;
			// queueから盤面Problemを復元する
			const table = Problem.restore(node);
			this.easyCheck(table.tubes);

			// 盤面のコピーを生成
			let copy = table.copy();

			/*
			 * 移動のルール
			 * - 移動元：空でない && 未完成
			 * - 移動先：満タンでない && 未完成
			 * - 移動元の上澄みと移動先の上澄みが同じ色,もしくは移動先が空
			 * - 移動元と移動先が異なるチューブ
			 * - 移動元がすべて同色,かつ移動先が空の場合はNG（動かす意味がない）
			 */
			for (const fromTube of copy.tubes) {
				// 移動元の条件
				if (fromTube.isEmpty() || fromTube.isCompleted()) {
					continue;
				}
				// 移動先の条件
				const otherTubes = copy.exclude(fromTube);
				const availableTubes = otherTubes.filter(
					(tube) => tube.notCompleted() && tube.notFull(),
				);

				// すべての移動可能なTube
				for (const toTube of availableTubes) {
					// 移動元がすべて同色,かつ移動先が空の場合、動かす意味がない
					// TODO: 実際には探索済みリストとして判定されるはず？
					if (fromTube.filledSameColor() && toTube.isEmpty()) {
						continue;
					}
					// fromとtoの上澄みは同じ色、もしくはtoが空
					if (toTube.notEmpty() && fromTube.lastOne !== toTube.lastOne) {
						continue;
					}

					// 移動処理
					const color = fromTube.lastOne;
					while (fromTube.lastOne === color && toTube.notFull()) {
						const pop = fromTube.popLast();
						toTube.colors.push(pop);
					}

					const snapshot = copy.snapshot();

					// 探索済みなら、copyを戻して次のqueueへ
					if (this.visited(snapshot)) {
						copy = table.copy();
						continue;
					}

					// 探索済みに追加。Map<次の手, 前の手>
					this.visits.set(snapshot, node);

					// 次の探索queueに追加
					this.queue.push(snapshot);

					if (copy.isDone()) {
						this.setAnswer(snapshot);
					}

					// 重要: copyの状態を移動前に戻す
					copy = table.copy();
				}
			}
		}
		if (this.answerPath.length === 0) {
			console.log("I can't solve...");
		} else {
			console.log("Congratulation!!!");
			for (const [index, r] of Object.entries(this.answerPath)) {
				console.log("------------------------");
				console.log(index);
				const obj = JSON.parse(r);
				for (const tube of obj) {
					console.log(tube.colors);
				}
			}
		}
	}
}
