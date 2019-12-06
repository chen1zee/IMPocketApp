/**
 * 请求封装
 * */
import config from "js_pro_src/config";
import axios, {AxiosInstance} from "axios"
import base64 from "js_pro_src/utils/Base64";
import {obj2Param, param2Obj} from "js_pro_src/utils/objParamTrans";
import log from "js_pro_src/utils/log";
import authStorage from "js_pro_src/storage/authStorage";
import ServiceError from "js_pro_src/error/ServiceError";
import navigators, {mainStackNavigator} from "js_pro_src/navigators/navigators";
import {NavigationActions, StackActions} from "react-navigation";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import ProToast from "js_pro_src/components/ProToast";
import {TOKEN} from "js_pro_src/storage/storageKeys";
import ws from "js_pro_src/websocket/ws";

export type ResponseObj<T> = {
  code: number, // 返回码
}

function requestFactory(): AxiosInstance {
  const service = axios.create({
    baseURL: config.baseURL,
    withCredentials: true, // 跨域请求时发送 cookies
    timeout: 60000, // request timeout x ms--
    headers: { // 后台传 base64字符串
      "Content-Type": "text/plain"
    }
  })
  service.interceptors.request.use(
    async conf => {
      // Do something before request is sent
      log.d("######request#######")
      log.d(conf.data)
      // 添加 token 头
      const token = await authStorage.get(TOKEN) // token
      if (token) conf.headers.authorization = token
      /**
       * 添加url.param 参数 f 安卓 IOS 判断参数 参数:f =设备类型:1/ios,2/android
       * */
      const url = conf.url as string
      const paramObj = param2Obj(url)
      paramObj.f = config.os == "ios" ? 1 : 2
      conf.url = url.split("?")[0] + "?" + obj2Param(paramObj)
      log.d(conf.url)
      /** 改造 Data, 编码序列化 */
      if (conf.data) {
        conf.data = base64.parse(JSON.stringify(conf.data))
      }
      return conf
    }
  )
  service.interceptors.response.use(
    async (response): Promise<any> => {
      let res = response.data
      // 返回的不是加密字符串， 抛错
      if (typeof res == "object") return Promise.reject(new Error("请求返回失败，请稍后再试"))
      /** 解码 */
      let base64ObectifyErr
      try {
        res = base64.objectify(res)
      } catch (e) { base64ObectifyErr = e }
      if (base64ObectifyErr) console.log("base64 转码错误", base64ObectifyErr)
      res.msg = String(res.msg)
      log.d(res) // test 环境
      if (res.code == 208) { // token失效 跳登录页
        const stackNavi = navigators.get(mainStackNavigator)
        await authStorage.set(TOKEN, "") // 重置token
        ws.close() // socket 一并关掉
        stackNavi.dispatch(StackActions.reset({ // 跳转登录页
          index: 0,
          actions: [NavigationActions.navigate({routeName: SCREEN_NAMES.Login})]
        }))
        // 弹窗提示
        ProToast.showTop({content: "登录信息已过期，请重新登录"})
        return Promise.reject(new ServiceError("208无权限", res))
      }
      if (res.code != 200) { // 返回错误
        return Promise.reject(new ServiceError(res.msg||"请求失败", res))
      }
      // 200 成功
      return res
    },
    error => {
      // 用户 触发 axios 取消
      if (error instanceof axios.Cancel) {
        return Promise.reject(new ServiceError(
          error.message, error
        ))
      }
      log.w(error)
      return Promise.reject(new Error("请求返回失败，请稍后再试"))
    }
  )
  return service
}

export default requestFactory
