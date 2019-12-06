/**
 * 打开|关闭 mainTab 右上角 funcList
 * @param {string} flag "open":打开  "close": 关闭
 * */
export const opClsMainTabFnLs = "opClsMTFnLs"
export type opClsMainTabFnLsFlagType = "open" | "close"

/**
 * 打开|关闭 mainTab 的chatOpt 聊天选项
 * @param {string} flag "open": 打开， "close": 关闭
 * */
export const opClsMainTabChatOpt = "opClsMTChtOpt"
export type opClsMainTabChatOptType = {
  flag: "open" | "close",
  pageX: number, pageY: number // 点击时坐标
}

/**
 * 聊天页面 chatScreen 底部栏 输入框 高度改变事件
 * @param {number} delta 改变的高度
 * */
export const chatBtmBarDeltaH = "chtBtmBrDltH"
