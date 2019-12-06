import React, {useCallback} from "react"
import {StyleSheet, TouchableHighlight, View} from "react-native"
import Ionicon from "react-native-vector-icons/Ionicons"
import AntIcon from "react-native-vector-icons/AntDesign"
import {gray, greatBlack} from "js_pro_src/styles/color";
import {opClsMainTabFnLs} from "js_pro_src/events/eventNames";
import emitter from "js_pro_src/events/emitter";
import {Header} from "react-navigation-stack";

type Props = {
  showSearchBtn?: boolean // 显示 搜索按钮 flag
}
function MainTabHeaderRight({
  showSearchBtn=true
                            }: Props) {
  const openSearch = useCallback(() => {
    console.log("搜索按钮 待完成")
  }, [])
  // 打开左侧功能列表 ('发起群聊','添加好友','扫一扫' 等)
  const openFuncList = useCallback(() => {
    emitter.emit(opClsMainTabFnLs, "open")
  }, [])
  return (
    <View style={styles.wrap}>
      {showSearchBtn &&
      <TouchableHighlight style={styles.btnWrap} underlayColor={gray} onPress={openSearch}>
        <AntIcon name="search1" style={styles.searchBtn} />
      </TouchableHighlight>}
      <TouchableHighlight style={styles.btnWrap} underlayColor={gray} onPress={openFuncList}>
        <Ionicon name="md-add-circle-outline" style={styles.funcBtn} />
      </TouchableHighlight>
    </View>
  )
}

export default MainTabHeaderRight

const styles = StyleSheet.create({
  wrap: {
    position: "relative", paddingRight: 6,
    flexDirection: "row", alignItems: "center", justifyContent: "flex-start"
  },
  btnWrap: {
    height: Header.HEIGHT, width: Header.HEIGHT, alignItems: "center", justifyContent: "center"
  },
  searchBtn: { color: greatBlack,marginLeft: 4,marginRight: 4, fontSize: 24 },
  funcBtn: { color: greatBlack,marginLeft: 4,marginRight: 4, fontSize: 25 },
})
