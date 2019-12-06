/**
 * 列表类页面 没有数据时 显示页面
 * */
import React, {memo} from "react";
import {StyleSheet, Text, View} from "react-native";
import {borderColor, level2Word} from "js_pro_src/styles/color";
import {pxW2dp} from "js_pro_src/utils/sizes";

type Props = {
  msg?: string // 显示的消息
  backgroundColor?: string // 背景色
}
const EmptyList = memo(function ({
  msg="无任何数据", backgroundColor=borderColor
                                 }:Props) {
  return (
    <View style={[styles.wrap, {backgroundColor}]}>
      <Text style={styles.txt}>{msg}</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  wrap: {
    flex: 1, alignItems: "center", justifyContent: "center"
  },
  txt: {
    fontSize: pxW2dp(34), color: level2Word
  }
})

export default EmptyList
