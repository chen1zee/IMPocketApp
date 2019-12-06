import React from "react"
import {Modal, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native"
import {gold, mask, red} from "js_pro_src/styles/color";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import {ScreenProps} from "js_pro_src/screens/ChatScreen/ChatScreen";

type Props = {
  visible: boolean,
  hideFunc: () => void, // 关闭回调
  navigation: ScreenProps["navigation"]
}
class PocketDialog extends React.Component<Props> {
  private onRequestClose = () => {
    this.props.hideFunc()
  }
  private goPocketDetail = () => {
    this.props.hideFunc()
    this.props.navigation.navigate({
      routeName: SCREEN_NAMES.PocketDetails
    })
  }
  render() {
    const {hideFunc, visible} = this.props
    return (
      <Modal
        animationType="none" visible={visible} transparent={true}
        onRequestClose={this.onRequestClose} hardwareAccelerated={true}
      >
        <TouchableWithoutFeedback onPress={hideFunc}>
          <View style={styles.mask}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.wrap}>
                <Text style={styles.money}>￥ 300元</Text>
                <Text style={styles.name}>6包 / 雷 123456789</Text>
                <View style={styles.openIcon} />
                <View style={styles.openDeail}>
                  <Text onPress={this.goPocketDetail} style={styles.openDeailTxt}>查看领取详情</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

export default PocketDialog

const styles = (() => {
  const openIconSize = pxW2dp(170)
  return StyleSheet.create({
    mask: {flex: 1, backgroundColor: mask, alignItems: "center", justifyContent: "center"},
    wrap: {
      top: pxW2dp(-100), width: pxW2dp(500),
      borderRadius: pxW2dp(10), paddingTop: pxW2dp(70),
      paddingBottom: pxW2dp(30),
      backgroundColor: red, overflow: "hidden", alignItems: "center"
    },
    money: {
      fontSize: pxW2dp(50), lineHeight: pxW2dp(70),
      color: gold, fontWeight: "700", marginBottom: pxW2dp(20)
    },
    name: {
      fontSize: pxW2dp(30), lineHeight: pxW2dp(60), color: gold,
      marginBottom: pxW2dp(40)
    },
    openIcon: {
      backgroundColor: gold, width: openIconSize, height: openIconSize,
      borderRadius: openIconSize / 2, marginBottom: pxW2dp(100)
    },
    openDeail: {
      borderBottomWidth: pxW2dp(2), borderColor: gold, paddingBottom: pxW2dp(4)
    },
    openDeailTxt: {
      color: gold, fontSize: pxW2dp(24), lineHeight: pxW2dp(30)
    }
  })
})()
