import React, {useCallback, useRef, useState} from "react"
import {StatusBar, StyleSheet, View, Text} from "react-native"
import {NavigationScreenProp, StackActions} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor, green, level2Word, white} from "js_pro_src/styles/color";
import {NavigationStackOptions} from "react-navigation-stack";
import ProIconInput from "js_pro_src/components/ProIconInput";
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import Ionicon from "react-native-vector-icons/Ionicons";
import {pxW2dp} from "js_pro_src/utils/sizes";
import useAndroidBackBtn2MainTab from "js_pro_src/hooks/useAndroidBackBtn2MainTab";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import handleReqWithNormalError from "js_pro_src/utils/handleReqWithNormalError";
import LoadingMask from "js_pro_src/components/LoadingMask";
import {srchUsrname} from "js_pro_src/api/search";
import {FrndDtlNaviParams} from "js_pro_src/screens/FriendDetailScreen/FriendDetailScreen";
import ProToast from "js_pro_src/components/ProToast";
import addFriendStore from "js_pro_src/store/addFriendStore";

/**
 * 添加好友
 * */
type NavigationParams = {}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}

function Comp({navigation}: Props) {
  const [text, setText] = useState("")
  // cancelToken.cancel  ref
  const cancelMethodRef = useRef()
  // 跳转搜索好友
  const goFriendDetail = useCallback(() => {
    handleReqWithNormalError({
      reqFunc: async () => {
        LoadingMask.show({
          onRequestClose: () => {
            // @ts-ignore  cancel 请求
            cancelMethodRef.current && cancelMethodRef.current(`取消搜索好友`)
          }
        })
        const res = await srchUsrname({username: text}, cancelMethodRef)
        addFriendStore.setFriendInfo(res.data) // 添加数据至 store
        LoadingMask.hide()
        navigation.dispatch(StackActions.push({ // 跳转 详细资料
          routeName: SCREEN_NAMES.FriendDetail,
          params: { mode: "add" } as FrndDtlNaviParams
        }))
      },
      superPrevErrorFunc: () => LoadingMask.hide(),
      unNormalErrorFunc: (e) => ProToast.showTop({content: e.message})
    })
  }, [navigation, text])
  // 处理 android 返回键问题
  useAndroidBackBtn2MainTab({navigation})
  return (
    <View style={styles.wrap}>
      <ProIconInput
        iconName="ios-search" value={text}
        placeholder="输入名字搜索"
        changeText={val => setText(val)}
      />
      {text!="" &&
      <TouchableWrap style={styles.searchWrap} onPress={goFriendDetail}>
        <View style={styles.iconWrap}>
          <Ionicon name="md-person-add" style={styles.icon} />
        </View>
        <Text style={styles.right}>
          搜索：<Text style={styles.green}>{text}</Text>
        </Text>
      </TouchableWrap>}
    </View>
  )
}

// 导航设置
Comp.navigationOptions = (): NavigationStackOptions => {
  return {
    headerStyle: {backgroundColor: borderColor}
  }
}

const SearchFriendScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default SearchFriendScreen

const styles = StyleSheet.create({
  wrap: {
    flex: 1
  },
  searchWrap: {
    flexDirection: "row", alignItems: "center", height: pxW2dp(140), paddingHorizontal: pxW2dp(20),
  },
  iconWrap: {
    width: pxW2dp(80), height: pxW2dp(80), borderRadius: pxW2dp(6),
    backgroundColor: green, alignItems: "center", justifyContent: "center", marginRight: pxW2dp(20)
  },
  icon: {
    fontSize: pxW2dp(60), color: white
  },
  right: {
    fontSize: pxW2dp(30), color: level2Word
  },
  green: {
    color: green
  },
})
