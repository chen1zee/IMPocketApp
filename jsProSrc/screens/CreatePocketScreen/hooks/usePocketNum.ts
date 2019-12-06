import {useMemo} from "react";
import useStrValidateWithWarning, {ValidateFn} from "js_pro_src/hooks/useStrValidateWithWarning";

/**
 * 红包个数
 * */
function usePocketNum(
  groupPeopleNum: number = 1 // 本群人数
) {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    { fn: text => Boolean(text.length), msg: "红包个数不能为空" },
    {
      fn: text => {
        if (!/^\d+$/.test(text.trim())) return false
        return parseInt(text.trim(), 0) > 0
      },
      msg: "红包个数只能为正整数"
    },
    {
      fn: text => parseInt(text.trim(), 0) <= groupPeopleNum,
      msg: `红包个数不能超过群人数（${groupPeopleNum}）`
    }
  ], [groupPeopleNum])
  return useStrValidateWithWarning({validateFnArr})
}

export default usePocketNum
