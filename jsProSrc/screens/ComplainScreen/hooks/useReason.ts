import {useMemo} from "react";
import useStrValidateWithWarning, {ValidateFn} from "js_pro_src/hooks/useStrValidateWithWarning";

/**
 * 原因
 * */
function useReason() {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    { fn: text => Boolean(text.trim().length), msg: "原因不能为空" }
  ], [])
  return useStrValidateWithWarning({ validateFnArr})
}

export default useReason
