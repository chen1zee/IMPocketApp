import React, {useMemo} from "react"
import {Text, TextInput, View} from "react-native"
import AntIcon from "react-native-vector-icons/AntDesign";
import {pxW2dp} from "js_pro_src/utils/sizes";
import styles from "./MineSweepAndBanGrabCommonStyle";
import ProCheckBox from "js_pro_src/components/ProCheckBox";
import {UseMineSweepConf} from "js_pro_src/screens/CreateChatStack/PocketConfScreen/hooks/useMineSweepConf";
import {red} from "js_pro_src/styles/color";

type Props = {
  mineSweepConfVal: UseMineSweepConf["val"],
  changeTime: UseMineSweepConf["changeTime"]
  toggle: UseMineSweepConf["toggle"]
}
function MineSweep({
  mineSweepConfVal, changeTime, toggle,
                   }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.tipsWrap}>
        <AntIcon style={styles.tipsIcon} name="infocirlce" />
        <Text style={styles.tipsText}>
          每个抢包中雷者都会给发包人按赔率进行一次赔付，赔付金额为：
          <Text style={styles.goldColor}>发包人所发金额 * 赔率</Text>
        </Text>
      </View>
      <Text style={[styles.normalText, styles.pocketConfLabel]}>
        可发红包个数与赔率设置（可多选）：
      </Text>
      {/** 设置条 */}
      {mineSweepConfVal.map((conf, index) => {
        return (
          <PocketConfBar
            key={conf.packNum} packNum={conf.packNum} time={conf.time}
            selected={conf.selected} warning={conf.warning}
            onChangeText={str => changeTime(str, index)}
            toggleCheckBox={() => toggle(index)}
          />
        )
      })}
    </View>
  )
}

/** 红包设置条 */
type PocketConfBarType = {
  packNum: number, // 发包数
  time: string, // 倍数
  selected: boolean, // 选中flag
  warning: boolean, // 警告flag
  onChangeText: (str: string) => void,
  toggleCheckBox: () => void
}
function PocketConfBar({
  packNum, time, selected, warning,
  onChangeText, toggleCheckBox
                       }: PocketConfBarType) {
  const checkBoxSize = useMemo(() => pxW2dp(44), [])
  const extraTextInputStyle = useMemo(() => {
    if (warning) return { borderColor: red, color: red }
    return {}
  }, [warning])
  return (
    <View style={styles.pocketConfWrap}>
      <ProCheckBox
        wrapStyle={styles.checkbox} val={selected} activeVal={true} size={checkBoxSize}
        onPress={toggleCheckBox}
      />
      <Text style={styles.normalText}>发</Text>
      <Text style={[styles.normalText, styles.goldColor]}>{packNum}</Text>
      <Text style={styles.normalText}>个包,每个</Text>
      <Text style={[styles.normalText, styles.goldColor]}>中雷包</Text>
      <Text style={styles.normalText}>赔付</Text>
      <TextInput
        value={time} keyboardType="number-pad" onChangeText={onChangeText}
        returnKeyType="next"
        style={[styles.pocketConfTextInput, extraTextInputStyle]}
      />
      <Text style={styles.normalText}>倍</Text>
    </View>
  )
}

export default MineSweep
