import React, {memo, useCallback, useEffect, useMemo, useRef} from "react"
import {StyleSheet, Text, View} from "react-native"
import Ionicon from "react-native-vector-icons/Ionicons"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {borderColor, gray, level1Word, level2Word, white} from "js_pro_src/styles/color";
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import {LargeList} from "react-native-largelist-v3";
import {ChineseWithLastDateHeader} from "react-native-spring-scrollview/Customize"
import useListStore, {UseListStoreItem} from "js_pro_src/hooks/CashInOut/useListStore";
import {useObserver} from "mobx-react-lite";
import sleep from "js_pro_src/utils/sleep";
import handleReqWithNormalError from "js_pro_src/utils/handleReqWithNormalError";
import {NavigationScreenProp} from "react-navigation";
import ProToast from "js_pro_src/components/ProToast";
import LoadingMask from "js_pro_src/components/LoadingMask";
import EmptyList from "js_pro_src/components/EmptyList";
import log from "js_pro_src/utils/log";

/**
 * 充值
 * */
// section 高度
const sectionSize = Math.floor(pxW2dp(90))
const itemSzie = Math.floor(pxW2dp(140))

type Props = {
  mode: "in" | "out", // in:充值 ， out:提款
  goDetail: (item: UseListStoreItem) => void // 去详情
  navigation: NavigationScreenProp<{}, {}>
}
const CashInOutList = memo<Props>(function({
  mode, goDetail, navigation
                                           }) {
  // cancelToken.cancel  ref
  const cancelMethodRef = useRef()
  // LargeList Ref
  const LargeListRef = useRef()
  // 列表 store
  const listStore = useListStore(mode)
  /** 模式参数 txt:中文名, cal:符号 */
  const modeObj = useMemo(() => {
    if (mode == "in") return {txt:"充值",cal:"+"}
    return {txt:"提现",cal:"-"}
  }, [mode])
  // Section 组件
  const SectionComp = useCallback((section: number) => {
    const sectObj = listStore.val[section]
    return (
      <View style={styles.section.sectionWrap}>
        <Text style={styles.section.dateWrap}>{sectObj.sectionDate}</Text>
        <View style={styles.section.cashDescWrap}>
          <Text style={styles.section.cashDescTxt}>{modeObj.txt}总计&nbsp;&nbsp;&nbsp;</Text>
          <Ionicon name="logo-yen" style={styles.section.cashDescYen}/>
          <Text style={styles.section.cashDescMon}>{sectObj.sum}</Text>
        </View>
      </View>
    )
  }, [modeObj, listStore])
  // Item 组件
  const ItemComp = useCallback(({section, row}: {section:number,row:number}) => {
    const item = listStore.val[section].items[row]
    return (
      <View style={styles.item.itemOutWrap}>
        <TouchableWrap style={styles.item.itemWrap} onPress={() => goDetail(item)}>
          <View style={styles.item.itemLeft}>
            <Text style={styles.item.way}>{item.name}</Text>
            <Text style={styles.item.date}>{item.date}</Text>
          </View>
          <View style={styles.item.moneyWrap}>
            <Text style={styles.item.cal}>{modeObj.cal}</Text>
            <Text style={styles.item.mon}>{item.mon}</Text>
          </View>
        </TouchableWrap>
      </View>
    )
  }, [modeObj, listStore, goDetail])
  // 空列表 组件
  const EmptyComp = useCallback(() => <EmptyList msg="您还没有任何充值记录" />, [])
  /**
   * 获取列表
   * @param {boolean} shouldShowLoadingMask (初次加载)应该 显示loading mask
   * @param {boolean} userCancelShouldGoBack // 用户取消请求 应该 goBack
   * */
  const getList = useCallback((shouldShowLoadingMask=false, userCancelShouldGoBack=false) => {
    handleReqWithNormalError({
      reqFunc: async () => {
        shouldShowLoadingMask && LoadingMask.show({
          // @ts-ignore  cancel 请求
          onRequestClose: () => { cancelMethodRef.current && cancelMethodRef.current(`取消查询${modeObj.txt}列表`) }
        })
        await listStore.getVal(cancelMethodRef)
        shouldShowLoadingMask && LoadingMask.hide()
      },
      superPrevErrorFunc: () => shouldShowLoadingMask && LoadingMask.hide(),
      axiosCancelErrorFunc: () => { // 用户取消请求
        userCancelShouldGoBack && navigation.goBack()
      },
      unNormalErrorFunc: async (e) => {
        ProToast.showTop({content:e.message})
        await sleep(500)
        navigation.goBack()
      }
    })
  }, [listStore, modeObj, navigation])
  // 下拉刷新
  const refresh = useCallback(async () => {
    try {
      await Promise.all([getList(),sleep(1000)])
    } catch (e) { log.d(e) }
    // @ts-ignore
    LargeListRef.current.endRefresh()
  }, [getList])
  // 初始化列表
  useEffect(() => {
    getList(true, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return useObserver(() => (
    <LargeList
      style={styles.wrap.wrap} data={listStore.val}
      renderSection={SectionComp} heightForSection={() => sectionSize}
      renderIndexPath={ItemComp} heightForIndexPath={() => itemSzie}
      onRefresh={refresh} refreshHeader={ChineseWithLastDateHeader}
      renderEmpty={EmptyComp}
      ref={r => {
        // @ts-ignore
        LargeListRef.current = r
      }}
    />
  ))
})

export default CashInOutList

const styles = (() => {
  return {
    wrap: StyleSheet.create({
      wrap: {flex: 1}
    }),
    section: StyleSheet.create({
      sectionWrap: {
        height: sectionSize, paddingHorizontal: pxW2dp(20), backgroundColor: gray,
        flexDirection: "row", alignItems: "center", justifyContent: "space-between"
      },
      dateWrap: {
        fontSize: pxW2dp(30), lineHeight: pxW2dp(36), color: level1Word,
      },
      cashDescWrap: {
        flexDirection: "row", alignItems: "flex-end"
      },
      cashDescTxt: {
        fontSize: pxW2dp(30), lineHeight: pxW2dp(40), color: level2Word
      },
      cashDescYen: {
        fontSize: pxW2dp(26), color: level1Word, lineHeight: pxW2dp(40),
        top: pxW2dp(-3), marginRight: pxW2dp(4)
      },
      cashDescMon: {
        fontSize: pxW2dp(28), lineHeight: pxW2dp(44), color: level1Word
      },
    }),
    item: StyleSheet.create({
      itemOutWrap: { height: itemSzie },
      itemWrap: {
        backgroundColor: white, padding: pxW2dp(30), height: itemSzie,
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        borderBottomWidth: 1, borderBottomColor: borderColor
      },
      itemLeft: {
        paddingLeft: pxW2dp(10)
      },
      way: {
        fontSize: pxW2dp(30), lineHeight: pxW2dp(44), color: level1Word,
        marginBottom: pxW2dp(10)
      },
      date: {
        fontSize: pxW2dp(26), lineHeight: pxW2dp(34), color: level2Word
      },
      moneyWrap: {
        flexDirection: "row", alignItems: "center"
      },
      cal: {
        fontSize: pxW2dp(40), lineHeight: pxW2dp(55), fontWeight: "600",
        color: level1Word, marginRight: pxW2dp(4), top: pxW2dp(-4)
      },
      mon: {
        fontSize: pxW2dp(34), lineHeight: pxW2dp(44), fontWeight: "bold",
        color: level1Word,
      },
    })
  }
})()
