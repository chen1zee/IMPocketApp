import React from "react"
import {StatusBar} from "react-native"
import {NavigationScreenProp} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor} from "js_pro_src/styles/color";
import {NavigationStackOptions} from "react-navigation-stack";
import useAndroidBackBtn2MainTab from "js_pro_src/hooks/useAndroidBackBtn2MainTab";
import CashInOutDetail from "js_pro_src/components/CashInOut/CashInOutDetail/CashInOutDetail";

export type CshInDtlNaviParams = {
  recharge_id: string // 充值 id
}
type Props = {
  navigation: NavigationScreenProp<{}, CshInDtlNaviParams>
}

function Comp({
  navigation
              }: Props) {
  // 处理 android 返回键问题
  useAndroidBackBtn2MainTab({navigation})
  return <CashInOutDetail mode="in" navigation={navigation} />
}
// 导航设置
Comp.navigationOptions = (): NavigationStackOptions => {
  return {
    headerStyle: {backgroundColor: borderColor}
  }
}

const CashInDetailScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default CashInDetailScreen
