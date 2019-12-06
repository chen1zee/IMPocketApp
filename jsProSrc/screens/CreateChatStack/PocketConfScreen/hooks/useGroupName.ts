/**
 * 群名称
 * */
import {useMemo} from "react";
import useStrValidateWithWarning, {
  UseStrValidateWithWarning,
  ValidateFn
} from "js_pro_src/hooks/useStrValidateWithWarning";

type Props = {
  maxWord: number // 最多字数
}
function useGroupName(
  maxWord: Props["maxWord"]
): UseStrValidateWithWarning {
  // 验证数组
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    { fn: text => Boolean(text.trim().length), msg: "群名称不能为空" },
    { fn: text => Boolean(text.trim().length <= maxWord), msg: `群名称不能超过${maxWord}字` }
  ], [maxWord])
  return useStrValidateWithWarning({validateFnArr})
}

export default useGroupName
