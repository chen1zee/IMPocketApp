import React from "react"
import {Image, StyleSheet, Text, View, ViewStyle} from "react-native"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {lessGreen, level1Word, level2Word, orange, red, white} from "js_pro_src/styles/color";
import Ionicon from "react-native-vector-icons/Ionicons"
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import second2Txt from "js_pro_src/utils/second2Txt";
import {ChatItemType} from "../../ChatScreen";

type ChatItemAndOnPressType = ChatItemType & {
  onPress?: () => void, // 点击事件
}

class ChatMsgItem extends React.PureComponent<ChatItemAndOnPressType> {
  static defaultProps = {
    mode: "recieve", // 默认 接收模式
    msgType: "text", // 默认 文本模式
  }
  render() {
    let {mode, showTimeBar, msgType, onPress} = this.props
    const extraAvatarStyle = mode == "recieve" ? {left: pxW2dp(20)} : {right: pxW2dp(20)}
    return (
      <View style={styles.wrap}>
        {/** 时间显示条  待实现 */}
        {showTimeBar ?
        <Text style={styles.timeBar}>6月1日 晚上19:16</Text> : null}
        {/** 领取红包条  待实现 */}
        {/** 会话内容 */}
        <View style={[
          {justifyContent: (mode == "recieve" ? "flex-start" : "flex-end")}, styles.chatWrap
        ]}>
          {/** 头像 */}
          <Image
            style={[styles.avatar, extraAvatarStyle]}
            source={require("js_pro_src/assets/u239.jpg")}
          />
          {msgType == "text" ? // 文本类型
          <MsgItem mode={mode} /> :
          msgType == "sound" ? // 语音类型
          <SoundItem mode={mode} onPress={onPress}
                     soundSec={this.props.soundSec}
                     soundPlaying={this.props.soundPlaying} /> :
          msgType == "pocket" ? // 红包类型
          <PocketItem  mode={mode} onPress={onPress} /> : null}
        </View>
      </View>
    )
  }
}

/** 信息类型 */
function MsgItem(props: ChatItemAndOnPressType) {
  let {mode} = props
  mode = mode || "recieve"
  const extraTexWrapStyle = mode == "send" ? {backgroundColor: lessGreen} : null
  return (
    <View style={[styles.textWrap, extraTexWrapStyle]}>
      <Text style={styles.text}>按实际按实际按实际按实际按实际按实际按实123sdsdasdasdsadasdsdsadsadasd际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际</Text>
    </View>
  )
}
/** 语音类型 */
function SoundItem(props: ChatItemAndOnPressType) {
  let {mode, onPress, soundSec, soundPlaying} = props
  soundSec = soundSec || 0
  const percent = soundSec <= 3 ? 0 : soundSec >= 40 ? 1 : ((soundSec - 3) / (40 - 3))
  /** 最小宽，100 ,  额外 240 随语音长短改变 */
  const soundWidth = pxW2dp(100) + percent * pxW2dp(240)
  const soundSecTxt = second2Txt(soundSec)
  const extraSoundWrapStyle: ViewStyle = mode == "send" ? {backgroundColor: lessGreen, justifyContent: "flex-end"} : {}
  const soundIconStyle: ViewStyle = mode == "recieve" ? {transform: [{rotate: "90deg"}]} : {transform: [{rotate: "-90deg"}]}
  const extraSoundInfoStyle: ViewStyle = mode == "send" ? {right: soundWidth + pxW2dp(10), alignItems: "flex-end"} : {left: soundWidth + pxW2dp(10)}
  const soundDotColor = mode == "send" ? "transparent" : red
  return (
    <View style={styles.soundItem}>
      <TouchableWrap
        onPress={onPress}
        style={[styles.soundWrap, {width: soundWidth}, extraSoundWrapStyle]}
      >
        {soundPlaying? <Text style={{fontSize: pxW2dp(24)}}>播放中</Text> :
        <Ionicon name="ios-wifi" style={[styles.soundIcon,soundIconStyle]} />}
      </TouchableWrap>
      <View style={[styles.soundInfo, extraSoundInfoStyle]}>
        <View style={[styles.soundUnreadDot, {backgroundColor: soundDotColor}]} />
        <Text style={styles.soundSecTxt}>{soundSecTxt}</Text>
      </View>
    </View>
  )
}
/** 红包类型 */
function PocketItem(props: ChatItemAndOnPressType) {
  let {mode, onPress} = props
  const extraPocketItem:ViewStyle = mode == "send" ? {alignItems: "flex-end"} : {}
  return (
    <View style={[styles.pocketItem, extraPocketItem]}>
      <Text style={styles.pocketItemUsrName}>是的恐怕</Text>
      <TouchableWrap style={styles.pocketWrap} onPress={onPress}>
        <View style={styles.pocketContent}>
          <Image style={styles.pocketImg} source={require("js_pro_src/assets/pocket.jpg")} />
          <View style={styles.pocketCntRight}>
            <Text style={styles.pocketMoney}>￥123元 / 9包</Text>
            <Text style={styles.pocketDescript}>连环雷: 123456789</Text>
          </View>
        </View>
        <View style={styles.pocketTxtWrap}>
          <Text style={styles.pocketTxtName}>91微红包</Text>
          <Text style={styles.pocketTxtSite}>91whb.com</Text>
        </View>
      </TouchableWrap>
    </View>
  )
}

