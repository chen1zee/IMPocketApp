import React, {useCallback, useRef} from "react"
import {StatusBar, StyleSheet, View} from "react-native"
import {NavigationScreenProp} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {green, moreGray} from "js_pro_src/styles/color";
import usePhoneStore from "js_pro_src/hooks/lgnRgstFnd/usePhoneStore";
import useCodeStore from "js_pro_src/hooks/lgnRgstFnd/useCodeStore";
import useCodeBtnStore from "js_pro_src/hooks/lgnRgstFnd/useCodeBtnStore";
import usePasswdStore from "js_pro_src/hooks/lgnRgstFnd/usePasswdStore";
import useConfirmPasswdStore from "js_pro_src/hooks/lgnRgstFnd/useConfirmPasswdStore";
import InputCell from "js_pro_src/components/InputCell";
import CodeInput from "js_pro_src/components/lgnRgstFnd/CodeInput";
import ProButton from "js_pro_src/components/ProButton";
import {pxW2dp} from "js_pro_src/utils/sizes";
import ProToast from "js_pro_src/components/ProToast";
import validateValidateFuncs from "js_pro_src/utils/validateValidateFuncs";
import {retrievePsd} from "js_pro_src/api/common";
import handleReqWithNormalError from "js_pro_src/utils/handleReqWithNormalError";
import LoadingMask from "js_pro_src/components/LoadingMask";
import sleep from "js_pro_src/utils/sleep";

type NavigationParams = {}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}

function Comp({navigation}: Props) {
  // cancelToken.cancel  ref
  const cancelMethodRef = useRef()
  // 手机号码      // 验证码
  const phoneStore = usePhoneStore(); const codeStore = useCodeStore()
  // 验证码按钮
  const codeBtnStore = useCodeBtnStore({phoneStore, type: 3})
  // 新密码
  const passwdStore = usePasswdStore({passwdTxt: "新密码"})
  // 确认新密码
  const confirmPasswdStore = useConfirmPasswdStore({
    extraStrValidStores: [passwdStore]
  })
  // 验证表单 && 提交
  const submit = useCallback(async () => {
    handleReqWithNormalError({
      reqFunc: async () => {
        if (LoadingMask.isShowing()) return
        LoadingMask.show({
          // @ts-ignore 找回密码成功
          onRequestClose: () => cancelMethodRef.current && cancelMethodRef.current("用户取消找回密码")
        })
        const phone = phoneStore.val; const passwd = passwdStore.val
        const code = codeStore.val
        await validateValidateFuncs([
          () => phoneStore.validate(phone), () => passwdStore.validate(passwd),
          () => codeStore.validate(code),
          () => confirmPasswdStore.validate(confirmPasswdStore.val, passwd)
        ])
        // 验证通过
        await retrievePsd({phone,passwd,code:Number(code)}, cancelMethodRef)
        // 找回密码成功
        LoadingMask.hide()
        ProToast.showTop({content: "成功找回密码"})
        await sleep(500)
        navigation.goBack()
      },
      superPrevErrorFunc: () => LoadingMask.hide(),
      unNormalErrorFunc: (err) => {
        console.log(err)
        ProToast.showTop({content: err.message})
      }
    })
  }, [phoneStore, passwdStore, codeStore, confirmPasswdStore,navigation])
  return (
    <View style={styles.wrap}>
      <View style={styles.inner}>
        {/** 手机号 */}
        <InputCell
          strValidWarningStore={phoneStore}
          iconName="ios-call" placeholder="请填写11位手机号"
        />
        {/** 验证码 */}
        <CodeInput
          strValidWarningStore={codeStore}
          codeBtnStore={codeBtnStore}
        />
        {/** 新密码 */}
        <InputCell
          strValidWarningStore={passwdStore}
          iconName="md-key" secureTextEntry={true}
          placeholder="请填写6-20位的新密码"
        />
        {/** 确认新密码 */}
        <InputCell
          strValidWarningStore={confirmPasswdStore}
          iconName="md-key" secureTextEntry={true}
          placeholder="请再次填写新密码"
        />
        <ProButton
          style={styles.btn} textStyle={styles.btnTxt}
          text="找回密码" onPress={submit}
        />
      </View>
    </View>
  )
}

const FindPswScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(moreGray)
})

export default FindPswScreen

const styles = StyleSheet.create({
  wrap: {
    flex: 1, backgroundColor: moreGray, alignItems: "center", justifyContent: "center"
  },
  inner: {
    top: pxW2dp(-120), width: pxW2dp(600)
  },
  btn: {
    alignItems: "center", backgroundColor: green, height: pxW2dp(80),
    borderRadius: pxW2dp(5), marginTop: pxW2dp(80)
  },
  btnTxt: {
    fontSize: pxW2dp(36)
  }
})
