import {useCallback, useState} from "react";
import ImageCropPicker from "react-native-image-crop-picker";
import log from "js_pro_src/utils/log";
/**
 * 选择图片
 * */

// picker 所用方法
type ImagePickerMethods = "openPicker" | "openCamera"

export type UseImg = {
  val: string, // 图片 string
  changeVal: (img: string) => void
  showingModal: boolean // 显示 图片选择选项 蒙层 flag
  closeModal: () => void, openModal: () => void,
  picImg: (method: ImagePickerMethods) => Promise<void>
}
type PickerOpts = {
  width?: number, height?: number, // 图片宽高
  cropping?: boolean // 裁剪
}
function useImg(
  pickerOpts: PickerOpts = {}
): UseImg {
  const [val, changeVal] = useState("")
  const [showingModal, setShowingModal] = useState(false)
  // 关闭蒙层
  const closeModal = useCallback(() => setShowingModal(false), [])
  // 打开蒙层
  const openModal = useCallback(() => setShowingModal(true), [])
  // 选择图片
  const picImg = useCallback<UseImg["picImg"]>(async (method) => {
    closeModal()
    const action = method == "openCamera" ? ImageCropPicker.openCamera : ImageCropPicker.openPicker
    try {
      // @ts-ignore
      const result: {path:string} = await action(pickerOpts)
      log.d(result)
      if (!result.path) return
      changeVal(result.path)
    } catch (e) { log.w(e) }
  }, [closeModal, pickerOpts])
  return {
    val, changeVal,
    showingModal,
    openModal, closeModal,
    picImg
  }
}

export default useImg
