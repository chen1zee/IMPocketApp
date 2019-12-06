import React, {useCallback, useRef} from "react"
import {StatusBar, StyleSheet, View} from "react-native"
import {NavigationScreenProp} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor, green, moreGray} from "js_pro_src/styles/color";
import useAndroidBackBtn2MainTab from "js_pro_src/hooks/useAndroidBackBtn2MainTab";
import {SpringScrollView} from "react-native-spring-scrollview";
import ProButton from "js_pro_src/components/ProButton";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {NavigationStackOptions} from "react-navigation-stack";
import PicImgByStore from "js_pro_src/screens/BindIDCardScreen/components/PicImgByStore";
import {
  useAreaStore,
  useEidPhotoAStore,
  useEidPhotoBStore, useEidStore,
  useUnameStore
} from "js_pro_src/screens/BindIDCardScreen/hooks/useFormInputStore";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import InputCell from "js_pro_src/components/InputCell";
import handleReqWithNormalError from "js_pro_src/utils/handleReqWithNormalError";
import LoadingMask from "js_pro_src/components/LoadingMask";
import validateValidateFuncs from "js_pro_src/utils/validateValidateFuncs";
import {bindEid} from "js_pro_src/api/wallet";
import ProToast from "js_pro_src/components/ProToast";

type NavigationParams = {}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}

function Comp({navigation}: Props) {
  // cancelToken.cancel  ref
  const cancelMethodRef = useRef();
  /** Input Refs */
  const UnameRef = useRef();  const EidRef = useRef(); const AreaRef = useRef();
  // 姓名       //  身份证号码     // 地区
  const unameStore = useUnameStore(); const eidStore = useEidStore(); const areaStore = useAreaStore()
  // 身份证 正面       // 身份证 反面
  const eidPhotoAStore = useEidPhotoAStore(); const eidPhotoBStore = useEidPhotoBStore()
  // 前端验证&&提交
  const submit = useCallback(() => {
    handleReqWithNormalError({
      reqFunc: async () => {
        if (LoadingMask.isShowing()) return
        LoadingMask.show({
          onRequestClose: () => {
            // @ts-ignore 用户取消请求
            cancelMethodRef.current && cancelMethodRef.current("取消绑定身份证")
          }
        })
        const uname = unameStore.val; const eid = eidStore.val;
        const area = areaStore.val;
        await validateValidateFuncs([
          () => unameStore.validate(uname), () => eidStore.validate(eid), () => areaStore.validate(area),
          () => eidPhotoAStore.validate(), () => eidPhotoBStore.validate()
        ])
        // 验证通过 // TODO 对接中
        const res = await bindEid({
          uname,eid,area,eid_photo_a:eidPhotoAStore.imgStore.imgInfo.path,
          eid_photo_b:eidPhotoBStore.imgStore.imgInfo.path
        }, cancelMethodRef)
        console.log(res)
        LoadingMask.hide()
      },
      superPrevErrorFunc: () => LoadingMask.hide(),
      unNormalErrorFunc: err => ProToast.showTop({content: err.message})
    })
  }, [unameStore,eidStore,areaStore,eidPhotoAStore,eidPhotoBStore])
  // 处理 android 返回键问题
  useAndroidBackBtn2MainTab({navigation})
  return (
    <SpringScrollView
      style={styles.wrap} bounces={false}
      textInputRefs={[UnameRef,EidRef,AreaRef]}
      inputToolBarHeight={170}
    >
      <View style={styles.inner}>
        <View style={styles.contentWrap}>
          {/** 姓名 */}
          <InputCell
            CInputRef={UnameRef}
            strValidWarningStore={unameStore}
            iconName="md-person" placeholder="请填写姓名"
          />
          {/** 身份证号码 */}
          <InputCell
            CInputRef={EidRef}
            strValidWarningStore={eidStore}
            iconName="id-card" placeholder="请填写身份证号码"
            OtherIconComp={FontAwesome} iconStyle={styles.idCardIcon}
          />
          {/** 地区 */}
          <InputCell
            CInputRef={AreaRef}
            strValidWarningStore={areaStore}
            iconName="md-pin" placeholder="请填写地区"
          />
          <View style={styles.emptyA} />
          {/** 身份证正面 */}
          <PicImgByStore
            label="身份证正面" imgStore={eidPhotoAStore.imgStore}
            warning={eidPhotoAStore.warning}
          />
          {/** 身份证反面 */}
          <PicImgByStore
            label="身份证反面" imgStore={eidPhotoBStore.imgStore}
            warning={eidPhotoBStore.warning}
          />
          <ProButton
            style={styles.btn} textStyle={styles.btnTxt}
            text="绑定身份证" onPress={submit}
          />
        </View>
      </View>
    </SpringScrollView>
  )
}

// 导航设置
Comp.navigationOptions = (): NavigationStackOptions => {
  return {
    headerStyle: {backgroundColor: borderColor}
  }
}

const BindIDCardScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default BindIDCardScreen

const styles = StyleSheet.create({
  wrap: {
    flex: 1, backgroundColor: moreGray
  },
  inner: {
    paddingTop: pxW2dp(150), alignItems: "center"
  },
  contentWrap: {
    width: pxW2dp(600),
  },
  btn: {
    alignItems: "center", backgroundColor: green, height: pxW2dp(80),
    borderRadius: pxW2dp(5), marginTop: pxW2dp(80)
  },
  btnTxt: {
    fontSize: pxW2dp(36)
  },
  idCardIcon: {
    fontSize: pxW2dp(40)
  },
  emptyA: {
    marginBottom: pxW2dp(40)
  }
})
