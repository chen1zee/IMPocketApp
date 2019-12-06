import {useLocalStore} from "mobx-react-lite";
import {action} from "mobx";

type Val = "d" | "s"

type UseDanShuangStore = {
  val: Val,
  changeVal: (val: Val) => void,
  // 选择flag
  selected: boolean, toggleSelected: (flag?: boolean) => void,
  options: { label: string, value: Val }[]
}
type Props = {
  // 已选择 事件 通知其他组件 改变
  hasSelectedCb: (val: Val) => void
}
function useDanShuangStore({
  hasSelectedCb
                       }: Props) {
  const store = useLocalStore<UseDanShuangStore>(() => ({
    val: "d", // 单双
    selected: false, // 选择flag
    // 配置项
    options: [{label: "单", value: "d"}, {label: "双", value: "s"}],
    changeVal: action<UseDanShuangStore["changeVal"]>(function (v: Val) {
      store.val = v
      hasSelectedCb(v)
    }),
    toggleSelected: action<UseDanShuangStore["toggleSelected"]>(function (flag) {
      const futureSelected = flag !== undefined ? flag : !store.selected
      store.selected = futureSelected
      if (futureSelected) hasSelectedCb(store.val)
    }),
  }))
  return store
}

export default useDanShuangStore
