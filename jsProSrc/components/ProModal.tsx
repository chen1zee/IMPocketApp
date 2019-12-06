import React from "react"
import {Modal, StyleSheet, TouchableWithoutFeedback, View, ViewStyle} from "react-native"
import {mask} from "js_pro_src/styles/color";

type PropsType = {
  visible: boolean,
  onRequestClose?: () => void, // 按返回键
  onDismiss?: () => void, // 按蒙层
  animationType?: "none" | "slide" | "fade", // 动画type
  backgroundColor?: string
  maskStyle?: ViewStyle, // 外层 mask 样式
  children: any,
}
function ProModal({
  visible, onRequestClose, onDismiss, maskStyle,
  animationType="none", backgroundColor=mask, children
                  }: PropsType) {
  return (
    <Modal
      visible={visible} transparent={true} animationType={animationType}
      onRequestClose={onRequestClose} hardwareAccelerated={true}
    >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={[styles.mask, {backgroundColor}, maskStyle]}>
          <TouchableWithoutFeedback onPress={() => {}}>
            {children}
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ProModal

const styles = StyleSheet.create({
  mask: {
    position: "relative", flex: 1,
    alignItems: "center", justifyContent: "center"
  },
})
