import React, {memo} from "react"
import {StyleSheet, Text, View} from "react-native"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {level1Word, white} from "js_pro_src/styles/color";

/**
 * 头部信息， 显示 渠道 && 金额
 * */
type Props = {
  type: string // 方式
  cal: "+"|"-" // 符号
  money: string // 金额
}
const TopInfo = memo<Props>(function ({
  type, cal, money
                                      }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.name}>{type}</Text>
      <View style={styles.moneyWrap}>
        <Text style={styles.cal}>{cal}</Text>
        <Text style={styles.mon}>{money}</Text>
      </View>
    </View>
  )
})

export default TopInfo

const styles = StyleSheet.create({
  wrap: {
    paddingTop: pxW2dp(60), backgroundColor: white, alignItems: "center",
    paddingBottom: pxW2dp(60)
  },
  name: {
    fontSize: pxW2dp(40), lineHeight: pxW2dp(70), color: level1Word, fontWeight: "500",
    marginBottom: pxW2dp(30)
  },
  moneyWrap: {
    flexDirection: "row", alignItems: "center",
  },
  cal: {
    fontSize: pxW2dp(40), lineHeight: pxW2dp(50), color: level1Word, top: pxW2dp(2),
    marginRight: pxW2dp(4)
  },
  mon: {
    fontSize: pxW2dp(40), lineHeight:pxW2dp(70), color: level1Word
  },
})
