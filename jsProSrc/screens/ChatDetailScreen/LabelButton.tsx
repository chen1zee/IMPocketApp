import React, {ReactElement} from "react"
import {StyleSheet, Text, TouchableHighlight, View} from "react-native"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {gray, grayRipple, level1Word, level4Word} from "js_pro_src/styles/color";
import Ionicon from "react-native-vector-icons/Ionicons"
import sleep from "js_pro_src/utils/sleep";

/**
 * 左 label 右: 按钮, 可点击
 * */
export type LabelButtonPropsType = {
  label: string,
  // 右边类型 none:无   word:文字  comp:组件,
  rightType: "none" | "word" | "comp"
  btnComp?: ReactElement
  btnTxt?: string,
  hasBorder: boolean, // 底部 broder flag
  /**
   * 等待上一事件 完成 之后 才能触发 下一事件
   * */
  onPress?: (() => void) | (<T>() => Promise<T>),
  showRightArrow?: boolean // 显示 右箭头 flag
}
type StateType = {
  disabled: boolean // 是否可点击 配合 onPressWaitPrev 使用
}
class LabelButton extends React.PureComponent<LabelButtonPropsType, StateType> {
  static defaultProps = {
    showRightArrow: true
  }
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    }
  }
  private pressPending = false // press 处理中 flag
  private onPressHandler = async () => {
    if (this.pressPending) return
    this.pressPending = true
    try {
      this.props.onPress && await this.props.onPress()
    } finally {
      await sleep(300) // 确保 pending后 不误触发
      this.pressPending = false
    }
  }
  render() {
    const {label, rightType, hasBorder, showRightArrow} = this.props
    return (
      <TouchableHighlight underlayColor={gray} onPress={this.onPressHandler}>
        <View style={[styles.groupnames, (hasBorder?{}:{borderBottomColor:"transparent"})]}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.rightWrap}>
            {rightType == "none" ?
              null
              : rightType == "word" ?
                <Text style={styles.rightTxt}>{this.props.btnTxt}</Text>
                : this.props.btnComp
            }
            {showRightArrow &&
            <Ionicon name="ios-arrow-forward" style={styles.rightArrowIcon} />
            }
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default LabelButton

const styles = StyleSheet.create({
  groupnames:{
    height:pxW2dp(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginLeft:pxW2dp(30),
    borderBottomColor:grayRipple,
    borderBottomWidth:pxW2dp(1),
    marginRight:pxW2dp(30)
  },
  label: { fontSize: pxW2dp(26), color: level1Word },
  rightWrap: { flexDirection: "row", alignItems: "center" },
  rightTxt: { fontSize:pxW2dp(26), color: level1Word },
  rightArrowIcon: {
    fontSize: pxW2dp(28), color: level4Word, marginLeft: pxW2dp(20)
  }
})
