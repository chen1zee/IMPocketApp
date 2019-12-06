import React from "react"
import {StatusBar, StyleSheet, View, Text} from "react-native"
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor, level1Word, level2Word} from "js_pro_src/styles/color";
import {NavigationStackOptions} from "react-navigation-stack";
import {pxW2dp} from "js_pro_src/utils/sizes";

function Comp() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>投诉须知</Text>
      <Text style={styles.content}>
        &emsp;&emsp;你应保证你的投诉行为基于善意，并代表你本人真实意思，
        哈勃微红包作为中立的平台服务者，收到你投诉后，会尽快按照相关法律法规的规则独立判断并进行处理，
        哈勃微红包将会采取合理的措施保护你的个人信息；除法律法规规定的情形外，
        未经用户许可微红包不会向第三方公开、透露你的个人信息。
      </Text>
    </View>
  )
}

Comp.navigationOptions = (): NavigationStackOptions => {
  return {
    headerStyle: {backgroundColor: borderColor}
  }
}

const ComplainNeedKnowScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default ComplainNeedKnowScreen

const styles = StyleSheet.create({
  wrap: {
    flex: 1, backgroundColor: borderColor,
    paddingHorizontal: pxW2dp(30),
  },
  title: {
    fontSize: pxW2dp(34), lineHeight: pxW2dp(200),
    color: level1Word, textAlign: "center"
  },
  content: {
    fontSize: pxW2dp(28), lineHeight: pxW2dp(44),
    color: level2Word
  }
})
