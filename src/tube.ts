const tubes: Tube[] = []

export const Color = {
  Red: 'Red', // 赤
  Grn: 'Grn', // 緑
  Blu: 'Blu', // 青
  Ylw: 'Ylw', // 黄
  Ppl: 'Ppl', // 紫
  Org: 'Org', // オレンジ
} as const

export type Color = typeof Color[keyof typeof Color]

// いったん現実的な値で。
type TubeSize = 2 | 3 | 4 | 5 | 6 | 7 | 8

export class Tube {
  constructor(public colors: Color[], public maxSize: TubeSize) {
    if (colors.length > maxSize) {
      throw new Error("The number of colors cannot exceed the max size of the Tube");
    };

    this.colors = colors // このTubeに入っている色達
    this.maxSize = maxSize // このTubeの最大長
  }

  get nowSize() {
    return this.colors.length;
  }

  // 一番上の色
  get lastOne(): Color {
    return this.colors[this.colors.length - 1]
  }

  insertLastBlock(block: Color[]): void {
    if (this.isFull()) throw new Error('Oops! This tube is full.');
    if (this.nowSize + block.length > this.maxSize) throw new Error('Oops! The number of colors cannot exceed the max size.');
    
    block.forEach((color) => this.colors.push(color))
  }

  popLastBlock(): Color[] {
    if (this.isEmpty()) throw new Error('Oops! This is Empty tube.');

    let res: Color[] = []
    const last = this.colors.pop() as Color; // undefinedでないことは保証されてる
    res.push(last);
    for (let i = this.nowSize - 1; i >= 0 ;i--) {
      if (this.colors[i] !== last) {
        break;
      }
      const pop = this.colors.pop() as Color
      res.push(pop)
    }
    return res;
  }

  isFull() {
    return this.colors.length === this.maxSize
  }
  isCompleted() {
    return this.isFull() && this.colors.every(c => c === this.lastOne);
  }
  notCompleted() {
    return !this.isCompleted();
  }

  isEmpty() {
    return this.colors.length === 0
  }
  notEmpty() {
    return !this.isEmpty()
  }
}