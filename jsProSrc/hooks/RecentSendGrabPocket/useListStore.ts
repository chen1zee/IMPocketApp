/**
 * 列表页 store
 * */
import {useLocalStore} from "mobx-react-lite";
import { flow } from "mobx";
import sleep from "js_pro_src/utils/sleep";

const mockData = [1,2,3,4,5,6,7,9].map<Item>(() => ({
  name: "按规则生成的红包标题123",
  dateTxt: "19年12月11日 22:22:22",
  money: (Math.random() * 100000).toFixed(2),
  typeTxt: "扫雷"
}))

type Item = {
  name: string // 前端按 规则生成
  typeTxt: string // 前端 按照 映射生成
  dateTxt: string // 前端 映射生成 "19年12月11日 22:22:22"
  money: string // 红包金额 字符串 "123.00"
}

type Store = {
  val: Item[],
  getVal: () => Promise<void>
}
function useListStore(): Store {
  const store = useLocalStore<Store>(() => ({
    val: [],
    getVal: flow(function * () {
      yield sleep(1000)
      store.val = mockData
    })
  }))
  return store
}

export default useListStore
