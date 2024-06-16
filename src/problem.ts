import type { Tube } from "./tube";

export class Problem {
	visits: Map<string, string>; // 探索済みリスト
  queue: string[]; // queue

	constructor(public tubes: Tube[]) {
		this.tubes = tubes;
		this.visits = new Map();
    this.queue = [this.snapshot()]; // 初期状態をキューに格納
	}

	copy() {
		return new Problem(this.tubes);
	}

	// queueに格納するためのスナップショット
  // NOTE: Tubeの入れ替えによって同じ盤面になる場合は探索済みと判定するため、sortする
	snapshot() {
    const sorted = this.tubes.map(tube => JSON.stringify(tube.colors)).sort()
		return JSON.stringify(sorted);
	}

	// snapshotの復元
	static restore(snapshot: string) {
		const object = JSON.parse(snapshot);
		return new Problem(object);
	}

	exclude(tube: Tube): Tube[] {
		return this.tubes.filter((t) => t !== tube);
	}

	// 一手進める
	playTurn() {
		// queueから1つ取得する
    let node = this.queue.shift()!;
		// queueから盤面Problemを再現する
		const table = Problem.restore(node);
    
    // 完了
    if (table.isDone()) {
      console.log('Congratulation!!!')
      const path: Array<string> = [];
      while (node !== null) {
        path.push(node);
        node = this.visits.get(node)!
      }
      return console.log(path);
    }

		// 盤面のコピーを生成
    const copy = table.copy();
    
    /**
     * 以下copyで操作すること！
     */

		/*
		 * 移動のルール
		 * - 移動元：空でない && 未完成
		 * - 移動先：満タンでない && 未完成
		 * - 移動元の上澄みと移動先の上澄みが同じ色
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
			const availableTubes = otherTubes.filter((tube) => {
				return tube.notCompleted() && tube.notFull();
			});

      // すべての移動可能なTube
			for (const toTube of availableTubes) {
				// 移動元がすべて同色,かつ移動先が空の場合、動かす意味がない
				// TODO: 実際には探索済みリストとして判定されるはず？
				if (toTube.filledSameColor() && toTube.isEmpty()) {
					continue;
				}
				// fromとtoの上澄みは同じ色でなければならない
				if (fromTube.lastOne !== toTube.lastOne) {
					continue;
				}

				// 移動処理
				const color = toTube.lastOne;
				while (fromTube.lastOne === color && toTube.notFull()) {
					const pop = fromTube.popLast();
					toTube.colors.push(pop);
				}

        const snapshot = copy.snapshot();

        // 探索済みなら次のqueueへ
        if (this.visited(snapshot)) {
          continue;
        }

        // Map<次の手, 前の手>
        this.visits.set(snapshot, node);
        // 探索queueに追加
        this.queue.push(snapshot);
			}
		}
	}
	// ゲームをプレイ
	play() {
    while (this.queue.length > 0) {
      this.playTurn();
    }
    console.log("I cant solve...");
    return null;
	}

	visited(snapshot: string): boolean {
    return this.visits.has(snapshot);
  }

	// 探索終了定義
	// 空でないすべてのTubeにおいて、Fullかつ、そのTubeの色がすべて同じである
	isDone(): boolean {
		const filledTubes = this.tubes.filter((tube) => tube.notEmpty());
		return filledTubes.every((tube) => tube.isCompleted());
	}
}
