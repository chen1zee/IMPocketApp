import React, {useCallback, useMemo, useRef} from "react"
import {StatusBar, StyleSheet, TextInput, View} from "react-native"
import {NavigationScreenProp} from "react-navigation";
import {NavigationStackOptions} from "react-navigation-stack";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor, green, level3Word, red, white} from "js_pro_src/styles/color";
import {pxW2dp} from "js_pro_src/utils/sizes";
import LabelInput from "js_pro_src/components/LabelInput";
import DescriptMineNum from "./components/DescriptMineNum";
import ModeBar from "./components/ModeBar";
import {SpringScrollView} from "react-native-spring-scrollview"
import useMode from "./hooks/useMode";
import usePocketNum from "./hooks/usePocketNum";
import useMineNumArrStore from "./hooks/useMineNumArrStore";
import useGroupMoney from "./hooks/useGroupMoney";
import useRemark from "./hooks/useRemark";
import usePersonMoney from "./hooks/usePersonMoney";
import MoneyDisplay from "./components/MoneyDisplay";
import ProButton from "js_pro_src/components/ProButton";
import ProToast from "js_pro_src/components/ProToast";
import DXDSHelper from "./components/DXDSHelper";
import useDaXiaoStore from "./hooks/useDaXiaoStore";
import useDanShuangStore from "./hooks/useDanShuangStore";
import NumberSelector from "./components/NumberSelector";
import {useObserver} from "mobx-react-lite";
import validateValidateFuncs from "js_pro_src/utils/validateValidateFuncs";

const createPacketBgColor = "#eeeef8" // 背景色

export type Mode = "group" | "person" // "group":发到群   "person":发个人

