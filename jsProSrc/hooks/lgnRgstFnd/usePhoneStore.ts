/**
 * 手机号
 * */
import useStrValidateWithWarningStore, {ValidateFn} from "js_pro_src/hooks/useStrValidateWithWarningStore";
import {useMemo} from "react";

function usePhoneStore() {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => Boolean(text.trim().length), msg: "请填写手机号"},
    {fn: text => /^\d{11}$/.test(text), msg: "手机号应为11位数字"}
  ], [])
  return useStrValidateWithWarningStore({validateFnArr})
}

export default usePhoneStore
