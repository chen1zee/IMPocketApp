import React, {useCallback} from "react"
import {Image, StatusBar, StyleSheet, Text, View} from "react-native"
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor, cyan, level1Word, level3Word, orange, white} from "js_pro_src/styles/color";
import {NavigationScreenProp} from "react-navigation";
import {NavigationStackOptions} from "react-navigation-stack";
import MainTabHeaderRight from "js_pro_src/screens/MainTabNavi/components/MainTabHeaderRight";
import {LargeList} from "react-native-largelist-v3";
import {useObserver} from "mobx-react-lite";
import useDataStore from "./hooks/useDataStore";
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import Ionicon from "react-native-vector-icons/Ionicons"
import {pxW2dp} from "js_pro_src/utils/sizes";
import navigators, {mainStackNavigator} from "js_pro_src/navigators/navigators";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import {useFocusEffect} from "react-navigation-hooks";

// 取整 减少 largeList计算量
const cellWrapSize = Math.floor(pxW2dp(110))

type NavigationParams = {
}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}
function Comp({}:Props) {
  const dataStore = useDataStore()
  // 去 新的朋友 页面
  const goNewFriends = useCallback(() => {
    navigators.get(mainStackNavigator).navigate({
      routeName: SCREEN_NAMES.NewFriends
    })
  }, [])
  // 渲染函数
  const RenderIndexPath = useCallback(({section, row}) => {
    // 群
    if (section == 0) {
      const item = dataStore.groupList[row]
      if (item.type == 1) {
        return ( // 新的朋友
          <View>
            <TouchableWrap style={styles.cellWrap} onPress={goNewFriends}>
              <View style={styles.newFriWrap}>
                <Ionicon name="md-person-add" style={styles.newFriIcon} />
              </View>
              <Text style={styles.newFriTxt}>新的朋友</Text>
            </TouchableWrap>
          </View>
        )
      }
      return ( // 群
        <View>
          <TouchableWrap style={styles.cellWrap} onPress={() => {}}>
            <Image style={styles.leftImg} source={item.avatar} />
            <View style={styles.groupInfo}>
              <View style={styles.groupTagWrap}>
                <Text style={styles.groupTagTxt}>安全</Text>
              </View>
              <Text style={styles.groupname}>adasdkspdokp</Text>
            </View>
          </TouchableWrap>
        </View>
      )
    }
    // 人
    const item = dataStore.peopleList[section-1].items[row]
    return (
      <View>
        <TouchableWrap style={styles.cellWrap} onPress={() => {}}>
          <Image style={styles.leftImg} source={item.avatar} />
          <Text style={styles.peopleName}>{item.name}</Text>
        </TouchableWrap>
      </View>
    )
  }, [dataStore, goNewFriends])
  // footer
  const RenderFooter = useCallback(() => (
    <View />
  ), [])
  // focus 获取数据
  useFocusEffect(useCallback(() => {
    if (dataStore.peopleList.length) return
    dataStore.getData()
  }, [dataStore]))
  return useObserver(() => (
    <LargeList
      style={styles.wrap} bounces={false}
      data={dataStore.renderList}
      heightForIndexPath={() => cellWrapSize}
      renderIndexPath={RenderIndexPath}
      renderSection={RenderSection}
      renderFooter={RenderFooter}
    />
  ))
}
// 导航设置
Comp.navigationOptions = (): NavigationStackOptions => {
  return {
    headerRight: <MainTabHeaderRight />
  }
}

const CommunicateScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default CommunicateScreen

const styles = (() => {
  const imgSize = pxW2dp(80)
  const tagSize = pxW2dp(30)
  return StyleSheet.create({
    wrap: {
      backgroundColor: borderColor,
    },
    cellWrap: {
      backgroundColor: white, flexDirection: "row", alignItems: "center",
      height: cellWrapSize, paddingLeft: pxW2dp(20),
      borderBottomWidth: pxW2dp(1), borderBottomColor: borderColor
    },
    /** 新的朋友 */
    newFriWrap: {
      width: imgSize, height: imgSize, borderRadius: pxW2dp(6),
      backgroundColor: orange, justifyContent: "center", alignItems: "center",
      marginRight: pxW2dp(20)
    },
    newFriIcon: {
      fontSize: pxW2dp(50), color: white,
    },
    newFriTxt: {
      fontSize: pxW2dp(34), lineHeight: pxW2dp(44), color: level1Word
    },
    /** 群item */
    leftImg: {
      width: imgSize, height: imgSize, borderRadius: pxW2dp(6),
      marginRight: pxW2dp(20)
    },
    groupInfo: {
    },
    groupTagWrap: {
      flexDirection: "row", alignItems: "center",
    },
    groupTagTxt: {
      fontSize: pxW2dp(16), lineHeight: tagSize,
      marginRight: pxW2dp(20), paddingHorizontal: pxW2dp(10),
      borderRadius: tagSize/2, color: white, backgroundColor: cyan
    },
    groupname: {
      fontSize: pxW2dp(30), lineHeight: pxW2dp(40), color: level1Word,
      marginBottom: pxW2dp(12)
    },
    /** section */
    section: {
      height: sectionSize, justifyContent: "center",
      paddingLeft: pxW2dp(20), backgroundColor: borderColor
    },
    sectionTxt: {
      fontSize: pxW2dp(22), lineHeight: pxW2dp(26), color: level3Word,
    },
    /** people name */
    peopleName: {
      fontSize: pxW2dp(30), color: level1Word
    }
  })
})()
