import React from "react"
import {StatusBar} from "react-native"
import {NavigationScreenProp} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor} from "js_pro_src/styles/color";
import useAndroidBackBtn2MainTab from "js_pro_src/hooks/useAndroidBackBtn2MainTab";
import {NavigationStackOptions} from "react-navigation-stack";
import List from "js_pro_src/components/RecentSendGrabPocket/List/List";

type NavigationParams = {}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}
function Comp({
  navigation
              }: Props) {
  // 处理 android 返回键问题
  useAndroidBackBtn2MainTab({navigation})
  return (
    <List mode="send" />
  )
}
// 导航设置
Comp.navigationOptions = (): NavigationStackOptions => {
  return {
    headerStyle: {backgroundColor: borderColor}
  }
}

const RecentSendPocketScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default RecentSendPocketScreen
