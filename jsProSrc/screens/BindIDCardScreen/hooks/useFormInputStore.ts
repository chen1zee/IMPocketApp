/**
 * form Input fields
 * */

import {useCallback, useMemo, useState} from "react";
import useStrValidateWithWarningStore, {ValidateFn} from "js_pro_src/hooks/useStrValidateWithWarningStore";
import useImgStore from "js_pro_src/hooks/useImgStore";

/** 姓名 */
export function useUnameStore() {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => Boolean(text.trim().length), msg: "姓名不能为空"}
  ], [])
  return useStrValidateWithWarningStore({validateFnArr})
}

/** 身份证号码 */
export function useEidStore() {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => Boolean(text.trim().length), msg: "身份证号码不能为空"},
    {
      fn: text => /^([\dXx]{15}|[\dXx]{18})$/.test(text.trim()),
      msg: "身份证应为18或15位，由数字与Xx组成"
    }
  ], [])
  return useStrValidateWithWarningStore({validateFnArr})
}

/** area */
export function useAreaStore() {
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => Boolean(text.trim().length), msg: "地区不能为空"}
  ], [])
  return useStrValidateWithWarningStore({validateFnArr})
}

function useEidPhotoABStore(name: "正面"|"反面") {
  const [warning, setWarning] = useState(false)
  const imgStore = useImgStore({}, () => { setWarning(false) })
  const validate = useCallback(async () => {
    if (!imgStore.imgInfo.path) {
      if (!warning) setWarning(true)
      throw new Error(`请选择身份证${name}图片`)
    }
    return true
  }, [imgStore, warning, name])
  return {
    warning, validate,
    imgStore
  }
}

/** 身份证 正面 图片 */
export function useEidPhotoAStore() {
  return useEidPhotoABStore("正面")
}

/** 身份证 反面 */
export function useEidPhotoBStore() {
  return useEidPhotoABStore("反面")
}
