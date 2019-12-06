import {useCallback, useRef} from "react";
import log from "js_pro_src/utils/log";

/**
 * 给 事件处理器 添加一个 pending flag
 * 待 上一个 事件处理完毕后，， 才能继续触发
 * */
type UsePendingHandler = () => Promise<void>
function usePendingHandler(handler: (() => void|Promise<void>)): UsePendingHandler {
  const pending = useRef<boolean>(false)
  return useCallback(async () => {
    if (pending.current) return
    pending.current = true
    try {
      await handler()
    } catch (e) {
      log.w(e)
    } finally {
      pending.current = false
    }
  }, [handler])
}

export default usePendingHandler
