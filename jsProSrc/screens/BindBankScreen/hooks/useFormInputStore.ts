import {useMemo} from "react";
import useStrValidateWithWarningStore, {ValidateFn} from "js_pro_src/hooks/useStrValidateWithWarningStore";

/**
 * form input fields
 * */

/** 银行名称 */
export function useNameStore() {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => Boolean(text.trim().length), msg: "银行名称不能为空"}
  ], [])
  return useStrValidateWithWarningStore({validateFnArr})
}

/** 银行支行 */
export function useBranchStore() {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => Boolean(text.trim().length), msg: "银行支行不能为空"}
  ], [])
  return useStrValidateWithWarningStore({validateFnArr})
}

/** 银行账号 */
export function useAccountStore() {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => Boolean(text.trim().length), msg: "银行账号不能为空"},
    {
      fn: text => /^\d+$/.test(text.replace(/\s/g, "")),
      msg: "银行账号应为纯数字"
    }
  ], [])
  return useStrValidateWithWarningStore({validateFnArr})
}

/** 银行开户姓名 */
export function useAccountNameStore() {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => Boolean(text.trim().length), msg: "银行开户姓名不能为空"},
  ], [])
  return useStrValidateWithWarningStore({validateFnArr})
}

/** 银行预留手机 */
export function useAccountPhoneStore() {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => Boolean(text.trim().length), msg: "银行预留手机不能为空"},
    {fn: text => /^\d{11}$/.test(text.trim()), msg: "银行预留手机应为11位数字"}
  ], [])
  return useStrValidateWithWarningStore({validateFnArr})
}



