/**
 * 秒数 转化 txt 显示
 * 如 123 -> 2'23"
 * */
function second2Txt(sec: number) {
  const min = Math.floor(sec / 60)
  const s = sec - min * 60
  return (min ? (min + `' `) : "") + (s ? s + `"` : "")
}

export default second2Txt
