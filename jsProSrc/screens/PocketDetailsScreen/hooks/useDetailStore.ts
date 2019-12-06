/**
 * 红包详情 store
 * */
import {useLocalStore} from "mobx-react-lite";
import {ImageSourcePropType} from "react-native";
import {flow} from "mobx";
import sleep from "js_pro_src/utils/sleep";

export type PocketType = 1|2|3|null // 描述 1:手气最佳, 2:手气最差 3:中雷

export type RecieveItem = {
  id: number,
  avatar: ImageSourcePropType, name: string, dateTxt, // 头像， 名称, 日期str
  money: string, // 红包str
  type?: PocketType
}

export type UseDetailStore = {
  person: { // 个人信息
    avatar: ImageSourcePropType|"", name: string // 头像，名称
  },
  pocketInfo: { // 红包信息
    hasGetNum: number, totalNum: number, // 已领取， 红包总数
    totalMon: number, minePoint: number // 总金额, 雷点数
  },
  recieveList: RecieveItem[], // 红包获取
  // 获取数据
  getData: () => Promise<void>
}

function useDetailStore(): UseDetailStore {
  const store = useLocalStore<UseDetailStore>(() => ({
    person: { // 个人信息
      avatar: "", name: "", // 头像，名称
    },
    pocketInfo: { // 红包信息
      hasGetNum: 0, totalNum: 0, // 已领取， 红包总数
      totalMon: 0, minePoint: 0 // 总金额, 雷点数
    },
    recieveList: [],
    getData: flow<Promise<void>, []>(function * () {
      yield sleep(300)
      store.person = {
        avatar: require("js_pro_src/assets/u235.jpg"), name: "Kyle"
      }
      store.pocketInfo = {
        hasGetNum: 4, totalNum: 5, totalMon: 300, minePoint: 3
      }
      store.recieveList = [
        {
          id: 1,
          avatar: require("js_pro_src/assets/u235.jpg"), name: "就是滴哦就",
          money: "123.12", dateTxt: "2019-10-02 13:12:12", type: 1
        },
        {
          id: 2,
          avatar: require("js_pro_src/assets/u235.jpg"), name: "氨基酸滴哦",
          money: "123.12", dateTxt: "2019-10-02 13:12:12", type: 2
        },
        {
          id: 3,
          avatar: require("js_pro_src/assets/u235.jpg"), name: "口怕口怕",
          money: "123.12", dateTxt: "2019-10-02 13:12:12", type: 3
        },
        {
          id: 4,
          avatar: require("js_pro_src/assets/u235.jpg"), name: "asd",
          money: "123.12", dateTxt: "2019-10-02 13:12:12", type: null
        },
        {
          id: 5,
          avatar: require("js_pro_src/assets/u235.jpg"), name: "asd",
          money: "123.12", dateTxt: "2019-10-02 13:12:12"
        },
        {
          id: 6,
          avatar: require("js_pro_src/assets/u235.jpg"), name: "asd",
          money: "123.12", dateTxt: "2019-10-02 13:12:12", type: 3
        },
      ]
    })
  }))
  return store
}

export default useDetailStore
