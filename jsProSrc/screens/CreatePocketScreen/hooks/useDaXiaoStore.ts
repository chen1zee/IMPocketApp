import {useLocalStore} from "mobx-react-lite";
import {action} from "mobx";

/**
 * 大小
 * */
type Val = "D" | "x"
type UseDaXiaoStore = {
  val: Val, changeVal: (val: Val) => void,
  selected: boolean, toggleSelected: (flag?: boolean) => void,
  options: { label: string, value: Val }[]
}
type Props = {
  // 已选择 事件 通知其他组件 改变
  hasSelectedCb: (val: Val) => void
}
function useDaXiaoStore({
  hasSelectedCb
                   }: Props): UseDaXiaoStore {
  const store = useLocalStore<UseDaXiaoStore>(() => ({
    val: "D", // 大小
    selected: false, // 选择flag
    // 配置项
    options: [
      {label: "大", value: "D"}, {label: "小", value: "x"}
    ],
    changeVal: action<UseDaXiaoStore["changeVal"]>(function (v: Val) {
      store.val = v
      hasSelectedCb(v)
    }),
    toggleSelected: action<UseDaXiaoStore["toggleSelected"]>(function (flag) {
      const futureSelected = flag !== undefined ? flag : !store.selected
      store.selected = futureSelected
      if (futureSelected) hasSelectedCb(store.val)
    })
  }))
  return store
}

export default useDaXiaoStore
