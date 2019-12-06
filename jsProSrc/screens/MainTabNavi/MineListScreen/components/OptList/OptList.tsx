import React, {memo, useCallback, useMemo} from "react"
import {StyleSheet, View} from "react-native"
import {orange, red, white} from "js_pro_src/styles/color";
import OptCell from "./OptCell";
import navigators, {mainStackNavigator} from "js_pro_src/navigators/navigators";
import {StackActions} from "react-navigation";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";

type Props = {
}
const OptList = memo<Props>(function () {
  // 跳转页面
  const goPage = useCallback(routeName => {
    navigators.get(mainStackNavigator).dispatch(StackActions.push({routeName}))
  }, [])
  const opts = useMemo(() => [
    {
      label: "修改密码", iconName: "ios-apps", iconColor: orange,
      onPress: () => { goPage(SCREEN_NAMES.ChangePsw) }
    },
    {
      label: "更改绑定手机号", iconName: "ios-phone-portrait", iconColor: red,
      onPress: () => {}
    },
    {
      label: "充值记录", iconName: "ios-apps", iconColor: orange,
      onPress: () => { goPage(SCREEN_NAMES.CashInList) }
    },
    {
      label: "提现记录", iconName: "ios-apps", iconColor: orange,
      onPress: () => { goPage(SCREEN_NAMES.CashOutList) }
    },
    {
      label: "发出去的包（7天）", iconName: "ios-apps", iconColor: orange,
      onPress: () => {goPage(SCREEN_NAMES.RecentSendPocket)}
    },
    {
      label: "抢到的包（7天）", iconName: "ios-apps", iconColor: orange,
      onPress: () => {goPage(SCREEN_NAMES.RecentGrabPocket)}
    },
    {
      label: "绑定支付宝和银行卡", iconName: "ios-apps", iconColor: orange,
      onPress: () => {goPage(SCREEN_NAMES.BindPay)}
    },
    {
      label: "绑定身份证", iconName: "ios-apps", iconColor: orange,
      onPress: () => {goPage(SCREEN_NAMES.BindIDCard)}
    }
  ], [goPage])
  return (
    <View style={styles.wrap}>
      {opts.map((opt, index) => (
        <OptCell key={index} iconName={opt.iconName} label={opt.label} iconColor={opt.iconColor} onPress={opt.onPress} />
      ))}
    </View>
  )
})

export default OptList

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: white
  }
})
