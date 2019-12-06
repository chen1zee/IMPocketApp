/**
 * 消息列表store
 * */
import {action, observable} from "mobx";

/** TODO mock数据 */
const chatIdCreator = (() => {
  let i = 100
  return () => ++i
})()
const createLabels = (num) => {
  return num % 3 == 0 ? [{type: "safe", text: "认证"}, {type: "guarantee", text: "认证"}] : undefined
}
const mockItem = (): ListItemType => ({
  chatId: chatIdCreator(), updateTime: "2019年10月1日",
  img: require("js_pro_src/assets/u239.jpg"),
  labels: createLabels(chatIdCreator()),
  title: "肯定撒pods卡都是靠打破竞赛懂撒姐弟仨借调时间段",
  msg: "群主已开启全员禁言,群主已开启全员禁言,群主已开启全员禁言,群主已开启全员禁言,",
  top: false, silence: false
})

export type ListItemType = {
  chatId: number, img: any, labels?: { type: string, text: string }[],
  title: string, msg: string, updateTime: string,
  top: boolean, // 置顶 前端(前端flag)
  silence: boolean,
}

export class MsgListStore {
  // 列表
  @observable list: ListItemType[] = []
  @action.bound
  public addList() { // 添加item
    this.list = this.list.concat(mockItem())
  }
  @action.bound
  public hideLabel() { // 切换 label
    const temp = this.list.slice()
    const item = this.list[0]
    item.labels = item.labels ? undefined : [{type: "safe", text: "安全"}, {type: "guarantee", text: "担保"}]
    this.list = temp
  }
  @action.bound
  public toggleChatTop(selectedIndex) { // 切换 置顶
    const temp = this.list.slice()
    const item = temp[selectedIndex]
    item.top = !item.top // 置顶flag 取反
    temp.splice(selectedIndex, 1) // 推出 item
    // 设置指定
    if (item.top) {
      temp.unshift(item)
    } else { // 取消置顶 将item 放进 非置顶 首位
      let i = 0
      for (let l = temp.length; i < l; i++) {
        if (!temp[i].top) break
      }
      temp.splice(i, 0, item)
    }
    this.list = temp
  }
  @action.bound
  public toggleSilence(selectedIndex) { // 切换免打扰
    const temp = this.list.slice()
    temp[selectedIndex].silence = !temp[selectedIndex].silence
    this.list = temp
  }
  @action.bound
  public delChat(selectedIndex) { // 删除对话
    const temp = this.list.slice()
    temp.splice(selectedIndex, 1)
    this.list = temp
  }
}

const msgListStore = new MsgListStore();

export default msgListStore
