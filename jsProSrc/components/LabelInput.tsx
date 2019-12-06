import React, {useCallback, useRef} from "react"
import {KeyboardType, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from "react-native"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {level1Word, level2Word, red, white} from "js_pro_src/styles/color";

type Props = {
  val?: string,
  changeVal?: (v: string) => void,
  prevLabel: string,
  postLabel: string | null,
  warning: boolean // 警告flag
  cRef?: (r: any) => void // ref
  /** textInput 设置 */
  keyboardType?: KeyboardType,
  maxLength?: number // 限制字符
  placeholder?: string
  editable?: boolean // 可编辑 input flag
} & {
  [key: string]: any
}
function LabelInput({
  val, changeVal,
  prevLabel, postLabel, cRef, warning,
  editable=true,
  ...restProps // 其他props 用于 textInput
                    }: Props) {
  // TextInput Ref
  const TextInputRef = useRef<TextInput>()
  // 捕获 textInputRef
  const catchTextInputRef = useCallback<(r: TextInput) => void>(r => {
    TextInputRef.current = r
    cRef && cRef(r) // 触发 父组件捕获 ref
  }, [cRef])
  // 点击wrap -> 判断是否需要focus
  const onPressJudgeFocus = useCallback(() => {
    if (!TextInputRef.current) return
    if (TextInputRef.current.isFocused()) return
    TextInputRef.current.focus()
  }, [])
  return (
    <TouchableWithoutFeedback onPress={onPressJudgeFocus}>
      <View style={styles.wrap}>
        <Text
          style={[styles.prevLabel, warning?{color: red}:{}]}
        >
          {prevLabel}
        </Text>
        <TextInput
          ref={catchTextInputRef}
          style={[styles.textInput, warning?{color: red}:{}]}
          editable={editable}
          {...restProps}
          value={val} onChangeText={changeVal}
          placeholderTextColor={level2Word}
        />
        {postLabel &&
        <Text
          style={[
            styles.postLabel, warning?{color: red}: {}
          ]}
        >{postLabel}</Text>}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default LabelInput

const styles = (() => {
  const wrapSize = pxW2dp(90)
  return StyleSheet.create({
    wrap: {
      flexDirection: "row", backgroundColor: white, overflow: "hidden",
      paddingHorizontal: pxW2dp(30),
      height: wrapSize, borderRadius: pxW2dp(10), marginBottom: pxW2dp(30),
    },
    prevLabel: {
      fontSize: pxW2dp(32), lineHeight: wrapSize, color: level1Word,
      width: pxW2dp(200), fontWeight: "bold",
    },
    textInput: {
      flex: 1, fontSize: pxW2dp(28), color: level1Word, paddingHorizontal: pxW2dp(10),
      textAlign: "right"
    },
    postLabel: {
      fontSize: pxW2dp(32), textAlign: "center", fontWeight: "bold",
      width: pxW2dp(50), lineHeight: wrapSize, color: level1Word,
    }
  })
})()
