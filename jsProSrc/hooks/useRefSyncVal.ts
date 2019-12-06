/**
 * 使用 ref 来同步 val
 * 用例：
 * const someRef = useRefSyncVal(func)
 * someRef.current()
 * */
import {useEffect, useRef} from "react";

function useRefSyncVal<T>(val: T) {
  const ref = useRef<T>(val)
  useEffect(() => { // re-render 后 修改指向
    ref.current = val
  }, [val])
  return ref
}

export default useRefSyncVal
