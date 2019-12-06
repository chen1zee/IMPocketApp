import React, {useCallback, useEffect, useMemo, useRef} from "react"
import {Image, ScrollView, StyleSheet, TouchableWithoutFeedback, View} from "react-native"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {maskLight} from "js_pro_src/styles/color";
import {SelectedPersonType} from "jsProSrc/hooks/useSelectPeople/useLocalS";
import {OnReadyOrDeleteItem, State} from "./HasPickBar";

/**
 * 左上角 已经选中 people scroll
 * */
type Props = {
  personCursor: State["PersonCursor"] // 选中 游标
  selectedPersons: SelectedPersonType[], // 选中list
  maxWidth: number, // 最大宽度
  itemWidth: number, // 每个item占宽度
  onReadyOrDeleteItem: OnReadyOrDeleteItem
}
function HasPickScroll({
  selectedPersons, onReadyOrDeleteItem, personCursor,
  maxWidth, itemWidth
                       }: Props) {
  /** 选中人 列表长度 */
  const selectedLen = useMemo(() => selectedPersons.length, [selectedPersons])
  /** scroll 宽度 根据 selectedPersons 确定 */
  const scrollWidth = useMemo(() => {
    if (selectedLen * itemWidth > maxWidth) return maxWidth
    return selectedLen * itemWidth
  }, [selectedLen, itemWidth, maxWidth])
  const ScrollViewRef = useRef<ScrollView>()
  /** 当 scrollWidth 变化时， 调整 scrollTo */
  useEffect(() => {
    ScrollViewRef.current && ScrollViewRef.current.scrollToEnd({animated: true})
  }, [selectedLen, scrollWidth])
  const renderItem = useCallback((item: SelectedPersonType, index: number) => (
    <TouchableWithoutFeedback key={item.item.id} onPress={() => onReadyOrDeleteItem(index)}>
      <View style={styles.wrap}>
        <Image source={item.item.img} style={styles.img} />
        <View style={[
          styles.mask,
          {backgroundColor: index == personCursor ? maskLight : "transparent"}
        ]}
        />
      </View>
    </TouchableWithoutFeedback>
  ), [personCursor, onReadyOrDeleteItem])
  return (
    <ScrollView
      ref={r => {
        // @ts-ignore
        ScrollViewRef.current = r
      }}
      horizontal={true} showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={[styles.scrollWrap, {width: scrollWidth}]}
    >
      {selectedPersons.map((item, index) => renderItem(item, index))}
    </ScrollView>
  )
}

export default HasPickScroll

const styles = (() => {
  const imgSize = pxW2dp(80)
  const wrapSize = imgSize + pxW2dp(5)
  return StyleSheet.create({
    scrollWrap: { height: pxW2dp(90)},
    container: { alignItems: "center" },
    wrap: {
      width: wrapSize, height: wrapSize,
      justifyContent: "center", alignItems: "center", position: "relative"
    },
    mask: {
      position: "absolute", top: 0, left: 0,
      width: wrapSize, height: wrapSize,
    },
    img: { width: imgSize, height: imgSize, borderRadius: pxW2dp(5) }
  })
})()
