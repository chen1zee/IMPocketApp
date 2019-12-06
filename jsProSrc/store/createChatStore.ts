/**
 * 创建群聊 store
 * */
import {action, observable, flow} from "mobx";

class CreateChatStore {
  // 添加的 群成员 ids
  @observable joinIds: number[] = []
  // 群聊页 红包配置
  @observable pocketConf = {
    asd: 321 // TODO 待添加
  }

  // 设置 群成员
  @action.bound
  setJoinIds(arr) { this.joinIds = arr }
  // 设置 红包设置
  @action.bound
  setPocketConf() {
    this.pocketConf = {
      asd: 123
    }
  }
  // 提交 创建群聊
  create = flow(function * () {
    console.log("create Chat 待完成")
  })
}

const createChatStore = new CreateChatStore()

export default createChatStore
