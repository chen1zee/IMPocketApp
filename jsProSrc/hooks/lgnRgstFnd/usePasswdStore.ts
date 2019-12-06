import {useMemo} from "react";
import useStrValidateWithWarningStore, {ValidateFn} from "js_pro_src/hooks/useStrValidateWithWarningStore";
/**
 * 密码
 * */
type Props = {
  passwdTxt?: string // passwd显示的中文  默认：'密码' ,, 其他 '新密码' ...
  afterChangeCb?: () => void // val 修改后回调
}
function usePasswdStore({
  passwdTxt="密码", afterChangeCb
                        }: Props) {
  const validateFnArr = useMemo<ValidateFn[]>(() => {
    return [
      {fn: text => Boolean(text.trim().length), msg: `${passwdTxt}不能为空`},
      {fn: text => /^[\w\W]{6,20}$/.test(text), msg: `${passwdTxt}长度应为6-20位`}
    ]
  }, [passwdTxt])
  return useStrValidateWithWarningStore({validateFnArr, afterChangeCb})
}

export default usePasswdStore
