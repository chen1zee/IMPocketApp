import React, {useCallback} from "react"
import {StatusBar, StyleSheet, View} from "react-native"
import {NavigationScreenProp, StackActions} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor, cyanMore} from "js_pro_src/styles/color";
import {NavigationStackOptions} from "react-navigation-stack";
import useAndroidBackBtn2MainTab from "js_pro_src/hooks/useAndroidBackBtn2MainTab";
import ProButton from "js_pro_src/components/ProButton";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";

type NavigationParams = {}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}

function Comp({
  navigation
              }: Props) {
  // 跳 绑定支付宝
  const goBindAli = useCallback(() => {
    navigation.dispatch(StackActions.push({
      routeName: SCREEN_NAMES.BindAli
    }))
  }, [navigation])
  // 跳 绑定 银行卡
  const goBindBank = useCallback(() => {
    navigation.dispatch(StackActions.push({
      routeName: SCREEN_NAMES.BindBank
    }))
  }, [navigation])
  // 处理 android 返回键问题
  useAndroidBackBtn2MainTab({navigation})
  return (
    <View style={styles.wrap}>
      <View style={styles.content}>
        <ProButton
          style={[styles.btn,styles.aliBtn]} textStyle={styles.btnTxt}
          text="绑定支付宝" onPress={goBindAli}
        />
        <ProButton
          style={[styles.btn,styles.bankBtn]} textStyle={styles.btnTxt}
          text="绑定银行卡" onPress={goBindBank}
        />
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

const BindPayScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default BindPayScreen

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center", alignItems: "center", flex: 1
  },
  content: {
    top: pxW2dp(-200)
  },
  btn: {
    width: pxW2dp(300), height: pxW2dp(90), marginBottom: pxW2dp(40),
    alignItems: "center"
  },
  btnTxt: {
    fontSize: pxW2dp(30),
  },
  aliBtn: {
    backgroundColor: cyanMore
  },
  bankBtn: {

  }
})
