import {useLocalStore} from "mobx-react-lite";
import {action} from "mobx";

/**
 * 月份
 * */
export type UseMonthStore = {
  val: {year: number, month: number},
  valStr: () => string // getter 月份string
  changeValFromStr: (str: string) => void // 修改val str: 如: "2019年11月"
}
type Props = {
  onValChange: () => (void|Promise<void>)
}
function useMonthStore({
  onValChange
                       }: Props): UseMonthStore {
  const store = useLocalStore<UseMonthStore>(() => {
    /** 将时间戳设置为本月 */
    const nowDate = new Date()
    return {
      val: {year: nowDate.getFullYear(), month: nowDate.getMonth()+1},
      get valStr() { return `${store.val.year}年${store.val.month}月` },
      // 从 xxxx年xx月 转化 val
      changeValFromStr: action<UseMonthStore["changeValFromStr"]>(function (str) {
        const arr = str.split(/[年月]/)
        if (store.val.year == arr[0] && store.val.month == arr[1]) {
          return // 相同 不用改变
        }
        store.val = {year: Number(arr[0]), month: Number(arr[1])}
        onValChange()
      })
    }
  })
  return store
}

export default useMonthStore
