import React, {useCallback} from "react"
import {StyleSheet, Text, View} from "react-native"
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import {gray, green, white} from "js_pro_src/styles/color";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {NumArrItem} from "../hooks/useMineNumArrStore";

type Props = {
  toggle: (index: number) => void // 切换数字
  numArrVal: NumArrItem[]
}
function NumberSelector({
  numArrVal,
  toggle
                        }: Props) {
  // 渲染项
  const Item = useCallback(({
    item, index
                            }:{item: NumArrItem, index: number}) => {
    const extraNumWrapStyle = item.selected ? {backgroundColor: green} : {backgroundColor: gray}
    const extraTextStyle = item.selected ? {color: white} : {color: white}
    return (
      <TouchableWrap
        style={[styles.numWrap, extraNumWrapStyle]}
        onPress={() => toggle(index)}
      >
        <Text style={[styles.text, extraTextStyle]}>{item.value}</Text>
      </TouchableWrap>
    )
  }, [toggle])
  return (
    <View style={styles.wrap}>
      {numArrVal.map((item, index) => (
      <Item
        key={item.value}
        item={item} index={index}
      />
      ))}
    </View>
  )
}

export default NumberSelector

const styles = (() => {
  const size = pxW2dp(70)
  return StyleSheet.create({
    wrap: {
      flexDirection: "row", backgroundColor: white, overflow: "hidden",
      flexWrap: "wrap",
      paddingLeft: pxW2dp(60), paddingTop: pxW2dp(24),
      minHeight: size, borderRadius: pxW2dp(10), marginBottom: pxW2dp(30),
    },
    numWrap: {
      width: size, height: size, borderRadius: size/2, overflow: "hidden",
      marginRight: pxW2dp(50), marginBottom: pxW2dp(30),
      alignItems: "center", justifyContent: "center"
    },
    text: {
      fontSize: pxW2dp(26)
    }
  })
})()
