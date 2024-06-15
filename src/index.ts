import { Tube } from "./tube"

export class Problem {
  constructor(public tubes: Tube[]) {
    this.tubes = tubes
  }

  // 一手進める
  playTurn() {
    const filledTubes = this.tubes.filter(tube => tube.notEmpty())
    // すでに完成しているやつは除外
    const notCompletedTubes = filledTubes.filter(tube => !tube.notCompleted())

    notCompletedTubes.forEach(tube => {
      // 一番上の色を最大数取得
      const color = tube.last
      const move: Color[] = []
      while (tube.length !== 0 && tube[-1] === color) {
        const item = tube.pop()
        move.push(item)
      }      
    })

  }

  // ゲームをプレイ
  play() {
    while(!this.isDone()) {
      this.playTurn()
    }
  }

  move(from: number, to: number) {
    const fromTube = this.tubes[from];
    const toTube = this.tubes[to];

    const color = fromTube.popLastBlock()
    toTube.insertLastBlock(color)
  }

  // 終了判定
  // 空でないすべてのTubeにおいて、Fullかつ、そのTubeの色がすべて同じである
  isDone(): boolean {
    const filledTubes = this.tubes.filter(tube => tube.notEmpty())
    return filledTubes.every(tube => tube.isCompleted())
  }
}
