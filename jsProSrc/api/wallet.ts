
/**
 * 钱包 api
 * user_id: user_id
 * */

import {requestWithCancelMethodRef} from "js_pro_src/api/request";
import {DefaultRes} from "js_pro_src/api/types";

/** 充值记录 列表 */
export const wllRecharge = (cancelMethodRef?): DefaultRes<{data: any}> => (
  (requestWithCancelMethodRef({url: "/v1/wallet/recharge",method:"post"}, cancelMethodRef) as any)
)
/** 充值详情 */
type WllRechargeDtlData = {recharge_id:string} // 充值id
export const wllRechargeDtl = (data: WllRechargeDtlData, cancelMethodRef?) => (
  requestWithCancelMethodRef({url:"/v1/wallet/recharge/details",method:"post",data}, cancelMethodRef)
)

/** 提现记录 列表 */
export const wllWithdraw = (cancelMethodRef?) => (
  requestWithCancelMethodRef({url:"/v1/wallet/withdraw",method:"post"}, cancelMethodRef)
)

/** 提现详情 */
type WllWithdrawDtlData = {withdraw_id:string} // 提现id
export const wllWithdrawDtl = (data:WllWithdrawDtlData,cancelMethodRef?) => (
  requestWithCancelMethodRef({url:"/v1/wallet/withdraw/details",method:"post",data}, cancelMethodRef)
)

/** 绑定支付宝 */
type BindAlipayData = {alipay:string}
export const bindAlipay = (data: BindAlipayData,cancelMethodRef?) => (
  requestWithCancelMethodRef({url:"/v1/wallet/bind/alipay",method:"post",data}, cancelMethodRef)
)

/** 绑定银行卡 */
type BindBankData = {
  name:string,branch:string,account:string,  // 银行名称, 银行支行, 银行账号
  account_name:string,account_phone:string // 开户名称， 银行预留手机
}
export const bindBank = (data:BindBankData,cancelMethodRef?) => (
  requestWithCancelMethodRef({url:"/v1/wallet/bind/bank",method:"post",data}, cancelMethodRef)
)

/** 绑定身份证 */
type BindEidData = {
  uname:string,eid:string,area:string, // 姓名，身份证号码，地区
  eid_photo_a:string,eid_photo_b:string, // 身份证正面  反面
}
export const bindEid = (data:BindEidData,cancelMethodRef?) => (
  requestWithCancelMethodRef(
    {url:"/v1/wallet/bind/eid",method:"post",data},
    cancelMethodRef
  )
)
