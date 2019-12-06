/**
 * websocket类
 * */
import authStorage from "js_pro_src/storage/authStorage";
import base64 from "js_pro_src/utils/Base64";
import log from "js_pro_src/utils/log";
import {CHT_GETLST} from "js_pro_src/websocket/wsFunc";
import {DEVICE_TOKEN} from "js_pro_src/storage/storageKeys";

type Callbacks = {
  [key: string]: {
    runner: (resObj: any) => (void|Promise<void>)
  }[]
}

class WS {
  private instance // websocket 实例
  private url // 记录 连接地址
  private callbacks: Callbacks = {} // 存放 监听器 回调
  /**
   * sockect状态 "empty":空|"connect":连接中|"close":关闭
   * */
  private status: "empty"|"connect"|"close" = "empty"
  /**
   * 初始化
   * @param {string} url 连接地址
   * */
  public async connect(url) {
    const that = this
    return new Promise(async(resolve, reject) => {
      that.url = url
      log.d("### connect websocket")
      const token = await authStorage.get(DEVICE_TOKEN)
      that.instance = new WebSocket(url, [], {headers: { token }})
      that.instance.onopen = () => {
        log.d("### socket onOpen call")
        resolve()
        // this.send("chat@getChatList") // 获取 会话列表
      }
      that.instance.onmessage = e => {
        log.d("### socket recieve message")
        log.d(e)
        const resObj = base64.objectify(e.data)
        log.d(resObj)
        // TODO 现在 暂时 没有 func 返回
        // 响应 对应 func callbacks
        const mockFuncName = CHT_GETLST
        that.emit(mockFuncName, resObj) // 触发对应 func 的 监听器
      }
      that.instance.onerror = e => {
        log.d("socket recieve error")
        log.d(e)
        reject(e)
      }
      that.instance.onclose = e => {
        log.d("### socket close")
        log.d(e)
      }
    })
  }
  /**
   * 发送事件
   * @param {string} funcName 事件名 使用 ./wsFunc.ts 中定义事件
   * @param {Object} params 参数
   * */
  public send(funcName: string, params:object={}) {
    const jsonObj = { func: funcName, params, ext: [] }
    log.d("### socket send msg")
    log.d(jsonObj)
    // log.d(JSON.stringify(jsonObj))
    // log.d(base64.parse(JSON.stringify(jsonObj)))
    // 编码 && socket 发送
    this.instance.send(base64.parse(JSON.stringify(jsonObj)))
  }
  /**
   * 关闭socket
   * */
  public close() {
    if (this.instance) {
      this.instance.close()
      // 清除 device_token
      authStorage.remove(DEVICE_TOKEN)
    }
  }
  /**
   * 触发事件  在 socket.onmessage 时触发
   * */
  private emit(funcName, resObj) {
    const funcCBs = this.callbacks[funcName]
    if (!funcCBs || !funcCBs.length) return
    for (let i = 0, l = funcCBs.length; i < l; i++) {
      if (funcCBs[i].runner === null) { // 为已删除 监听器
        funcCBs.splice(i, 1)
        --l
        --i
        continue
      }
      funcCBs[i].runner(resObj)
    }
  }
  /**
   * 添加监听器到 对应队列
   * */
  public on(funcName: string, cb) {
    if (!this.callbacks[funcName]) this.callbacks[funcName] = []
    const obj = {runner: cb}
    this.callbacks[funcName].push(obj)
    return obj
  }
  /**
   * 删除事件
   * 直接触发 obj: {runner: cb} -> 将 obj.runner = null
   * 在下一轮 emit 中 将 obj.runner === null 清除
   * */
  public remove(obj) { obj.runner = null }
}

const ws = new WS()

export default ws

