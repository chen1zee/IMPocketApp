import {useEffect, useRef} from "react"

/**
 * 获取 前一 render的 state hook
 * */
function usePrevious<T extends any>(state: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = state
  })
  return ref.current
}

export default usePrevious
