import React, {useCallback, useState} from "react"
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  TextStyle,
  View,
  ViewStyle
} from "react-native"
import Ionicon from "react-native-vector-icons/Ionicons"
import {level2Word, white} from "../styles/color";
import {pxW2dp} from "../utils/sizes";

/**
 * 有icon 输入框
 * */
type Props = {
  value: string, // 值
  changeText: (text: string) => void, // 修改text
  iconName: string // icon名

  placeholder?: string,
  backgroundColor?: string, // input背景色
  wrapStyle?: ViewStyle // 外层style
  iconStyle?: TextStyle // icon style
  inputStyle?: TextStyle // 输入 style
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void // 按键事件
}
function ProIconInput({
  value, changeText,
  placeholder, iconName, backgroundColor=white,
  wrapStyle, iconStyle, onKeyPress
                      }: Props) {
  const [iconShow, setIconShow] = useState(true) // icon显示 flag

  const toggleIconShow = useCallback(flag => setIconShow(flag), [])

  return (
    <View style={[styles.wrap, {backgroundColor}, wrapStyle]}>
      {iconShow &&
      <Ionicon name={iconName} style={[styles.icon, iconStyle]} />
      }
      <TextInput
        value={value} style={[styles.input]}
        onChangeText={changeText} placeholder={placeholder}
        onKeyPress={onKeyPress}
        onFocus={() => toggleIconShow(false)}
        onBlur={() => toggleIconShow(true)}
      />
    </View>
  )
}


export default ProIconInput

const styles = (() => {
  return StyleSheet.create({
    wrap: {
      height: pxW2dp(90),
      paddingHorizontal: pxW2dp(20),
      flexDirection: "row", alignItems: "center"
    },
    icon: {
      fontSize: pxW2dp(40), lineHeight: pxW2dp(40), color: level2Word,
      marginHorizontal: pxW2dp(20),
    },
    input: {
      fontSize: pxW2dp(34), color: level2Word, flex: 1
    }
  })
})()
