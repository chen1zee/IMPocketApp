import {useMemo} from "react"
import useStrValidateWithWarningStore, {ValidateFn} from "js_pro_src/hooks/useStrValidateWithWarningStore";

/**
 * 用户名
 * */

function useUsernameStore() {
  const validateFnArr = useMemo<ValidateFn[]>(() => {
    const maxWord = 10
    return [
      {fn: text => Boolean(text.trim().length), msg: "用户名不能为空"},
      {fn: text => text.trim().length <= maxWord, msg: `用户名最多${maxWord}字`}
    ]
  }, [])
  return useStrValidateWithWarningStore({validateFnArr})
}

export default useUsernameStore
