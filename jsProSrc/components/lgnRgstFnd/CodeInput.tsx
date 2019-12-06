import React, {useCallback, useMemo, useRef} from "react"
import {StyleSheet, TextInput, TouchableWithoutFeedback, View} from "react-native"
import {observer} from "mobx-react-lite";
import {UseStrValidateWithWarningStore} from "js_pro_src/hooks/useStrValidateWithWarningStore";
import Ionicon from "react-native-vector-icons/Ionicons";
import {green, lessGreenWhite, red, white} from "js_pro_src/styles/color";
import ProButton from "js_pro_src/components/ProButton";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {UseCodeBtnStore} from "js_pro_src/hooks/lgnRgstFnd/useCodeBtnStore";

/**
 * 验证码
 * */
type Props = {
  strValidWarningStore: UseStrValidateWithWarningStore,
  codeBtnStore: UseCodeBtnStore // 获取验证码btn store
}
const CodeInput = observer<Props>(function ({
  strValidWarningStore, codeBtnStore
                                            }) {
  const {warning} = strValidWarningStore
  // input ref
  const InputRef = useRef<TextInput>()
  // 点击focus
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
  return (
    <TouchableWithoutFeedback onPress={pressHandler}>
      <View style={[styles.wrap, extraBrdClr]}>
        <View style={styles.iconWrap}>
          <Ionicon name="ios-medical" style={[styles.icon, extraFntClr]} />
        </View>
        <TextInput
          ref={r => {
            // @ts-ignore
            InputRef.current = r
          }}
          placeholderTextColor={warning?red:white}
          style={[styles.input, extraFntClr]} placeholder="请填写手机验证码"
          value={strValidWarningStore.val} keyboardType="numeric"
          onChangeText={strValidWarningStore.changeVal}
        />
        <TouchableWithoutFeedback onPress={() => {}}>
          {/** 防触发 focus */}
          <View style={styles.getCodeBtnWrap}>
            <ProButton
              style={[styles.getCodeBtn, {backgroundColor:codeBtnStore.canSend?green:lessGreenWhite}]}
              text={codeBtnStore.canSend?"发送验证码":`重新发送(${codeBtnStore.counting})`}
              onPress={codeBtnStore.pressHandler}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
})

export default CodeInput


const styles = (() => {
  const wrapSize = pxW2dp(80)
  const btnW = pxW2dp(220)
  return StyleSheet.create({
    wrap: {
      borderBottomWidth: 1, borderBottomColor: white,
      flexDirection: "row", alignItems: "center", marginBottom: pxW2dp(10)
    },
    iconWrap: {
      width: wrapSize, height: wrapSize, justifyContent: "center", alignItems: "center"
    },
    icon: {
      fontSize: pxW2dp(50), color: white, marginRight: pxW2dp(30)
    },
    input: {
      flex: 1, fontSize: pxW2dp(30), color: white
    },
    getCodeBtnWrap: {
      height: wrapSize, width: btnW, marginLeft: pxW2dp(20),
      justifyContent: "center", alignItems: "center"
    },
    getCodeBtn: {
      width: btnW, alignItems: "center", height: pxW2dp(62)
    }
  })
})()
