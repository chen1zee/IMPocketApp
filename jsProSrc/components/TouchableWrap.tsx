import React, {PropsWithChildren} from "react"
import {
  GestureResponderEvent,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  View,
} from "react-native"
import {gray} from "js_pro_src/styles/color";

type Props = {
  onPress?: (event: GestureResponderEvent) => void,
  onLongPress?: (event: GestureResponderEvent) => void,
  eonPressOut?: (event: GestureResponderEvent) => void,
  disabled?: boolean // 禁用 btn flag
}

/**
 * 可点击 wrap
 * ios && 无点击事件 使用 TouchableHighlight
 * android 使用 TouchableNativeFeedback
 * */
function TouchableWrap({
  onPress, onLongPress, onPressOut,
  disabled=false,
  children, background, ...restProps
                       }: PropsWithChildren<Props & TouchableNativeFeedbackProps>) {
  if ( // IOS render && 无点击事件的组件 render
    Platform.OS === 'ios' ||
    Platform.OS === 'web' ||
    (!onPress && !onLongPress) ||
    Platform.Version <= 21
  ) {
    return (
      <TouchableHighlight
        disabled={disabled}
        underlayColor={gray} onPress={onPress}
        onLongPress={onLongPress} onPressOut={onPressOut}>
        <View {...restProps}>{children}</View>
      </TouchableHighlight>
    )
  }
  // Android
  return (
    <TouchableNativeFeedback
      disabled={disabled}
      onPress={onPress} onLongPress={onLongPress}
      background={background} onPressOut={onPressOut}>
      <View {...restProps}>{children}</View>
    </TouchableNativeFeedback>
  )
}

export default TouchableWrap
