import {useMemo} from "react";
import useStrValidateWithWarning, {ValidateFn} from "js_pro_src/hooks/useStrValidateWithWarning";

/**
 * 电话号码
 * */
function usePhone() {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => /^\d+$/.test(text.trim()), msg: "电话号码应为纯数字"}
  ], [])
  return useStrValidateWithWarning({validateFnArr})
}

export default usePhone
