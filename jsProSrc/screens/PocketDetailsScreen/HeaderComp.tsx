import React from "react"
import {Text} from "react-native";
import {TouchableWithoutFeedback} from "react-native";
import {View} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import {Header} from "react-navigation-stack";
import {StyleSheet} from "react-native";
import {red, white} from "js_pro_src/styles/color";
import {NavigationStackProp} from "react-navigation-stack/src/types";

/**
 * 头部组件
 * */
function HeaderComp({
  navigation
                    }: {navigation: NavigationStackProp}) {
  return (
    <View style={styles.headerWrap}>
      <Text style={styles.headerTitle}>红包详情</Text>
      <TouchableWithoutFeedback onPress={() => navigation.pop()}>
        <View style={styles.headerLeftWrap}>
          <Ionicon name="md-arrow-back" style={styles.headerBackIcon} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default HeaderComp

const styles = (() => {
  const headerSize = Header.HEIGHT
  return StyleSheet.create({
    headerWrap: {
      position: "relative", height: headerSize, backgroundColor: red
    },
    headerLeftWrap: {
      position: "absolute", top: 0, left: 0,
      width: headerSize, height: headerSize,
      justifyContent: "center", alignItems: "center"
    },
    headerBackIcon: {
      fontSize: headerSize * 0.46, color: white
    },
    headerTitle: {
      flex: 1, color: white, fontSize: headerSize * 0.34, lineHeight: headerSize,
      textAlign: "center"
    }
  })
})()
