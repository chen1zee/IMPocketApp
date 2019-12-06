import second2Txt from "js_pro_src/utils/second2Txt";

describe("utils/second2Txt 测试", () => {
  it(`3s -> 3"`, function () {
    expect(second2Txt(3) == `3"`).toBe(true)
  });
  it(`60s -> 1'`, function () {
    expect(second2Txt(60) == `1'`).toBe(true)
  });
  it(`70s -> 1'10"`, function () {
    expect(second2Txt(70) == `1'10"`).toBe(true)
  });
})
