import React, {MutableRefObject, useCallback, useEffect, useState} from "react"
import {ScrollView, StatusBar, StyleSheet, Text, View} from "react-native"
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor, green, level2Word} from "js_pro_src/styles/color";
import {NavigationScreenProp} from "react-navigation";
import {NavigationStackOptions} from "react-navigation-stack";
import ProButton from "js_pro_src/components/ProButton";
import {pxW2dp} from "js_pro_src/utils/sizes";
import PicImg from "./PicImg";
import GroupNameInput from "./GroupNameInput";
import LabelTextInput from "./LabelTextInput";
import GroupModeTab from "./GroupModeTab/GroupModeTab";
import useGroupName from "./hooks/useGroupName";
import usePocketNum from "./hooks/usePocketNum";
import useMineSweepConf from "./hooks/useMineSweepConf";
import {useObserver} from "mobx-react-lite";
import useGroupImg from "./hooks/useGroupImg";
import useRefSyncVal from "js_pro_src/hooks/useRefSyncVal";
import ProToast from "js_pro_src/components/ProToast";
import createChatStore from "js_pro_src/store/createChatStore";
import useBanGrabConf from "./hooks/useBanGrabConf";
import { SCREEN_NAMES } from "js_pro_src/navigators/screenNames";
import validateValidateFuncs from "js_pro_src/utils/validateValidateFuncs";
import useAndroidBackBtn2MainTab from "js_pro_src/hooks/useAndroidBackBtn2MainTab";

export type ScreenMode = "mineSweep" | "banGrab" // 模式 mineSweep:扫雷   banGrab:禁抢

type NavigationParams = {
  submitRef: MutableRefObject<() => Promise<void>>, // 提交表单
  pending: boolean // 提交表单中
}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}
function Comp({
  navigation
              }: Props) {
  // 图片
  const groupImg = useGroupImg()
  // 标题
  const groupName = useGroupName(20)
  // 最小红包
  const minPocketNum = usePocketNum("最小红包金额")
  // 最大红包
  const maxPocketNum = usePocketNum("最大红包金额")
  // 模式
  const [mode, setMode] = useState<ScreenMode>("mineSweep")
  // 扫雷模式配置
  const mineSweepConf = useMineSweepConf()
  // 禁抢模式配置
  const banGrabConf = useBanGrabConf()
  // 验证表单 && 提交表单
  const submit = useCallback<() => Promise<void>>(async () => {
    if (navigation.getParam("pending")) return
    navigation.setParams({pending: true})
    try {
      const validateArr = [
        () => groupImg.validate(), // 图片
        () => groupName.validate(groupName.val), // 群名
        () => minPocketNum.validate(minPocketNum.val), // 最小红包
        () => maxPocketNum.validate(maxPocketNum.val), // 最大红包
      ]
      if (mode == "mineSweep") { // 扫雷模式
        validateArr.push(() => mineSweepConf.validate())
      } else { // 禁抢模式
        validateArr.push(() => banGrabConf.validate())
      }
      await validateValidateFuncs(validateArr)
      // 验证通过
      /** TODO */
      createChatStore.setPocketConf() // 保存 全局状态
      if (mode == "mineSweep") { // 扫雷模式 直接提交
        try {
          createChatStore.create()
        } catch (e) {
          console.log(e)
        } finally {
          navigation.setParams({pending: false})
        }
      } else { // 禁抢模式，， 跳 设置抢包号 页
        navigation.setParams({pending: false})
        navigation.navigate({ routeName: SCREEN_NAMES.SetGrabPeople })
      }
    } catch (err) {
      ProToast.showTop({content: err.message})
      navigation.setParams({pending: false})
    }
  }, [navigation, groupImg, groupName, minPocketNum, maxPocketNum, mode, mineSweepConf, banGrabConf])
  /** hack 防止 navigation.setParams 无限re-render */
  const submitRef = useRefSyncVal(submit)
  // 监听 navigator 保存按钮事件
  useEffect(() => {
    navigation.setParams({submitRef})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 处理 android 返回键问题
  useAndroidBackBtn2MainTab({navigation,selfHandler: () => navigation.goBack()})
  return useObserver(() => (
    <ScrollView style={styles.wrap}>
      {/* 群 图片 && 名字 条 */}
      <View style={styles.picNameBar}>
        {/* 群图片选择 */}
        <PicImg groupImg={groupImg} />
        <GroupNameInput
          val={groupName.val} warning={groupName.warning}
          onChangeText={groupName.changeVal}
        />
      </View>
      {/* 红包金额设置 */}
      <View style={styles.pocketMoneyWrap}>
        <LabelTextInput
          keyboardType="numeric"
          label="最小发红包金额：" warning={minPocketNum.warning}
          val={minPocketNum.val} onChangeText={minPocketNum.changeVal}
        />
        <LabelTextInput
          keyboardType="numeric"
          label="最大发红包金额：" warning={maxPocketNum.warning}
          val={maxPocketNum.val} onChangeText={maxPocketNum.changeVal}
        />
      </View>
      <Text style={styles.groupModeLabel}>群模式选择：</Text>
      {/* 群模式设置 */}
      <GroupModeTab
        mode={mode} changeMode={setMode}
        mineSweepConfVal={mineSweepConf.val}
        changeTime={mineSweepConf.changeTime} toggle={mineSweepConf.toggle}
        banGrabConfVal={banGrabConf.val}
        toggleBanGrabConf={banGrabConf.toggle}
        changeTimeBanGrabConf={banGrabConf.changeTime}
      />
    </ScrollView>
  ))
}
// 导航设置
Comp.navigationOptions = ({navigation}: {navigation: Props["navigation"]}): NavigationStackOptions => {
  const save = () => {
    if (navigation.getParam("pending")) return
    navigation.getParam("submitRef").current()
  }
  return {
    headerRight: (
      <ProButton text="保存" onPress={save} style={styles.btnWrap} />
    )
  }
}

const PocketConfScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => {
    StatusBar.setBackgroundColor(borderColor)
  }
})

export default PocketConfScreen

const styles = StyleSheet.create({
  btnWrap: {
    height: pxW2dp(64), marginRight: pxW2dp(35), backgroundColor: green
  },
  wrap: {
    flex: 1
  },
  picNameBar: {
    paddingTop: pxW2dp(20), paddingHorizontal: pxW2dp(20),
    flexDirection: "row", alignItems: "flex-end", marginBottom: pxW2dp(40),
  },
  pocketMoneyWrap: {
    paddingLeft: pxW2dp(40),
  },
  groupModeLabel: {
    fontSize: pxW2dp(28), color: level2Word, lineHeight: pxW2dp(40),
    marginBottom: pxW2dp(20), marginLeft: pxW2dp(40)
  }
})
