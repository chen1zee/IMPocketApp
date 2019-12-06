import {useMemo} from "react";
import useStrValidateWithWarning, {ValidateFn} from "js_pro_src/hooks/useStrValidateWithWarning";
/**
 * 群红包 金额
 * */
function useGroupMoney(
) {
  // 群红包 只能发 10 的倍数
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => Boolean(text.length), msg: "请填写总金额"},
    {
      fn: text => {
        if (!/^\d+$/.test(text.trim())) return false
        return parseInt(text.trim(), 0) % 10 == 0
      },
      msg: "总金额只能为10的整数倍"
    }
  ], [])
  return useStrValidateWithWarning({validateFnArr})
}

export default useGroupMoney
