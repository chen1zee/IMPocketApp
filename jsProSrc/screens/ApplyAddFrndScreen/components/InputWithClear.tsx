import React, {useCallback, useMemo, useState} from "react"
import {StyleSheet, TextInput, View} from "react-native"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {level2Word, level3Word, level4Word, red} from "js_pro_src/styles/color";
import Ionicon from "react-native-vector-icons/Ionicons"
import {observer} from "mobx-react-lite";
import {UseStrValidateWithWarningStore} from "js_pro_src/hooks/useStrValidateWithWarningStore";

/**
 * 带清除按钮 input
 * */
type Props = {
  store: UseStrValidateWithWarningStore,
  resetFn: () => void,
  placeholder?: string,
  inputRef?: (r: any) => void
}
const InputWithClear = observer<Props>(function ({
  store,
  resetFn, placeholder, inputRef
                                    }) {
  const maxH = useMemo(() => Math.floor(pxW2dp(200)), [])
  const [inputH, setInputH] = useState(() => Math.floor(pxW2dp(90)))
  // input 改变高度
  const onContentSizeChange = useCallback(({nativeEvent: {contentSize: {height}}}) => {
    if (inputH == height) return
    /** 不同高度，设置高度 */
    if (height > maxH) { // 最大高度
      if (inputH == maxH) return // inputH 已为 最大高度，不调整
      return setInputH(maxH)
    }
    // 未到最大高度
    setInputH(height)
  }, [maxH, inputH])
  /**  */
  const {warning} = store
  return (
    <View style={styles.wrap}>
      <TextInput
        ref={inputRef} value={store.val}
        style={
          [styles.input, {height:inputH}, {borderBottomColor: warning?red:level4Word}]
        }
        onChangeText={store.changeVal} placeholder={placeholder}
        multiline={true} onContentSizeChange={onContentSizeChange}
        maxLength={80} placeholderTextColor={warning?red:level3Word}
      />
      <Ionicon
        onPress={resetFn}
        name="md-close" style={styles.closeIcon}
      />
    </View>
  )
})

export default InputWithClear

const styles = StyleSheet.create({
  wrap: {
    minHeight: pxW2dp(90), paddingHorizontal: pxW2dp(20),
    flexDirection: "row", alignItems: "flex-end",
  },
  input: {
    fontSize: pxW2dp(34), color: level2Word, flex: 1,
    borderBottomWidth: 1, borderBottomColor: level4Word
  },
  closeIcon: {
    fontSize: pxW2dp(40), lineHeight: pxW2dp(70), color: level2Word,
    marginHorizontal: pxW2dp(20)
  }
})