export default ChatMsgItem

const styles = (() => {
  const avatarSize = pxW2dp(100)
  const soundUnreadDotSize = pxW2dp(14)
  return StyleSheet.create({
    wrap: { marginBottom: pxW2dp(30) },
    timeBar: {
      textAlign: "center", fontSize: pxW2dp(20), color: level2Word,
      marginBottom: pxW2dp(40),
    },
    chatWrap: {
      position: "relative", paddingHorizontal: pxW2dp(135),
      minHeight: pxW2dp(100), flexDirection: "row"
    },
    avatar: {
      position: "absolute", width: avatarSize, height: avatarSize, top: 0,
      borderRadius: pxW2dp(8)
    },
    /** 文本消息 */
    textWrap: {
      width: pxW2dp(450), backgroundColor: white,
      padding: pxW2dp(14), borderRadius: pxW2dp(6),
    },
    text: {
      fontSize: pxW2dp(24), color: level1Word, lineHeight: pxW2dp(36)
    },
    /** 语音消息 */
    soundItem: { position: "relative" },
    soundWrap: {
      flexDirection: "row", alignItems: "center",
      height: pxW2dp(70), borderRadius: pxW2dp(6),
      padding: pxW2dp(22), backgroundColor: white
    },
    soundIcon: { color: level1Word, fontSize: pxW2dp(42), },
    soundInfo: {
      position: "absolute", top: 0, height: pxW2dp(70),
      justifyContent: "space-between" },
    soundUnreadDot: {
      width: soundUnreadDotSize, height: soundUnreadDotSize,
      borderRadius: soundUnreadDotSize / 2
    },
    soundSecTxt: {
      fontSize: pxW2dp(24), lineHeight: pxW2dp(24), color: level2Word,
    },
    /** 红包 */
    pocketItem: {},
    pocketItemUsrName: { fontSize: pxW2dp(24), color: level2Word, lineHeight: pxW2dp(32), marginBottom: pxW2dp(10) },
    pocketWrap: {
      backgroundColor: orange, borderRadius: pxW2dp(10),
      width: pxW2dp(450), overflow: "hidden"
    },
    pocketContent: {
      height: pxW2dp(180), flexDirection: "row", alignItems: "center",
      paddingLeft: pxW2dp(30),
    },
    pocketImg: {width: pxW2dp(120), height: pxW2dp(140)},
    pocketCntRight: { flex: 1, paddingLeft: pxW2dp(20) },
    pocketMoney: {color: white, fontSize: pxW2dp(30), lineHeight: pxW2dp(45)},
    pocketDescript: {color: white, fontSize: pxW2dp(26), lineHeight: pxW2dp(40)},
    pocketTxtWrap: {
      backgroundColor: white, flexDirection: "row",
      height: pxW2dp(50), alignItems: "center", paddingLeft: pxW2dp(20)
    },
    pocketTxtName: {fontSize: pxW2dp(24), color: level2Word, marginRight: pxW2dp(20)},
    pocketTxtSite: {fontSize: pxW2dp(20), color: orange},
  })
})()
