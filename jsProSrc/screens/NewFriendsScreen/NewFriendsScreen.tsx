import React, {useCallback, useMemo, useState} from "react"
import {Image, StatusBar, StyleSheet, Text, View} from "react-native"
import {NavigationScreenProp, StackActions} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor, level1Word, level2Word, level3Word, white} from "js_pro_src/styles/color";
import {NavigationStackOptions} from "react-navigation-stack";
import useAndroidBackBtn2MainTab from "js_pro_src/hooks/useAndroidBackBtn2MainTab";
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {LargeList} from "react-native-largelist-v3";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import {FrndDtlNaviParams} from "js_pro_src/screens/FriendDetailScreen/FriendDetailScreen";
import {useFocusEffect} from "react-navigation-hooks";

/**
 * 新朋友列表
 * */
const CellH = Math.floor(pxW2dp(130))

type NavigationParams = {
  getList: () => any // 获取列表
  bbb: number
}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}
function Comp({navigation}: Props) {
  // 新的朋友 列表
  const [list, setList] = useState<string[]>([])
  const largeListData = useMemo(() => {
    return [{items: list}]
  }, [list])
  // 获取列表
  const getList = useCallback(() => {
    setList(["1", "2", "3", "4"])
  }, [])
  // 跳转
  const goFriendDetail = useCallback((id: string) => {
    console.log(id)
    navigation.dispatch(StackActions.push({
      routeName: SCREEN_NAMES.FriendDetail, // TODO 添加 对应 mode
      params: {mode:"reply",sys_msg_id:"1ad65cc4-b033-8f11-4542-5de8ab2421aa40"} as FrndDtlNaviParams
    }))
  }, [navigation])
  const renderIndexPath = useCallback(({row}) => (
    <View>
      <TouchableWrap
        onPress={() => goFriendDetail(list[row])}
        style={styles.cellWrap}
      >
        <Image style={styles.leftImg} source={require("js_pro_src/assets/u239.jpg")} />
        <View style={styles.contentWrap}>
          <Text numberOfLines={1} style={styles.name}>名字考试的贫困扫跑得快破</Text>
          <Text numberOfLines={1} style={styles.msg}>认证信息考试的陪考双排扣</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.status}>等待验证</Text>
        </View>
      </TouchableWrap>
    </View>
  ), [goFriendDetail, list])
  // navigation focused 时， 获取数据
  useFocusEffect(useCallback(() => {
    getList()
  }, [getList]))
  const renderHeader = useCallback(() => <View style={styles.emptyTop} />, [])
  const renderFooter = useCallback(() => <View style={styles.emptyTop} />, [])
  // 处理 android 返回键问题
  useAndroidBackBtn2MainTab({navigation})
  return (
    <LargeList
      style={styles.wrap} data={largeListData}
      heightForIndexPath={() => CellH}
      renderIndexPath={renderIndexPath}
      renderHeader={renderHeader} renderFooter={renderFooter}
    />
  )
}
// 导航设置
Comp.navigationOptions = (): NavigationStackOptions => {
  return {
    headerStyle: {backgroundColor: borderColor}
  }
}

const NewFriendsScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default NewFriendsScreen

const styles = (() => {
  const wrapH = pxW2dp(130)
  const imgSize = pxW2dp(100)
  return StyleSheet.create({
    wrap: {flex: 1},
    emptyTop: { height: pxW2dp(30) },
    cellWrap: {
      height: wrapH, backgroundColor: white, paddingHorizontal: pxW2dp(20),
      borderBottomWidth: pxW2dp(1), borderBottomColor: borderColor,
      flexDirection: "row", alignItems: "center"
    },
    leftImg: {
      width: imgSize, height: imgSize, marginRight: pxW2dp(20),
      borderRadius: pxW2dp(5)
    },
    contentWrap: {
      flex: 1, height: imgSize, justifyContent: "space-between",
      paddingTop: pxW2dp(6), paddingBottom: pxW2dp(4)
    },
    name: {
      fontSize: pxW2dp(28), color: level1Word, lineHeight: pxW2dp(36)
    },
    msg: {
      fontSize: pxW2dp(24), color: level2Word, lineHeight: pxW2dp(30),
    },
    right: {
      width: pxW2dp(130)
    },
    status: {
      fontSize: pxW2dp(28), color: level3Word, lineHeight: pxW2dp(32)
    },
  })
})()
