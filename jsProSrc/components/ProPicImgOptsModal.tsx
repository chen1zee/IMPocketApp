import React from "react"
import {StyleSheet} from "react-native"
import {borderColor, level2Word, maskLight, white} from "js_pro_src/styles/color";
import {View} from "react-native";
import {pxW2dp} from "js_pro_src/utils/sizes";
import ProModal from "js_pro_src/components/ProModal";
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import {Text} from "react-native";

/**
 * 选择图片时，  选项 modal
 * "拍照", "从相册选择"
 * */
type Props = {
  visible: boolean // 显示flag
  onClose: () => void // 关闭蒙层
  onPressCamera: () => void // 选择 拍照选项
  onPressGallery: () => void // 选择 从相册选择
}
function ProPicImgOptsModal({
  visible, onClose,
  onPressCamera, onPressGallery
                            }: Props) {
  return (
    <ProModal
      backgroundColor={maskLight} maskStyle={styles.modalMask}
      visible={visible} onRequestClose={onClose}
      onDismiss={onClose}
    >
      <View style={styles.selectOpts}>
        <SelectOpt
          text="拍照" border={true} onPress={onPressCamera}
          paddingTop={pxW2dp(20)}
        />
        <SelectOpt text="从相册选择" border={true} onPress={onPressGallery} />
        <SelectOpt
          text="取消" border={false} onPress={onClose}
          paddingBottom={pxW2dp(30)}
        />
      </View>
    </ProModal>
  )
}

type SelectOptProps = {
  text: string, border: boolean,
  onPress: () => void
  paddingTop?: number, paddingBottom?: number
}
function SelectOpt({
                     text, onPress, border,
                     paddingTop, paddingBottom
                   }: SelectOptProps) {
  return (
    <TouchableWrap
      style={[
        styles.selectOpt, {borderBottomColor: border?borderColor:"transparent"},
        {paddingTop: paddingTop||0, paddingBottom: paddingBottom||0},
      ]}
      onPress={onPress}
    >
      <Text style={styles.selectOptTxt}>{text}</Text>
    </TouchableWrap>
  )
}

export default ProPicImgOptsModal

const styles = StyleSheet.create({
  modalMask: {
    flexDirection: "row",
  },
  selectOpts: {
    width: pxW2dp(750),
    backgroundColor: white, alignSelf: "flex-end"
  },
  selectOpt: {
    height: pxW2dp(90), borderBottomWidth: pxW2dp(1),
    alignItems: "center", justifyContent: "center",
  },
  selectOptTxt: {
    fontSize: pxW2dp(30), color: level2Word,
  }
})
