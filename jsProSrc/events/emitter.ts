/**
 * 回调集合
 * 结构:
 * { key: [{runner: cb1}, {runner: cb2}] }
 * @param {string} key 以事件注册字符串为 key
 * @param {array} arr 监听的 cbs对象  数组
 * @param {object} arr[]   {runner: cb1 }
 * @param {function} arr[].runner 执行函数
 * */
const _callbacks: any = {}

const emitter = {
  /**
   * 触发事件
   * @param {string} eventName 事件名称
   * @param {null} restParams
   * */
  emit: (eventName, ...restParams) => {
    const cbArr = _callbacks[eventName]
    if (!cbArr || !cbArr.length) return
    for (let i = 0, l = cbArr.length; i < l; i++) {
      if (cbArr[i].runner === null) { // 为已删除监听器
        cbArr.splice(i, 1)
        --l
        --i
        continue
      }
      cbArr[i].runner(...restParams)
    }
  },
  /**
   * 监听事件
   * */
  on: (eventName, cb) => {
    if (!_callbacks[eventName]) _callbacks[eventName] = []
    const obj = {runner: cb}
    _callbacks[eventName].push(obj)
    return obj
  },
  /**
   * 删除事件
   * 直接触发 obj: {runner: cb} -> 将 obj.runner = null
   * 在下一轮 emit 中 将 obj.runner === null 清除
   * */
  remove: obj => { obj.runner = null },
}

export default emitter
