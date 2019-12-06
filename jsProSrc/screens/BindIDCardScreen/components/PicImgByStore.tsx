import React, {useMemo} from "react"
import {StyleSheet, View, Text, Image} from "react-native"
import {observer} from "mobx-react-lite";
import {UseImgStore} from "js_pro_src/hooks/useImgStore";
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import Ionicon from "react-native-vector-icons/Ionicons"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {cyanMore, white, red} from "js_pro_src/styles/color";
import ProPicImgOptsModal from "js_pro_src/components/ProPicImgOptsModal";

/**
 * 选择图片 使用 store
 * */
type Props = {
  label: string, // 左侧文案
  imgStore: UseImgStore
  warning: boolean // 警告
}
const PicImgByStore = observer<Props>(function ({
  label, imgStore, warning
                                                }) {
  const extraLabelStyle = useMemo(() => {
    if (warning) return {color: red}
    return {}
  }, [warning])
  return (
    <React.Fragment>
      {/** 相片 选择 显示 */}
      <View style={styles.wrap}>
        <Text style={[styles.left,extraLabelStyle]}>{label}</Text>
        <View style={styles.right}>
          {imgStore.imgInfo.path != "" &&
          <Image style={styles.img} source={{uri: imgStore.imgInfo.path}} />
          }
          <TouchableWrap style={styles.rightMask} onPress={imgStore.openModal}>
            <Ionicon
              name="ios-camera"
              style={[styles.icon,{opacity:imgStore.imgInfo.path?0:1}]}
            />
          </TouchableWrap>
        </View>
      </View>
      {/** 选择图片选项 */}
      <ProPicImgOptsModal
        visible={imgStore.showingModal} onClose={imgStore.closeModal}
        onPressCamera={() => imgStore.pickImg("openCamera")}
        onPressGallery={() => imgStore.pickImg("openPicker")}
      />
    </React.Fragment>
  )
})

export default PicImgByStore

const styles = (() => {
  const rightW = pxW2dp(240)
  const ratioFunc = x => x*2/3
  return StyleSheet.create({
    wrap: {
      flexDirection: "row", alignItems: "flex-end", marginBottom: pxW2dp(40)
    },
    left: {
      fontSize: pxW2dp(30), lineHeight: pxW2dp(60), color: white,
      width: pxW2dp(200)
    },
    right: {
      width: rightW, height: ratioFunc(rightW), borderRadius: pxW2dp(10),
      backgroundColor: cyanMore, overflow: "hidden",
    },
    rightMask: {
      justifyContent: "center", alignItems: "center",
      position: "absolute", top: 0, left: 0, width: rightW, height: ratioFunc(rightW)
    },
    img: {
      width: rightW, height: ratioFunc(rightW),
    },
    icon: {
      fontSize: pxW2dp(90), color: white
    },
  })
})()
