import React, {MutableRefObject, useCallback, useEffect, useRef} from "react"
import {StatusBar, StyleSheet, View, Text, TouchableWithoutFeedback} from "react-native"
import {NavigationScreenProp} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor, green, level2Word, white} from "js_pro_src/styles/color";
import {NavigationStackOptions} from "react-navigation-stack";
import ProButton from "js_pro_src/components/ProButton";
import {pxW2dp} from "js_pro_src/utils/sizes";
import LoadingMask from "js_pro_src/components/LoadingMask";
import InputWithClear from "./components/InputWithClear";
import useMsgStoreWithReset from "js_pro_src/screens/ApplyAddFrndScreen/hooks/useMsgStoreWithReset";
import useRefSyncVal from "js_pro_src/hooks/useRefSyncVal";
import handleReqWithNormalError from "js_pro_src/utils/handleReqWithNormalError";
import validateValidateFuncs from "js_pro_src/utils/validateValidateFuncs";
import {frndApply} from "js_pro_src/api/friend";
import ProToast from "js_pro_src/components/ProToast";
import addFriendStore from "js_pro_src/store/addFriendStore";
import sleep from "js_pro_src/utils/sleep";

/**
 * 好友验证页
 * */
type NavigationParams = {
  sendRef: MutableRefObject<() => void> // 发送
}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}
function Comp({navigation}: Props) {
  // cancelToken.cancel  ref
  const cancelMethodRef = useRef()
  // input refs
  const inputRef = useRef()
  // 验证信息
  const msgStoreWithReset = useMsgStoreWithReset()
  // 前端验证 && 提交
  const send = useCallback(() => {
    handleReqWithNormalError({
      reqFunc: async () => {
        if (LoadingMask.isShowing()) return
        LoadingMask.show({
          // @ts-ignore cancel 请求
          onRequestClose: () => cancelMethodRef.current && cancelMethodRef.current("取消好友验证申请")
        })
        const msg = msgStoreWithReset.store.val
        await validateValidateFuncs([
          () => msgStoreWithReset.store.validate(msg)
        ])
        // 验证通过
        await frndApply({ to: addFriendStore.friendInfo.user_id, msg })
        LoadingMask.hide()
        ProToast.showTop({content: "发送验证申请成功，等待对方通过"})
        await sleep(400)
        navigation.goBack()
      },
      superPrevErrorFunc: () => LoadingMask.hide(),
      unNormalErrorFunc: err => ProToast.showTop({content: err.message})
    })
  }, [msgStoreWithReset, navigation])
  // sendRef
  const sendRef = useRefSyncVal(send)
  useEffect(() => {
    navigation.setParams({sendRef})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 取消焦点
  const blurInputs = useCallback(() => {
    // @ts-ignore
    inputRef.current.blur()
  }, [])
  return (
    <TouchableWithoutFeedback onPress={blurInputs}>
      <View style={styles.wrap}>
        <Text style={styles.desc}>你需要发送验证申请，等对方通过</Text>
        <InputWithClear
          inputRef={r => { inputRef.current = r }}
          store={msgStoreWithReset.store}
          resetFn={msgStoreWithReset.resetFn}
          placeholder="请填写验证申请信息"
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

// 导航设置
Comp.navigationOptions = ({navigation}: {navigation: Props["navigation"]}): NavigationStackOptions => {
  const send = () => {
    if (LoadingMask.isShowing()) return
    navigation.getParam("sendRef").current()
  }
  return {
    headerStyle: {backgroundColor: borderColor},
    headerRight: (
      <ProButton text="发送" onPress={send} style={styles.btnWrap} />
    )
  }
}

const ApplyAddFrndScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default ApplyAddFrndScreen

const styles = StyleSheet.create({
  wrap: {
    flex: 1, backgroundColor: white, paddingHorizontal: pxW2dp(20),
    paddingTop: pxW2dp(30)
  },
  btnWrap: {
    height: pxW2dp(64), marginRight: pxW2dp(35), backgroundColor: green
  },
  desc: {
    fontSize: pxW2dp(26), color: level2Word, lineHeight: pxW2dp(40)
  }
})
