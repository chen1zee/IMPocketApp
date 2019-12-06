import ServiceError from "js_pro_src/error/ServiceError";
import axios from "axios"
/**
 * 处理请求 && 处理 返回的 常见 error
 * 默认处理掉:
 * 208:权限问题
 * axios.isCancel 用户主动取消请求
 * */

type Props = {
  reqFunc: () => any, // 请求 && 正常返回的 处理逻辑
  superPrevErrorFunc?: (e?:Error|ServiceError) => any // 前置，，无论何种错误 均 触发
  prevErrorFunc?: (e?:Error|ServiceError) => any // 前置 error handler 如 setPending(false) 保证 执行
  unNormalErrorFunc: (e:Error|ServiceError) => any // 除去 常见 error 后的 非常见error handler
  axiosCancelErrorFunc?: (e?:Error|ServiceError) => any // 用户主动取消请求 error handler
}
async function handleReqWithNormalError({
  reqFunc,
  superPrevErrorFunc, prevErrorFunc,
  unNormalErrorFunc, axiosCancelErrorFunc
                                        }: Props) {
  try {
    await reqFunc()
  } catch (e) {
    // 添加 超级前置 错误处理函数
    superPrevErrorFunc && superPrevErrorFunc(e)
    // 鉴权问题，直接 在 requestFactory中跳转登录页 // 不触发 后续请求
    if (ServiceError.isInstance(e) && e.detail && e.detail.code == 208) return
    /** 其他错误 */
    prevErrorFunc && prevErrorFunc(e)
    if (ServiceError.isInstance(e) && axios.isCancel(e.detail)) { // 用户取消请求
      return axiosCancelErrorFunc && axiosCancelErrorFunc(e)
    }
    // 其他错误
    unNormalErrorFunc(e)
  }
}

export default handleReqWithNormalError
