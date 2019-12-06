import React, {MutableRefObject, useCallback, useEffect, useMemo, useRef} from "react"
import {StyleSheet, TextInput, TextStyle, TouchableWithoutFeedback, View} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {red, white} from "js_pro_src/styles/color";
import {observer} from "mobx-react-lite";
import {UseStrValidateWithWarningStore} from "js_pro_src/hooks/useStrValidateWithWarningStore";

/**
 * 带 左icon
 * warning 提示样式的输入框
 * 引用页面 注册 登录 绑定支付宝等
 * */

type Props = {
  strValidWarningStore: UseStrValidateWithWarningStore,
  OtherIconComp?: React.Component<any>, // 使用 Ionicons 以外的其他组件
  iconName: string,
  placeholder?: string,
  secureTextEntry?: boolean,
  iconStyle?: TextStyle,
  CInputRef?: MutableRefObject<TextInput|undefined>, // 输入框 ref
}
const InputCell = observer<Props>(({
  strValidWarningStore, OtherIconComp,
  iconName, placeholder, secureTextEntry, iconStyle, CInputRef,
                        }) => {
  const {warning} = strValidWarningStore
  // input ref
  const InputRef = useRef<TextInput>()
  // 点击 focus
  const pressHandler = useCallback(() => {
    if (!InputRef.current || InputRef.current.isFocused()) return
    InputRef.current.focus()
  }, [])
  // 额外 警告 字体颜色
  const extraFntClr = useMemo(() => {
    return warning ? {color: red} : {}
  }, [warning])
  // 额外 警告 border颜色
  const extraBrdClr = useMemo(() => {
    return warning ? {borderBottomColor: red} : {}
  }, [warning])
  // 暴露 inputRef
  useEffect(() => {
    if (!CInputRef) return
    CInputRef.current = InputRef.current
  }, [CInputRef])
  return (
    <TouchableWithoutFeedback onPress={pressHandler}>
      <View style={[styles.wrap, extraBrdClr]}>
        <View style={styles.iconWrap}>
          {OtherIconComp ?
            // @ts-ignore
          <OtherIconComp name={iconName} style={[styles.icon, extraFntClr, iconStyle]} /> :
          <Ionicons name={iconName} style={[styles.icon, extraFntClr, iconStyle]} />}
        </View>
        <TextInput
          ref={r => {
            // @ts-ignore
            InputRef.current = r
          }}
          placeholderTextColor={warning?red:white}
          style={[styles.input, extraFntClr]} placeholder={placeholder}
          value={strValidWarningStore.val}
          onChangeText={strValidWarningStore.changeVal}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </TouchableWithoutFeedback>
  )
})

export default InputCell

const styles = (() => {
  const wrapSize = pxW2dp(80)
  return StyleSheet.create({
    wrap: {
      borderBottomWidth: 1, borderBottomColor: white,
      flexDirection: "row", alignItems: "center", marginBottom: pxW2dp(10)
    },
    iconWrap: {
      width: wrapSize, height: wrapSize, justifyContent: "center", alignItems: "center"
    },
    icon: {
      fontSize: pxW2dp(50), color: white, marginRight: pxW2dp(20),
    },
    input: {
      flex: 1, fontSize: pxW2dp(30), color: white,
    }
  })
})()
