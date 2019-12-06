/**
 * log 组件
 * */
import config from "js_pro_src/config";

function d<T>(val: T, color?: string):void {
  if (config.env != "test") return // 非测试环境 不开发
  if (color) {
    console.log(val, `color:${color}`)
  } else {
    console.log(val)
  }
}

/** info级别 */
function i<T>(val: T): void {
  console.log(val)
}

/** warning级别 */
function w<T>(val: T): void {
  console.log(val)
}

const log = {
  d, i, w
}

export default log
