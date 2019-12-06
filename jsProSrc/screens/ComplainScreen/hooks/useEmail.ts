/**
 * 邮箱
 * */
import {useMemo} from "react";
import useStrValidateWithWarning, {ValidateFn} from "js_pro_src/hooks/useStrValidateWithWarning";

function useEmail() {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => /^[\w\-.]+@[0-9a-z]+\.[a-z]+$/.test(text.trim()), msg: "请填写正确的邮箱"}
  ], [])
  return useStrValidateWithWarning({validateFnArr})
}

export default useEmail
