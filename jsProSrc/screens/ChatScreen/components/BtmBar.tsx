import React from "react"
import {Modal, PermissionsAndroid, Platform, StyleSheet, Text, TextInput, View} from "react-native"
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import Ionicon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {btmBarColor, green, level1Word, level2Word, level4Word, orange, red, white} from "js_pro_src/styles/color";
import emitter from "js_pro_src/events/emitter";
import {chatBtmBarDeltaH} from "js_pro_src/events/eventNames";
import {simpleAlert} from "js_pro_src/utils/alert";
import checkPermissionAndroid from "js_pro_src/utils/checkPermissionAndroid";
import RecordSound from "js_pro_src/screens/ChatScreen/services/RecordSound";
import Sound from "react-native-sound";
import {NavigationScreenProp} from "react-navigation";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";

const minTextInputHeight = pxW2dp(60)
const maxTextInputHeight = pxW2dp(60) * 3

/**
 * 聊天界面
 * 下方 功能栏
 * */
type StateType = {
  mode: "text" | "sound", // text:输入文字 sound:语音
  textInputHeight: number, // 输入框 高度
  recording: boolean, // 正在录音 flag
}
type Props = {
  navigation: NavigationScreenProp<{}, {}>
}
class BtmBar extends React.PureComponent<Props, StateType> {
  private soundRecordPath // 用来存放 每次 录音的 文件
  constructor(props) {
    super(props)
    this.state = {
      mode: "text",
      textInputHeight: minTextInputHeight, // 输入框 高度 随行数改变
      recording: false,
    }
  }
  private toggleMode = async () => {
    const nowMode = this.state.mode
    if (nowMode == "text") { // 要切换成 语音 调起权限
      const action = await checkPermissionAndroid({
        permission: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        rationale: { title: "录音权限", message: "应用需获取录音权限以发送语音信息", buttonPositive: "确定" }
      })
      // 用户 不授权 录音功能
      if (action != "has") return simpleAlert({ content: "应用需获取录音权限以发送语音信息" })
      this.prepareRecord()
    }
    this.setState(prevState => ({
      mode: prevState.mode == "text" ? "sound" : "text"
    }))
  };
  private prepareRecord = () => { // 准备录音资源
    this.soundRecordPath = RecordSound.createFilePath("record" + Date.now())
    RecordSound.prepareRecordPath(this.soundRecordPath)
  }
  private beginRecord = async () => { // 开始录音
    try {
      await RecordSound.startRecording()
      this.setState({ recording: true })
    } catch (e) {
      console.log(e)
    }
  }
  private doneRecord = (audioFileURL) => { // 结束录音
    console.log(audioFileURL)
    this.setState({ recording: false })
    // 为下次录音制造资源
    this.prepareRecord()
    // 播放音频 ing
    const sound = new Sound(audioFileURL, "", error => {
      if (error) return console.log(error)
    })
    console.log(sound)
    sound.play(() => sound.release())
  }
  private onPressOut = async () => { // 停止录音
    if (!this.state.recording) return // 不在录音，不处理
    this.setState({recording: false})
    try {
      const audioFileURL = await RecordSound.stopRecording()
      if (Platform.OS == "android") this.doneRecord(audioFileURL)
    } catch (e) {
      console.log(e)
    }
  };
  private changeText = text => {
    console.log(text)
  }
  private contentSizeChange = ({nativeEvent: {contentSize: {height}}}) => {
    let prevH
    if (height > maxTextInputHeight) {
      // 不改变 textInputHeight 维持即可
    } else if (height < minTextInputHeight) {
      this.setState(prevState => {
        prevH = prevState.textInputHeight
        return { textInputHeight: minTextInputHeight }
      }, () => { // 修改 flatList高度
        emitter.emit(chatBtmBarDeltaH, minTextInputHeight - prevH)
      })
    } else {
      this.setState(prevState => {
        prevH = prevState.textInputHeight
        return { textInputHeight: height }
      }, () => { // 修改flatList 高度
        emitter.emit(chatBtmBarDeltaH, height - prevH)
      })
    }
  }
  private goCreatePocket = () => { // 跳转 发红包页
    this.props.navigation.navigate({
      routeName: SCREEN_NAMES.CreatePocket
    })
  }
  componentDidMount(): void {
    RecordSound.onProgress(({currentTime}) => { // 录音中
      console.log(currentTime)
    })
    RecordSound.onFinished(({audioFileURL}) => { // 录音结束回调
      if (Platform.OS == "ios") this.doneRecord(audioFileURL)
    })
  }
  componentWillUnmount(): void {
    RecordSound.removeListeners()
  }
  render() {
    const {mode, recording} = this.state
    return (
      <React.Fragment>
        {/** 文字模式 */}
        <View style={[styles.btmBar, mode == "sound" ? {display: "none"} : {}]}>
          <TouchableWrap onPress={this.toggleMode} style={styles.soundRecItem}>
            <View style={styles.leftModeWrap}>
              <Ionicon name="ios-wifi" style={styles.soundRecIcon} />
            </View>
          </TouchableWrap>
          <TextInput
            style={[styles.textInput, {height: this.state.textInputHeight}]}
            multiline={true} onChangeText={this.changeText}
            onContentSizeChange={this.contentSizeChange} />
          <TouchableWrap onPress={this.goCreatePocket} style={styles.iconWrap}>
            <View style={styles.pocketIcon} />
          </TouchableWrap>
          <TouchableWrap onPress={() => {}} style={styles.iconWrap}>
            <View style={styles.addIcon} />
          </TouchableWrap>
        </View>
        {/** 语音模式 */}
        <View style={[styles.btmBar, mode == "text" ? {display: "none"} : {}]}>
          <TouchableWrap onPress={this.toggleMode} style={styles.soundRecItem}>
            <View style={[styles.leftModeWrap, {borderColor: "transparent"}]}>
              <FontAwesomeIcon name="keyboard-o" style={styles.keyboardIcon} />
            </View>
          </TouchableWrap>
          <View style={styles.recordSoundBtnWrap}>
            <TouchableWrap
              style={styles.recordSoundBtn}
              onLongPress={this.beginRecord} onPressOut={this.onPressOut}>
              <Text style={styles.recordSoundBtnWord}>长按 说话</Text>
            </TouchableWrap>
          </View>
          <TouchableWrap onPress={this.goCreatePocket} style={styles.iconWrap}>
            <View style={styles.pocketIcon} />
          </TouchableWrap>
          <TouchableWrap onPress={() => {}} style={styles.iconWrap}>
            <View style={styles.addIcon} />
          </TouchableWrap>
        </View>
        {/** 录音蒙层 */}
        <Modal animationType="none" visible={recording}
               transparent={true} hardwareAccelerated={true}>
          <View style={styles.mask}>
            <View style={styles.maskContent} />
          </View>
        </Modal>
      </React.Fragment>
    )
  }
}

