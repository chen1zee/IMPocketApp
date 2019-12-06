import React, {useCallback, useMemo} from "react"
import {Text, TextInput, View} from "react-native";
import styles from "js_pro_src/screens/CreateChatStack/PocketConfScreen/GroupModeTab/MineSweepAndBanGrabCommonStyle";
import Ionicon from "react-native-vector-icons/Ionicons"
import ProCheckBox from "js_pro_src/components/ProCheckBox";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {UseBanGrabConf} from "js_pro_src/screens/CreateChatStack/PocketConfScreen/hooks/useBanGrabConf";
import {red} from "js_pro_src/styles/color";

type Props = {
  banGrabConfVal: UseBanGrabConf["val"],
  toggleBanGrabConf: UseBanGrabConf["toggle"],
  changeTimeBanGrabConf: UseBanGrabConf["changeTime"]
}
function BanGrab({
  banGrabConfVal, toggleBanGrabConf, changeTimeBanGrabConf
                 }: Props) {
  const goCustomService = useCallback(() => {
    console.log("goCustomService 待完成")
  }, [])
  return (
    <View style={styles.wrap}>
      <View style={styles.tipsWrap}>
        <Ionicon style={styles.alertTipIcon} name="md-alert" />
        <View style={styles.tipsTextWrap}>
          <Text style={styles.tipsText}>1. 必须先额外注册9个抢包号再建群进行绑定</Text>
          <Text style={styles.tipsText}>
            2. 联系
            <Text
              style={[styles.goldColor, styles.link]}
              onPress={goCustomService}
            >客服 >></Text>
            开群，并免费获得操作指导 <Text style={styles.goldColor}>（推荐）</Text>
          </Text>
        </View>
      </View>
      <Text style={[styles.normalText, styles.pocketConfLabel]}>
        可发红包个数与赔率设置（可多选）：
      </Text>
      {banGrabConfVal.map((conf, pacIndex) => (
        <PocketConfBlock
          onChangeText={(time, hitIndex) => { changeTimeBanGrabConf(time, pacIndex, hitIndex) }}
          toggleCheckBox={() => toggleBanGrabConf(pacIndex)}
          key={conf.packNum} packNum={conf.packNum}
          selected={conf.selected} confArr={conf.confArr}
        />
      ))}
    </View>
  )
}

/** 红包设置块 */
type PocketConfBlockType = {
  packNum: number // 发包数
  selected: boolean // 选择
  confArr: { // 中雷个数 配置数组
    hitNum: number, // 中雷数
    time: string, // 倍数
    warning: boolean // 警告flag
  }[],
  toggleCheckBox: () => void // 切换 checkBox
  onChangeText: (time: string, hitIndex: number) => void // time修改
}
function PocketConfBlock({
  packNum, selected, confArr, toggleCheckBox, onChangeText
                         }: PocketConfBlockType) {
  const checkBoxSize = useMemo(() => pxW2dp(44), [])
  return (
    <React.Fragment>
      <View style={styles.pocketConfWrap}>
        <ProCheckBox
          onPress={toggleCheckBox}
          wrapStyle={styles.checkbox}
          val={selected} activeVal={true} size={checkBoxSize}
        />
        <Text style={styles.normalText}>发</Text>
        <Text style={[styles.normalText, styles.goldColor]}>{packNum}</Text>
        <Text style={styles.normalText}>个红包,对应</Text>
        <Text style={[styles.normalText, styles.goldColor]}>中雷个数</Text>
        <Text style={styles.normalText}>赔付设置</Text>
      </View>
      {/** 中雷设置 有选中 才显示 */}
      {selected && confArr.map((c, hitIndex) => (
        <HitMineBar
          key={c.hitNum} hitNum={c.hitNum}
          warning={c.warning} time={c.time}
          onChangeText={time => {onChangeText(time, hitIndex)}}
        />
      ))}
      <View style={{height: pxW2dp(10)}} />
    </React.Fragment>
  )
}

type HitMineBarType = {
  hitNum: number, // 中雷数
  time: string, // 倍数
  warning: boolean // 警告flag
  onChangeText: (time: string) => void
}
function HitMineBar({
  hitNum, time, warning, onChangeText
                    }: HitMineBarType) {
  const extraTextInputStyle = useMemo(() => {
    if (warning) return {borderColor: red, color: red}
    return {}
  }, [warning])
  return (
    <View style={styles.hitMineBarWrap}>
      <Text style={styles.smallerNormalText}>中</Text>
      <Text style={[styles.smallerNormalText, styles.goldColor]}>{hitNum}个</Text>
      <Text style={styles.smallerNormalText}>雷，赔付</Text>
      <TextInput
        value={time} onChangeText={onChangeText} keyboardType="number-pad"
        style={[styles.smallerPocketConfTextInput, extraTextInputStyle]}
      />
      <Text style={styles.smallerNormalText}>倍</Text>
    </View>
  )
}


export default BanGrab
