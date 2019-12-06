import React from "react"
import {KeyboardAvoidingView, StatusBar, StyleSheet} from "react-native"
import {SCREEN_2_TITLE} from "js_pro_src/navigators/screenNames";
import {NavigationStackOptions} from "react-navigation-stack";
import {borderColor} from "js_pro_src/styles/color";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import ChatHeaderRght from "js_pro_src/screens/ChatScreen/ChatHeaderRght";
import PocketDialog from "js_pro_src/screens/ChatScreen/components/PocketDialog";
import ChatMsgList from "js_pro_src/screens/ChatScreen/components/ChatMsgList/ChatMsgList";
import BtmBar from "./components/BtmBar";
import produce from "immer";
import {NavigationScreenProp} from "react-navigation";

export type ChatNavigateParams = { // 路由传来的参数
  chatTitle: string // 聊天 标题
}

// 消息类型 text:文本, sound:语音 pocket:红包
export type MsgTypeType = "text" | "sound" | "pocket"
// 发送 || 接收 默认 接收
export type ModeType = "send" | "recieve"

export type ChatItemType = {
  showTimeBar?: boolean, // 显示时间条
  mode?: ModeType, // 发送 接收
  msgType?: MsgTypeType, // 消息类型
  /** 文本消息 */
  text?: string, // 文本消息
  /** 语音 */
  soundSec?: number, // 语音长度
  soundPlaying?: boolean, // 语音播放状态
}
export type ChatItemWithId = ChatItemType & { id: number }

// TODO mock
const mockChatList: ChatItemWithId[] = [
  {
    id: 1, mode: "recieve", msgType: "text", showTimeBar: true,
    text: "按实际按实际按实际按实际按实际按实际按实123sdsdasdasdsadasdsdsadsadasd际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际"
  },
  {
    id: 2, mode: "send", msgType: "text", text: "按实际按实际按实际按实际按实际按实际按实123sdsdasdasdsadasdsdsadsadasd际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际"
  },
  { id: 3, mode: "recieve", msgType: "sound", soundSec: 12 },
  { id: 4, mode: "send", msgType: "sound", soundSec: 123 },
  { id: 5, mode: "recieve", msgType: "pocket" },
  { id: 6, mode: "send", msgType: "pocket" },
  { id: 7, mode: "recieve", msgType: "pocket" },
  { id: 8, mode: "send", msgType: "pocket" },
  { id: 9, mode: "recieve", msgType: "pocket" },
  { id: 15, mode: "send", msgType: "text", text: "按实际按实际按实际按实际按实际按实际按实123sdsdasdasdsadasdsdsadsadasd际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际按实际" },
  { id: 10, mode: "send", msgType: "pocket" },
  { id: 11, mode: "recieve", msgType: "pocket" },
  { id: 12, mode: "send", msgType: "pocket" },
  { id: 13, mode: "recieve", msgType: "pocket" },
  { id: 14, mode: "send", msgType: "pocket" }
]

type StateType = {
  list: ChatItemWithId[], // 聊天列表
  showPocketDialog: boolean, // 显示 红包页面 flag
}
export type ScreenProps = {
  navigation: NavigationScreenProp<{routeName: string}, ChatNavigateParams>
}
class Comp extends React.PureComponent<ScreenProps, StateType> {
  static navigationOptions = ({navigation}: {navigation: ScreenProps["navigation"]}): NavigationStackOptions => {
    const {routeName} = navigation.state
    const headerTitle = navigation.getParam("chatTitle", SCREEN_2_TITLE[routeName])
    return ({
      headerStyle: { backgroundColor: borderColor },
      headerTitle,
      headerRight: () => <ChatHeaderRght />
    })
  }
  constructor(props) {
    super(props)
    this.state = {
      list: mockChatList,
      showPocketDialog: false,
    }
  }
  private chatItemPressFunc = (item: ChatItemWithId, index: number) => {
    if (item.msgType ==  "pocket") { // 红包
      this.openPocketDialog()
    } else if (item.msgType == "sound") { // 语音信息
      this.setState(prevState => ({
        list: produce(prevState.list, draft => {
          const prevPlaying = draft[index].soundPlaying
          if (prevPlaying) { // 之前为 播放中， 则停止即可
            draft[index].soundPlaying = false
            return
          }
          // 播放新 语音， && 停止之前的语音
          for (let i = draft.length; i--;) {
            if (draft[i].msgType == "sound" && draft[i].soundPlaying) {
              draft[i].soundPlaying = false
              break
            }
          }
          draft[index].soundPlaying = true
        })
      }))
    }

  }
  private hidePocketDialog = () => {
    this.setState({showPocketDialog: false})
  }
  private openPocketDialog = () => {
    this.setState({showPocketDialog: true})
  }
  render() {
    const {navigation} = this.props
    return (
      <KeyboardAvoidingView style={styles.wrap}>
        {/** 聊天 */}
        <ChatMsgList list={this.state.list} onPress={this.chatItemPressFunc} />
        {/** 下方功能栏 */}
        <BtmBar navigation={navigation} />
        {/** 红包蒙层 */}
        <PocketDialog
          navigation={navigation}
          visible={this.state.showPocketDialog}
          hideFunc={this.hidePocketDialog} />
      </KeyboardAvoidingView>
    )
  }
}

const ChatScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => {
    StatusBar.setBackgroundColor(borderColor)
  },
})

export default ChatScreen

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: borderColor }
})
