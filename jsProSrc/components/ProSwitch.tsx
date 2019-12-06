/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {gray, lessGreen, white} from "js_pro_src/styles/color";
import {Animated, PanResponder, StyleSheet} from "react-native";

// 动画值 1: 启用， 0: 停用
const ANIMATE_VAL = { active: 1, inActive: 0 }

/** 设置PanResponder */
function makePanResponder(
  disabledPress: Props["disabledPress"],
  onPress: Props["onPress"]
) {
  return PanResponder.create({
    onStartShouldSetPanResponder: () => !disabledPress,
    onStartShouldSetPanResponderCapture: () => !disabledPress,
    onPanResponderGrant: () => {
      if (disabledPress) return
      onPress && onPress()
    }
  })
}
type Props = {
  value: boolean,
  onPress?: () => void // press

  width?: number,
  height?: number,
  dotMinusSize?: number, // dot 需要减少的量
  backgroundActive?: string, // 激活态 背景色
  backgroundInactive?: string, // 非激活 背景色
  disabledPress?: boolean, // 不触发 press flag
}
function ProSwitch({
  value, onPress,
  width=pxW2dp(80), height=pxW2dp(40), dotMinusSize=pxW2dp(10),
  backgroundActive=lessGreen, backgroundInactive=gray,
  disabledPress=false
                   }: Props) {
  const [switchAnimation] = useState(() => new Animated.Value(
    value ? ANIMATE_VAL.active : ANIMATE_VAL.inActive
  ))
  // 设置点击事件
  const [panResponder, setPanResponder] = useState(() => makePanResponder(disabledPress, onPress))
  // 映射 背景 动画值
  const [interpolatedBackgroundColor] = useState(() => switchAnimation.interpolate({
    inputRange: [ANIMATE_VAL.inActive, ANIMATE_VAL.active],
    outputRange: [backgroundInactive, backgroundActive],
  }))
  // dotSize
  const [dotSize] = useState(() => height - dotMinusSize)
  // 映射 dot偏移 动画值
  const [interpolatedDotTranX] = useState(() => {
    const activeTranX = width - dotSize - (dotMinusSize / 2)
    const inActiveTranX = dotMinusSize / 2
    return switchAnimation.interpolate({
      inputRange: [ANIMATE_VAL.inActive, ANIMATE_VAL.active],
      outputRange: [inActiveTranX, activeTranX]
    })
  })
  useEffect(() => { // value 变更时 改变 animate
    Animated.timing(switchAnimation, {
      toValue: value ? ANIMATE_VAL.active : ANIMATE_VAL.inActive,
      duration: 200
    }).start()
  }, [value])
  useEffect(() => { // disabledPress (或onPress) 变更时 改变 panResponder
    setPanResponder(
      makePanResponder(disabledPress, onPress)
    )
  }, [disabledPress, onPress])
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.container,
        {
          width, height, borderRadius: (height/2),
          backgroundColor: interpolatedBackgroundColor
        }
      ]}
    >
      <Animated.View
        style={{
          width: dotSize,height: dotSize,
          backgroundColor: white, borderRadius: (dotSize/2),
          transform: [{translateX: interpolatedDotTranX}]
        }}
      />
    </Animated.View>
  )
}

export default ProSwitch

const styles = StyleSheet.create({
  container: {overflow: "hidden", justifyContent: "center"}
})
