import React, {useCallback, useMemo, useState} from "react"
import {Image, StyleSheet, Text, View} from "react-native"
import Ionicon from "react-native-vector-icons/Ionicons"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {borderColor, cyan, gray, level3Word, level4Word, orange, red} from "js_pro_src/styles/color";
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import Picker from "react-native-picker";
import {UseMonthStore} from "../hooks/useMonthStore";
import Modal from "react-native-modal"

type Props = {
  recordNum: number,
  monthStoreValStr: UseMonthStore["valStr"],
  monthStoreChangeValFromStr: UseMonthStore["changeValFromStr"]
}
function TopInfo({
  recordNum, monthStoreValStr,
  monthStoreChangeValFromStr
                 }: Props) {
  const [maskShowing, setMaskShowing] = useState(false)
  // 日期选择器
  const picker = useMemo(() => {
    const months: {year: string, month: string}[] = []
    const begin = {year: 2019, month: 11} // 从11月 开始生成
    const nowDate = new Date()
    const end = {year: nowDate.getFullYear(), month: nowDate.getMonth() + 1}
    for (let year = begin.year; year <= end.year; year++) { // 遍历年份
      // 等于当前年份，从x月开始遍历 其他 1月起
      const m = year == 2019 ? 11 : 1 // 2019年从 11月开始算起
      const maxM = end.year == 2019 ? end.month : // 结束年份为 2019, 则最大月份为 end.Month
        year == end.year ? end.month : 12 // 遍历到最后一年，， 则 最大月份为 end.month, 其他为 12
      for (let month = m; month <= maxM; month++) { // 遍历月份
        months.push({
          year: String(year), month: month < 10 ? `0${String(month)}` : String(month)
        })
      }
    }
    Picker.init({
      pickerData: months.map(item => `${item.year}年${item.month}月`),
      selectedValue: [monthStoreValStr], pickerTitleText: "请选择月份",
      pickerConfirmBtnText: "确定", pickerCancelBtnText: "取消",
      onPickerConfirm(item: string[]): void {
        monthStoreChangeValFromStr(item[0])
        setMaskShowing(false)
      },
      onPickerCancel() {
        setMaskShowing(false)
      },
      pickerFontSize: pxW2dp(40)
    })
    return {
      show: () => Picker.show(),
      toggle: () => Picker.toggle(),
      hide: () => Picker.hide(),
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 隐藏picker
  const hidePicker = useCallback(() => {
    setMaskShowing(false)
    picker.hide()
  }, [picker])
  // 显示picker
  const showPicker = useCallback(() => picker.show(), [picker])
  // 显示 蒙层 -> onModalShow -> showPicker
  const chooseMonth = useCallback(() => setMaskShowing(true), [])
  return (
    <View style={styles.wrap}>
      {/* 选择月份 */}
      <TouchableWrap style={styles.monthBar} onPress={chooseMonth}>
        <Text style={styles.monthLabel}>{monthStoreValStr}</Text>
        <View style={styles.monthBtnWrap}>
          <Text style={styles.monthBtnTxt}>选择月份</Text>
          <Ionicon name="ios-arrow-forward" style={styles.monthBtnArrow} />
        </View>
      </TouchableWrap>
      {/* 发包记录 info */}
      <View style={styles.recordWrap}>
        <Text style={styles.recordLabel}>我在此群的发包记录</Text>
        <View style={styles.recordRight}>
          <Image style={styles.recordImg} source={require("js_pro_src/assets/u239.jpg")} />
          <Text style={styles.recordTxtRed}>
            {recordNum}
            <Text style={styles.recordTxtNormal}> 个</Text>
          </Text>
        </View>
      </View>
      {/** modal 用于 遮罩picker */}
      <Modal
        isVisible={maskShowing} style={styles.mask}
        animationInTiming={1} animationOutTiming={1}
        onBackdropPress={hidePicker}
        onBackButtonPress={hidePicker}
        onModalHide={hidePicker}
        onModalShow={showPicker}
      >
        <View />
      </Modal>
    </View>
  )
}

export default TopInfo

const styles = StyleSheet.create({
  wrap: {
    paddingLeft: pxW2dp(20)
  },
  monthBar: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    height: pxW2dp(120), paddingRight: pxW2dp(20),
    borderBottomWidth: pxW2dp(1), borderBottomColor: borderColor,
  },
  monthLabel: {
    fontSize: pxW2dp(28), lineHeight: pxW2dp(38), color: orange,
  },
  monthBtnWrap: {
    flexDirection: "row", alignItems: "center"
  },
  monthBtnTxt: {
    fontSize: pxW2dp(24), lineHeight: pxW2dp(30), color: cyan,
    marginRight: pxW2dp(20)
  },
  monthBtnArrow: {
    fontSize: pxW2dp(30), color: gray
  },
  recordWrap: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    borderBottomWidth: pxW2dp(1), borderBottomColor: borderColor,
    height: pxW2dp(120), paddingRight: pxW2dp(20)
  },
  recordLabel: {
    fontSize: pxW2dp(30), lineHeight: pxW2dp(40),
    color: level4Word,
  },
  recordRight: {
    flexDirection: "row", alignItems: "center",
  },
  recordImg: {
    width: pxW2dp(30), height: pxW2dp(30), marginRight: pxW2dp(20),
  },
  recordTxtRed: {
    fontSize: pxW2dp(30), lineHeight: pxW2dp(40), color: red
  },
  recordTxtNormal: {
    fontSize: pxW2dp(30), lineHeight: pxW2dp(40), color: level3Word
  },
  mask: {
    flex: 1,
  }
})
