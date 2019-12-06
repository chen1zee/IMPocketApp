import {requestWithCancelMethodRef} from "js_pro_src/api/request";
import {DefaultRes} from "js_pro_src/api/types";

/**
 * 好友
 * */

// 好友详情
type FrndDtlData = {friend_id:string}
export const frndDtl = (data: FrndDtlData, cancelMethodRef?) => (
  requestWithCancelMethodRef({url:"/v1/friend/details",method:"post",data}, cancelMethodRef)
)
// 申请好友
type FrndApplyData = {to:string,msg:string}
export const frndApply = (data: FrndApplyData, cancelMethodRef?) => (
  requestWithCancelMethodRef({url:"/v1/friend/apply",method:"post",data}, cancelMethodRef)
)

// 申请好友回复
type FrndAplRplData = {sys_msg_id:string,status:1|2}
export const frndAplRpl = (data: FrndAplRplData, cancelMethodRef?) => (
  requestWithCancelMethodRef({url:"/v1/friend/apply/reply",method:"post",data}, cancelMethodRef)
)

// 通讯录列表
export type FrndContactRes = DefaultRes<{
  remark_name: string,
}[]>
export const frndContact = (cancelMethodRef?): Promise<FrndContactRes> => (
  (requestWithCancelMethodRef({url:"/v1/friend/contact",method:"post"}, cancelMethodRef)) as any
)
