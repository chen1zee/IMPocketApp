import {useState, useCallback} from "react";
import {Mode} from "js_pro_src/screens/CreatePocketScreen/CreatePocketScreen";

/**
 * 红包模式
 * */
type UseMode = {
  val: Mode,
  toggle: () => void // 切换模式
}
function useMode(): UseMode {
  // 模式 "group":发到群   "person":发个人
  const [val, setVal] = useState<Mode>("group")
  // 切换模式
  const toggle = useCallback(() => {
    setVal(val=="group"?"person":"group")
  }, [val])
  return {
    val, toggle
  }
}

export default useMode
