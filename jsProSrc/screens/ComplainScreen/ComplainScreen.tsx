import React, {useCallback, useRef} from "react"
import {Image, StatusBar, StyleSheet, Text, TextInput, View} from "react-native"
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {borderColor, cyan, green, lessGray, level2Word, orange, red, white} from "js_pro_src/styles/color";
import {SpringScrollView} from "react-native-spring-scrollview";
import LabelInput from "js_pro_src/components/LabelInput";
import {pxW2dp} from "js_pro_src/utils/sizes";
import ProButton from "js_pro_src/components/ProButton";
import Ionicon from "react-native-vector-icons/Ionicons"
import {NavigationScreenProp, StackActions} from "react-navigation";
import {NavigationStackOptions} from "react-navigation-stack";
import useReason from "./hooks/useReason";
import usePhone from "./hooks/usePhone";
import useEmail from "./hooks/useEmail";
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import ProPicImgOptsModal from "js_pro_src/components/ProPicImgOptsModal";
import useImg from "js_pro_src/hooks/useImg";
import ProToast from "js_pro_src/components/ProToast";
import validateValidateFuncs from "js_pro_src/utils/validateValidateFuncs";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";

type NavigationParams = {
}
type ScreenProps = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}

function Comp({
  navigation
              }: ScreenProps) {
  const ReasonInputRef = useRef()
  const PhoneRef = useRef()
  const EmailRef = useRef()
  // 原因
  const reason = useReason()
  // 手机
  const phone = usePhone()
  // 邮箱
  const email = useEmail()
  // 图片
  const img = useImg()
  // 跳转投诉须知
  const goComplainNeedKnow = useCallback(() => {
    navigation.dispatch(StackActions.push({ routeName: SCREEN_NAMES.ComplainNeedKnow }))
  }, [navigation])
  // 验证表单 && 提交表单
  const pendingRef = useRef(false)
  const submit = useCallback<() => Promise<void>>(async () => {
    if (pendingRef.current) return
    pendingRef.current = true
    try {
      await validateValidateFuncs([
        () => reason.validate(reason.val), // 原因
        () => phone.validate(phone.val), // 手机
        () => email.validate(email.val) // 邮箱
      ])
      // 验证通过 TODO
      console.log("提交 投诉 待完成")
      pendingRef.current = false
    } catch (err) {
      ProToast.showTop({content: err.message})
      pendingRef.current = false
    }
  }, [reason, phone, email])
  return (
    <React.Fragment>
      <SpringScrollView
        style={styles.wrap}
        textInputRefs={[ReasonInputRef,PhoneRef,EmailRef]}
        inputToolBarHeight={80}
      >
        <Text style={styles.goldTxt}>请尽可能详细的填写投诉原因，方便我们为你调解纠纷</Text>
        {/** 投诉原因 */}
        <TextInput
          ref={r => {
            // @ts-ignore
            ReasonInputRef.current = r
          }}
          value={reason.val} onChangeText={reason.changeVal}
          style={[styles.reason, reason.warning?styles.warningReason:{}]}
          multiline={true} placeholder="请填写投诉原因"
          textAlignVertical="top"
        />
        {/** 图片 选填 */}
        {img.val !== "" &&
        <Image
          style={styles.imgPreviewWrap}
          source={{uri: img.val}}
        />}
        <TouchableWrap
          style={styles.imgBtnWrap}
          onPress={img.openModal}
        >
          <Ionicon name="md-add" style={styles.imgBtnIcon} />
          <Text style={styles.imgBtnTxt}>上传图片（选填）</Text>
        </TouchableWrap>
        <LabelInput
          cRef={r => { PhoneRef.current = r }}
          val={phone.val} changeVal={phone.changeVal}
          prevLabel="电话：" postLabel={null}
          placeholder="请填写能联系到您的电话"
          keyboardType="numeric" warning={phone.warning}
        />
        <LabelInput
          cRef={r => {EmailRef.current = r}}
          val={email.val} changeVal={email.changeVal}
          prevLabel="邮箱：" postLabel={null}
          placeholder="请填写能联系到您的邮箱"
          keyboardType="email-address" warning={email.warning}
        />
        {/** 按钮 */}
        <ProButton
          text="提交" onPress={submit}
          style={styles.btnWrap} textStyle={styles.btnText}
        />
        <View style={styles.needKnowBar}>
          <Ionicon name="md-information-circle-outline" style={styles.needKnowIcon} />
          <Text onPress={goComplainNeedKnow} style={styles.needKnowTxt}>投诉须知</Text>
        </View>
      </SpringScrollView>
      {/** 选择图片 opts 蒙层 */}
      <ProPicImgOptsModal
        visible={img.showingModal} onClose={img.closeModal}
        onPressCamera={() => img.picImg("openCamera")}
        onPressGallery={() => img.picImg("openPicker")}
      />
    </React.Fragment>
  )
}

Comp.navigationOptions = (): NavigationStackOptions => {
  return {
    headerStyle: {backgroundColor: borderColor}
  }
}

const ComplainScreen = handleNaviLifecyleHOC(Comp, {
  willFocus: () => StatusBar.setBackgroundColor(borderColor)
})

export default ComplainScreen

const styles = StyleSheet.create({
  wrap: {
    flex: 1, paddingHorizontal: pxW2dp(20), backgroundColor: lessGray
  },
  goldTxt: {
    fontSize: pxW2dp(24), lineHeight: pxW2dp(100), color: orange
  },
  reason: {
    height: pxW2dp(250), fontSize: pxW2dp(28),
    backgroundColor: white, marginBottom: pxW2dp(30),
    borderRadius: pxW2dp(10), paddingHorizontal: pxW2dp(20),
  },
  warningReason: {
    borderWidth: pxW2dp(2), borderColor: red,
  },
  btnWrap: {
    backgroundColor: green, alignItems: "center", height: pxW2dp(90),
    marginTop: pxW2dp(40), marginBottom: pxW2dp(50)
  },
  btnText: {
    fontSize: pxW2dp(32)
  },
  needKnowBar: {
    flexDirection: "row", alignItems: "center", justifyContent: "center"
  },
  needKnowIcon: {
    fontSize: pxW2dp(40), color: green, marginRight: pxW2dp(20)
  },
  needKnowTxt: {
    fontSize: pxW2dp(28), color: cyan,
  },
  imgPreviewWrap: {
    width: pxW2dp(200), height: pxW2dp(200), marginBottom: pxW2dp(30),
    alignSelf: "center"
  },
  imgBtnWrap: {
    height: pxW2dp(90), backgroundColor: white,
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    borderRadius: pxW2dp(10), borderWidth: pxW2dp(1), borderColor: borderColor,
    marginBottom: pxW2dp(30)
  },
  imgBtnIcon: {
    fontSize: pxW2dp(40), color: green, marginRight: pxW2dp(20),
  },
  imgBtnTxt: {
    fontSize: pxW2dp(26), color: level2Word
  }
})
