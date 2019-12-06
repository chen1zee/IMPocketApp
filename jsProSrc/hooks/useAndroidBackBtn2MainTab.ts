import {useEffect} from "react"
import {NavigationScreenProp} from "react-navigation";
import navigators, {mainStackNavigator} from "js_pro_src/navigators/navigators";
import {BackHandler, StatusBar} from "react-native";
import {borderColor} from "js_pro_src/styles/color";

/**
 * 处理 安卓 返回按钮 回退到  mainTabNavi
 * 需要按两次才返回到 mainTab && 会重置 mainTab 的问题
 * */
type Props = {
  navigation: NavigationScreenProp<{}, {}>,
  selfHandler?: () => void // 自行处理 cb 则用户处理相关逻辑
}
function useAndroidBackBtn2MainTab({
  navigation, selfHandler
                                   }: Props) {
  // 处理 android 返回键问题
  useEffect(() => {
    const backHandler = function() {
      if (!navigation.isFocused()) return false
      // 处理跳转
      if (selfHandler) {
        selfHandler()
      } else {
        navigators.get(mainStackNavigator).goBack()
      }
      // 修改 StatusBar样式
      StatusBar.setBackgroundColor(borderColor)
      return true
    }
    BackHandler.addEventListener("hardwareBackPress", backHandler)
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useAndroidBackBtn2MainTab
