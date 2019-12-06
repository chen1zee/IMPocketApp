import React, {useEffect} from "react"
import {StatusBar, StyleSheet, View} from "react-native"
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {NavigationStackOptions} from "react-navigation-stack";
import HeaderComp from "./HeaderComp";
import TopInfo from "./components/TopInfo";
import PocketList from "./components/PocketList";
import useDetailStore from "js_pro_src/screens/PocketDetailsScreen/hooks/useDetailStore";
import {useObserver} from "mobx-react-lite";

function Comp() {
  const detailStore = useDetailStore()
  useEffect(() => { // 初始化 加载数据
    detailStore.getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return useObserver(() => (
    <View style={styles.wrap}>
      {/** 头部信息，， avatar 红包info等 */}
      <TopInfo
        person={detailStore.person}
        pocketInfo={detailStore.pocketInfo}
      />
      {/** 领取列表 */}
      <PocketList recieveList={detailStore.recieveList} />
    </View>
  ))
}

Comp.navigationOptions = (): NavigationStackOptions => {
  return {
    header: HeaderComp
  }
}

const PocketDetailsScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setHidden(true),
  willBlur: () => StatusBar.setHidden(false)
})

export default PocketDetailsScreen

const styles = (() => {
  return StyleSheet.create({
    wrap: {
      flex: 1
    }
  })
})()
