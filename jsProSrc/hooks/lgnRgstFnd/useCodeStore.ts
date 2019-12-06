/**
 * 验证码 store
 * */
import useStrValidateWithWarningStore, {ValidateFn} from "js_pro_src/hooks/useStrValidateWithWarningStore";
import {useMemo} from "react";

function useCodeStore() {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => Boolean(text.trim().length), msg: "请填写验证码"},
    {fn: text => /^\d{6}$/.test(text), msg: "验证码应为6位数字"},
  ], [])
  return useStrValidateWithWarningStore({validateFnArr})
}

export default useCodeStore