type NavigationParams = { // params
  groupPeopleNum: number // 群人数
}
type ScreenProps = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}
function Comp({
  navigation
              }: ScreenProps) {
  const PocketNumRef = useRef() // 红包个数
  const GroupMoneyRef = useRef() // 群红包 总金额
  const PersonMoneyRef = useRef() // 个人红包 总金额
  const RemarkRef = useRef<TextInput>() // Remark ref
  const inputToolBarHeight = useMemo(() => pxW2dp(500), [])
  // 群人数
  const groupPeopleNum = useMemo(() => {
    return navigation.getParam("groupPeopleNum", 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 模式
  const mode = useMode()
  // 红包个数
  const pocketNum = usePocketNum(groupPeopleNum)
  // 大小
  const daXiao = useDaXiaoStore({
    hasSelectedCb: val => {
      danShuang.toggleSelected(false)
      if (val == "D") {
        mineNumArrStore.setVal([5,6,7,8,9])
      } else {
        mineNumArrStore.setVal([0,1,2,3,4])
      }
    }
  })
  // 单双
  const danShuang = useDanShuangStore({
    hasSelectedCb: val => {
      daXiao.toggleSelected(false)
      if (val == "d") {
        mineNumArrStore.setVal([1,3,5,7,9])
      } else {
        mineNumArrStore.setVal([0,2,4,6,8])
      }
    }
  })
  // toggle cb
  const mineNumArrStoreHasToggleCb = useCallback(() => { //
    if (!daXiao.selected && !danShuang.selected) return
    daXiao.toggleSelected(false)
    danShuang.toggleSelected(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 雷电数字
  const mineNumArrStore = useMineNumArrStore({
    hasToggleCb: mineNumArrStoreHasToggleCb
  })
  // 群聊的 总金额
  const groupMoney = useGroupMoney()
  // 个人红包 总金额
  const personMoney = usePersonMoney()
  // 备注
  const remark = useRemark()
  // 验证表单 && 提交
  const pendingSubmitRef = useRef<boolean>(false)
  const validateSubmit = useCallback<() => Promise<any>>(async () => {
    if (pendingSubmitRef.current) return
    pendingSubmitRef.current = true
    const arr = [
      () => pocketNum.validate(pocketNum.val),
      () => remark.validate(remark.val)
    ]
    arr.push(
      mode.val=="group" ?
      () => groupMoney.validate(groupMoney.val) :
      () => personMoney.validate(personMoney.val)
    )
    try {
      await validateValidateFuncs(arr)
      /** 验证通过 */
      console.log("通过 待完成")
      pendingSubmitRef.current = false
    } catch (err) {
      // 验证失败
      pendingSubmitRef.current = false
      ProToast.showTop({content: err.message})
    }
  }, [pocketNum, remark, groupMoney, personMoney, mode])
  // 渲染函数
  return useObserver(() => (
    <SpringScrollView
      style={styles.wrap} bounces={false}
      textInputRefs={[PocketNumRef, GroupMoneyRef, PersonMoneyRef, RemarkRef]}
      inputToolBarHeight={inputToolBarHeight}
    >
      <LabelInput
        cRef={r => PocketNumRef.current = r}
        val={pocketNum.val} changeVal={pocketNum.changeVal}
        warning={pocketNum.warning}
        keyboardType="numeric" placeholder={`本群共${groupPeopleNum}人`}
        prevLabel="红包个数" postLabel="个"
      />
      {/** 群发 雷点设置 */}
      {mode.val=="group" &&
      <React.Fragment>
        <LabelInput
          warning={mineNumArrStore.warning} editable={false}
          placeholder="请在下方选择数字或大小单双"
          prevLabel="雷点数字" postLabel={null}
        />
        <View style={styles.emptyA} />
        <DescriptMineNum />
        <View style={styles.emptyB} />
        {/** 数字选择 */}
        <NumberSelector
          numArrVal={mineNumArrStore.val}
          toggle={mineNumArrStore.toggle}
        />
        {/** 大小辅助器 */}
        <DXDSHelper
          val={daXiao.val} changeVal={daXiao.changeVal} options={daXiao.options}
          selected={daXiao.selected} toggleSelected={daXiao.toggleSelected}
        />
        {/** 单双辅助器 */}
        <DXDSHelper
          val={danShuang.val} changeVal={danShuang.changeVal} options={danShuang.options}
          selected={danShuang.selected} toggleSelected={danShuang.toggleSelected}
        />
      </React.Fragment>
      }
      {mode.val=="group" ? // 群红包的 总金额
        <LabelInput
          cRef={r => GroupMoneyRef.current = r}
          val={groupMoney.val} changeVal={groupMoney.changeVal}
          warning={groupMoney.warning} keyboardType="numeric"
          maxLength={8} prevLabel="总金额" postLabel="元"
          placeholder="请输入10的整数"
        /> : // 个人红包 总金额
        <LabelInput
          cRef={r => PersonMoneyRef.current = r}
          val={personMoney.val} changeVal={personMoney.changeVal}
          warning={personMoney.warning} keyboardType="numeric"
          maxLength={8} prevLabel="总金额" postLabel="元" placeholder="0.00"
        />}
      {/** 当前红包模式 && 切换 */}
      <ModeBar mode={mode.val} toggle={mode.toggle} />
      <View style={styles.emptyB} />
      {/** 备注输入框 */}
      <TextInput
        value={remark.val}
        onChangeText={remark.changeVal}
        ref={r => {
          // @ts-ignore
          RemarkRef.current = r
        }}
        style={[styles.remark, remark.warning?{color: red}:{}]}
        multiline={true} numberOfLines={2} placeholder="恭喜发财，大吉大利"
        placeholderTextColor={remark.warning?red:level3Word}
      />
      <MoneyDisplay
        mode={mode.val}
        groupMoneyVal={groupMoney.val} groupMoneyWarning={groupMoney.warning}
        personMoneyVal={personMoney.val} personMoneyWarning={personMoney.warning}
      />
      {/** 按钮 */}
      <ProButton
        text="塞钱进红包" onPress={validateSubmit}
        style={styles.submitBtnWrap} textStyle={styles.submitBtnText}
      />
      <View style={styles.emptyC} />
    </SpringScrollView>
  ))
}

Comp.navigationOptions = (): NavigationStackOptions => {
  return {
    headerStyle: {backgroundColor: createPacketBgColor}
  }
}

const CreatePocketScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => {
    StatusBar.setBackgroundColor(createPacketBgColor)
  },
  willBlur: () => {
    StatusBar.setBackgroundColor(borderColor)
  }
})

export default CreatePocketScreen

const styles = StyleSheet.create({
  wrap: {
    flex: 1, backgroundColor: createPacketBgColor,
    paddingHorizontal: pxW2dp(20), paddingVertical: pxW2dp(40)
  },
  remark: {
    height: pxW2dp(150), paddingHorizontal: pxW2dp(30), borderRadius: pxW2dp(10),
    backgroundColor: white, fontSize: pxW2dp(30), lineHeight: pxW2dp(44),
  },
  emptyA: { height: pxW2dp(10) },
  emptyB: { height: pxW2dp(30) },
  emptyC: { height: pxW2dp(150) },
  submitBtnWrap: {
    backgroundColor: green, alignItems: "center", height: pxW2dp(90)
  },
  submitBtnText: {
    fontSize: pxW2dp(32)
  }
})
