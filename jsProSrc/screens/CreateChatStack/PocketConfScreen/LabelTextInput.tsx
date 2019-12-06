import React, {useCallback, useMemo} from "react"
import {StyleSheet, View, Text, TextInput} from "react-native"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {borderColor, level1Word, level2Word, red} from "js_pro_src/styles/color";

type Props = {
  label: string,
  val: string,
  warning: boolean,
  onChangeText: (text: string) => void,

  // 键盘类型
  keyboardType?: "default" | "numeric" | "number-pad" | "phone-pad"
}
function LabelTextInput({
  label, val, onChangeText, warning,
  keyboardType="default"
                        }: Props) {
  const onChangeTexthandler = useCallback((text) => {
    onChangeText(text)
  }, [onChangeText])
  const extraTextInputStyle = useMemo(() => {
    if (warning) return {borderColor: red, color: red}
    return {}
  }, [warning])
  return (
    <View style={styles.wrap}>
      <Text style={styles.leftLabel}>{label}</Text>
      <TextInput
        value={val} style={[styles.textInput, extraTextInputStyle]}
        onChangeText={onChangeTexthandler} keyboardType={keyboardType}
      />
      <Text style={styles.rightTxt}>元</Text>
    </View>
  )
}

export default LabelTextInput

const styles = (() => {
  const size = pxW2dp(28)
  return StyleSheet.create({
    wrap: {
      flexDirection: "row", alignItems: "center",
      height: pxW2dp(60), marginBottom: pxW2dp(30)
    },
    leftLabel: {
      width: pxW2dp(230), fontSize: size,
      color: level2Word, textAlign: "right"
    },
    textInput: {
      width: pxW2dp(200), fontSize: size, lineHeight: pxW2dp(50),
      paddingVertical: pxW2dp(5), paddingHorizontal: pxW2dp(20), marginHorizontal: pxW2dp(10),
      color: level1Word, borderWidth: pxW2dp(2), borderColor: borderColor,
    },
    rightTxt: {
      fontSize: size, color: level2Word,
    }
  })
})()
