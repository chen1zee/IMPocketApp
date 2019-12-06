import {useMemo} from "react";
import useStrValidateWithWarning, {ValidateFn} from "js_pro_src/hooks/useStrValidateWithWarning";

/**
 * 备注
 * */
function useRemark(
  maxLength: number = 100
) {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    { fn: text => text.length <= maxLength, msg: `备注最多${maxLength}字` }
  ], [maxLength])
  return useStrValidateWithWarning({validateFnArr})
}

export default useRemark
