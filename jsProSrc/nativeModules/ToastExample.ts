/**
 * This exposes the native ToastExample module as a JS module. This has a
 * function 'show' which takes the following parameters:
 *
 * 1. String message: A string with the text to toast
 * 2. int duration: The duration of the toast. May be ToastExample.SHORT or
 *    ToastExample.LONG
 *
 *  ToastExample
 *  TODO 后面删除 包括android 代码
 * */

import {NativeModules} from "react-native"

interface ToastExampleType {
  /** 显示toast */
  show(message: string, duration: ToastExampleType["SHORT"]|ToastExampleType["LONG"]): void
  showCb(
    message: string, duration: ToastExampleType["SHORT"]|ToastExampleType["LONG"],
    cb: (res: string, msg: string) => void
    ): void
  showPromise(
    message: string, duration: ToastExampleType["SHORT"]|ToastExampleType["LONG"],
  ): Promise<{code: number,res: string, msg: string}>
  SHORT: number, // 对应 安卓  android.widget.Toast.LENGTH_SHORT
  LONG: number, // 对应 安卓 android.widget.Toast.LENGTH_LONG
}

const ToastExample: ToastExampleType = NativeModules.ToastExample

export default ToastExample
