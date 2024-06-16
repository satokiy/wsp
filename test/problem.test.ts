import { assert, beforeEach, describe, expect, test } from 'vitest'
import { Problem } from '../src/problem'
import { Color, Tube } from '../src/tube'

describe('Problem', () => {
  test('exclude', () => {
    // given
    const tube1 = new Tube([Color.Grn, Color.Red, Color.Grn, Color.Grn], 4)
    const tube2 = new Tube([Color.Grn, Color.Red, Color.Grn, Color.Grn], 4)
    const tube3 = new Tube([Color.Grn, Color.Red, Color.Grn, Color.Grn], 4)
    const problem = new Problem([tube1, tube2, tube3]);
    // when
    const excluded = problem.exclude(tube2)
    // then
    expect(excluded).toStrictEqual([tube1, tube3])
  })

  test('snapshot', () => {
    // given
    const tube1 = new Tube([Color.Grn, Color.Red, Color.Grn, Color.Grn], 4)
    const tube2 = new Tube([Color.Grn, Color.Red, Color.Grn, Color.Grn], 4)
    const tube3 = new Tube([Color.Grn, Color.Red, Color.Grn, Color.Grn], 4)

    const problem = new Problem([tube1, tube2, tube3]);
    // when
    const snapshot = problem.snapshot();
    // then
    expect(snapshot).toBe(
      '[{"colors":["Grn","Red","Grn","Grn"],"maxSize":4},{"colors":["Grn","Red","Grn","Grn"],"maxSize":4},{"colors":["Grn","Red","Grn","Grn"],"maxSize":4}]'
    )
  })
  test('restore', () => {
    // given
    const tube1 = new Tube([Color.Grn, Color.Red, Color.Grn, Color.Grn], 4)
    const tube2 = new Tube([Color.Grn, Color.Red, Color.Grn, Color.Grn], 4)
    const tube3 = new Tube([Color.Grn, Color.Red, Color.Grn, Color.Grn], 4)
    const problem = new Problem([tube1, tube2, tube3]);
    
    // '[{"colors":["Grn","Red","Grn","Grn"],"maxSize":4},{"colors":["Grn","Red","Grn","Grn"],"maxSize":4},{"colors":["Grn","Red","Grn","Grn"],"maxSize":4}]';
    const snapshot = problem.snapshot();

    // when
    const restore = Problem.restore(snapshot)
    
    // then
    expect(restore.tubes.length).toBe(problem.tubes.length)
    for (let i = 0; i < restore.tubes.length; i++) {
      expect(restore.tubes[i].colors).toStrictEqual(problem.tubes[i].colors)
    }
  })
})