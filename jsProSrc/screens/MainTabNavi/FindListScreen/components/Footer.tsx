import React from "react"
import {StyleSheet, View, Text} from "react-native"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {cyan, level3Word} from "js_pro_src/styles/color";

type Props = {
}

function Footer({}: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.linkWrap}>
        <Text style={styles.linkTxt}>哈勃微红包</Text>
        <Text style={styles.normalTxt}>&nbsp;|&nbsp;</Text>
        <Text style={styles.linkTxt}>性福短视频</Text>
      </Text>
      <Text style={styles.normalTxt}>
        版权所有 © 2019  哈勃微红包-haboav101.vip
      </Text>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  wrap: {
    position: "absolute", bottom: 0, left: 0, width: pxW2dp(750),
  },
  linkWrap: {
    textAlign: "center"
  },
  linkTxt: {
    fontSize: pxW2dp(24), color: cyan, lineHeight: pxW2dp(30),
  },
  normalTxt: {
    fontSize: pxW2dp(24), color: level3Word, lineHeight: pxW2dp(30),
    textAlign: "center"
  }
})
