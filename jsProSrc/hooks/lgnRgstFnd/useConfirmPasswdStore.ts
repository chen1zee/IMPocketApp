/**
 * 确认密码
 * */
import useStrValidateWithWarningStore, {
  UseStrValidateWithWarningStore,
  ValidateFn
} from "js_pro_src/hooks/useStrValidateWithWarningStore";
import {useMemo} from "react";

type Props = {
  extraStrValidStores: UseStrValidateWithWarningStore[],
  passwdTxt?: string // 密码显示中文 : 默认: "密码" 其它 "新密码"
}
function useConfirmPasswdStore({
  extraStrValidStores, passwdTxt="密码"
                               }: Props) {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => Boolean(text.length), msg: `请再次填写${passwdTxt}`},
    {fn: (text, psw) => text == psw, msg: `与填写的${passwdTxt}不一致`}
  ], [passwdTxt])
  return useStrValidateWithWarningStore({validateFnArr, extraStrValidStores})
}

export default useConfirmPasswdStore
