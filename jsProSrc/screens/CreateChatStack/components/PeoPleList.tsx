import React, {useCallback} from "react"
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native"
import {LargeList} from "react-native-largelist-v3"
import {ListType} from "jsProSrc/hooks/useSelectPeople/useLocalS";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {borderColor, level2Word, level3Word} from "js_pro_src/styles/color";
import ProCheckBox from "js_pro_src/components/ProCheckBox";

const itemHeight = pxW2dp(140)
const sectionHeight = pxW2dp(40)

type PropsType = {
  data: ListType,
  // 切换选中状态 func
  onToggle: (section: number, row: number) => void
}
function PeoPleList({
  data, onToggle
                    }: PropsType) {
  const heightForSection = useCallback(() => sectionHeight, [])
  const heightForIndexPath = useCallback(() => itemHeight, [])
  // 渲染 section
  const renderSection = useCallback((section: number) => (
    <View style={styles.sectionWrap}>
      <Text style={styles.sectionText}>{data[section].section}</Text>
    </View>
  ), [data])
  // 渲染 person
  const renderIndexPath = useCallback(({section, row}) => {
    const item = data[section].items[row]
    return (
      <View style={styles.cellWrap}>
        <View style={styles.cellInnerWrap}>
          {/* 左侧 */}
          <TouchableWithoutFeedback onPress={() => onToggle(section, row)}>
            <View style={styles.leftWrap}>
              <Image style={styles.leftWrapImg} source={item.img} />
              <ProCheckBox
                wrapStyle={styles.checkBox}
                val={item.selected} activeVal={true}
                size={pxW2dp(34)}
              />
            </View>
          </TouchableWithoutFeedback>
          {/* 右侧文字 */}
          <View style={styles.rightWrap}>
            <Text style={styles.rightName}>{item.name}</Text>
            <Text style={styles.rightTime}>{item.timeTxt}</Text>
          </View>
        </View>
      </View>
    )
  }, [data, onToggle])
  return (
    <LargeList
      data={data}
      heightForIndexPath={heightForIndexPath}
      renderIndexPath={renderIndexPath}
      heightForSection={heightForSection}
      renderSection={renderSection}
      bounces={false}
    />
  )
}

export default PeoPleList

const styles = (() => {
  const imgSize = pxW2dp(100)
  return StyleSheet.create({
    wrap: {

    },
    sectionWrap: {
      paddingLeft: pxW2dp(20), justifyContent: "center", backgroundColor: borderColor,
    },
    sectionText: {
      fontSize: pxW2dp(24), lineHeight: pxW2dp(40), color: level2Word
    },
    cellWrap: {
      justifyContent: "center", flex: 1
    },
    cellInnerWrap: {
      flexDirection: "row", alignItems: "center",
    },
    leftWrap: {
      marginHorizontal: pxW2dp(20), position: "relative",
      borderRadius: pxW2dp(5), overflow: "hidden"
    },
    leftWrapImg: {
      width: imgSize, height: imgSize,
    },
    checkBox: {
      position: "absolute", bottom: pxW2dp(5), right: pxW2dp(5)
    },
    rightWrap: {
      justifyContent: "space-between", height: imgSize,
    },
    rightName: {
      fontSize: pxW2dp(30), color: level2Word, lineHeight: pxW2dp(40)
    },
    rightTime: {
      fontSize: pxW2dp(24), color: level3Word, lineHeight: pxW2dp(40)
    }
  })
})()
