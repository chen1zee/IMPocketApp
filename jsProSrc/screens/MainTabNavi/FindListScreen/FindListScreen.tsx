import React, {useMemo} from "react"
import {Dimensions, StatusBar, StyleSheet, Text, View} from "react-native"
import {NavigationScreenProp} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor, level1Word, level2Word, white} from "js_pro_src/styles/color";
import {Header, NavigationStackOptions} from "react-navigation-stack";
import MainTabHeaderRight from "js_pro_src/screens/MainTabNavi/components/MainTabHeaderRight";
import {SpringScrollView} from "react-native-spring-scrollview";
import GroupCard from "./components/GroupCard";
import HelpCenter from "./components/HelpCenter";
import {pxW2dp} from "js_pro_src/utils/sizes";
import Footer from "./components/Footer";
import {BTM_TAB_HEIGHT} from "js_pro_src/styles/size";

type NavigationParams = {
}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}
function Comp({

              }:Props) {
  const innerMinH = useMemo(() => { // 计算
    const winH = Dimensions.get("window").height
    return winH - (StatusBar.currentHeight||0) - Header.HEIGHT - BTM_TAB_HEIGHT
  }, [])
  return (
    <SpringScrollView
      style={styles.wrap} bounces={false}
    >
      <View style={[styles.innerWrap, {minHeight: innerMinH}]}>
        <Text style={styles.title}>
          好玩的群<Text style={styles.titleDesc}>（每周推荐）</Text>
        </Text>
        {/** 群卡片 */}
        <GroupCard />
        <GroupCard />
        {/** 帮助中心 */}
        <HelpCenter />
        {/** 底部 */}
        <Footer />
      </View>
    </SpringScrollView>
  )
}

// 导航设置
Comp.navigationOptions = (): NavigationStackOptions => {
  return {
    headerRight: <MainTabHeaderRight showSearchBtn={false} />
  }
}

const FindListScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default FindListScreen

const styles = StyleSheet.create({
  wrap: {
    flex: 1, backgroundColor: white
  },
  innerWrap: {
    paddingBottom: pxW2dp(80)
  },
  title: {
    paddingLeft: pxW2dp(20),
    paddingVertical: pxW2dp(30),
    fontSize: pxW2dp(32), lineHeight: pxW2dp(44), color: level1Word,
  },
  titleDesc: {
    color: level2Word
  }
})
