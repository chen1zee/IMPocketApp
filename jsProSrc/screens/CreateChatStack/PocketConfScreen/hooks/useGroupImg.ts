import {useCallback} from "react"
import useImg, {UseImg} from "js_pro_src/hooks/useImg";

export type UseGroupImg = {
  validate: () => Promise<boolean>
} & UseImg

function useGroupImg(): UseGroupImg {
  const img = useImg({
    width: 200, height: 200, cropping: true
  })
  const validate = useCallback<() => Promise<boolean>>(async () => {
    if (!img.val) throw new Error("请选择群图片")
    return true
  }, [img])
  return {
    ...img, validate
  }
}

export default useGroupImg
