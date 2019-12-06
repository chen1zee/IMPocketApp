import {useLocalStore} from "mobx-react-lite";
import {ImageSourcePropType} from "react-native";
import {flow} from "mobx";
import {green, orange, pink} from "js_pro_src/styles/color";
import {frndContact, FrndContactRes} from "js_pro_src/api/friend";

/**
 * 通讯录
 * */
type Tag = {
  type: 1|2|3 // 1:安全,2:高赔,3:担保
  desc: string // 文字
  color: string // 颜色
}
export type GroupItem = {
  type: 1|2 // 1:新的朋友按钮 2:群
  avatar: ImageSourcePropType, // 群头像
  name?: string, tags?: Tag[], // 群名称 标签
}
export type PeopleItem = {
  avatar: ImageSourcePropType, name: string // id 头像 名称
}
export type PeopleList = {
  sectionTxt: string, items: PeopleItem[] // 如: "A", "B", 等
}[]

export type UseDataStore = {
  groupList: GroupItem[], // 群列表
  peopleList: PeopleList, // 好友列表
  renderList: [{items: GroupItem[]}, ...(PeopleList)] // 渲染列表
  getPeopleList: () => Promise<void>, // 获取好友列表
  getData: () => Promise<void> // 获取数据
}
function useDataStore(): UseDataStore {
  const store = useLocalStore<UseDataStore>(() => ({
    groupList: [], // 群列表
    peopleList: [], // 好友列表
    // 渲染列表
    get renderList() { return [{items: store.groupList}, ...store.peopleList] },
    // @ts-ignore 获取 好友列表
    getPeopleList: flow(function * () {
      const res: FrndContactRes = yield frndContact()
      store.peopleList = res.data
    }),
    // 获取数据
    getData: flow<Promise<void>, []>(function * () {
      // yield sleep(1)
      store.groupList = [
        {type: 1},
        {
          type: 2, avatar: require("js_pro_src/assets/u240.jpg"), name: "禁抢按实际掉炯炯（50-100元）你描述对接",
          tags: [{type:1, desc: "安全", color: green}, {type: 2, desc: "高赔", color: pink}, {type: 3, desc: "担保", color: orange}]
        },
        {
          type: 2, avatar: require("js_pro_src/assets/u240.jpg"), name: "禁抢按实际掉炯炯（50-100元）你描述对接",
          tags: [{type:1, desc: "安全", color: green}, {type: 2, desc: "高赔", color: pink}, {type: 3, desc: "担保", color: orange}]
        },
        {
          type: 2, avatar: require("js_pro_src/assets/u240.jpg"), name: "禁抢按实际掉炯炯（50-100元）你描述对接",
          tags: [{type:1, desc: "安全", color: green}, {type: 2, desc: "高赔", color: pink}, {type: 3, desc: "担保", color: orange}]
        }
      ]
      store.getPeopleList()
    })
  }))
  return store
}

export default useDataStore
