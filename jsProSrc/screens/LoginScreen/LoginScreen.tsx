import React, {useCallback, useRef} from "react"
import {StatusBar, StyleSheet, Text, View} from "react-native"
import {NavigationActions, NavigationScreenProp, StackActions} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {cyan, green, level4Word, moreGray, red} from "js_pro_src/styles/color";
import InputCell from "js_pro_src/components/InputCell";
import ProButton from "js_pro_src/components/ProButton";
import {pxW2dp} from "js_pro_src/utils/sizes";
import useUsernameStore from "js_pro_src/hooks/lgnRgstFnd/useUsernameStore";
import usePasswdStore from "js_pro_src/hooks/lgnRgstFnd/usePasswdStore";
import validateValidateFuncs from "js_pro_src/utils/validateValidateFuncs";
import ProToast from "js_pro_src/components/ProToast";
import {login} from "js_pro_src/api/common";
import DeviceInfo from "react-native-device-info"
import log from "js_pro_src/utils/log";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import authStorage from "js_pro_src/storage/authStorage";
import LoadingMask from "js_pro_src/components/LoadingMask";
import handleReqWithNormalError from "js_pro_src/utils/handleReqWithNormalError";
import {DEVICE_TOKEN, TOKEN} from "js_pro_src/storage/storageKeys";

type NavigationParams = {}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}

function Comp({
  navigation
              }: Props) {
  // cancelToken.cancel  ref
  const cancelMethodRef = useRef()
  // 账号
  const usernameStore = useUsernameStore()
  // 密码
  const passwdStore = usePasswdStore({})
  // 跳转 找回密码
  const goFindPsw = useCallback(() => {
    navigation.dispatch(StackActions.push({routeName: SCREEN_NAMES.FindPsw}))
  }, [navigation])
  // 跳转 注册
  const goRegister = useCallback(() => {
    navigation.dispatch(StackActions.push({routeName: SCREEN_NAMES.Register}))
  }, [navigation])
  // 验证表单&&提交
  const submit = useCallback(() => {
    handleReqWithNormalError({
      reqFunc: async () => {
        if (LoadingMask.isShowing()) return
        LoadingMask.show({
          // @ts-ignore 用户取消请求
          onRequestClose: () => { cancelMethodRef.current && cancelMethodRef.current("取消登录") }
        })
        await validateValidateFuncs([
          () => usernameStore.validate(usernameStore.val),
          () => passwdStore.validate(passwdStore.val)
        ])
        // 验证通过
        let ip = "127.0.0.1"
        try {
          ip = await DeviceInfo.getIpAddress()
        } catch (e) { log.w(e) }
        const loginRes = await login({ // 登录
          uuid: DeviceInfo.getUniqueId(), ip,
          latitude: "", longitude: "",
          username: usernameStore.val, passwd: passwdStore.val
        }, cancelMethodRef)
        LoadingMask.hide()
        authStorage.set(TOKEN, loginRes.data.token)
        authStorage.set(DEVICE_TOKEN, loginRes.data.device.device_token)
        // 跳转首页
        navigation.dispatch(StackActions.reset({
          index: 0, actions: [NavigationActions.navigate({routeName: SCREEN_NAMES.MainTabNavi})]
        }))
      },
      superPrevErrorFunc: () => LoadingMask.hide(),
      unNormalErrorFunc: (err) => ProToast.showTop({content: err.message})
    })
  }, [navigation, usernameStore, passwdStore])
  return (
    <View style={styles.wrap}>
      <View style={styles.inner}>
        <View style={styles.logo} />
        <View style={styles.contentWrap}>
          {/** 账号 */}
          <InputCell
            strValidWarningStore={usernameStore}
            iconName="md-person" placeholder="请填写用户名"
          />
          {/** 密码 */}
          <InputCell
            strValidWarningStore={passwdStore}
            iconName="md-key" secureTextEntry={true}
            placeholder="请填写8-20位的密码"
          />
          <View style={styles.bar}>
            <Text onPress={goFindPsw} style={styles.findPsw}>找回密码？</Text>
          </View>
          <ProButton
            style={styles.loginBtn} textStyle={styles.loginBtnTxt}
            text="登录" onPress={submit}
          />
          <View style={styles.empty} />
          <View style={styles.bar}>
            <Text onPress={goRegister} style={styles.regist}>未有账号？点此注册</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const LoginScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(moreGray)
})

export default LoginScreen

const styles = (() => {
  const barSize = pxW2dp(110)
  return StyleSheet.create({
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
    bar: {
      height: barSize, justifyContent: "center", alignItems: "flex-end"
    },
    findPsw: {
      fontSize: pxW2dp(26), lineHeight: pxW2dp(60), color: red,
      paddingHorizontal: pxW2dp(20)
    },
    loginBtn: {
      alignItems: "center", backgroundColor: green, height: pxW2dp(80),
      borderRadius: pxW2dp(5), marginTop: pxW2dp(80)
    },
    loginBtnTxt: {
      fontSize: pxW2dp(36)
    },
    empty: {
      height: pxW2dp(20)
    },
    regist: {
      fontSize: pxW2dp(26), color: cyan
    },
  })
})()
