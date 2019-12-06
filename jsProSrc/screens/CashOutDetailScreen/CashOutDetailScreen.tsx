import React from "react"
import {StatusBar} from "react-native"
import {NavigationScreenProp} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor} from "js_pro_src/styles/color";
import useAndroidBackBtn2MainTab from "js_pro_src/hooks/useAndroidBackBtn2MainTab";
import CashInOutDetail from "js_pro_src/components/CashInOut/CashInOutDetail/CashInOutDetail";

export type CshOutDtlParams = {
  withdraw_id: string // 提现id
}
type Props = {
  navigation: NavigationScreenProp<{}, CshOutDtlParams>
}
function Comp({
  navigation
              }: Props) {
  // 处理 android 返回键问题
  useAndroidBackBtn2MainTab({navigation})
  return <CashInOutDetail mode="out" navigation={navigation} />
}

const CashOutDetailScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default CashOutDetailScreen
