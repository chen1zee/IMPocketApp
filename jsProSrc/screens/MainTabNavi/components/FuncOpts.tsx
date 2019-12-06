import React, {memo, useCallback, useImperativeHandle, useState} from "react"
import {StyleSheet, Text, View} from "react-native"
import ProModal from "js_pro_src/components/ProModal";
import {borderColor, level2Word, white} from "js_pro_src/styles/color";
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import {screenW} from "js_pro_src/utils/sizes";

// 选项 text: 显示文字, key: 选项对应 "key"
export type FuncOptType = {
  text: string,
  key: string,
  onPress: (() => void) | (<T>() => Promise<T>)
}
/**
 * 功能列表
 * 如： 消息列表页 [置顶，免打扰，删除对话]
 * */
type Props = {
  chatOptWidth: number, chatOptHeight: number,
  /** 允许 FuncOpts显示 的全宽高, */
  fullWidth?: number, fullHeight: number,
  opts: FuncOptType[],
  cRef?: any
}

const FuncOpts = memo<Props>(function ({
  chatOptWidth, chatOptHeight,
  fullWidth=screenW, fullHeight,
  opts, cRef
                                  }) {
  const [visible, setVisible] = useState(false)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  // 打开 调整位置 && 打开flag
  const open = useCallback((pageX: number, pageY: number) => {
    let x = pageX, y = pageY
    if (pageX + chatOptWidth > fullWidth) x = x - chatOptWidth
    if (pageY + chatOptHeight > fullHeight) {
      y = y - chatOptHeight
    }
    setOffsetX(x)
    setOffsetY(y)
    setVisible(true)
  }, [chatOptWidth, chatOptHeight, fullWidth, fullHeight])
  // 关闭
  const cancel = useCallback(() => {
    setVisible(false)
  }, [])
  // 点击处理
  const onPressHandler = async opt => {
    try {
      await opt.onPress()
    } finally {
      setVisible(false)
    }
  }
  // 暴露 本组件 open方法
  // @ts-ignore
  useImperativeHandle(cRef, () => ({
    open
  }), [open])
  return (
    <ProModal
      visible={visible} backgroundColor="transparent"
      onRequestClose={cancel} onDismiss={cancel}
    >
      <View
        style={[
          styles.chatOptWrap, {width: chatOptWidth},
          {transform: [{translateX: offsetX}, {translateY: offsetY}]}
        ]}
      >
        {opts.map(opt => (
          <TouchableWrap
            style={styles.chatItem} key={opt.key}
            onPress={() => onPressHandler(opt)}
          >
            <Text style={styles.chatItemText}>{opt.text}</Text>
          </TouchableWrap>
        ))}
      </View>
    </ProModal>
  )
})

export default FuncOpts

const styles = StyleSheet.create({
  chatOptWrap: {
    position: "absolute", top: 0, left: 0,
    borderWidth: 2, borderColor: borderColor, backgroundColor: white
  },
  chatItem: { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingLeft: 24 },
  chatItemText: { fontSize: 16, color: level2Word, fontWeight: "600" }
})
