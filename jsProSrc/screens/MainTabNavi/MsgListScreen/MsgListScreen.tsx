import React, {useCallback, useMemo, useRef, useState} from "react"
import {FlatList, GestureResponderEvent, StyleSheet, View} from "react-native"
import {HeaderTitle, NavigationStackOptions} from "react-navigation-stack";
import MainTabHeaderRight from "../components/MainTabHeaderRight";
import unreadMsgStore from "js_pro_src/store/unreadMsgStore";
import {borderColor} from "js_pro_src/styles/color";
import {pR2dp, pxW2dp, screenH} from "js_pro_src/utils/sizes";
import ProButton from "js_pro_src/components/ProButton";
import {NavigationActions, NavigationScreenProp} from "react-navigation";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import navigators, {mainStackNavigator} from "js_pro_src/navigators/navigators";
import {ChatNavigateParams} from "js_pro_src/screens/ChatScreen/ChatScreen";
import MsgCell from "./MsgCell";
import FuncOpts, {FuncOptType} from "../components/FuncOpts";
import {BTM_TAB_HEIGHT} from "js_pro_src/styles/size";
import msgListStore, {ListItemType} from "js_pro_src/store/msgListStore";
import {useObserver} from "mobx-react-lite";

const NAVI_PAR = {
  unreadNum: "unreadNum"
}
type NavigationParams = {
  unreadNum: number
}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}
function MsgListScreen({
  navigation
                                 }: Props) {
  const heightWithoutBtmBar = useMemo(() => (screenH - BTM_TAB_HEIGHT - 20), [])
  const FuncOptsRef = useRef() // 聊天功能弹窗 ref
  const selectedIndexRef = useRef(-1) // 选中的 chat Index ref
  // 当前 聊天功能列表
  const [chatFuncOpts, setChatFuncOpts] = useState<FuncOptType[]>([])
  // 跳转群聊
  const goChat = useCallback((item: ListItemType) => {
    const params: ChatNavigateParams = {chatTitle: item.title}
    navigators.get(mainStackNavigator).dispatch(NavigationActions.navigate({
      routeName: SCREEN_NAMES.Chat, params
    }))
  }, [])
  // 发现页 添加红点
  const addFind = useCallback(() => {
    unreadMsgStore.addFindAsync("dot")
  }, [])
  // 添加 未读信息 标题
  const addUnreadNum = useCallback(() => {
    navigation.setParams({
      unreadNum: navigation.getParam("unreadNum", 0) + 1
    })
  }, [navigation])
  // 添加 底下 未读消息
  const addMsg = useCallback(() => {
    unreadMsgStore.addNumAsync(1)
  }, [])
  // 切换置顶
  const toggleChatTop = useCallback(() => {
    msgListStore.toggleChatTop(selectedIndexRef.current)
  }, [])
  // 切换免打扰
  const toggleSilence = useCallback(() => {
    msgListStore.toggleSilence(selectedIndexRef.current)
  }, [])
  // 删除对话
  const delChat = useCallback(() => {
    msgListStore.delChat(selectedIndexRef.current)
  }, [])
  // 制造 功能选项
  const makeChatOpts = useCallback((selectedItem: ListItemType): FuncOptType[] => [
    {text:`${selectedItem.top?"取消":""}置顶`,onPress:toggleChatTop,key:"top"},
    {text:`${selectedItem.silence?"取消":""}免打扰`,onPress:toggleSilence,key:"sil"},
    {text:"删除对话",key:'del',onPress:delChat}
  ], [toggleChatTop, toggleSilence, delChat])
  // 打开 聊天选项
  const openChatOpts = useCallback((index: number, event: GestureResponderEvent) => {
    selectedIndexRef.current = index
    const selectedItem = msgListStore.list[index]
    const {nativeEvent: {pageX, pageY}} = event
    setChatFuncOpts(makeChatOpts(selectedItem))
    // @ts-ignore
    FuncOptsRef.current.open(pageX, pageY)
  }, [makeChatOpts])
  // 渲染item
  const renderItem = useCallback(({item, index}: {item: ListItemType, index: number}) => (
    <MsgCell
      goChat={goChat} item={item}
      onLongPress={event => openChatOpts(index, event)}
    />
  ), [goChat, openChatOpts])
  const keyExtractor = useCallback(item => String(item.chatId), [])
  const separatorComp = useCallback(() => (
    <View style={styles.itemSeparator} />
  ), [])
  return useObserver(() => (
    <React.Fragment>
      <View style={{flex: 1, alignItems: "flex-start"}}>
        {/** TODO 开发完去掉 BEGIN */}
        <View style={{flexDirection: "row"}}>
          <ProButton onPress={addUnreadNum}  text="addUnreadNum" />
          <ProButton onPress={addMsg} text="添加消息" />
          <ProButton onPress={addFind} text="添加find" />
          <ProButton onPress={msgListStore.addList} text="添加列表" />
          <ProButton onPress={msgListStore.hideLabel} text="首项label_null" />
        </View>
        {/** TODO 开发完去掉 END */}
        {/** 空白位 */}
        <View style={{height: pxW2dp(20)}} />
        <FlatList
          style={{alignSelf: "stretch"}}
          data={msgListStore.list}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ItemSeparatorComponent={separatorComp}
          ListFooterComponent={separatorComp}
        />
      </View>
      {/** 聊天 功能弹窗 */}
      <FuncOpts
        cRef={FuncOptsRef}
        chatOptHeight={150} chatOptWidth={150}
        fullHeight={heightWithoutBtmBar}
        opts={chatFuncOpts}
      />
    </React.Fragment>
  ))
}
// 导航设置
MsgListScreen.navigationOptions = ({navigation}): NavigationStackOptions => {
  const unreadNum = navigation.getParam(NAVI_PAR.unreadNum) || 0
  return ({
    headerTitle: <HeaderTitle>{"消息"+(unreadNum?` (${unreadNum})`:"")}</HeaderTitle>,
    headerRight: <MainTabHeaderRight />
  })
}

export default MsgListScreen

const styles = StyleSheet.create({
  itemSeparator: {
    height: pR2dp(1), left: pxW2dp(20), backgroundColor: borderColor
  },
  // timeWrap: { width: pxW2dp(200), height: itemHeight, paddingTop: pxW2dp(20), paddingLeft: pxW2dp(20), backgroundColor: "white" },
})
