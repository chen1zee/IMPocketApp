import React from "react";
import ProModal from "js_pro_src/components/ProModal";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {white} from "js_pro_src/styles/color";
import {pxW2dp} from "js_pro_src/utils/sizes";

type ShowParams = {
  text?: string // 显示的文字
  onRequestClose: () => void,
  onDismiss?: () => void
}
type State = {
  visible: boolean,
  text: string
}
class LoadingMask extends React.Component<any, State>{
  /** loading 组件 单例 */
  private static singleton?: LoadingMask
  /**
   * 显示蒙层
   * @param {string} text 显示文字
   * @param {Function} onRequestClose 用户按下 返回键时的 处理函数
   * @param {Function} onDismiss 按蒙层 回调
   * 可用于 取消请求等 的 处理
   * */
  public static show({
    text="加载中...", onRequestClose, onDismiss
                     }: ShowParams) {
    if (!LoadingMask.singleton) return
    LoadingMask.singleton.onRequestClose = onRequestClose
    LoadingMask.singleton.onDismiss = onDismiss
    LoadingMask.singleton.setState({
      visible: true, text
    })
  }
  /** 隐藏蒙层 */
  public static hide() {
    if (!LoadingMask.singleton) return
    LoadingMask.singleton.setState({visible: false})
  }
  /** 返回 mask 是否 显示中 */
  public static isShowing() {
    if (!LoadingMask.singleton) return
    return LoadingMask.singleton.state.visible
  }
  // 按返回键 回调， show() 中可改变
  public onRequestClose?: () => void
  // 按蒙层 回调 show() 中可改变
  public onDismiss?: () => void
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      text: ""
    }
  }
  componentDidMount(): void {
    LoadingMask.singleton = this
  }
  componentWillUnmount(): void {
    if (LoadingMask.singleton) LoadingMask.singleton = undefined
  }
  render() {
    const {visible, text} = this.state
    return (
      <ProModal
        visible={visible} maskStyle={styles.wrap}
        onRequestClose={this.onRequestClose}
        onDismiss={this.onDismiss}
      >
        <View>
          <ActivityIndicator size="large" color={white} />
          <Text style={styles.loadingText}>{text}</Text>
        </View>
      </ProModal>
    )
  }
}

export default LoadingMask

const styles = StyleSheet.create({
  wrap: {},
  loadingText: {
    marginTop: pxW2dp(20), fontSize: pxW2dp(30), color: white
  }
})
