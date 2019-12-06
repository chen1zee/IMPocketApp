import React, {memo, useRef} from "react"
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import {StyleSheet, Text, TextStyle, TouchableNativeFeedback, ViewStyle} from "react-native";
import {androidRippleColor, white} from "js_pro_src/styles/color";
import {pxW2dp} from "js_pro_src/utils/sizes";
import log from "js_pro_src/utils/log";

// 处理点击事件
async function pressHandler(
  pressPending,
  onPressOrLongPress: (() => void) | (<T>() => Promise<T>) | undefined
) {
  if (pressPending.current) return
  pressPending.current = true
  try {
    onPressOrLongPress && await onPressOrLongPress()
  } catch (e) { // 由业务代码处理 错误
    log.d(e)
  } finally {
    pressPending.current = false
  }
}
/**
 * @optimize-later 添加 主题色等
 * 按钮组件
 */
type Props = {
  text: string, // 显示文字
  onPress?: (() => void) | (<T>() => Promise<T>),
  onLongPress?: ()=> void,
  style?: ViewStyle | ViewStyle[], // 外层 View 样式
  textStyle?: TextStyle | TextStyle[], // 文字样式
  rippleColor?: string // 安卓 ripple
}

const ProButton = memo<Props>(function ({
  rippleColor=androidRippleColor,
  style, textStyle, text,
  onPress, onLongPress,
                                            }) {
  // 点击事件处理中 flag 不可触发多次
  const pressPending = useRef(false)
  return (
    <TouchableWrap
      onPress={() => pressHandler(pressPending, onPress)}
      onLongPress={() => pressHandler(pressPending, onLongPress)}
      background={TouchableNativeFeedback.Ripple(rippleColor, false)}
      style={[styles.wrap, style]}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableWrap>
  )

})

export default ProButton

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#3f51b5", height: pxW2dp(74), paddingHorizontal: pxW2dp(24),
    borderRadius: pxW2dp(4), justifyContent: "center"
  },
  text: {
    fontSize: pxW2dp(24), color: white
  }
})
