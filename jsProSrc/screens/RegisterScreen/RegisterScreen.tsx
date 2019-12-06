import React, {useCallback, useRef} from "react"
import {StatusBar, StyleSheet, View} from "react-native"
import {NavigationScreenProp} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {green, level4Word, moreGray} from "js_pro_src/styles/color";
import ProButton from "js_pro_src/components/ProButton";
import {pxW2dp} from "js_pro_src/utils/sizes";
import useUsernameStore from "js_pro_src/hooks/lgnRgstFnd/useUsernameStore";
import useCodeStore from "js_pro_src/hooks/lgnRgstFnd/useCodeStore";
import usePasswdStore from "js_pro_src/hooks/lgnRgstFnd/usePasswdStore";
import useConfirmPasswdStore from "js_pro_src/hooks/lgnRgstFnd/useConfirmPasswdStore";
import InputCell from "js_pro_src/components/InputCell";
import CodeInput from "js_pro_src/components/lgnRgstFnd/CodeInput";
import validateValidateFuncs from "js_pro_src/utils/validateValidateFuncs";
import usePhoneStore from "js_pro_src/hooks/lgnRgstFnd/usePhoneStore";
import useCodeBtnStore from "js_pro_src/hooks/lgnRgstFnd/useCodeBtnStore";
import ProToast from "js_pro_src/components/ProToast";
import {registered} from "js_pro_src/api/common";
import LoadingMask from "js_pro_src/components/LoadingMask";
import handleReqWithNormalError from "js_pro_src/utils/handleReqWithNormalError";
import sleep from "js_pro_src/utils/sleep";

type NavigationParams = {}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}

function Comp({navigation}: Props) {
  // cancelToken.cancel  ref
  const cancelMethodRef = useRef()
  // 账号     // 手机号码
  const usernameStore = useUsernameStore(); const phoneStore = usePhoneStore();
  // 验证码    // 验证码按钮
  const codeStore = useCodeStore(); const codeBtnStore = useCodeBtnStore({phoneStore, type: 2})
  // 密码
  const passwdStore = usePasswdStore({});
  // 确认密码
  const confirmPasswdStore = useConfirmPasswdStore({extraStrValidStores: [passwdStore]})
  // 验证表单 && 提交
  const submit = useCallback(() => {
    handleReqWithNormalError({
      reqFunc: async () => {
        if (LoadingMask.isShowing()) return
        LoadingMask.show({
          onRequestClose: () => {
            // @ts-ignore
            cancelMethodRef.current && cancelMethodRef.current("用户取消注册")
          }
        })
        const username = usernameStore.val; const phone = phoneStore.val
        const passwd = passwdStore.val; const code = codeStore.val
        await validateValidateFuncs([
          () => usernameStore.validate(username), () => phoneStore.validate(phone),
          () => codeStore.validate(code), () => passwdStore.validate(passwd),
          () => confirmPasswdStore.validate(confirmPasswdStore.val, passwd)
        ])
        // 验证通过
        await registered({username,phone,passwd,code:Number(code)}, cancelMethodRef)
        // 成功 ，， 后退
        LoadingMask.hide()
        ProToast.showTop({content:"注册成功"})
        await sleep(500)
        navigation.goBack()
      },
      superPrevErrorFunc: () => LoadingMask.hide(),
      unNormalErrorFunc: (err) => ProToast.showTop({content: err.message})
    })
  }, [usernameStore, phoneStore, codeStore, passwdStore, confirmPasswdStore, navigation])
  return (
    <View style={styles.wrap}>
      <View style={styles.inner}>
        <View style={styles.logo} />
        <View style={styles.contentWrap}>
          {/** 用户名 */}
          <InputCell
            strValidWarningStore={usernameStore}
            iconName="md-person" placeholder="请填写用户名"
          />
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
          {/** 密码 */}
          <InputCell
            strValidWarningStore={passwdStore}
            iconName="md-key" secureTextEntry={true}
            placeholder="请填写6-20位的密码"
          />
          {/** 确认密码 */}
          <InputCell
            strValidWarningStore={confirmPasswdStore}
            iconName="md-key" secureTextEntry={true}
            placeholder="请再次填写密码"
          />
          <ProButton
            style={styles.loginBtn} textStyle={styles.loginBtnTxt}
            text="注册" onPress={submit}
          />
        </View>
      </View>
    </View>
  )
}

const RegisterScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(moreGray)
})

export default RegisterScreen

const styles = StyleSheet.create({
  wrap: {
    flex: 1, backgroundColor: moreGray, alignItems: "center", justifyContent: "center"
  },
  inner: {
    top: pxW2dp(-80), alignItems: "center"
  },
  logo: {
    width: pxW2dp(200), height: pxW2dp(200),
    marginTop: pxW2dp(80), marginBottom: pxW2dp(80),
    borderRadius: pxW2dp(20), backgroundColor: level4Word
  },
  contentWrap: {
    width: pxW2dp(600),
  },
  loginBtn: {
    alignItems: "center", backgroundColor: green, height: pxW2dp(80),
    borderRadius: pxW2dp(5), marginTop: pxW2dp(80)
  },
  loginBtnTxt: {
    fontSize: pxW2dp(36)
  },
})
