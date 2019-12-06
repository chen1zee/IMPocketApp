type HashType = {
  sourceVal: any, // 记录 源对象中 val
  newSourceVal: any // 记录 新对象中 deepClone 之后的 val
}
/**
 * 深复制
 */
function deepClone<T>(source: T) {
  const hash: HashType[] = [] // 收集子变量，，避免循环引用 导致 死循环
  function run<T>(source2: T) {
    if (source2 === null) return source2
    if (source2 === undefined) return source2
    if (typeof source2 == 'function') return source2
    if (typeof source2 == 'object') {
      // 判断特殊 类型
      if (source2 instanceof Date) return source2
      /**
       * 为 引用类型 && 之前已经有对应引用
       * 如: obj = {};  source = {a: obj, b: obj}
       * 则克隆对象 应为 -> newObj = {} newSource = {a: newObj, b: newObj}
       * */
      for (let i = hash.length; i--;) {
        if (hash[i].sourceVal === source2) return hash[i].newSourceVal
      }
      // 之前无引用
      if (Array.isArray(source2)) { // 数组
        const t = source2.map(item => run(item))
        hash.push({sourceVal: source2, newSourceVal: t})// 记录 hash
        return t
      }
      if (source2 instanceof Date) return source2 // Date类型
      /** 对象 */
      const t = Object.keys(source2).reduce((temp, key) => {
        temp[key] = run(source2[key])
        return temp
      }, {})
      hash.push({sourceVal: source2, newSourceVal: t}) // 记录 hash
      return t
    }
    // 普通类型
    return source2
  }
  return run(source)
}

export default deepClone
