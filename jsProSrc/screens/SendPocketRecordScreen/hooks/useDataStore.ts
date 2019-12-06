import {useLocalStore} from "mobx-react-lite";
import {action, flow} from "mobx";
import sleep from "js_pro_src/utils/sleep";
import parseTime from "js_pro_src/utils/parseTime";
import {LargeList} from "react-native-largelist-v3";
import {MutableRefObject} from "react";

/**
 * 列表
 * */
export type UseDataStore = {
  list: {name: string, time: string}[], // 列表
  page: number, offset: 10, // 分页
  allLoaded: boolean, // 全数据已加载flag
  recordNum: number, // 发包记录 数
  ListRef?: MutableRefObject<LargeList|undefined> // list ref
  getMoreList: (
    reset?: boolean, // 重置flag
  ) => Promise<void>, // 获取数据
  getRecord: () => Promise<void> // 获取记录
  setListRef: (r: MutableRefObject<LargeList|undefined>) => void // 设置 listRef
}
function useDataStore(): UseDataStore {
  const store = useLocalStore<UseDataStore>(() => ({
    list: [],
    page: 0, offset: 10, allLoaded: false,
    recordNum: 0,
    ListRef: undefined,
    getMoreList: flow<Promise<void>, [(boolean|undefined)]>(function * (
      reset=false
                                                                 ) {
      yield sleep(300)
      if (reset) {
        store.page = 0
        store.offset = 10
      } else {
        store.page = store.page + 1
      }
      if (reset) {
        store.list = [0,1,2,3,4,5,6,7,8,9].map(() => ({
          name: "50元/9包",
          time: parseTime(new Date(), '{yyyy}-{mm}-{dd} {hh}:{ii}:{ss}')
        }))
      } else {
        store.list = store.list.concat([0,1,2,3,4,5,6,7,8,9].map(() => ({
          name: "50元/9包",
          time: parseTime(new Date(), '{yyyy}-{mm}-{dd} {hh}:{ii}:{ss}')
        })))
      }
      store.ListRef && store.ListRef.current && store.ListRef.current.endLoading()
      if (store.page >= 10) {
        store.allLoaded = true
      }
    }),
    getRecord: flow<Promise<void>, []>(function * () {
      yield sleep(300)
      store.recordNum = Math.floor(Math.random() * 10000)
    }),
    setListRef: action<UseDataStore["setListRef"]>(function (r) {
      store.ListRef = r
    })
  }))
  return store
}

export default useDataStore
