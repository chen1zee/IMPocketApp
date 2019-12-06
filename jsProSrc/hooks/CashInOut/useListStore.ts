/**
 * 列表store
 * */
import {useLocalStore} from "mobx-react-lite";
import {flow} from "mobx";
import {wllRecharge, wllWithdraw} from "js_pro_src/api/wallet";

export type UseListStoreItem = Item

type Cell = {
  sectionDate: string, // 年月 txt
  sum: string // 总计 "123.00"
  items: Item[]
}
// 具体记录
type Item = {
  name: string // 渠道中文
  date: string // 日时分秒 "11日 22:33:44"
  mon: string // 元 "123.00"
  /** 充值或提款id */
  recharge_id?: string // 充值id
  withdraw_id?: string // 提款id
}

type Store = {
  val: Cell[],
  getVal: (cancelMethodRef) => any // 获取充值 list
}
function useListStore(mode: "in"|"out"): Store {
  const store = useLocalStore<Store>(() => {
    // 请求 api
    const getAction = mode == "in" ? wllRecharge : wllWithdraw
    return {
      val: [],
      getVal: flow(function * (cancelMethodRef) {
        const res:any = yield getAction(cancelMethodRef)
        // TODO 对接结构中
        store.val = res.data
      })
    }
  })
  return store
}

export default useListStore
