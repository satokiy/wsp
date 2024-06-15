import { assert, beforeEach, describe, expect, test } from 'vitest'
import { Color, Tube } from '../src/tube'

describe('Tube', () => {
  test('popLastBlock', () => {
    const tube = new Tube([Color.Grn, Color.Red, Color.Grn, Color.Grn], 4)
    const response = tube.popLastBlock();

    // 取得
    expect(response).toStrictEqual([Color.Grn, Color.Grn])
    // 残り
    expect(tube.colors).toStrictEqual([Color.Grn, Color.Red])
  })
})
