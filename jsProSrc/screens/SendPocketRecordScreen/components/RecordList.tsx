import React, {useCallback, useEffect, useMemo, useRef} from "react"
import {StyleSheet, Text, View} from "react-native"
import {LargeList} from "react-native-largelist-v3"
import {ChineseWithLastDateFooter} from "react-native-spring-scrollview/Customize"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {level4Word} from "js_pro_src/styles/color";
import {UseDataStore} from "js_pro_src/screens/SendPocketRecordScreen/hooks/useDataStore";

const itemHeight = pxW2dp(70)

type Props = {
  list: UseDataStore["list"],
  getMoreList: UseDataStore["getMoreList"],
  setListRef: UseDataStore["setListRef"],
  allLoaded: UseDataStore["allLoaded"]
}
function RecordList({
  list, getMoreList, setListRef, allLoaded
                    }: Props) {
  const LargeListRef = useRef<LargeList>()
  const data = useMemo(() => [{items: list}], [list])
  const renderHeader = useCallback(() => <View style={styles.listHeader} />, [])
  const renderItem = useCallback(({row}: {row: number}) => {
    return (
      <View style={styles.itemWrap}>
        <Text style={styles.normal}>{list[row].name}{row}</Text>
        <Text style={styles.normal}>{list[row].time}</Text>
      </View>
    )
  }, [list])
  const LoadingComp = useMemo(() => {
    return class extends ChineseWithLastDateFooter {
      static style = "stickyScrollView"
    }
  }, [])
  const onLoading = useCallback(() => {
    getMoreList()
  }, [getMoreList])
  useEffect(() => {
    setListRef(LargeListRef)
  }, [setListRef])
  return (
    <LargeList
      ref={r => {
        // @ts-ignore
        LargeListRef.current = r
      }}
      style={styles.wrap} data={data}
      renderHeader={renderHeader}
      heightForIndexPath={() => itemHeight} renderIndexPath={renderItem}
      loadingFooter={LoadingComp}
      onLoading={onLoading} allLoaded={allLoaded}
    />
  )
}

export default RecordList

const styles = StyleSheet.create({
  wrap: {
    flex: 1, paddingHorizontal: pxW2dp(20)
  },
  itemWrap: {
    height: itemHeight, flexDirection: "row",
    alignItems: "center", justifyContent: "space-between"
  },
  normal: {
    fontSize: pxW2dp(26), lineHeight: pxW2dp(34),
    color: level4Word
  },
  listHeader: {
    height: pxW2dp(30),
  },
  listFooter: {
    height: pxW2dp(30)
  }
})
