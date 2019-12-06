/**
 * 普通请求
 * */
import requestFactory from "js_pro_src/api/requestFactory";
import axios, {AxiosRequestConfig, Canceler} from "axios"
import {MutableRefObject} from "react";

const request = requestFactory()

/** 带有 cancelMethodRef 的 request */
export const requestWithCancelMethodRef = (config: AxiosRequestConfig, cancelMethodRef?: MutableRefObject<Canceler|undefined>) => {
  return request({
    ...config, cancelToken: new axios.CancelToken(function (c) {
      if (cancelMethodRef) cancelMethodRef.current = c
    })
  })
}

export default request
