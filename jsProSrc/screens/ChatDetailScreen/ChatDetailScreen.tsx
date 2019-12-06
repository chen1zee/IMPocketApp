import React from "react"
import {
  Alert,
  ImageSourcePropType,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native"
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor, gray, level1Word, red, white} from "js_pro_src/styles/color";
import {HeaderTitle, NavigationStackOptions} from "react-navigation-stack";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {NavigationScreenProp, StackActions} from "react-navigation";
import PeoplesList from "./PeoplesList";
import LabelButton from "./LabelButton";
import ProPromt from "js_pro_src/components/ProPromt";
import {simpleAlert} from "js_pro_src/utils/alert";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import QrcodeModal from "js_pro_src/screens/ChatDetailScreen/QrcodeModal";
import ProSwitch from "js_pro_src/components/ProSwitch";
import sleep from "js_pro_src/utils/sleep";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";

const MAX_SHOW_PEOPLE_NUM = 19 // 上层 最多 显示 19个用户

// TODO mock
const peopleCreator = (() => {
  let id = 1
  return (): PeopleType => ({id: ++id,name:'小明mingming',img:require('../../assets/u239.jpg')})
})()
const mockPeoples: PeopleType[] = []
const mockPeopleNum = 10
for (let i = (mockPeopleNum > MAX_SHOW_PEOPLE_NUM ? MAX_SHOW_PEOPLE_NUM : mockPeopleNum); i--;) { mockPeoples.push(peopleCreator()) }

