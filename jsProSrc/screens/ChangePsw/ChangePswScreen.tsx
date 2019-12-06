import React, {useCallback, useRef} from "react"
import {StatusBar, StyleSheet, View} from "react-native"
import {NavigationScreenProp} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {green, level4Word, moreGray} from "js_pro_src/styles/color";
import {pxW2dp} from "js_pro_src/utils/sizes";
import usePasswdStore from "js_pro_src/hooks/lgnRgstFnd/usePasswdStore";
import useConfirmPasswdStore from "js_pro_src/hooks/lgnRgstFnd/useConfirmPasswdStore";
import validateValidateFuncs from "js_pro_src/utils/validateValidateFuncs";
import ProToast from "js_pro_src/components/ProToast";
import InputCell from "js_pro_src/components/InputCell";
import ProButton from "js_pro_src/components/ProButton";
import log from "js_pro_src/utils/log";
import {upPasswd} from "js_pro_src/api/common";
import useAndroidBackBtn2MainTab from "js_pro_src/hooks/useAndroidBackBtn2MainTab";
import LoadingMask from "js_pro_src/components/LoadingMask";
import handleReqWithNormalError from "js_pro_src/utils/handleReqWithNormalError";
import sleep from "js_pro_src/utils/sleep";

type NavigationParams = {}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}
function Comp({
  navigation
              }: Props) {
  // cancelToken.cancel  ref
  const cancelMethodRef = useRef()
  // 当前密码
  const nowPasswdStore = usePasswdStore({passwdTxt: "当前密码"})
  // 新密码
  const newPasswdStore = usePasswdStore({
    passwdTxt: "新密码",
    afterChangeCb: async () => { // 修改后 检测 confirmPassword
      try {
        if (!confirmNewPasswdStore.val.length) return // 未填写， 不校验
        await confirmNewPasswdStore.validate(confirmNewPasswdStore.val, newPasswdStore.val)
      } catch (e) { log.d(e) }
    }
  })
  // 确认新密码
  const confirmNewPasswdStore = useConfirmPasswdStore({
    extraStrValidStores: [newPasswdStore],
    passwdTxt: "新密码"
  })
  // 验证表单 && 提交
  const submit = useCallback(async () => {
    handleReqWithNormalError({
      reqFunc: async () => {
        if (LoadingMask.isShowing()) return
        LoadingMask.show({
          // @ts-ignore 取消修改密码请求
          onRequestClose: () => cancelMethodRef.current && cancelMethodRef.current("用户取消修改密码")
        })
        const nowPasswd = nowPasswdStore.val
        const newPasswd = newPasswdStore.val
        await validateValidateFuncs([
          () => nowPasswdStore.validate(nowPasswd), () => newPasswdStore.validate(newPasswd),
          () => confirmNewPasswdStore.validate(confirmNewPasswdStore.val, newPasswd)
        ])
        // 验证通过
        await upPasswd({passwd: newPasswd}, cancelMethodRef)
        // 修改密码成功
        LoadingMask.hide()
        ProToast.showTop({content: "修改密码成功"})
        await sleep(500)
        navigation.goBack()
      },
      superPrevErrorFunc: () => LoadingMask.hide(),
      unNormalErrorFunc: (err) => ProToast.showTop({content: err.message})
    })
  }, [nowPasswdStore, newPasswdStore, confirmNewPasswdStore, navigation])
  // 处理 android 返回键问题
  useAndroidBackBtn2MainTab({navigation})
  return (
    <View style={styles.wrap}>
      <View style={styles.inner}>
        <View style={styles.logo} />
        <View style={styles.contentWrap}>
          {/** 当前密码 */}
          <InputCell
            strValidWarningStore={nowPasswdStore}
            iconName="md-key" secureTextEntry={true}
            placeholder="请填写当前密码"
          />
          {/** 新密码 */}
          <InputCell
            strValidWarningStore={newPasswdStore}
            iconName="md-key" secureTextEntry={true}
            placeholder="请填写新密码"
          />
          {/** 确认新密码 */}
          <InputCell
            strValidWarningStore={confirmNewPasswdStore}
            iconName="md-key" secureTextEntry={true}
            placeholder="请再次填写新密码"
          />
          <ProButton
            style={styles.btn} textStyle={styles.btnTxt}
            text="修改密码" onPress={submit}
          />
        </View>
      </View>
    </View>
  )
}

const ChangePswScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(moreGray)
})

export default ChangePswScreen

const styles = StyleSheet.create({
  wrap: {
    flex: 1, backgroundColor: moreGray, alignItems: "center",
    justifyContent: "center"
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
  btn: {
    alignItems: "center", backgroundColor: green, height: pxW2dp(80),
    borderRadius: pxW2dp(5), marginTop: pxW2dp(80)
  },
  btnTxt: {
    fontSize: pxW2dp(36)
  }
})
