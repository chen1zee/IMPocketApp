import {useMemo} from "react";
import useStrValidateWithWarning, {ValidateFn} from "js_pro_src/hooks/useStrValidateWithWarning";
/**
 * 个人红包 金额
 * */
function usePersonMoney(
) {
  // 个人红包 最多保留2位小数
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => Boolean(text.length), msg: "请填写总金额"},
    {
      fn: text => {
        if (!/^\d+(\.\d{0,2})?$/.test(text.trim())) return false
        return parseInt(text.trim(), 0) > 0
      },
      msg: "总金额只能为正数，且最多两位小数"
    }
  ], [])
  return useStrValidateWithWarning({validateFnArr})
}

export default usePersonMoney
