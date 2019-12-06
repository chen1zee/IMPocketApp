import React, {useCallback, useEffect, useMemo, useRef} from "react"
import {StyleSheet, Text, View} from "react-native"
import {SpringScrollView} from "react-native-spring-scrollview";
import {ChineseWithLastDateHeader} from "react-native-spring-scrollview/Customize"
import {borderColor, cyan, white} from "js_pro_src/styles/color";
import TopInfo from "./TopInfo"
import LabelDesc from "./LabelDesc";
import {pxW2dp} from "js_pro_src/utils/sizes";
import sleep from "js_pro_src/utils/sleep";
import useDetailStore from "js_pro_src/hooks/CashInOut/useDetailStore";
import {useObserver} from "mobx-react-lite";
import {NavigationScreenProp} from "react-navigation";
import ProToast from "js_pro_src/components/ProToast";
import handleReqWithNormalError from "js_pro_src/utils/handleReqWithNormalError";
import ServiceError from "js_pro_src/error/ServiceError";
import LoadingMask from "js_pro_src/components/LoadingMask";

type Props = {
  mode: "in"|"out" // in:充值 ， out:提款
  navigation: NavigationScreenProp<{}, {}>
}
function CashInOutDetail({
  mode, navigation
                         }: Props) {
  // cancelToken.cancel  ref
  const cancelMethodRef = useRef()
  // SpringScrollView ref
  const SpringScrollRef = useRef()
  // detailStore
  const detailStore = useDetailStore({mode})
  /**
   * 模式参数 txt:中文名 cal:符号
   * */
  const modeObj = useMemo<{txt:string,cal:"+"|"-"}>(() => {
    if (mode == "in") return {txt:"充值",cal:"+"}
    return {txt:"提款",cal:"-"}
  },[mode])
  // 下拉刷新
  const refresh = useCallback(async () => {
    // TODO 待对接
    await sleep(1000)
    // @ts-ignore
    SpringScrollRef.current.endRefresh()
  }, [])
  // 初始化 获取数据
  useEffect(() => {
    handleReqWithNormalError({
      reqFunc: async () => {
        LoadingMask.show({
          // @ts-ignore cancel 请求
          onRequestClose: () => cancelMethodRef.current && cancelMethodRef.current(`取消查询${modeObj.txt}详情`)
        })
        await detailStore.getVal(cancelMethodRef)
        LoadingMask.hide()
      },
      superPrevErrorFunc: () => LoadingMask.hide(),
      axiosCancelErrorFunc: () => navigation.goBack(), // 用户取消请求
      unNormalErrorFunc: async (e) => {
        let msg = ""
        if (ServiceError.isInstance(e)) {
          if ((e as ServiceError).detail && (e as ServiceError).detail.code == 201) {
            msg = "找不到相应数据，请确认后再试"
          }
        }
        ProToast.showTop({content: msg||e.message})
        await sleep(1000)
        navigation.goBack()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return useObserver(() => (
    <React.Fragment>
      <SpringScrollView
        style={styles.wrap} onRefresh={refresh}
        ref={r => {
          // @ts-ignore
          SpringScrollRef.current = r
        }}
        refreshHeader={ChineseWithLastDateHeader}
      >
        {/** 头部信息 */}
        <TopInfo
          type={detailStore.val.type}
          cal={modeObj.cal}
          money={detailStore.val.money}
        />
        {/** 详情 */}
        <View style={styles.detailTopBorderWrap}>
          <View style={styles.detailTopBorder} />
        </View>
        <View style={styles.detailWrap}>
          <LabelDesc label="状态" desc={detailStore.statusTxt} />
          <LabelDesc label={`${modeObj.txt}时间`} desc={detailStore.val.date} />
          <LabelDesc label={`${modeObj.txt}方式`} desc={detailStore.val.type} />
          <LabelDesc label="交易号" desc={detailStore.val.tranNo} />
          <LabelDesc label="商户单号" desc={detailStore.val.induNo} />
        </View>
        <Text style={styles.question}>对此订单有疑惑？</Text>
      </SpringScrollView>
    </React.Fragment>
  ))
}

export default CashInOutDetail

const styles = StyleSheet.create({
  wrap: {
    flex: 1, backgroundColor: borderColor, alignContent: "center"
  },
  detailWrap: {
    alignItems: "center",
    backgroundColor: white, paddingHorizontal: pxW2dp(80),
    paddingBottom: pxW2dp(20), marginBottom: pxW2dp(80)
  },
  detailTopBorderWrap: {
    backgroundColor: white, justifyContent: "center",
    paddingHorizontal: pxW2dp(30)
  },
  detailTopBorder: {
    height: 1, backgroundColor: borderColor,
  },
  question: {
    fontSize: pxW2dp(28), lineHeight: pxW2dp(40), color: cyan,
    alignSelf: "center"
  }
})
