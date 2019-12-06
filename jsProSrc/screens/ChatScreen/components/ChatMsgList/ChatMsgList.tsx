import {FlatList, Keyboard, StyleSheet, View} from "react-native";
import React, {useCallback, useEffect, useRef} from "react";
import {ChatItemWithId} from "../../ChatScreen";
import ChatMsgItem from "./ChatMsgItem";
import {pxW2dp} from "js_pro_src/utils/sizes";
import emitter from "js_pro_src/events/emitter";
import {chatBtmBarDeltaH} from "js_pro_src/events/eventNames";

/**
 * 聊天内容列表
 * */
type Props = {
  list: ChatItemWithId[],
  onPress: (item: ChatItemWithId, index: number) => void
}

function ChatMsgList({
  list, onPress
                     }: Props) {
  const FlatListRef = useRef(null)
  const offsetHeight = useRef(0) // 列表偏移量
  const renderItem = useCallback((item, index) => (
    <ChatMsgItem {...item} onPress={() => onPress(item, index)} />
  ), [onPress])
  const ListHeaderComponent = useCallback(() => (
    <View style={{height: pxW2dp(40)}} />
  ), [])
  const setListHeight = useCallback(height => {
    // @ts-ignore
    FlatListRef.current.scrollToOffset({offset: height, animated: true})
  }, [])
  useEffect(function () {
    let keyboardHeight = 0 // 键盘高度
    /** 键盘显示 */
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", ({endCoordinates}) => {
      keyboardHeight = endCoordinates.height
      setListHeight(offsetHeight.current + keyboardHeight)
    })
    /** 键盘隐藏 */
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setListHeight(offsetHeight.current - keyboardHeight)
    })
    /** 监听文字输入框， 高度变化 */
    const deltaHListener = emitter.on(chatBtmBarDeltaH, delta => {
      setListHeight(offsetHeight.current + delta)
    })
    return function () {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
      emitter.remove(deltaHListener)
    }
  }, [setListHeight])
  return (
    <FlatList ref={FlatListRef}
      onScroll={({nativeEvent}) => {offsetHeight.current = nativeEvent.contentOffset.y}}
      style={styles.flatList} data={list}
      renderItem={({item,index}) => renderItem(item, index)}
      keyExtractor={item => String(item.id)}
      ListHeaderComponent={ListHeaderComponent}
    />
  )
}

export default ChatMsgList

const styles = (() => {
  return StyleSheet.create({
    flatList: {flex: 1},
  })
})()
