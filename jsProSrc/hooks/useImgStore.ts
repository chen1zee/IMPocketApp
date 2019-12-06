import ImageCropPicker from "react-native-image-crop-picker";
import {useLocalStore} from "mobx-react-lite";
import {action} from "mobx";
import log from "js_pro_src/utils/log";

/**
 * 选择图片 store
 * */
export type UseImgStore = Store

// picker 所用方法
type ImagePickerMethods = "openPicker" | "openCamera"

type ImgInfo = { // 选择的图片信息
  path: string, width: string, height: string
}
type Store = {
  imgInfo: ImgInfo, // 图片信息
  showingModal: boolean, // 显示 图片选择选项 蒙层 flag
  changeImgInfo: (result: ImgInfo) => void // 修改 图片信息
  openModal: () => void // 打开蒙层
  closeModal: () => void // 关闭蒙层
  pickImg: (method: ImagePickerMethods) => Promise<void> // 选择图片
}
type PickerOpts = {
  width?: number, height?: number, // 图片宽高
  cropping?: boolean // 裁剪
}
function useImgStore(
  pickerOpts: PickerOpts = {},
  changeImgInfoCb?: () => void // 改变图片后 callback
): Store {
  const store = useLocalStore<Store>(() => ({
    imgInfo: {path:"",width:"",height:""},
    showingModal: false,
    // 打开蒙层
    openModal: action(function () { store.showingModal = true }),
    // 关闭蒙层
    closeModal: action(function () { store.showingModal = false }),
    // 修改 图片信息
    changeImgInfo: action(function (result: ImgInfo) {
      store.imgInfo = {path:result.path,width:result.width,height:result.height}
      changeImgInfoCb && changeImgInfoCb()
    }),
    // 选择图片
    pickImg: async (method: ImagePickerMethods) => {
      store.closeModal()
      const actionM = method == "openCamera" ? ImageCropPicker.openCamera : ImageCropPicker.openPicker
      try {
        // @ts-ignore
        const result:ImgInfo = await actionM(pickerOpts)
        log.d(result)
        if (!result.path) return
        store.changeImgInfo(result)
      } catch (e) { log.w(e) }
    }
  }))
  return store
}

export default useImgStore
