import React from "react"
import {StyleSheet, Text, TouchableHighlight, View} from "react-native"
import Ionicon from "react-native-vector-icons/Ionicons"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {borderColor, lessGray, level1Word, level2Word} from "js_pro_src/styles/color";

type Props = {
}
function HelpCenter({}: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.titleWrap}>
        <Text style={styles.titleTxt}>帮助中心</Text>
        <TouchableHighlight
          underlayColor={lessGray} onPress={() => {}}
        >
          <View style={styles.cliSrvWrap}>
            <Ionicon name="md-person" style={styles.cliSrvIcon} />
            <Text style={styles.titlteDesc}>在线客服</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.qaWrap}>
        <Text style={styles.qaTxt}>什么是红包扫雷？</Text>
        <Text style={styles.qaTxt}>什么是红包扫雷？</Text>
        <Text style={styles.qaTxt}>什么是红包扫雷？</Text>
        <Text style={styles.qaTxt}>什么是红包扫雷？</Text>
      </View>
    </View>
  )
}

export default HelpCenter

const styles = (() => {
  const titleWrapH = pxW2dp(90)
  return StyleSheet.create({
    wrap: {
      paddingHorizontal: pxW2dp(20)
    },
    titleWrap: {
      height: titleWrapH, flexDirection: "row", justifyContent: "space-between",
      alignItems: "center", borderBottomWidth: pxW2dp(1), borderBottomColor: borderColor
    },
    titleTxt: {
      fontSize: pxW2dp(30), lineHeight: pxW2dp(45), color: level1Word
    },
    cliSrvWrap: {
      flexDirection: "row", alignItems: "center", height: titleWrapH,
      paddingHorizontal: pxW2dp(20)
    },
    cliSrvIcon: {
      fontSize: pxW2dp(40), color: level2Word, marginRight: pxW2dp(10),
    },
    titlteDesc: {
      fontSize: pxW2dp(30), lineHeight: pxW2dp(45), color: level2Word,
    },
    qaWrap: {
      paddingVertical: pxW2dp(30), paddingHorizontal: pxW2dp(20)
    },
    qaTxt: {
      fontSize: pxW2dp(24), lineHeight: pxW2dp(48), color: level1Word,
    },
  })
})()
