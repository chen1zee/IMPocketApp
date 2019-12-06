import React, {useCallback, useState} from "react"
import {StyleSheet, View} from "react-native"
import ProIconInput from "js_pro_src/components/ProIconInput";
import {borderColor} from "js_pro_src/styles/color";
import {pxW2dp} from "js_pro_src/utils/sizes";
import HasPickScroll from "./HasPickScroll";
import {LocalStore, SelectedPersonType} from "jsProSrc/hooks/useSelectPeople/useLocalS"
import {ScreenState} from "js_pro_src/screens/CreateChatStack/PicPeopleScreen/PicPeopleScreen";

/** 需要 准备删除 || 删除 对应 item */
export type OnReadyOrDeleteItem = (
  index: number // 选中 index
) => void
export type State = {
  PersonCursor: number // 选中 人 在 selectedPerson 中的 游标
}
/**
 * 暴露Ref
 * */
export type HasPickBarRef = {
  resetPersonCursor: () => void,
}
/**
 * 已选择人 bar
 * */
type Props = {
  selectedPersons: SelectedPersonType[],
  unSelectPerson: LocalStore["unSelectPerson"],
  personCursor: ScreenState["personCursor"],
  changePersonCursor: (i: number) => void
}
function HasPickBar({
  personCursor, changePersonCursor,
  selectedPersons, unSelectPerson
                    }: Props) {
  // 搜索文字
  const [text, setText] = useState("")
  /** 文字修改 */
  const changeText = useCallback(val => {
    setText(val)
  }, [])
  // 设置游标
  const onReadyOrDeleteItem = useCallback<OnReadyOrDeleteItem>((index) => {
    if (personCursor == index) { // 之前已选中 则删除
      changePersonCursor(-1)
      unSelectPerson(index)
    } else { // 变做选中状态
      changePersonCursor(index)
    }
  }, [unSelectPerson, personCursor, changePersonCursor])
  /** 键盘监听， 处理backspace按键 */
  const keyPressHandler = useCallback(({nativeEvent: { key }}) => {
    /** 回退&&无文字&&有选中person */
    if (key == "Backspace" && !text) {
      const l = selectedPersons.length
      if (!l) return // 无选中person 不处理
      onReadyOrDeleteItem(l - 1)
    }
  }, [text, selectedPersons, onReadyOrDeleteItem])
  return (
    <View style={styles.wrap}>
      {/* 左侧已选人 */}
      <View style={styles.left}>
        <HasPickScroll
          maxWidth={pxW2dp(485)} itemWidth={pxW2dp(100)}
          selectedPersons={selectedPersons} personCursor={personCursor}
          onReadyOrDeleteItem={onReadyOrDeleteItem}
        />
      </View>
      {/* 右侧输入框 */}
      <View style={styles.inputWrap}>
        <ProIconInput
          iconName="ios-search" value={text}
          placeholder="输入名字搜索"
          onKeyPress={keyPressHandler}
          changeText={val => changeText(val)}
        />
      </View>
    </View>
  )
}

export default HasPickBar

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row", borderBottomWidth: 1, borderBottomColor: borderColor
  },
  left: {
    flexDirection: "row", flexWrap: "wrap", maxWidth: pxW2dp(500),
  },
  inputWrap: {
    flex: 1
  }
})
