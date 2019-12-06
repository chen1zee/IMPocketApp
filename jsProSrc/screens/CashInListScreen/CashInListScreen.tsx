import React, {useCallback} from "react"
import {StatusBar} from "react-native"
import {NavigationScreenProp, StackActions} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor} from "js_pro_src/styles/color";
import {NavigationStackOptions} from "react-navigation-stack";
import useAndroidBackBtn2MainTab from "js_pro_src/hooks/useAndroidBackBtn2MainTab";
import CashInOutList from "js_pro_src/components/CashInOut/CashInOutList";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import {CshInDtlNaviParams} from "js_pro_src/screens/CashInDetailScreen/CashInDetailScreen";

type NavigationParams = {}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}

function Comp({navigation}: Props) {
  // 跳转详情页
  const goDetail = useCallback(item => {
    navigation.dispatch(StackActions.push({
      routeName: SCREEN_NAMES.CashInDetail,
      params: { recharge_id: item.recharge_id } as CshInDtlNaviParams
    }))
  }, [navigation])
  // 处理 android 返回键问题
  useAndroidBackBtn2MainTab({navigation})
  return (
    <CashInOutList
      mode="in" goDetail={goDetail}
      navigation={navigation}
    />
  )
}
// 导航设置
Comp.navigationOptions = (): NavigationStackOptions => {
  return {
    headerStyle: {backgroundColor: borderColor}
  }
}

const CashInListScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default CashInListScreen
