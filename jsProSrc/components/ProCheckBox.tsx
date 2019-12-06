import React, {useMemo} from "react"
import {StyleSheet, TextStyle, TouchableWithoutFeedback, View, ViewStyle} from "react-native"
import Ionicon from "react-native-vector-icons/Ionicons"
import {borderColor, lessGreen, white} from "js_pro_src/styles/color";
import {pxW2dp} from "js_pro_src/utils/sizes";

type Props<T> = {
  val: T, // value
  activeVal: T, // 激活态 val
  inActiveVal?: T, // 非激活态 val
  onPress?: () => void,

  size?: number, // checkbox 尺寸
  activeColor?: string, inactiveColor?: string, activeIconColor?: string,
  inActiveBorderColor?: string, activeBorderColor?: string,
  wrapStyle?: ViewStyle, iconStyle?: TextStyle,
}
function ProCheckBox<T extends any>({
  val, activeVal, onPress,
  size=pxW2dp(50),
  activeColor=lessGreen, inactiveColor=white, activeIconColor=white,
  inActiveBorderColor=borderColor, activeBorderColor=white,
  wrapStyle, iconStyle
                     }: Props<T>) {
  const defaultIconSize = useMemo(() => size * 0.7, [size])
  // 无onPress 则 不接收点击权限
  const disabled = useMemo(() => !onPress, [onPress])
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.wrap,
          {width: size, height: size, borderRadius: size/2},
          {borderColor: val == activeVal ? activeBorderColor : inActiveBorderColor},
          {backgroundColor: val == activeVal ? activeColor : inactiveColor},
          wrapStyle,
        ]}
      >
        {val == activeVal &&
        <Ionicon
          name="md-checkmark"
          style={[
            {fontSize: defaultIconSize, color: activeIconColor, fontWeight: "900"},
            iconStyle,
          ]}
        />}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ProCheckBox

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center", justifyContent: "center",
    borderWidth: pxW2dp(4), borderColor: white, overflow: "hidden"
  },
})
