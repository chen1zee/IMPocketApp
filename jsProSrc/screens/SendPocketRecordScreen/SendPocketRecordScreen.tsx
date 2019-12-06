import React, {useEffect} from "react"
import {StatusBar, StyleSheet, View} from "react-native"
import TopInfo from "./components/TopInfo";
import {borderColor, white} from "js_pro_src/styles/color";
import RecordList from "./components/RecordList";
import {useObserver} from "mobx-react-lite";
import useMonthStore from "./hooks/useMonthStore";
import useDataStore from "./hooks/useDataStore";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";

// 发红包记录
function Comp() {
  // 月份
  const monthStore = useMonthStore({
    onValChange() { // 月份改变
      dataStore.getRecord()
      dataStore.getMoreList(true)
    }
  })
  // 发包记录数 && 列表
  const dataStore = useDataStore()
  // 获取数据
  useEffect(() => { // 初始化 请求数据
    dataStore.getRecord()
    dataStore.getMoreList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return useObserver(() => (
    <View style={styles.wrap}>
      <TopInfo
        recordNum={dataStore.recordNum}
        monthStoreValStr={monthStore.valStr}
        monthStoreChangeValFromStr={monthStore.changeValFromStr}
      />
      <RecordList
        list={dataStore.list} allLoaded={dataStore.allLoaded}
        getMoreList={dataStore.getMoreList}
        setListRef={dataStore.setListRef}
      />
    </View>
  ))
}

const SendPocketRecordScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default SendPocketRecordScreen

const styles = StyleSheet.create({
  wrap: {
    flex: 1, backgroundColor: white, position: "relative"
  },
})
