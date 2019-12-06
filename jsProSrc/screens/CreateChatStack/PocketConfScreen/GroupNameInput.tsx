import React, {useCallback, useMemo} from "react"
import {StyleSheet, TextInput} from "react-native"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {level1Word, level3Word, red} from "js_pro_src/styles/color";
import {UseStrValidateWithWarning} from "js_pro_src/hooks/useStrValidateWithWarning";

type Props = {
  val: UseStrValidateWithWarning["val"], // 标题
  onChangeText: UseStrValidateWithWarning["changeVal"],
  warning: UseStrValidateWithWarning["warning"]
}
function GroupNameInput({
  val, onChangeText, warning,
                        }: Props) {
  // 警示中 flag
  // 处理文字输入
  const onChangeTextHandler = useCallback(text => {
    onChangeText(text)
  }, [onChangeText])
  // 额外 input style
  const extraInputStyle = useMemo(() => {
    if (warning) return { borderBottomColor: red, color: red }
    return {}
  }, [warning])
  return (
    <TextInput
      value={val}
      style={[styles.textInput, extraInputStyle]}
      placeholder="输入群名称（建议3-5个汉字）"
      onChangeText={onChangeTextHandler}
    />
  )
}

export default GroupNameInput

const styles = StyleSheet.create({
  textInput: {
    bottom: pxW2dp(20), fontSize: pxW2dp(28), lineHeight: pxW2dp(40),
    paddingVertical: pxW2dp(10),
    color: level1Word,
    flex: 1, marginRight: pxW2dp(50), marginLeft: pxW2dp(20),
    borderBottomWidth: pxW2dp(1), borderBottomColor: level3Word,
  }
})
