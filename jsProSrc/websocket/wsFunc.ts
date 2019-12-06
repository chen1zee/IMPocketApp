/**
 * websocket 对应后端 func
 * */

// 获取 会话列表
export const CHT_GETLST = "chat@getList"
// page:分页数 1开始
export type CHT_GETLST_DATA = {page:number}



/**
 * types
 * */
type DefaultRes<T> = {
  series_id: string // 序列id
  code: number // 返回码  200 成功
  msg: string // 返回消息
  data: T
}
// 返回 聊天信息
export type ChatMsg = DefaultRes<{
  msg_id: string, // 消息id
  type: 1, // 消息类型 1:普通消息
  chat_id: string, // 聊天id
  from: string, // 发送人
  to: string, // 接收人
  msg: string // 消息
}>
