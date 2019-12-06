import React from "react"
import {StyleSheet, Text, TextInput, View} from "react-native"
import ProButton from "js_pro_src/components/ProButton";
import ProModal from "js_pro_src/components/ProModal";
import {percW2dp, pxW2dp} from "js_pro_src/utils/sizes";
import {borderColor, cyan, level1Word, level2Word, white} from "js_pro_src/styles/color";

type ActionType = "btn" | "back" | "dismiss"
type PropsType = {
  title: string,
  placeholder?: string,
  dismissable?: boolean, // 可以 点击蒙层取消 flag
  /**
   * 取消  "btn":按钮 "back":系统回退按钮 "dismiss":点击蒙层取消
   * */
  onCancel?: <T>(action?: ActionType) => void | Promise<T>,
  /**
   * 确定按钮
   * return
   *    结果 true: submit成功,关闭promt
   *        false: submit失败,不做处理
   * */
  onSubmit: <T>(val: StateType["val"]) => boolean | Promise<T>,
  onRef: (r: ProPromt) => void
}
type StateType = {
  val: string,
  visible: boolean,
}
/**
 * methods:
 *    open()
 * */
class ProPromt extends React.PureComponent<PropsType, StateType> {
  static defaultProps = {
    dismissable: true
  }
  constructor(props) {
    super(props);
    this.state = {
      val: "",
      visible: false
    }
  }
  public open = (initVal: string) => { // 打开 蒙层
    this.setState({ visible: true, val: initVal })
  }
  private cancel = async (action: ActionType) => { // 取消
    const {onCancel} = this.props
    if (onCancel) await onCancel(action)
    this.setState({visible: false})
  }
  private submit = async () => { // 确定
    const {onSubmit} = this.props
    const res = await onSubmit(this.state.val)
    res && this.setState({visible: false})
  }
  private onChangeText = (val) => {
    this.setState({ val })
  }
  componentDidMount(): void {
    this.props.onRef(this)
  }
  render() {
    const {placeholder, title, dismissable} = this.props
    const {visible} = this.state
    return (
      <ProModal
        visible={visible} onRequestClose={() => this.cancel("back")}
        onDismiss={() => dismissable && this.cancel("dismiss")}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            style={styles.textInputPromt} placeholder={placeholder || ""} autoFocus={true}
            value={this.state.val} onChangeText={this.onChangeText}
          />
          <View style={styles.footerWrap}>
            <ProButton
              text="取消" textStyle={styles.cancelBtnTxt}
              style={styles.cancelBtnWrap} onPress={() => this.cancel("btn")}
            />
            <ProButton
              text="确定" textStyle={styles.submitBtnTxt}
              style={styles.btnWrap} onPress={this.submit}
            />
          </View>
        </View>
      </ProModal>
    )
  }
}

export default ProPromt

const styles = StyleSheet.create({
  container: {
    width: percW2dp(90), borderRadius: pxW2dp(10), paddingTop: pxW2dp(10),
    backgroundColor: white, overflow: "hidden", alignItems: "center"
  },
  title: {
    fontSize: pxW2dp(30), lineHeight: pxW2dp(90), textAlign: "center",
    alignSelf: "stretch", borderBottomWidth: 1, borderColor: borderColor,
    marginBottom: pxW2dp(20),
  },
  textInputPromt: {
    fontSize: pxW2dp(28), textAlign: "center", paddingHorizontal: pxW2dp(30),
    marginBottom: pxW2dp(20)
  },
  footerWrap: {
    flexDirection: "row", alignItems: "center",
    borderTopWidth: 1, borderTopColor: borderColor,
  },
  cancelBtnWrap: {
    flex: 1, backgroundColor: white, borderRadius: 0, borderRightWidth: 1,
    borderRightColor: borderColor, color: level2Word, alignItems: "center", height: pxW2dp(90)
  },
  btnWrap: {
    flex: 1, backgroundColor: white, borderRadius: 0,
    color: level2Word, alignItems: "center", height: pxW2dp(90)
  },
  cancelBtnTxt: {
    fontSize: pxW2dp(30), textAlign: "center", color: level1Word
  },
  submitBtnTxt: {
    fontSize: pxW2dp(30), textAlign: "center", color: cyan
  }
})
