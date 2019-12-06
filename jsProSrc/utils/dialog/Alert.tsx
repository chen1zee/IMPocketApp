/**
 * 暂不使用，，， 使用 原生 Alert 封装 -> utils.Alert
 * 警告弹窗
 * */
import React from "react";
import Dialog, {DialogButton, DialogContent, DialogFooter} from "react-native-popup-dialog"
import {pxW2dp} from "../sizes";
import {StyleSheet, Text, View} from "react-native";

type PropsType = {
  onRef?: (ref: any) => void
}
type StateType = {
  visible: boolean,
  content: string
}
class Alert extends React.PureComponent<PropsType, StateType> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      content: ""
    }
  }
  public close = () => {
    this.setState({ visible: false })
  }
  public open = content => {
    this.setState({ content, visible: true })
  }
  private FooterComp = (
    <DialogFooter>
      <DialogButton text="确定" onPress={this.close} />
    </DialogFooter>
  )
  componentDidMount(): void {
    this.props.onRef && this.props.onRef(this)
  }

  render() {
    return (
      <Dialog
        visible={this.state.visible}
        onTouchOutside={() => this.setState({visible: false})}
        footer={this.FooterComp}>
        <DialogContent>
          <View style={styles.content}>
            <Text>{this.state.content}</Text>
          </View>
        </DialogContent>
      </Dialog>
    )
  }
}

export default Alert

const styles = StyleSheet.create({
  content: {
    width: pxW2dp(500), paddingTop: pxW2dp(40), paddingHorizontal: pxW2dp(20), fontSize: pxW2dp(20),
  }
})
