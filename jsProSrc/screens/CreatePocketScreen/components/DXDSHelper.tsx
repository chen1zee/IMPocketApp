import React, {useCallback, useMemo} from "react"
import {StyleSheet, TouchableWithoutFeedback, View} from "react-native"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {gray, green, level1Word, white} from "js_pro_src/styles/color";
import ProCheckBox from "js_pro_src/components/ProCheckBox";
import SwitchSelector from "react-native-switch-selector-fix"

type DXDSHelperProps = {
  val: string, // 值
  initial?: number // 注意 初始下标 应与 初始值相同
  changeVal: (val: any) => void
  selected: boolean, toggleSelected: () => void
  options: { label: string, value: string }[]
}
function DXDSHelper({
  val,
  initial=0, changeVal,
  selected, toggleSelected,
  options
              }: DXDSHelperProps) {
  const size = useMemo(() => pxW2dp(70), [])
  // 激活态 btn 颜色
  const buttonColor = useMemo(() => selected ? green : gray, [selected])
  // 处理 switchOnpress
  const switchOnpress = useCallback((v: any) => {
    if (!selected) return // 无选择
    changeVal(v)
  }, [selected, changeVal])
  return (
    <View style={styles.wrap}>
      <TouchableWithoutFeedback onPress={() => toggleSelected()}>
        <View style={styles.leftWrap}>
          <ProCheckBox val={selected} activeVal={true} />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.rightWrap}>
        <SwitchSelector
          value={val} textStyle={styles.switchTextStyle}
          options={options} initial={initial}
          onPress={switchOnpress} height={size}
          disabled={!selected} buttonColor={buttonColor}
        />
      </View>
    </View>
  )
}

export default DXDSHelper

const styles = (() => {
  const wrapSize = pxW2dp(90)
  return StyleSheet.create({
    wrap: {
      flexDirection: "row", backgroundColor: white, overflow: "hidden",
      paddingRight: pxW2dp(30), height: wrapSize,
      borderRadius: pxW2dp(10), marginBottom: pxW2dp(30)
    },
    leftWrap: {
      width: wrapSize, height: wrapSize, marginRight: pxW2dp(20),
      justifyContent: "center", alignItems: "center",
    },
    rightWrap: {
      flex: 1, justifyContent: "center"
    },
    switchTextStyle: {
      color: level1Word
    }
  })
})()
