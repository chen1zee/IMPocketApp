import React, {useCallback, useEffect, useRef, useState} from "react"
import {Image, StatusBar, StyleSheet, Text, View} from "react-native"
import {NavigationScreenProp, StackActions} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor, green, level1Word, red, white} from "js_pro_src/styles/color";
import useAndroidBackBtn2MainTab from "js_pro_src/hooks/useAndroidBackBtn2MainTab";
import {NavigationStackOptions} from "react-navigation-stack";
import ProToast from "js_pro_src/components/ProToast";
import handleReqWithNormalError from "js_pro_src/utils/handleReqWithNormalError";
import LoadingMask from "js_pro_src/components/LoadingMask";
import {frndAplRpl, frndDtl} from "js_pro_src/api/friend";
import sleep from "js_pro_src/utils/sleep";
import {useObserver} from "mobx-react-lite";
import addFriendStore from "js_pro_src/store/addFriendStore";
import ProButton from "js_pro_src/components/ProButton";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";

export type FrndDtlNaviParams = {
  mode: Mode,
  friend_id?: string, // 好友id (查看好友详情时，使用)
  sys_msg_id?: string, // 申请消息id apply模式下
}
/**
 * mode: 模式
 * add: 添加好友，搜索后显示的信息;  get: "查看好友详情"
 * reply: 回复他人的好友申请
 * */
type Mode = "add"|"get"|"reply"
type Props = {
  navigation: NavigationScreenProp<{}, FrndDtlNaviParams>
}
function Comp({navigation}: Props) {
  // cancelToken.cancel  ref
  const cancelMethodRef = useRef()
  // 模式
  const [mode, setMode] = useState<Mode>("add")
  // reply 模式下, sys_msg_id ref
  const sys_msg_id_ref = useRef("")
  // 跳转 添加验证页
  const goApplyFrnd = useCallback(() => {
    navigation.dispatch(StackActions.push({
      routeName: SCREEN_NAMES.ApplyAddFrnd
    }))
  }, [navigation])
  /**
   * 回复 申请好友
   * @param {number} status 1: 同意，   2：拒绝
   * */
  const replyFrnd = useCallback((status: 1|2) => {
    handleReqWithNormalError({
      reqFunc: async () => {
        if (LoadingMask.isShowing()) return
        LoadingMask.show({
          // @ts-ignore cancel 请求
          onRequestClose: () => cancelMethodRef.current && cancelMethodRef.current("取消 回复申请好友")
        })
        await frndAplRpl({sys_msg_id:sys_msg_id_ref.current, status})
        LoadingMask.hide()
        const action = status == 1 ? "同意" : "拒绝"
        ProToast.showTop({content: `${action}申请好友请求成功`})
        await sleep(300)
        navigation.goBack()
      },
      superPrevErrorFunc: () => LoadingMask.hide(),
      unNormalErrorFunc: err => ProToast.showTop({content: err.message}),
    })
  }, [navigation])
  // 开始聊天
  const goChat = useCallback(() => {
    navigation.dispatch(StackActions.push({routeName: SCREEN_NAMES.Chat}))
  }, [navigation])
  // 初始化 搜索好友信息
  useEffect(() => {
    /** 添加好友，搜索后显示的信息 直接返回 */
    const modeFromParam = navigation.getParam("mode", "add")
    setMode(modeFromParam)
    if (modeFromParam == "add") return
    if (modeFromParam == "reply") { // 回复申请模式
      sys_msg_id_ref.current = navigation.getParam("sys_msg_id", "")
      return
    }
    /** 好友详情模式 */
    // if (cancelMethodRef) return // TODO 等待后端调试， 写静态页面
    handleReqWithNormalError({
      reqFunc: async () => {
        LoadingMask.show({
          onRequestClose: () => {
            // @ts-ignore cancel 请求
            cancelMethodRef.current && cancelMethodRef.current(`取消好友详情`)
            navigation.goBack()
          }
        })
        const friend_id = navigation.getParam("friend_id", "")
        if (!friend_id) { // 路由缺少必要参数
          ProToast.showTop({content: "缺少参数：好友id"})
          navigation.goBack()
          LoadingMask.hide()
          return
        }
        const res = await frndDtl({friend_id}, cancelMethodRef)
        console.log(res)
      },
      superPrevErrorFunc: async () => {
        LoadingMask.hide()
        await sleep(300)
        navigation.goBack()
      },
      unNormalErrorFunc: (e) => ProToast.showTop({content: e.message})
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 处理 android 返回键问题
  useAndroidBackBtn2MainTab({navigation})
  return useObserver(() => {
    return (
      <View style={styles.wrap}>
        <View style={styles.infoWrap}>
          <Image style={styles.avatar} source={require("js_pro_src/assets/u239.jpg")} />
          {/** TODO 等待 后端 调通后 显示 */}
          {/*<Image style={styles.avatar} source={{uri: addFriendStore.friendInfo.avatar}} />*/}
          <View style={styles.right}>
            <Text style={styles.name}>{addFriendStore.friendInfo.nicename}</Text>
          </View>
        </View>
        {mode=="add"? // 添加好友模式
        <ProButton
          style={styles.addBtn} text="添加到通讯录" onPress={goApplyFrnd}
          textStyle={styles.addBtnTxt}
        />:
        mode=="reply"? // 回复请求 模式
        <React.Fragment>
          <ProButton
            style={styles.addBtn} text="接收并添加好友" onPress={() => replyFrnd(1)}
            textStyle={styles.addBtnTxt}
          />
          <Text style={styles.refuseFrnd} onPress={() => replyFrnd(2)}>拒绝添加申请</Text>
        </React.Fragment>: // get 查看好友详情
        <ProButton
          style={styles.addBtn} text="开始聊天" onPress={goChat}
          textStyle={styles.addBtnTxt}
        />}
      </View>
    )
  })
}

// 导航设置
Comp.navigationOptions = (): NavigationStackOptions => {
  return {
    headerStyle: {backgroundColor: borderColor}
  }
}

const FriendDetailScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default FriendDetailScreen

const styles = (() => {
  const imgSize = pxW2dp(100)
  return StyleSheet.create({
    wrap: {
      flex: 1, backgroundColor: white
    },
    infoWrap: {
      paddingTop: pxW2dp(50), paddingHorizontal: pxW2dp(20), paddingBottom: pxW2dp(30),
      borderBottomWidth: pxW2dp(1), borderBottomColor: borderColor,
      flexDirection: "row", marginBottom: pxW2dp(30)
    },
    avatar: {
      width: imgSize, height: imgSize, borderRadius: pxW2dp(5), marginRight: pxW2dp(20),
    },
    right: {
    },
    name: {
      fontSize: pxW2dp(28), color: level1Word, lineHeight: pxW2dp(38)
    },
    addBtn: {
      width: pxW2dp(670), height: pxW2dp(80), borderRadius: pxW2dp(5), alignSelf: "center",
      alignItems: "center", backgroundColor: green,
    },
    addBtnTxt: {
      fontSize: pxW2dp(28), lineHeight: pxW2dp(40),
    },
    refuseFrnd: {
      alignSelf: "center", fontSize: pxW2dp(28), lineHeight: pxW2dp(50),
      paddingTop: pxW2dp(20), color: red
    }
  })
})()
