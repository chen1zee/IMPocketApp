import React, {PropsWithChildren} from "react"
import {TextStyle, View, ViewStyle, Text, StyleSheet} from "react-native"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {white} from "js_pro_src/styles/color";


type Props = {
  style?: ViewStyle,
  textStyle?: TextStyle,
  text: string, // 显示文字
}
/**
 * 标签组件
 * @optimize-later 添加 细节， 调控等
 * */
function ProBadge(props: PropsWithChildren<Props>) {
  const {style, textStyle, text} = props
  return (
    <View style={[styles.wrap, style]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  )
}

export default ProBadge

const styles = StyleSheet.create({
  wrap: {
    height: pxW2dp(32), borderRadius: pxW2dp(32 / 2),
    paddingHorizontal: pxW2dp(14), alignItems: "center", justifyContent: "center"
  },
  text: {
    fontSize: pxW2dp(22), lineHeight: pxW2dp(28), color: white
  }
})
