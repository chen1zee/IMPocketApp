import React from "react"
import {StyleSheet, View, Image, Text} from "react-native"
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {borderColor, level1Word, level2Word, white} from "js_pro_src/styles/color";
import Ionicon from "react-native-vector-icons/Ionicons"

/**
 * 个人信息显示
 * */
type Props = {}
function MineInfo({}: Props) {
  return (
    <TouchableWrap
      style={styles.wrap}
      onPress={() => {}}
    >
      <Image style={styles.avatar} source={require("js_pro_src/assets/u239.jpg")} />
      <View style={styles.infoWrap}>
        <Text numberOfLines={1} style={styles.name}>个人名字asdjio</Text>
      </View>
      <View style={styles.rightWrap}>
        <Ionicon name="ios-arrow-forward" style={styles.goIcon} />
      </View>
    </TouchableWrap>
  )
}

export default MineInfo

const styles = (() => {
  const avatarSize = pxW2dp(100)
  const size = pxW2dp(90)
  return StyleSheet.create({
    wrap: {
      flexDirection: "row", alignItems: "center", marginBottom: pxW2dp(20),
      paddingHorizontal: pxW2dp(20), paddingTop: pxW2dp(34), paddingBottom: pxW2dp(26),
      borderBottomWidth: pxW2dp(1), borderBottomColor: borderColor, backgroundColor: white,
    },
    avatar: {
      width: avatarSize, height: avatarSize, marginRight: pxW2dp(20),
      borderRadius: pxW2dp(6)
    },
    infoWrap: { flex: 1, height: size, },
    name: {
      fontSize: pxW2dp(30), color: level1Word, lineHeight: pxW2dp(40),
      paddingTop: pxW2dp(10)
    },
    rightWrap: {
      width: pxW2dp(70), height: size,
      justifyContent: "center", alignItems: "center"
    },
    goIcon: {
      fontSize: pxW2dp(45), color: level2Word
    }
  })
})()
