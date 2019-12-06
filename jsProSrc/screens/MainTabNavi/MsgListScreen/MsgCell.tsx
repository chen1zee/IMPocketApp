import React from "react"
import {GestureResponderEvent, Image, StyleSheet, Text, TouchableNativeFeedback, View} from "react-native"
import {
  borderColor,
  grayRipple,
  green,
  level1Word,
  level2Word,
  level3Word,
  orange,
  white
} from "js_pro_src/styles/color";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {ListItemType} from "./MsgListScreen";
import ProBadge from "js_pro_src/components/ProBadge";
import TouchableWrap from "js_pro_src/components/TouchableWrap";

const LABELS_COLORS = { // 标签 颜色
  safe: green, guarantee: orange
}

type Props = {
  item: ListItemType,
  goChat: (item: ListItemType) => void,
  onLongPress: (event: GestureResponderEvent) => void
}
function MsgCell(props: Props) {
  const {item, goChat, onLongPress} = props
  const extraItemWrap = item.top ? {backgroundColor: borderColor} : null
  const extrakContentWrapStyle = (item.labels && item.labels.length) ? {top: pxW2dp(-10)} : null
  const extraMsgTxtStyle = (!item.labels || !item.labels.length) ? {marginTop: pxW2dp(20)} : null
  const extraTimeTxtStyle = (item.labels && item.labels.length) ? {top: pxW2dp(-10)} : null
  return (
    <TouchableWrap
      style={[styles.itemWrap, extraItemWrap]} background={TouchableNativeFeedback.Ripple(grayRipple, false)}
      onPress={() => goChat(item)} onLongPress={onLongPress}
    >
      <Image style={styles.chatAvatar} source={item.img} />
      <View style={[styles.contentWrap, extrakContentWrapStyle]}>
        {/** 标签列表 */}
        {item.labels &&
        <View style={styles.badgeWrap}>
          {item.labels.map((label, labelIdx) => (
            <ProBadge
              text={label.text} key={labelIdx}
              style={{backgroundColor: LABELS_COLORS[label.type], marginRight: pxW2dp(15)}}
            />
          ))}
        </View>}
        {/** 标题 && 消息 && 更新时间 */}
        <View style={styles.topContent}>
          <Text numberOfLines={1} style={styles.titleTxt}>{item.chatId}{item.title}</Text>
          <Text style={[styles.timeTxt, extraTimeTxtStyle]}>{item.updateTime}</Text>
        </View>
        <Text numberOfLines={1} style={[styles.msgTxt, extraMsgTxtStyle]}>{item.msg}</Text>
      </View>
    </TouchableWrap>
  )
}

export default MsgCell
const styles = (() => {
  const itemSize = pxW2dp(110)
  return StyleSheet.create({
    itemWrap: {
      height: itemSize + pxW2dp(22 * 2), paddingHorizontal: pxW2dp(20), paddingBottom: pxW2dp(22), paddingTop: pxW2dp(30),
      backgroundColor: white, flexDirection: "row", alignItems: "center"
    },
    chatAvatar: { width: itemSize, height: itemSize, marginRight: pxW2dp(20) },
    contentWrap: { flex: 1, height: itemSize, justifyContent: "center" },
    topContent: {flexDirection: "row", alignItems: "flex-start"},
    titleTxt: {
      flex: 1, fontSize: pxW2dp(30), lineHeight: pxW2dp(42), color: level1Word
    },
    timeTxt: {
      width: pxW2dp(200), marginTop: pxW2dp(6),
      fontSize: pxW2dp(24), color: level3Word
    },
    msgTxt: { fontSize: pxW2dp(24), marginTop: pxW2dp(6), color: level2Word },
    // timeWrap: { width: pxW2dp(200), height: itemHeight, paddingTop: pxW2dp(20), paddingLeft: pxW2dp(20), backgroundColor: "white" },
    badgeWrap: { left: pxW2dp(4), flexDirection: "row" }
  })
})()
