/**
 * 带有 重置功能的  msg store
 * */
import {useCallback, useMemo} from "react";
import useStrValidateWithWarningStore, {ValidateFn} from "js_pro_src/hooks/useStrValidateWithWarningStore";


function useMsgStoreWithReset() {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => Boolean(text.trim().length), msg: "请填写验证申请"}
  ], [])
  const store = useStrValidateWithWarningStore({validateFnArr})
  // 重置str
  const resetFn = useCallback(() => {
    if (!store.val) return
    store.changeVal("")
  }, [store])
  return { store, resetFn }
}

export default useMsgStoreWithReset
