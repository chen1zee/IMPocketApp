import {useMemo} from "react"
import useStrValidateWithWarning, {
  UseStrValidateWithWarning,
  ValidateFn
} from "js_pro_src/hooks/useStrValidateWithWarning";

/**
 * 红包(最小|最大)金额
 * */
type UsePocketNum = UseStrValidateWithWarning

type Props = {
  name: string // 如 最小发红包金额
}
function usePocketNum(
  name: Props["name"]
): UsePocketNum {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => Boolean(text.trim().length), msg: `${name}不能为空`},
    {fn: text => /^\d+$/.test(text.trim()), msg: `${name}只能为正整数`}
  ], [name])
  return useStrValidateWithWarning({validateFnArr})
}

export default usePocketNum
