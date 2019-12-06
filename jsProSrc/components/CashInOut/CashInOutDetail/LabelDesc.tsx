import React, {memo} from "react"
import {StyleSheet, Text, View} from "react-native"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {level1Word, level2Word} from "js_pro_src/styles/color";

/**
 * 详情项
 * */
type Props = {
  label: string
  desc: string
}
const LabelDesc = memo<Props>(function ({
  label, desc
                                       }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.labelWrap}>
        <Text style={styles.labelTxt}>{label}</Text>
      </View>
      <View style={styles.descWrap}>
        <Text style={styles.descTxt}>{desc}</Text>
      </View>
    </View>
  )
})

export default LabelDesc

const styles = (() => {
  const size = pxW2dp(80)
  const labelSize = pxW2dp(200)
  return StyleSheet.create({
    wrap: {
      height: size, flexDirection: "row", alignItems: "center",
    },
    labelWrap: {
      width: labelSize, height: size, justifyContent: "center",
      paddingLeft: pxW2dp(30)
    },
    labelTxt: {
      fontSize: pxW2dp(28), color: level2Word, lineHeight: pxW2dp(34)
    },
    descWrap: {
      flex: 1, height: size, justifyContent: "center",
    },
    descTxt: {
      fontSize: pxW2dp(28), color: level1Word, lineHeight: pxW2dp(34),
    },
  })
})()
