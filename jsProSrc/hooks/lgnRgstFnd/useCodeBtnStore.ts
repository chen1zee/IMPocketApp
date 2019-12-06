import {useLocalStore} from "mobx-react-lite";
import {action, flow, runInAction} from "mobx";
import {sms} from "js_pro_src/api/common";
import {UseStrValidateWithWarningStore} from "js_pro_src/hooks/useStrValidateWithWarningStore";
import ProToast from "js_pro_src/components/ProToast";
import {useEffect} from "react";

/**
 * 验证码 btn store
 * */
export type UseCodeBtnStore = Store
type Store = {
  code: string, // 后台返回的 code
  timerId: number, // 计时器id
  pending: boolean, // 请求中flag
  counting: number, // 倒计时 重新可发送验证码
  canSend: boolean, // 可发送验证码 flag
  pressHandler: () => Promise<void> // 点击事件
  resendHandler: () => void // 重新发送 逻辑
}
type Props = {
  type?: 2|3 // 2:注册，3:登录 默认 2注册
  phoneStore: UseStrValidateWithWarningStore // 手机号 store， 点击前，验证 手机号合法性
}
function useCodeBtnStore({
  phoneStore, type=2
                         }: Props): Store {
  const store = useLocalStore<Store>(() => ({
    code: "", // 后台返回 code
    timerId: -1,
    val: "",
    pending: false,
    counting: 0,
    canSend: true,
    pressHandler: flow(function * () {
      if (!store.canSend || store.pending) return // 不可发送 || 请求中
      store.pending = true
      try {
        // 验证手机合法性
        yield phoneStore.validate(phoneStore.val)
        // 发送验证码
        const smsRes = yield sms({type, phone: phoneStore.val})
        // @ts-ignore
        store.code = smsRes.data.code
        ProToast.showTop({content: "验证码已发送"})
        store.pending = false
        // 获取验证码 倒计时
        store.resendHandler()
      } catch (err) {
        store.pending = false
        ProToast.showTop({content: err.message})
      }
    }),
    // 重新发送 倒计时处理
    resendHandler: action<Store["resendHandler"]>(function () {
      store.canSend = false
      store.counting = 60 // 60秒倒计时
      store.timerId = setInterval(() => {
        runInAction(() => {
          store.counting = store.counting - 1
          if (!store.counting) { // 可重新发送
            clearInterval(store.timerId)
            store.canSend = true
          }
        })
      }, 1000)
    })
  }))
  // 组件卸载时， 清除 计时器
  useEffect(() => () => {
    clearInterval(store.timerId)
  }, [store])
  return store
}

export default useCodeBtnStore
