import React, {useCallback, useRef} from "react"
import {StatusBar, StyleSheet, View} from "react-native"
import {NavigationScreenProp} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor, green, moreGray} from "js_pro_src/styles/color";
import useAndroidBackBtn2MainTab from "js_pro_src/hooks/useAndroidBackBtn2MainTab";
import {NavigationStackOptions} from "react-navigation-stack";
import {pxW2dp} from "js_pro_src/utils/sizes";
import ProButton from "js_pro_src/components/ProButton";
import {useAccountNameStore,useAccountPhoneStore,useAccountStore,useBranchStore,useNameStore} from "./hooks/useFormInputStore"
import InputCell from "js_pro_src/components/InputCell";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import handleReqWithNormalError from "js_pro_src/utils/handleReqWithNormalError";
import ProToast from "js_pro_src/components/ProToast";
import LoadingMask from "js_pro_src/components/LoadingMask";
import validateValidateFuncs from "js_pro_src/utils/validateValidateFuncs";
import {bindBank} from "js_pro_src/api/wallet";
import {SpringScrollView} from "react-native-spring-scrollview";

type NavigationParams = {}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}
function Comp({navigation}: Props) {
  // cancelToken.cancel  ref
  const cancelMethodRef = useRef()
  /** Input Refs */
  const NameInputRef = useRef(); const BranchInputRef = useRef();
  const AccountInputRef = useRef(); const AccountNameInputRef = useRef();
  const AccountPhoneInputRef = useRef()
  // 银行名称 // 银行支行
  const nameStore = useNameStore(); const branchStore = useBranchStore()
  // 银行账号  // 银行开户名称
  const accountStore = useAccountStore(); const accountNameStore = useAccountNameStore()
  // 银行预留手机
  const accountPhoneStore = useAccountPhoneStore();
  // 前端验证&&提交
  const submit = useCallback(() => {
    handleReqWithNormalError({
      reqFunc: async () => {
        if (LoadingMask.isShowing()) return
        LoadingMask.show({
          onRequestClose: () => {
            // @ts-ignore 用户取消请求
            cancelMethodRef.current && cancelMethodRef.current("取消绑定银行卡")
          }
        })
        const name = nameStore.val
        const branch = branchStore.val
        const account = accountStore.val
        const accountName = accountNameStore.val
        const accountPhone = accountPhoneStore.val
        await validateValidateFuncs([
          () => nameStore.validate(name), () => branchStore.validate(branch),
          () => accountStore.validate(account),
          () => accountNameStore.validate(accountName),
          () => accountPhoneStore.validate(accountPhone)
        ])
        // 验证通过 // TODO 对接中
        const res = await bindBank({
          name,branch,account,account_name:accountName,account_phone:accountPhone
        }, cancelMethodRef)
        console.log(res)
        LoadingMask.hide()
      },
      superPrevErrorFunc: () => LoadingMask.hide(),
      unNormalErrorFunc: err => ProToast.showTop({content: err.message})
    })
  }, [nameStore,branchStore,accountStore,accountNameStore,accountPhoneStore])
  // 处理 android 返回键问题
  useAndroidBackBtn2MainTab({navigation})
  return (
    <SpringScrollView
      style={styles.wrap} bounces={false}
      textInputRefs={[NameInputRef,BranchInputRef,AccountInputRef,AccountNameInputRef,AccountPhoneInputRef]}
      inputToolBarHeight={170}
    >
      <View style={styles.inner}>
        <View style={styles.contentWrap}>
          {/** 银行名称 */}
          <InputCell
            CInputRef={NameInputRef}
            strValidWarningStore={nameStore}
            iconName="bank" placeholder="请填写银行名称"
            OtherIconComp={FontAwesome} iconStyle={styles.bankIcon}
          />
          {/** 银行支行 */}
          <InputCell
            CInputRef={BranchInputRef}
            strValidWarningStore={branchStore}
            iconName="bank" placeholder="请填写银行支行"
            OtherIconComp={FontAwesome} iconStyle={styles.bankIcon}
          />
          {/** 银行账号 */}
          <InputCell
            CInputRef={AccountInputRef}
            strValidWarningStore={accountStore}
            iconName="ios-card" placeholder="请填写银行账号"
          />
          {/** 开户名称 */}
          <InputCell
            CInputRef={AccountNameInputRef}
            strValidWarningStore={accountNameStore}
            iconName="md-person" placeholder="请填写银行开户名称"
          />
          {/** 预留手机 */}
          <InputCell
            CInputRef={AccountPhoneInputRef}
            strValidWarningStore={accountPhoneStore}
            iconName="md-phone-portrait" placeholder="请填写银行预留手机"
          />
          <ProButton
            style={styles.btn} textStyle={styles.btnTxt}
            text="绑定银行卡号" onPress={submit}
          />
        </View>
      </View>
    </SpringScrollView>
  )
}

// 导航设置
Comp.navigationOptions = (): NavigationStackOptions => {
  return {
    headerStyle: {backgroundColor: borderColor}
  }
}

const BindBankScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default BindBankScreen

const styles = StyleSheet.create({
  wrap: {
    flex: 1, backgroundColor: moreGray
  },
  inner: {
    paddingTop: pxW2dp(150), alignItems: "center"
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
  bankIcon: {
    fontSize: pxW2dp(45)
  }
})
