import React from "react";
import {Image, ImageSourcePropType, StyleSheet, Text, View} from "react-native";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {borderColor, level1Word, red} from "js_pro_src/styles/color";
import {UseDetailStore} from "js_pro_src/screens/PocketDetailsScreen/hooks/useDetailStore";

type Props = {
  person: UseDetailStore["person"],
  pocketInfo: UseDetailStore["pocketInfo"]
}
function TopInfo({
  person, pocketInfo
                 }: Props) {
  return (
    <View style={styles.wrap}>
      {/** 里层红色背景 */}
      <View style={styles.inner}>
        <View style={styles.innerRound} />
      </View>
      {/** 外层 */}
      <View style={styles.outter}>
        {Boolean(person.avatar) &&
        <Image style={styles.avatar} source={(person.avatar as ImageSourcePropType)} />}
        <Text style={styles.name}>{person.name}</Text>
        <Text style={styles.pocketInfoWrap}>
          <Text style={styles.normalTxt}>已领取</Text>
          <Text style={styles.redTxt}>{pocketInfo.hasGetNum}</Text>
          <Text style={styles.normalTxt}>/{pocketInfo.totalNum}，&nbsp;共</Text>
          <Text style={styles.redTxt}>{pocketInfo.totalMon}</Text>
          <Text style={styles.normalTxt}>元，雷点：&nbsp;</Text>
          <Text style={styles.redTxt}>{pocketInfo.minePoint}</Text>
        </Text>
      </View>
    </View>
  )
}

export default TopInfo

const styles = (() => {
  const wrapSize = pxW2dp(480)
  const bigRoundSize = pxW2dp(1300)
  const offsetTop = pxW2dp(240)
  const wW = pxW2dp(750)
  return StyleSheet.create({
    wrap: {
      position: "relative", height: wrapSize,
      borderBottomWidth: pxW2dp(1), borderBottomColor: borderColor
    },
    inner: {
      height: wrapSize, overflow: "hidden",
    },
    innerRound: {
      width: bigRoundSize, height: bigRoundSize, borderRadius: bigRoundSize/2,
      backgroundColor: red, position: "relative", top: -1*bigRoundSize+wrapSize-offsetTop,
      left: (-1*bigRoundSize+wW)/2
    },
    outter: {
      position: "absolute", top: 0, left: 0,
      width: wW, height: wrapSize, alignItems: "center"
    },
    avatar: {
      marginTop: pxW2dp(120), borderRadius: pxW2dp(6),
      width: pxW2dp(180), height: pxW2dp(180),
    },
    name: {
      fontSize: pxW2dp(40), lineHeight: pxW2dp(90),
      color: level1Word
    },
    pocketInfoWrap: {
      marginTop: pxW2dp(30),
      width: wW, paddingHorizontal: pxW2dp(30),
      fontSize: pxW2dp(26), lineHeight: pxW2dp(34),
    },
    normalTxt: {
      color: level1Word
    },
    redTxt: {
      color: red
    },
  })
})()
