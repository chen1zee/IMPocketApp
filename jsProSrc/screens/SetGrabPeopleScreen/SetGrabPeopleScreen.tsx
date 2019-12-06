import React, {MutableRefObject, useCallback, useEffect, useState} from "react"
import {StatusBar, StyleSheet, View} from "react-native"
import {NavigationScreenProp} from "react-navigation"
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor, green} from "js_pro_src/styles/color";
import {NavigationStackOptions} from "react-navigation-stack";
import ProButton from "js_pro_src/components/ProButton";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {ScreenState} from "js_pro_src/screens/CreateChatStack/PicPeopleScreen/PicPeopleScreen";
import useLocalS from "js_pro_src/hooks/useSelectPeople/useLocalS";
import useShouldChangeCanNext from "js_pro_src/hooks/useSelectPeople/useShouldChangeCanNext";
import useRefSyncVal from "js_pro_src/hooks/useRefSyncVal";
import {useObserver} from "mobx-react-lite";
import HasPickBar from "js_pro_src/screens/CreateChatStack/components/HasPickBar";
import PeoPleList from "../CreateChatStack/components/PeoPleList";
import useAndroidBackBtn2MainTab from "js_pro_src/hooks/useAndroidBackBtn2MainTab";

type NavigationParams = {
  canSubmit: boolean, // 可以跳下一页 flag
  submitRef: MutableRefObject<() => void> // 取下一页 handler
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
  // 选中 person 游标 -1 未选中
  const [personCursor, setPersonCursor] = useState<ScreenState["personCursor"]>(-1)
  // localS.list && localS.selectedPersons
  const localS = useLocalS(() => {
    setPersonCursor(-1) // 重置 选中下标
  })
  // 需要修改 右上角 下一步 可否点击 flag
  useShouldChangeCanNext({
    selectedPersons: localS.selectedPersons,
    shouldChange: (flag) => {
      navigation.setParams({canSubmit: flag})
    }
  })
  const submit = useCallback(() => {
    // 设置全局 已选群员
    // TODO submit 提交事件
  }, [])
  // 右上角 下一步 button handler
  const submitRef = useRefSyncVal(submit)
  useEffect(() => {
    navigation.setParams({submitRef})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 处理 android 返回键问题
  useAndroidBackBtn2MainTab({navigation,selfHandler: () => navigation.goBack()})
  /** 点击scroll */
  return useObserver(() => (
    <View style={styles.wrap}>
      {/** 选人bar */}
      <HasPickBar
        selectedPersons={localS.selectedPersons}
        unSelectPerson={localS.unSelectPerson}
        personCursor={personCursor} changePersonCursor={i => setPersonCursor(i)}
      />
      {/** 群成员列表 */}
      <PeoPleList data={localS.list} onToggle={localS.toggle} />
    </View>
  ))
}

// 导航设置
Comp.navigationOptions = ({navigation}: {navigation: Props["navigation"]}): NavigationStackOptions => {
  const save = () => {
    if (!navigation.getParam("canSubmit")) return
    navigation.getParam("submitRef").current()
  }
  return {
    headerRight: (
      <ProButton text="保存" onPress={save} style={styles.btnWrap} />
    )
  }
}

const SetGrabPeopleScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => {
    StatusBar.setBackgroundColor(borderColor)
  }
})

export default SetGrabPeopleScreen

const styles = StyleSheet.create({
  btnWrap: {
    height: pxW2dp(64), marginRight: pxW2dp(35), backgroundColor: green
  },
  wrap: {
    flex: 1
  }
})
