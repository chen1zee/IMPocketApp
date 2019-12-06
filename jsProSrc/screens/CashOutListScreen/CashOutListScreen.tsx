import React, {useCallback} from "react"
import {StatusBar} from "react-native"
import {NavigationScreenProp, StackActions} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor} from "js_pro_src/styles/color";
import useAndroidBackBtn2MainTab from "js_pro_src/hooks/useAndroidBackBtn2MainTab";
import CashInOutList from "js_pro_src/components/CashInOut/CashInOutList";
import {NavigationStackOptions} from "react-navigation-stack";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import {CshOutDtlParams} from "js_pro_src/screens/CashOutDetailScreen/CashOutDetailScreen";

type NavigationParams = {}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}
function Comp({navigation}: Props) {
  // 跳转详情页
  const goDetail = useCallback((item) => {
    navigation.dispatch(StackActions.push({
      routeName: SCREEN_NAMES.CashOutDetail,
      params: {withdraw_id: item.withdraw_id} as CshOutDtlParams
    }))
  }, [navigation])
  useAndroidBackBtn2MainTab({navigation})
  return (
    <CashInOutList
      mode="out" goDetail={goDetail}
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

const CashOutListScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default CashOutListScreen
