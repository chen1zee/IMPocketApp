import React, {memo, useMemo} from "react"
import {StyleSheet, Text, View} from "react-native"
import {PickerItem, PocketType} from "./List";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {borderColor, green, level1Word, white} from "js_pro_src/styles/color";
import SwitchSelector from "react-native-switch-selector-fix"

/**
 * 红包类型选择器
 * */
type Props = {
  pocketType: PocketType,
  setPocketType: (v: string) => void
  pickItems: PickerItem[],
  height: number
}
const TypePicker = memo<Props>(function ({
  pocketType, setPocketType,
  pickItems, height
                                         }) {
  const switchSize = useMemo(() => pxW2dp(70), [])
  return (
    <View style={[styles.wrap,{height}]}>
      <Text style={styles.leftTxt}>红包类型</Text>
      <View style={styles.selWrap}>
        <SwitchSelector
          value={pocketType} textStyle={styles.selTxt}
          options={pickItems} initial={0}
          onPress={setPocketType} height={switchSize}
          buttonColor={green}
        />
      </View>
    </View>
  )
})

export default TypePicker

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row", alignItems: "center",
    borderBottomWidth: 1, borderBottomColor: borderColor,
    backgroundColor: white
  },
  leftTxt: {
    paddingLeft: pxW2dp(20), color: level1Word,
    fontSize: pxW2dp(28), lineHeight: pxW2dp(44),
    width: pxW2dp(180)
  },
  selWrap: {
    flex: 1, paddingRight: pxW2dp(20)
  },
  selTxt: {
    color: level1Word
  }
})
