/**
 * IM 主要 Tabs navi
 * 消息 通讯录 发现 我的
 * */
import React from "react";
import {createBottomTabNavigator} from "react-navigation-tabs"
import {SCREEN_2_TITLE, SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import {Dimensions, Image, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import ChatStackNavigator from "js_pro_src/navigators/mainTabNavigator/chatStackNavigator";
import CommuStackNavigator from "js_pro_src/navigators/mainTabNavigator/commuStackNavigator";
import {createAppContainer, StackActions} from "react-navigation";
import {borderColor, level2Word, red, white} from "js_pro_src/styles/color";
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import {opClsMainTabFnLs, opClsMainTabFnLsFlagType} from "js_pro_src/events/eventNames";
import emitter from "js_pro_src/events/emitter";
import FindStackNavigator from "js_pro_src/navigators/mainTabNavigator/findStackNavigator";
import MineStackNavigator from "js_pro_src/navigators/mainTabNavigator/mineStackNavigator";
import {observer} from "mobx-react";
import unreadMsgStore from "js_pro_src/store/unreadMsgStore";
import {BTM_TAB_HEIGHT} from "js_pro_src/styles/size";
import {Header} from "react-navigation-stack"
import Ionicon from "react-native-vector-icons/Ionicons"
import AntIcon from "react-native-vector-icons/AntDesign"
import navigators, {mainStackNavigator} from "js_pro_src/navigators/navigators";
import ws from "js_pro_src/websocket/ws";
import config from "js_pro_src/config";
import {CHT_GETLST, CHT_GETLST_DATA} from "js_pro_src/websocket/wsFunc";

const getTabBarIcon = (routeName, focused) => {
  let iconName : TabIconProps["name"]
  if (routeName == SCREEN_NAMES.MsgStack) {
    iconName = "chat"
  } else if (routeName == SCREEN_NAMES.CommuStack) {
    iconName = "contact"
  } else if (routeName == SCREEN_NAMES.FindStack) {
    iconName = "find"
  } else {
    iconName = "me"
  }
  return <TabIcon name={iconName} size={34} focused={focused} />
}

const ICONS = {
  "chat": require("js_pro_src/assets/images/ic_weixin_normal.png"),
  "chat-active": require("js_pro_src/assets/images/ic_weixin_selected.png"),
  "contact": require("js_pro_src/assets/images/ic_contacts_normal.png"),
  "contact-active": require("js_pro_src/assets/images/ic_contacts_selected.png"),
  "find": require("js_pro_src/assets/images/ic_find_normal.png"),
  "find-active": require("js_pro_src/assets/images/ic_find_selected.png"),
  "me": require("js_pro_src/assets/images/ic_me_normal.png"),
  "me-active": require("js_pro_src/assets/images/ic_me_selected.png")
}

type TabIconProps = {
  name: "chat" | "contact" | "find" | "me", // icon名称
  size: number|string,
  focused: boolean // 是否 聚焦中
}

@observer
class TabIcon extends React.PureComponent<TabIconProps> {
  render() {
    const {size, focused, name} = this.props
    const iconName = focused ? (name + "-active") : name
    let unreadNum
    if (name === "chat") { // 消息tab
      unreadNum = unreadMsgStore.msg
    } else if (name == "find") { // 发现 tab
      unreadNum = unreadMsgStore.find
    }
    return (
      <View style={styles.tabIconWrap}>
        <Image
          style={{width: size, height: size}}
          source={ICONS[iconName]}
        />
        {/** 左上角图标 */}
        {unreadNum ?
          unreadNum == "dot" ?
          <View style={styles.dotWrap} /> : // dot 红点
          <View style={styles.badgeWrap}>{/** 数字 */}
            <View style={styles.badge}>
              <Text style={styles.badgeTxt}>{unreadNum}</Text>
            </View>
          </View> :
        null}
      </View>
    )
  }
}

const Navigator = createBottomTabNavigator(
  {
    [SCREEN_NAMES.MsgStack]: { screen: ChatStackNavigator },
    [SCREEN_NAMES.CommuStack]: { screen: CommuStackNavigator },
    [SCREEN_NAMES.FindStack]: { screen: FindStackNavigator },
    [SCREEN_NAMES.MineStack]: { screen: MineStackNavigator }
  },
  {
    initialRouteName: SCREEN_NAMES.MsgStack,
    defaultNavigationOptions: ({navigation}) => {
      const routeName = navigation.state.routeName
      return {
        tabBarIcon: ({focused}) => getTabBarIcon(routeName, focused),
        title: SCREEN_2_TITLE[routeName]
      }
    },
    tabBarOptions: {
      activeTintColor: "#08c261",
      inactiveTintColor: "#080808",
      style: { height: BTM_TAB_HEIGHT },
      labelStyle: { fontSize: 14, }
    }
  }
)
const NavigatorContainer = createAppContainer(Navigator)

type funcListConfType = {
  IconComp: any,
  iconName: string,
  onPress: () => void,
  label: string
}

type NaiviStateType = {
  showFuncList: boolean, // 显示 左侧功能列表 flag
}

@observer
class MainTabNavigator extends React.PureComponent<any, NaiviStateType> {
  readonly maskWidth: number;
  readonly maskHeight: number;
  private opClsMainTabFnLsListener // opClsMainTabFnLs 事件监听器
  constructor(props) {
    super(props)
    const {width, height} = Dimensions.get("window")
    this.maskWidth = width
    this.maskHeight = height - (StatusBar.currentHeight || 0)
    this.state = {
      showFuncList: false, // 显示功能列表
    }
  }
  private setFuncList = (flag: boolean) => {
    this.setState({showFuncList: flag})
  }
  private goPage = (routeName: string) => { // 跳转 页面
    navigators.get(mainStackNavigator).dispatch(StackActions.push({routeName}))
  }
  private goCreateChat = () => { // 发起群聊
    this.goPage(SCREEN_NAMES.CreateChatStack)
    this.setFuncList(false)
  };
  private addFriend = () => {
    this.goPage(SCREEN_NAMES.SearchFriend)
    this.setFuncList(false)
  };
  private goScan = () => {
    console.log("goScan 待完成")
  };
  async componentDidMount() {
    /** 右上角 功能列表 开关 监听 */
    this.opClsMainTabFnLsListener = emitter.on(
      opClsMainTabFnLs, (flagStr: opClsMainTabFnLsFlagType) => {
        this.setFuncList(flagStr == "open")
      }
    )
    /** 初始化 socket */
    await ws.connect(config.socketURL)
    // TODO 等待后端解决 ing
    // ws.send(CHT_GETLST, {page: 1} as CHT_GETLST_DATA) // 获取 会话列表
    // ws.send(CHT_GETLST, {asd: 123} as CHT_GETLST_DATA) // 获取 会话列表
  }
  componentWillUnmount(): void {
    emitter.remove(this.opClsMainTabFnLsListener)
  }
  private funcListConf: funcListConfType[] = [ // funcList 配置项 用于 render
    { label: "发起群聊", IconComp: AntIcon, iconName: "message1", onPress: this.goCreateChat },
    { label: "添加好友", IconComp: Ionicon, iconName: "md-person-add", onPress: this.addFriend },
    { label: "扫一扫", IconComp: Ionicon, iconName: "md-qr-scanner", onPress: this.goScan },
  ]
  render() {
    return (
      <View style={{position: "relative",flex: 1}}>
        {/** MainTAb 路由实例 */}
        <NavigatorContainer />
        {/** 左上功能菜单蒙层 */}
        {this.state.showFuncList &&
        <TouchableWithoutFeedback onPress={() => this.setFuncList(false)}>
          <View
            style={[styles.mask,{width: this.maskWidth, height: this.maskHeight}]}>
            {/** 左上功能菜单 */}
            <View style={styles.funcListWrap}>
              {this.funcListConf.map(confItem =>(
                <TouchableWrap style={styles.funcListItem} onPress={confItem.onPress} key={confItem.iconName}>
                  <confItem.IconComp name={confItem.iconName} style={styles.funcListItemIcon} />
                  <Text style={styles.funcListItemText}>{confItem.label}</Text>
                </TouchableWrap>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>}
      </View>
    )
  }
}

export default MainTabNavigator

const styles = (() => {
  const badgeSize = 20
  const dotSize = 12
  return StyleSheet.create({
    tabIconWrap: {
      position: "relative",flexDirection: "row",alignItems: "flex-start"
    },
    dotWrap: {
      position: "absolute", top: 3, left: 25, backgroundColor: red,
      height: dotSize, width: dotSize, borderRadius: (dotSize / 2),
    },
    badgeWrap: {
      position: "absolute", top: 0, left: 30, height: 26,width: 100,
      alignItems: "flex-start", justifyContent: "center"
    },
    badge: {
      top: -2, left: -8,
      height: badgeSize, minWidth: badgeSize, borderRadius: badgeSize / 2,
      alignItems: "center", justifyContent: "center", backgroundColor: red
    },
    badgeTxt: {
      color: "#fff", fontSize: badgeSize - 8, paddingHorizontal: 6, lineHeight: badgeSize - 4
    },
    mask: {
      position: "absolute",top: 0, left: 0, flex: 1, overflow: "hidden",
    },
    funcListWrap: {
      position: "absolute", top: Header.HEIGHT - 10, right: 4, width: 170,
      borderWidth: 2, borderColor: borderColor, backgroundColor: white
    },
    funcListItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10, paddingLeft: 24 },
    funcListItemIcon: { fontSize: 20, color: level2Word, marginRight: 18 },
    funcListItemText: { fontSize: 15, color: level2Word, fontWeight: "600" },
  })
})()