const NAVI_PAR = {
  peopleNum: "peopleNum" // 群人数
}
type NavigationParamsType = {
  peopleNum: number,
}
type PropsType = {
  navigation: NavigationScreenProp<{}, NavigationParamsType>
}
type StateType = {
  peoples: PeopleType[], // 群成员数组
  peopleNum: number, // 群人数
  groupName: string, // 群名称
  avatar: ImageSourcePropType, // 群 avatar
  silence: boolean, // 消息免打扰 flag
  top: boolean, // 置顶 flag
}
export type PeopleType = { id: number, name: string, img: ImageSourcePropType }
class Comp extends React.PureComponent<PropsType, StateType> {
  // 标题栏样式
  static navigationOptions = ({navigation}): NavigationStackOptions => {
    const peopleNum = navigation.getParam(NAVI_PAR.peopleNum) || 0
    return ({
      headerStyle: { backgroundColor: borderColor},
      headerTitle: (
        <HeaderTitle>{"聊天信息"+(peopleNum?` (${peopleNum})`:"")}</HeaderTitle>
      )
    })
  }
  private EditGroupNamePromtRef; // 修改群名称Promt ref
  private QrcodeModalRef; // 二维码 modal
  private devTimer; // 开发阶段 的 timer TODO 要删掉
  constructor(props) {
    super(props)
    this.state = {
      peoples: mockPeoples,
      peopleNum: mockPeopleNum,
      groupName: "asdsds",
      avatar: require('js_pro_src/assets/u239.jpg'), // 群avatar
      silence: true, // 消息免打扰 flag
      top: false, // 置顶flag
    }
  }
  private goComplain = () => {
    this.props.navigation.dispatch(StackActions.push({
      routeName: SCREEN_NAMES.Complain
    }))
  }; // 投诉 跳转
  private clearRecord = async () => { // 清空聊天记录
    const action = await simpleAlert({ content: "确认清空聊天记录？", buttonNum: 2 })
    if (action != "positive") return // 不清空
    // 清空聊天记录
  };
  private deleteQuit = () => { // 删除并退出
    // 群主
    simpleAlert({
      content: "群主不能“删除退出”，请 联系客服",
      buttons: [
        {text: "知道了"}, {text: "联系客服"}
      ]
    })
    // 非群主
  };
  private setAnnounce = async () => { // 设置群公告
    await sleep(1000)
    simpleAlert({content: "asdasd"})
  };
  private sendPocketRecord = () => { // 发包记录
    this.props.navigation.dispatch(StackActions.push({
      routeName: SCREEN_NAMES.SendPocketRecord
    }))
  };
  private openQrcode = () => { // 打开群二维码
    (this.QrcodeModalRef as QrcodeModal).open()
  };
  private changeGroupName = groupName => {
    this.setState({ groupName })
    // 添加后端修改群名 回调
    return true
  }
  private openGroupNamePromt = () => { // 修改群名 弹窗
    (this.EditGroupNamePromtRef as ProPromt).open(this.state.groupName)
  };
  private setGetPocket = () => { // 群主设置抢红包
    // 非群主
    simpleAlert({content: "只有群主可以设置抢包号"})
    // 群主， 跳转设置红包页
    console.log("设置红包页 待完成")
    this.props.navigation.dispatch(StackActions.push({
      routeName: SCREEN_NAMES.GlobalSetGrabPeople
    }))
  };
  private qrcodeIcon = (
    <FontAwesomeIcon name="qrcode" style={styles.qrcodeIcon} />
  );
  private toggleSilence = () => {
    // 对接后台接口
    const prevSilence = this.state.silence
    this.setState({ silence: !prevSilence })
  };
  private toggleTop = () => {
    // 对接后台接口
    const prevTop = this.state.top
    this.setState({top: !prevTop})
  };
  //群成员头像，增加人员，后期啦数据
  private AddMembers = () => {
    Alert.alert("AddMembers 待完成")
  }
  componentDidMount(): void {
    this.devTimer = setInterval(() => {
      const {navigation} = this.props
      this.setState(prevState => ({
        peopleNum: prevState.peopleNum + 1
      }), () => {
        navigation.setParams({[NAVI_PAR.peopleNum]: this.state.peopleNum})
      })
    }, 5000)
  }
  componentWillUnmount(): void {
    clearInterval(this.devTimer)
  }
  render() {
    const {peoples, peopleNum, groupName, avatar, silence, top} = this.state
    return (
      <React.Fragment>
        <ScrollView style={styles.box}>
          {/* 头部展示群成员头像和名称信息 */}
          <PeoplesList
            peoples={peoples} peopleNum={peopleNum}
            maxShowPeopleNum={MAX_SHOW_PEOPLE_NUM}
            onAddMembers={this.AddMembers} />
          {/* 群信息选项 */}
          <View style={styles.groupWrap}>
            <LabelButton
              label="群聊名称" rightType="word" btnTxt={this.state.groupName} hasBorder={true}
              onPress={this.openGroupNamePromt} />
            <LabelButton
              btnComp={this.qrcodeIcon} hasBorder={true}
              label="群二维码" rightType="comp" btnTxt="萨那你说"
              onPress={this.openQrcode} />
            <LabelButton
              label="群公告" rightType="none"
              hasBorder={false} onPress={this.setAnnounce} />
          </View>
          {/* 红包设置 */}
          <View style={styles.groupWrap}>
            <LabelButton
              label="群主设置抢红包" rightType="none" hasBorder={true}
              onPress={this.setGetPocket} />
            <LabelButton
              label="我在此群的发包记录" rightType="none" hasBorder={false}
              onPress={this.sendPocketRecord} />
          </View>
          {/* 免打扰 && 置顶 */}
          <View style={styles.groupWrap}>
            <LabelButton
              label="消息免打扰" rightType="comp" hasBorder={true}
              onPress={this.toggleSilence} showRightArrow={false}
              btnComp={<ProSwitch value={silence} disabledPress={true} />}
            />
            <LabelButton
              label="置顶聊天" rightType="comp" hasBorder={false}
              onPress={this.toggleTop} showRightArrow={false}
              btnComp={<ProSwitch value={top} disabledPress={true} />}
            />
          </View>
          {/* 投诉 */}
          <View style={styles.groupWrap}>
            <LabelButton
              label="投诉" rightType="none" hasBorder={false}
              onPress={this.goComplain} />
          </View>
          {/* 清空聊天 */}
          <View style={styles.groupWrap}>
            <LabelButton
              label="清空聊天记录" rightType="none" hasBorder={false}
              onPress={this.clearRecord} />
          </View>
          {/* 删除退出 */}
          <View style={styles.groupWrap}>
            <TouchableHighlight underlayColor={gray} onPress={this.deleteQuit}>
            <View style={[styles.delQuitWrap]}>
              <Text style={styles.delQuitTxt}>删除并退出</Text>
            </View>
            </TouchableHighlight>
          </View>
          {/* 占位置 灰色底部 */}
          <View style={styles.empty} />
        </ScrollView>
        {/* 修改群名称 Promt */}
        <ProPromt
          onRef={r => this.EditGroupNamePromtRef = r} dismissable={false}
          placeholder="请输入群名称" title="修改群名称"
          onSubmit={this.changeGroupName} />
        {/*  第二个模态框，群二维码*/}
        <QrcodeModal
          onRef={r => this.QrcodeModalRef = r}
          groupName={groupName} avatar={avatar}
        />
      </React.Fragment>
    )
  }
}
//路由跳转时所改变的title样式
const ChatDetailScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default ChatDetailScreen

const styles = StyleSheet.create({
  box:{ flex:1, backgroundColor:borderColor },
  groupWrap:{ width:pxW2dp(750), backgroundColor:white, marginTop:pxW2dp(15) },
  delQuitWrap:{
    height:pxW2dp(90), alignItems: 'center', justifyContent: "center",
    marginLeft:pxW2dp(30), marginRight:pxW2dp(30)
  },
  delQuitTxt: {
    fontSize:pxW2dp(26),textAlign:'center',color:red
  },
  empty: {height:pxW2dp(100),backgroundColor:borderColor},
  qrcodeIcon: {
    fontSize: 20, color: level1Word
  }
})

