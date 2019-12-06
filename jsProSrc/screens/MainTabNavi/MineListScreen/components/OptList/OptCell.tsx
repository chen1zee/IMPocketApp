import React from "react"
import {StyleSheet, Text, View} from "react-native"
import Ionicon from "react-native-vector-icons/Ionicons"
import {borderColor, level2Word, level4Word, orange, white} from "js_pro_src/styles/color";
import {pxW2dp} from "js_pro_src/utils/sizes";
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import usePendingHandler from "js_pro_src/hooks/usePendingHandler";

type Props = {
  iconName: string
  label: string // 文字描述
  iconColor: string // 左icon 颜色
  onPress: () => (void|Promise<void>) // 点击
}
const OptCell: React.FC<Props> = ({
  iconName, label, iconColor=orange,
  onPress
}) => {
  const onPressHandler = usePendingHandler(onPress)
  return (
    <TouchableWrap style={styles.wrap} onPress={onPressHandler}>
      <View style={styles.iconWrap}>
        <Ionicon
          name={iconName} style={[styles.icon, {color: iconColor}]}
        />
      </View>
      <View style={styles.leftSide}>
        <Text style={styles.label}>{label}</Text>
        <Ionicon name="ios-arrow-forward" style={styles.goIcon} />
      </View>
    </TouchableWrap>
  )
}

export default OptCell

const styles = (() => {
  const wrapSize = pxW2dp(100)
  return StyleSheet.create({
    wrap: {
      flexDirection: "row", alignItems: "center", backgroundColor: white,
    },
    iconWrap: {
      width: wrapSize, height: wrapSize,
      alignItems: "center", justifyContent: "center"
    },
    icon: {
      fontSize: pxW2dp(50)
    },
    leftSide: {
      flex: 1, borderBottomWidth: pxW2dp(1), borderBottomColor: borderColor,
      flexDirection: "row", justifyContent: "space-between", alignItems: "center",
      height: wrapSize, paddingRight: pxW2dp(40)
    },
    label: {
      fontSize: pxW2dp(30), color: level2Word,
    },
    goIcon: {
      fontSize: pxW2dp(40), color: level4Word
    }
  })
})()
