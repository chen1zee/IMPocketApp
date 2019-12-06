import {useEffect} from "react"
import {LocalStore} from "./useLocalS";
import usePrevious from "js_pro_src/hooks/usePrevious";

/**
 * 需要修改 navigation.canNext hook
 * */
type Props = {
  // 选中的 persons list
  selectedPersons: LocalStore["selectedPersons"],
  // 需要修改 回调
  shouldChange: (flag: boolean) => void
}
function useShouldChangeCanNext({
  selectedPersons, shouldChange
                                }: Props) {
  const prevSelectedPersons = usePrevious<LocalStore["selectedPersons"]>(selectedPersons)
  useEffect(() => { // 设置 navigation 右上角图标是否可点击
    if (!prevSelectedPersons) return
    // 可以点击下一步
    if (!prevSelectedPersons.length && selectedPersons.length) {
      shouldChange(true)
    }
    // 不可点击下一步
    if (prevSelectedPersons.length && !selectedPersons.length) {
      shouldChange(false)
    }
  }, [shouldChange, selectedPersons, prevSelectedPersons])

}

export default useShouldChangeCanNext
