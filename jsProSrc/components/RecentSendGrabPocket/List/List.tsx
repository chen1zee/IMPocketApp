import React, {useCallback, useEffect, useMemo, useRef, useState} from "react"
import {StyleSheet, Text, View} from "react-native"
import TypePicker from "./TypePicker";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {borderColor, level1Word, level2Word} from "js_pro_src/styles/color";
import {LargeList} from "react-native-largelist-v3";
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import {ChineseWithLastDateHeader} from "react-native-spring-scrollview/Customize"
import sleep from "js_pro_src/utils/sleep";
import useListStore from "js_pro_src/hooks/RecentSendGrabPocket/useListStore";
import {useObserver} from "mobx-react-lite";

/**
 * 发出去||抢到 的包 （7天） 列表
 * */

const pickerH = Math.floor(pxW2dp(120))
const cellH = Math.floor(pxW2dp(200))

export type PickerItem = { // 选择器 item
  label:string, value: PocketType
}
/**
 * 红包类型
 * all:"全部" mine:"扫雷" banGrab:"禁抢" person:"个人"
 * */
export type PocketType = "all"|"mine"|"banGrab"|"person"
type Props = {
  mode: "send"|"grab", // 模式 ，， 发出去 || 抢到的
}
function List({}: Props) {
  // LargeList Ref
  const LargeListRef = useRef<LargeList>()
  // 列表数据
  const listStore = useListStore()
  // 红包类型
  const [pocketType, setPocketType] = useState<PocketType>("all")
  // 红包类型 s
  const pickItems = useMemo<PickerItem[]>(() => [
    {label:"全部",value:"all"},{label:"扫雷",value:"mine"},
    {label:"禁抢",value:"banGrab"},{label:"个人",value:"person"}
  ], [])
  // Header Comp
  const Header = useCallback(() => (
    <View>
      <TypePicker
        pocketType={pocketType}
        setPocketType={v => setPocketType(v as PocketType)}
        pickItems={pickItems} height={pickerH}
      />
    </View>
  ), [pocketType, pickItems])
  // Item Comp
  const RenderItem = useCallback(({row}: {row:number}) => {
    const item = listStore.val[row]
    return (
      <View style={styles.cell.outer}>
        <TouchableWrap
          style={styles.cell.wrap}
          onPress={() => {}}
        >
          <View style={styles.cell.left}>
            <Text numberOfLines={1} style={styles.cell.title}>{item.name}</Text>
            <Text style={styles.cell.type}>{item.typeTxt}</Text>
            <Text style={styles.cell.date}>{item.dateTxt}</Text>
          </View>
          <View style={styles.cell.right}>
            <View style={styles.cell.monWrap}>
              <Text style={styles.cell.moneyCal}>-</Text>
              <Text style={styles.cell.money}>{item.money}</Text>
            </View>
          </View>
        </TouchableWrap>
      </View>
    )
  }, [listStore])
  // Footer Comp
  const Footer = useCallback(() => (
    <View style={styles.cell.footer} />
  ), [])
  // 下拉刷新
  const onRefresh = useCallback(async () => {
    await sleep(1000)
    // @ts-ignore
    LargeListRef.current.endRefresh()
  }, [])
  // 初始化 获取数据
  useEffect(() => {
    listStore.getVal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return useObserver(() => (
    <LargeList
      ref={r => {
        // @ts-ignore
        LargeListRef.current = r
      }}
      refreshHeader={ChineseWithLastDateHeader}
      onRefresh={onRefresh}
      data={[{items: listStore.val}]} headerStickyEnabled={true}
      renderHeader={Header}
      heightForIndexPath={() => cellH}
      renderIndexPath={RenderItem}
      renderFooter={Footer}
    />
  ))
}

export default List

const styles = (() => {
  return {
    cell: StyleSheet.create({
      outer: {
        height: cellH
      },
      wrap: {
        flexDirection: "row", alignItems: "center", height: cellH,
        borderBottomWidth: 1, borderBottomColor: borderColor
      },
      left: {
        width: pxW2dp(550), paddingLeft: pxW2dp(20)
      },
      title: {
        fontSize: pxW2dp(30), lineHeight: pxW2dp(60), color: level1Word
      },
      type: {
        fontSize: pxW2dp(24), lineHeight: pxW2dp(44), color: level2Word
      },
      date: {
        fontSize: pxW2dp(24), lineHeight: pxW2dp(44), color: level2Word
      },
      right: {
        flex: 1, paddingRight: pxW2dp(20), alignItems: "flex-end"
      },
      monWrap: {
        flexDirection: "row", alignItems: "center"
      },
      moneyCal: {
        fontSize: pxW2dp(34), lineHeight: pxW2dp(44), color: level1Word,
        fontWeight: "600", marginRight: pxW2dp(4)
      },
      money: {
        fontSize: pxW2dp(34), lineHeight: pxW2dp(44), color: level1Word,
        fontWeight: "600"
      },
      footer: {
        height: pxW2dp(80)
      }
    })
  }
})()
