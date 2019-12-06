import {action, observable} from "mobx"

/**
 * 添加好友
 * */
type FriendInfo = {
  avatar: string, nicename: string,
  user_id: string, username: string,
}

class AddFriendStore {
  // （搜索到的）好友信息
  @observable friendInfo:FriendInfo = {
    avatar: "", nicename: "", user_id: "", username: ""
  }
  // 设置 好友信息
  @action.bound
  setFriendInfo(obj: FriendInfo) {
    this.friendInfo = {
      avatar: obj.avatar, nicename: obj.nicename,
      user_id: obj.user_id, username: obj.username
    }
  }
}

const addFriendStore = new AddFriendStore()

export default addFriendStore
