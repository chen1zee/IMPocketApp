import React from "react"
import {Image, ImageSourcePropType, StyleSheet, Text, View} from "react-native"
import ProModal from "js_pro_src/components/ProModal"
import {borderColor, greatBlack, white} from "js_pro_src/styles/color";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {Header, HeaderBackButton, HeaderTitle} from "react-navigation-stack";

type PropsType = {
  onRef: (r: QrcodeModal) => void,
  groupName: string // 群名
  avatar: ImageSourcePropType // 群avatar
}
type StateType = {
  visible: boolean
}
class QrcodeModal extends React.PureComponent<PropsType, StateType> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }
  public open = () => {
    this.setState({visible: true})
  }
  private close = () => {
    this.setState({visible: false})
  };
  componentDidMount(): void {
    this.props.onRef(this)
  }
  render() {
    const {visible} = this.state
    const {groupName, avatar} = this.props
    return (
      <ProModal
        visible={visible} animationType="slide"
        onRequestClose={this.close} onDismiss={this.close}
      >
        <View style={styles.container}>
          {/* 标题 */}
          <View style={styles.header}>
            <View style={styles.leftSide}>
              <HeaderBackButton onPress={this.close} />
              <HeaderTitle>群二维码</HeaderTitle>
            </View>
          </View>
           {/* 二维码 */}
          <View style={styles.qrcodeWrap}>
            <View style={styles.qrContainer}>
              <View style={styles.groupInfo}>
                <Image style={styles.avatar} source={avatar} />
                <Text>{groupName}</Text>
              </View>
              <View style={styles.mockQrcode} />
            </View>
          </View>
        </View>
      </ProModal>
    )
  }
}

export default QrcodeModal

const styles = StyleSheet.create({
  container: { width: pxW2dp(750), flex: 1, backgroundColor: white },
  header: {
    height: Header.HEIGHT, flexDirection: "row", backgroundColor: borderColor,
    alignItems: "center", justifyContent: "space-between"
  },
  leftSide: { flexDirection: "row", alignItems: "center" },
  qrcodeWrap: {flex: 1, alignItems: "center", justifyContent: "center", top: pxW2dp(-100)},
  qrContainer: {
    width:pxW2dp(650),height:pxW2dp(800),borderWidth:pxW2dp(1),
    borderColor:'black',borderRadius:pxW2dp(8),
    justifyContent:'center',alignItems:'center', position: "relative"
  },
  groupInfo: {
    flexDirection:'row',alignItems:'center',
    height:pxW2dp(130),marginLeft:pxW2dp(30),marginRight:pxW2dp(30),
    position:'absolute',top:0,left:0
  },
  avatar: {
    width:pxW2dp(80),height:pxW2dp(80),
    borderRadius:pxW2dp(8),marginRight:pxW2dp(30)
  },
  mockQrcode: {
    width:pxW2dp(500), height:pxW2dp(500),
    borderRadius:pxW2dp(8), borderColor: greatBlack,
    borderWidth:pxW2dp(2), margin:pxW2dp(20),
  }
})
