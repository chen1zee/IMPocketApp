import React, {useCallback} from "react"
import {StyleSheet, Text} from "react-native"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {greenBlack, lessGreenLight, level2Word, white} from "js_pro_src/styles/color";
import TouchableWrap from "js_pro_src/components/TouchableWrap";

/** 上方 tab */
type Props = {
  text: string,
  active: boolean,
  onPress: () => void
}
function TabTop({
  text, active, onPress
                }: Props) {
  // 点击事件
  const onPressHandler = useCallback(() => {
    if (active) return // 已为激活态，，不切换
    onPress()
  }, [active, onPress])
  return (
    <TouchableWrap
      onPress={onPressHandler}
      style={[
        styles.tab, {backgroundColor: active?lessGreenLight:white}
      ]}
    >
      <Text
        style={[
          styles.tabTxt, {color: active?greenBlack:level2Word}
        ]}
      >{text}</Text>
    </TouchableWrap>
  )
}

export default TabTop

const styles = StyleSheet.create({
  tab: {
    flex: 1, height: pxW2dp(70),
    alignItems: "center", justifyContent: "center",
  },
  tabTxt: {
    fontSize: pxW2dp(30), lineHeight: pxW2dp(40)
  }
})
