import React from "react"
import {Image, StyleSheet, Text, View} from "react-native"
import ProButton from "js_pro_src/components/ProButton"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {borderColor, cyan, green, level1Word, orange, white} from "js_pro_src/styles/color";

/**
 * 群卡片
 * */
type Props = {
}
function GroupCard({}: Props) {
  return (
    <View style={styles.wrap}>
      <Image style={styles.leftImg} source={require("js_pro_src/assets/u235.jpg")} />
      <View style={styles.rightWrap}>
        <View style={styles.titleBtnBar}>
          <View style={styles.titleWrap}>
            <View style={styles.tagWrap}>
              <Text style={styles.tag}>安全</Text>
              <Text style={styles.tag}>高赔</Text>
              <Text style={styles.tag}>担保</Text>
            </View>
            <Text numberOfLines={1} style={styles.titleTxt}>禁抢jijiopj4789及炯炯阿斯顿阿吉萨迪欧按实际掉水浇地偶是降低欧萨</Text>
            <Text style={styles.desc}>可发包数：5，6，9</Text>
          </View>
          <ProButton style={styles.joinBtn} text="申请加入" onPress={() => {}} />
        </View>
        <View style={styles.remarkWrap}>
          <Text numberOfLines={2} style={styles.remark}>
            后台设置备注字段，。推荐理由的话死哦多哈水的哈苏诋毁哈岁的has对按时丢暗示对考试的挥洒UI客户
            后台设置备注字段，。推荐理由的话死哦多哈水的哈苏诋毁哈岁的has对按时丢暗示对考试的挥洒UI客户
            后台设置备注字段，。推荐理由的话死哦多哈水的哈苏诋毁哈岁的has对按时丢暗示对考试的挥洒UI客户
            后台设置备注字段，。推荐理由的话死哦多哈水的哈苏诋毁哈岁的has对按时丢暗示对考试的挥洒UI客户
          </Text>
        </View>
      </View>
    </View>
  )
}

export default GroupCard

const styles = (() => {
  const leftImgSize = pxW2dp(130)
  const tagSize = pxW2dp(30)
  const titleBtnBarH = pxW2dp(140)
  return StyleSheet.create({
    wrap: {
      paddingHorizontal: pxW2dp(20), flexDirection: "row",
      borderBottomWidth: pxW2dp(1), borderBottomColor: borderColor,
      marginBottom: pxW2dp(20), paddingBottom: pxW2dp(20)
    },
    leftImg: {
      width: leftImgSize, height: leftImgSize, borderRadius: pxW2dp(6),
      marginRight: pxW2dp(20)
    },
    rightWrap: {
      flex: 1
    },
    titleBtnBar: {
      flexDirection: "row", alignItems: "center", height: titleBtnBarH,
    },
    titleWrap: {
      height: titleBtnBarH, flex: 1
    },
    tagWrap: {
      flexDirection: "row", alignItems: "center", marginBottom: pxW2dp(2)
    },
    tag: {
      fontSize: pxW2dp(16), lineHeight: tagSize,
      marginRight: pxW2dp(20), paddingHorizontal: pxW2dp(10),
      borderRadius: tagSize/2, color: white, backgroundColor: cyan
    },
    titleTxt: {
      fontSize: pxW2dp(28), color: level1Word,
      lineHeight: pxW2dp(44), paddingBottom: pxW2dp(10),
    },
    desc: {
      fontSize: pxW2dp(24), color: level1Word, lineHeight: pxW2dp(30)
    },
    joinBtn: {
      width: pxW2dp(150), marginLeft: pxW2dp(10),
      height: pxW2dp(60), backgroundColor: green,
      top: pxW2dp(-10)
    },
    remarkWrap: {
      height: pxW2dp(70)
    },
    remark: {
      fontSize: pxW2dp(24), lineHeight: pxW2dp(32), color: orange
    },
  })
})()
