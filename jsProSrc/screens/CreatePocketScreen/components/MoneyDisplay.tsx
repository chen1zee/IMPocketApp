import React, {useMemo} from "react"
import {StyleSheet, Text, View} from "react-native"
import Ionicon from "react-native-vector-icons/Ionicons"
import {level1Word} from "js_pro_src/styles/color";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {Mode} from "js_pro_src/screens/CreatePocketScreen/CreatePocketScreen";

type Props = {
  mode: Mode,
  groupMoneyVal: string,
  personMoneyVal: string,
  groupMoneyWarning: boolean,
  personMoneyWarning: boolean
}
function MoneyDisplay({
  mode,
  groupMoneyVal, groupMoneyWarning,
  personMoneyVal, personMoneyWarning,
                      }: Props) {
  const moneyTxt = useMemo<string>(() => {
    if (mode == "group") {
      if (groupMoneyWarning || !groupMoneyVal.length) return "0.00"
      return groupMoneyVal + ".00"
    } else { // 个人红包
      if (personMoneyWarning || !personMoneyVal.length) return "0.00"
      return parseFloat(personMoneyVal).toFixed(2)
    }
  }, [
    mode, groupMoneyVal, groupMoneyWarning,
    personMoneyVal, personMoneyWarning
  ])
  return (
    <View style={styles.wrap}>
      <Ionicon name="logo-yen" style={styles.icon} />
      <Text style={styles.text}>{moneyTxt}</Text>
    </View>
  )
}

export default MoneyDisplay

const styles = StyleSheet.create({
  wrap: {
    marginTop: pxW2dp(40), marginBottom: pxW2dp(70),
    flexDirection: "row", alignItems: "center", height: pxW2dp(120),
    justifyContent: "center"
  },
  icon: {
    color: level1Word, fontSize: pxW2dp(70), marginRight: pxW2dp(10),
    position: "relative", top: pxW2dp(-2)
  },
  text: {
    fontSize: pxW2dp(70), fontWeight: "bold",
    lineHeight: pxW2dp(80), color: level1Word
  }
})
