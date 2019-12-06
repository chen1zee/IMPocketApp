import {requestWithCancelMethodRef} from "js_pro_src/api/request";


/**
 * 搜索 api
 * */

/** 搜索好友用户名 */
type SrchUsrnameData = {username:string}
export const srchUsrname = (data: SrchUsrnameData, cancelMethodRef?) => (
  requestWithCancelMethodRef({url:"/v1/search/username",method:"post",data}, cancelMethodRef)
)
