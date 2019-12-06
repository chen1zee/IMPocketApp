import React, {useCallback, useMemo, useRef} from "react"
import {StatusBar, StyleSheet, View} from "react-native"
import {NavigationScreenProp} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor, green, moreGray} from "js_pro_src/styles/color";
import useAndroidBackBtn2MainTab from "js_pro_src/hooks/useAndroidBackBtn2MainTab";
import {NavigationStackOptions} from "react-navigation-stack";
import {pxW2dp} from "js_pro_src/utils/sizes";
import useStrValidateWithWarningStore, {ValidateFn} from "js_pro_src/hooks/useStrValidateWithWarningStore";
import InputCell from "js_pro_src/components/InputCell";
import AntIcon from "react-native-vector-icons/AntDesign"
import ProButton from "js_pro_src/components/ProButton";
import handleReqWithNormalError from "js_pro_src/utils/handleReqWithNormalError";
import LoadingMask from "js_pro_src/components/LoadingMask";
import validateValidateFuncs from "js_pro_src/utils/validateValidateFuncs";
import {bindAlipay} from "js_pro_src/api/wallet";
import ProToast from "js_pro_src/components/ProToast";


type NavigationParams = {}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}
function Comp({navigation}: Props) {
  // cancelToken.cancel  ref
  const cancelMethodRef = useRef()
  const validateFnArr = useMemo<ValidateFn[]>(() => [
    {fn: text => Boolean(text.trim().length), msg: "支付宝账号不能为空"},
  ], [])
  // 支付宝账号
  const alipayStore = useStrValidateWithWarningStore({validateFnArr})
  // 前端验证 && 提交
  const submit = useCallback(() => {
    handleReqWithNormalError({
      reqFunc: async () => {
        if (LoadingMask.isShowing()) return
        LoadingMask.show({
          onRequestClose: () => {
            // @ts-ignore 用户取消请求
            cancelMethodRef.current && cancelMethodRef.current("取消绑定支付宝")
          }
        })
        const alipay = alipayStore.val
        await validateValidateFuncs([
          () => alipayStore.validate(alipay)
        ])
        // 验证通过 // TODO 对接中
        const res = await bindAlipay({alipay}, cancelMethodRef)
        console.log(res)
        LoadingMask.hide()
      },
      superPrevErrorFunc: () => LoadingMask.hide(),
      unNormalErrorFunc: (err) => ProToast.showTop({content: err.message})
    })
  }, [alipayStore])
  // 处理 android 返回键问题
  useAndroidBackBtn2MainTab({navigation})
  return (
    <View style={styles.wrap}>
      <View style={styles.inner}>
        <View style={styles.contentWrap}>
          {/** 支付报账号 */}
          <InputCell
            strValidWarningStore={alipayStore}
            iconName="alipay-circle" placeholder="请填写支付宝账号"
            OtherIconComp={AntIcon}
          />
          <ProButton
            style={styles.btn} textStyle={styles.btnTxt}
            text="绑定支付宝账号" onPress={submit}
          />
        </View>
      </View>
    </View>
  )
}

// 导航设置
Comp.navigationOptions = (): NavigationStackOptions => {
  return {
    headerStyle: {backgroundColor: borderColor}
  }
}

const BindAliScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default BindAliScreen

const styles = StyleSheet.create({
  wrap: {
    flex: 1, backgroundColor: moreGray, alignItems: "center", justifyContent: "center"
  },
  inner: {
    top: pxW2dp(-200), alignItems: "center"
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
  },
})
