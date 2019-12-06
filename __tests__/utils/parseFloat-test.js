

describe("parseFloat 测试", () => {
  it('should 相同', function () {
    for (let i = 100; i--;) {
      let smallPart = i < 10 ? "0" + String(i) : String(i)
      const str = "0." + smallPart
      expect(str).toBe(parseFloat(str).toFixed(2))
      console.log(str, parseFloat(str).toFixed(2))
    }
  });
})
