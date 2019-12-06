/**
 * 用于 表单组件
 * 暴露
 * val: 元素值,
 * changeVal: 修改元素值函数
 * validate{Function}: 验证函数
 * warning{boolean}: 警告flag  // 会在 validate 中触发 warning检测
 * */
import {useCallback, useState} from "react";
import ProToast from "js_pro_src/components/ProToast";
import log from "js_pro_src/utils/log";

export type UseStrValidateWithWarning = {
  val: State["val"],
  changeVal: (str: string) => Promise<void>,
  warning: State["warning"],
  validate: (text: string) => Promise<boolean>
}
type State = {
  val: string // 值
  warning: boolean // 警告flag
}
type Props = {
  validateFnArr: ValidateFn[]
}
export type ValidateFn = { // 验证对象
  /** 验证函数， 返回 true:通过，  false:失败 */
  fn: (...text: string[]) => (boolean|Promise<boolean>),
  msg: string // 错误提示语
}

function useStrValidateWithWarning({
  validateFnArr
                                   }: Props): UseStrValidateWithWarning {
  const [val, setVal] = useState<State["val"]>("")
  const [warning, setWarning] = useState<State["warning"]>(false)
  // 验证 字段
  const validate = useCallback<UseStrValidateWithWarning["validate"]>(async text => {
    for (let i = 0, l = validateFnArr.length; i < l; i++) {
      let result
      try {
        result = await validateFnArr[i].fn(text)
      } catch (e) {
        log.w(e)
      }
      // 抛错
      if (!result) {
        if (!warning) setWarning(true)
        throw new Error(validateFnArr[i].msg)
      }
    }
    // 验证通过
    if (warning) setWarning(false)
    return true
  }, [warning, validateFnArr])
  // 修改字段
  const changeVal = useCallback<UseStrValidateWithWarning["changeVal"]>(async text => {
    setVal(text) // 设值
    /** 判断 */
    let err
    try {
      await validate(text)
    } catch (e) {
      err = e
    }
    if (err) { // 验证失败
      ProToast.showTop({content: err.message})
    } else { // 验证通过
      ProToast.hide()
    }
  }, [validate])
  return {
    val, changeVal, warning, validate
  }
}

export default useStrValidateWithWarning
