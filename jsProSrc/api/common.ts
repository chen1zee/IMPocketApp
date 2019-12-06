import request, {requestWithCancelMethodRef} from "./request"
import {DefaultRes} from "js_pro_src/api/types";

/**
 * 公共api
 * */

/** 注册 */
type RegisteredData = {phone: string, passwd: string, username: string, code: number}
export const registered = (data: RegisteredData, cancelMethodRef?) => (
  requestWithCancelMethodRef({url:"/v1/registered",method:"post",data}, cancelMethodRef)
)
/**
 *  获取验证码
 *  type 1/登陆,2/注册,3/找回密码,4/提现,5/充值,6/修改支付密码
 **/
type SmsData = {phone: string, type: 1|2|3|4|5|6}
type SmsRes = DefaultRes<{code: number}>
export const sms = (data: SmsData): Promise<SmsRes> => (request({url: "/v1/sms", method: "post", data}) as any)
/** 登录 */
type LoginData = {passwd: string, uuid: string, username: string, ip: string, latitude: string, longitude: string}
type LoginRes = DefaultRes<{device:{device_token:string},token:string}>
/**
 *   AxiosPromise<T> 写死了 AxiosResponse<T> -> 但, 拦截器中，修改了 response 的结构， 导致匹配不上
 *   暂用 any 转型，  后续改写  axios 的 index.d.ts 文件
 * */
export const login = (data: LoginData, cancelMethodRef?): Promise<LoginRes> => (
  (requestWithCancelMethodRef({url:"/v1/login",method:"post",data}, cancelMethodRef) as any)
)
/** 找回密码 */
type RetrievePsdData = {passwd:string,phone:string,code:number}
export const retrievePsd = (data: RetrievePsdData, cancelMethodRef?) => (
  requestWithCancelMethodRef({url:"/v1/retrieve/passwd",method:"post",data}, cancelMethodRef)
)
/** 修改密码 */
type UpPasswdData = {passwd:string}
export const upPasswd = (data: UpPasswdData, cancelMethodRef?) => (
  requestWithCancelMethodRef({url: "/v1/user/up/passwd",method:"post",data}, cancelMethodRef)
)
