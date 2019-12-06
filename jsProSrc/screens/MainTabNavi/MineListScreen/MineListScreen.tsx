import React from "react"
import {StatusBar, StyleSheet} from "react-native"
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor} from "js_pro_src/styles/color";
import {NavigationScreenProp} from "react-navigation";
import MineInfo from "js_pro_src/screens/MainTabNavi/MineListScreen/components/MineInfo";
import {SpringScrollView} from "react-native-spring-scrollview";
import OptList from "js_pro_src/screens/MainTabNavi/MineListScreen/components/OptList/OptList";

type NavigationParams = {
}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}
function Comp ({
               }: Props) {
  return (
    <SpringScrollView style={styles.wrap} bounces={false}>
      {/** 个人信息显示 */}
      <MineInfo />
      {/** 选项 */}
      <OptList />
    </SpringScrollView>
  )
}
// 导航设置
// Comp.navigationOptions = (): NavigationStackOptions => {
// }

const MineListScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})


export default MineListScreen

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: borderColor
  }
})
