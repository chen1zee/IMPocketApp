import {useLocalStore} from "mobx-react-lite";
import {action} from "mobx";

/**
 * 雷点数字
 * */
export type NumArrItem = {
  selected: boolean, // 此数字被选择flag
  value: string, // 数字 如 "1"
}

type MineNumArrStore = {
  val: NumArrItem[],
  warning: boolean,
  toggle: (index: number) => void
  setVal: (arr: number[]) => void
}
type Props = {
  hasToggleCb: () => void // 点击数字 flag 用以重置 大小单双
}
function useMineNumArrStore({
  hasToggleCb
                            }: Props): MineNumArrStore {
  const store = useLocalStore<MineNumArrStore>(() => {
    const val = [0,1,2,3,4,5,6,7,8,9].map<NumArrItem>(item => ({
      value: String(item), selected: false
    }))
    return {
      val,
      warning: false, // 警告flag
      toggle: action<MineNumArrStore["toggle"]>(function (index) {
        const tempVal = store.val.slice()
        tempVal[index].selected = !tempVal[index].selected
        store.val = tempVal
        hasToggleCb()
      }),
      // 设置雷电数
      setVal: action<MineNumArrStore["setVal"]>(function (arr: number[]) {
        store.val = store.val.map((item) => {
          item.selected = arr.includes(parseInt(item.value, 0))
          return item
        })
      })
    }
  })
  return store
}

export default useMineNumArrStore
