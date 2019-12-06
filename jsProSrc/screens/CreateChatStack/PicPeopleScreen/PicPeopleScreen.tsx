import React, {MutableRefObject, useCallback, useEffect, useState} from "react"
import {StatusBar, StyleSheet, View} from "react-native"
import {HeaderBackButton, NavigationStackOptions} from "react-navigation-stack";
import navigators, {mainStackNavigator} from "js_pro_src/navigators/navigators";
import {NavigationScreenProp, StackActions} from "react-navigation";
import ProButton from "js_pro_src/components/ProButton";
import {borderColor, green, lessGreenWhite} from "js_pro_src/styles/color";
import {pxW2dp} from "js_pro_src/utils/sizes";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import PeoPleList from "../components/PeoPleList";
import {useObserver} from "mobx-react-lite";
import HasPickBar from "../components/HasPickBar";
import useLocalS from "js_pro_src/hooks/useSelectPeople/useLocalS";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import createChatStore from "js_pro_src/store/createChatStore";
import ProToast from "js_pro_src/components/ProToast";
import useRefSyncVal from "js_pro_src/hooks/useRefSyncVal";
import useShouldChangeCanNext from "js_pro_src/hooks/useSelectPeople/useShouldChangeCanNext";
import useAndroidBackBtn2MainTab from "js_pro_src/hooks/useAndroidBackBtn2MainTab";

/**
 * 选择群成员页
 * */

/** 导航 state */
type NavigationParams = {
  canNext: boolean, // 可以跳下一页 flag
  goNextRef: MutableRefObject<() => void> // 取下一页 handler
}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}
export type ScreenState = {
  personCursor: number
}
function Comp({
  navigation
             }: Props) {
  const localS = useLocalS(() => {
    setPersonCursor(-1) // 重置 选中下标
  })
  // 选中 person 游标 -1 未选中
  const [personCursor, setPersonCursor] = useState<ScreenState["personCursor"]>(-1)
  // 需要修改 右上角 下一步 可否点击 flag
  useShouldChangeCanNext({
    selectedPersons: localS.selectedPersons,
    shouldChange: (flag) => {
      navigation.setParams({canNext: flag})
    }
  })
  const goNext = useCallback(() => {
    // 设置全局 已选群员
    createChatStore.setJoinIds(localS.selectedPersons.map(item => item.item.id))
    navigation.navigate({
      routeName: SCREEN_NAMES.PocketConf
    })
  }, [localS, navigation])
  // 右上角 下一步 button handler
  const goNextRef = useRefSyncVal(goNext)
  useEffect(() => {
    navigation.setParams({goNextRef})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 处理 android 返回键问题
  useAndroidBackBtn2MainTab({navigation})
  return useObserver(() => (
    <View style={styles.wrap}>
      {/** 选人 bar */}
      <HasPickBar
        personCursor={personCursor} changePersonCursor={i => setPersonCursor(i)}
        selectedPersons={localS.selectedPersons}
        unSelectPerson={localS.unSelectPerson}
      />
      {/** 群成员列表 */}
      <PeoPleList data={localS.list} onToggle={localS.toggle}/>
    </View>
  ))
}

Comp.goBack = () => { // 左侧返回按钮
  navigators.get(mainStackNavigator).dispatch(StackActions.pop({}))
}
// 导航设置
Comp.navigationOptions = ({navigation}: {navigation: Props["navigation"]}): NavigationStackOptions => {
  const canNext = navigation.getParam("canNext")
  const btnColor = canNext ? green : lessGreenWhite
  const goNextHandler = () => {
    if (!canNext) return ProToast.show({content: "请选择群成员"})
    navigation.getParam("goNextRef").current()
  }
  return {
    headerLeft: (
      <HeaderBackButton onPress={Comp.goBack} />
    ),
    headerRight: (
      <ProButton
        text="下一步" onPress={goNextHandler}
        style={[{backgroundColor: btnColor}, styles.btnWrap]}
      />
    )
  }
}
const PicPeopleScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => {
    StatusBar.setBackgroundColor(borderColor)
  }
})

export default PicPeopleScreen

const styles = StyleSheet.create({
  btnWrap: {
    height: pxW2dp(64), marginRight: pxW2dp(35)
  },
  wrap: {
    flex: 1,
  }
})
