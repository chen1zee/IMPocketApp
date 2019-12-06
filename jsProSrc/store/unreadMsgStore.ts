import {observable, flow} from "mobx";
import sleep from "../utils/sleep";

type NumberString = number | "dot"

export class UnreadMsgStore {
  @observable msg: NumberString = 0 // 消息
  @observable find: NumberString = 0 // 发现页

  addNumAsync = flow(function * (this: UnreadMsgStore, num: NumberString) {
    yield sleep(1000)
    if (typeof num === "number" && typeof this.msg === "number") {
      this.msg += num
    } else {
      this.msg = num
    }
  })
  addFindAsync = flow(function * (this: UnreadMsgStore, find: NumberString) {
    yield sleep(1000)
    if (typeof find === "number" && typeof this.find === "number") {
      this.find += find
    } else {
      this.find = find
    }
  })
}

const unreadMsgStore = new UnreadMsgStore()

export default unreadMsgStore
