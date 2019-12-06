import deepClone from "js_pro_src/utils/deepClone";

describe("utils/deepClone 测试", () => {
  it('对象， 有两个 key 为相同引用', function () {
    const obj1 = {a: 1}
    const source = { a: obj1, b: obj1 }
    const newSource = deepClone(source)
    // 新对象 中 .a 与 .b 应该引用一致
    expect(newSource.a === newSource.b).toBe(true)
    // 新对象 .a 与 旧对象 .a 应引用不一致
    expect(newSource.b !== source.a).toBe(true)
    expect(newSource.b !== source.b).toBe(true)
  });
})
