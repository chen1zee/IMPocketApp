import produce from "immer"

describe("immer 测试", () => {
  it('test1', function () {
    const obj1 = {
      a: {b: 1, c: 2},
      d: [1,2,3],
      c: {d: 321}
    }
    const newObj = produce(obj1, draft => {
      draft.a.b = 3
    })
    expect(obj1 !== newObj).toBe(true)
    expect(obj1.a !== newObj.a).toBe(true)
    expect(obj1.c === newObj.c).toBe(true)
  });
})
