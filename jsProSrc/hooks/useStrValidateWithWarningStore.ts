/**
 * 用于 表单组件 (使用 mobx store, ,, 后面 逐渐把 useStrValidateWithWarning.ts 换成 此组件)
 * 暴露
 * val: 元素值,
 * changeVal: 修改元素值函数
 * validate{Function}: 验证函数
 * warning{boolean}: 警告flag  // 会在 validate 中触发 warning检测
 * */
import {useLocalStore} from "mobx-react-lite";
import {flow} from "mobx";
import ProToast from "js_pro_src/components/ProToast";

export type UseStrValidateWithWarningStore = Store
type Store = {
  val: string,
  warning: boolean,
  changeVal: (str: string) => (void|Promise<void>),
  validate: (...text: string[]) => Promise<boolean>
}

type Props = {
  validateFnArr: ValidateFn[],
  /**
   * 额外的 验证字段
   * 如 确认密码字段，需要 联合 密码字段校验
   * */
  extraStrValidStores?: Store[],
  afterChangeCb?: () => void // 字段修改后callback
}
export type ValidateFn = { // 验证对象
  /**
   *  验证函数， 返回 true:通过，  false:失败
   *  text[0]自身val, text[1] ... extraValidStores[0] ...
   * */
  fn: (...text: string[]) => (boolean|Promise<boolean>),
  msg: string // 错误提示语
}

function useStrValidateWithWarningStore({
  validateFnArr, extraStrValidStores, afterChangeCb
                                        }: Props): Store {
  const store = useLocalStore<Store>(() => ({
    val: "", warning: false,
    // 验证 字段
    validate: flow<boolean, string[]>(function * (...strArr) {
      for (let i = 0, l = validateFnArr.length; i < l; i++) {
        let result
        try {
          result = yield (validateFnArr[i].fn(...strArr) as boolean)
        } catch (e) {
          console.log(e)
        }
        // 抛错
        if (!result) {
          if (!store.warning) store.warning = true
          throw new Error(validateFnArr[i].msg)
        }
      }
      // 验证通过
      if (store.warning) store.warning = false
      return true
    }),
    // 修改字段
    changeVal: flow<void, [string]>(function * (text) {
      store.val = text // 设值
      /** 判断 */
      let err
      try {
        let params = [text]
        // 若需要 额外 store 传入
        if (extraStrValidStores) params = params.concat(extraStrValidStores.map(i => i.val))
        yield store.validate(...params)
      } catch (e) { err = e }
      if (err) { // 验证失败
        ProToast.showTop({content: err.message})
      } else { // 验证通过
        ProToast.hide()
      }
      afterChangeCb && afterChangeCb() // 字段修改后 callback
    })
  }))
  return store
}

export default useStrValidateWithWarningStore