export default BtmBar

const styles = (() => {
  const btmBarSize = pxW2dp(90)
  const soundRecWrapSize = pxW2dp(50)
  return StyleSheet.create({
    btmBar: {
      borderTopColor: level4Word, borderTopWidth: pxW2dp(1),
      minHeight: btmBarSize, backgroundColor: btmBarColor,
      flexDirection: "row", alignItems: "flex-start"
    },
    soundRecItem: {
      width: btmBarSize, height: btmBarSize, alignItems: "center", justifyContent: "center"
    },
    leftModeWrap: {
      width: soundRecWrapSize, height: soundRecWrapSize, alignItems: "center", justifyContent: "center",
      borderWidth: pxW2dp(4), borderColor: level2Word, borderRadius: soundRecWrapSize / 2,
    },
    soundRecIcon: {
      fontSize: pxW2dp(35), color: level2Word, transform: [{rotate: "90deg"}]
    },
    keyboardIcon: {
      fontSize: pxW2dp(38), color: level2Word
    },
    textInput: {
      flex: 1, backgroundColor: white, minHeight: minTextInputHeight, padding: pxW2dp(10),
      marginTop: pxW2dp(14),
      borderRadius: pxW2dp(4), fontSize: pxW2dp(26), lineHeight: pxW2dp(40),
    },
    iconWrap: {
      width: btmBarSize, height: btmBarSize,
      alignItems: "center", justifyContent: "center"
    },
    pocketIcon: {
      backgroundColor: red, width: pxW2dp(40), height: pxW2dp(40)
    },
    addIcon: {
      backgroundColor: orange, width: pxW2dp(40), height: pxW2dp(40)
    },
    recordSoundBtnWrap: {
      flex: 1, justifyContent: "center", paddingVertical: pxW2dp(14), paddingRight: pxW2dp(10),
    },
    recordSoundBtn: {
      flex: 1, backgroundColor: green, borderRadius: pxW2dp(6),
      alignItems: "center", justifyContent: "center",
    },
    recordSoundBtnWord: {
      fontSize: pxW2dp(26), lineHeight: pxW2dp(34), color: white
    },
    mask: {
      flex: 1, alignItems: "center", justifyContent: "center"
    },
    maskContent: {
      width: pxW2dp(500), height: pxW2dp(500),
      borderRadius: pxW2dp(10), backgroundColor: level1Word
    }
  })
})()
