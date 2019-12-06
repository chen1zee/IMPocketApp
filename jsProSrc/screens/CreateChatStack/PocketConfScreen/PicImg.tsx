import React from "react"
import {Image, StyleSheet, View} from "react-native"
import Ionicon from "react-native-vector-icons/Ionicons"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {cyanMore, white} from "js_pro_src/styles/color";
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import ProPicImgOptsModal from "js_pro_src/components/ProPicImgOptsModal";
import {UseGroupImg} from "./hooks/useGroupImg";

type Props = {
  groupImg: UseGroupImg,
}
function PicImg({
  groupImg
                }: Props) {
  return (
    <React.Fragment>
      {/* 相片选择 显示 */}
      <View style={styles.wrap}>
        {groupImg.val != "" &&
        <Image style={styles.img} source={{uri: groupImg.val}} />
        }
        <TouchableWrap
          onPress={groupImg.openModal}
          style={styles.mask}
        >
          <Ionicon
            name="ios-camera"
            style={[styles.icon, {opacity: groupImg.val?0:1}]}
          />
        </TouchableWrap>
      </View>
      {/* 选择图片选项 */}
      <ProPicImgOptsModal
        visible={groupImg.showingModal} onClose={groupImg.closeModal}
        onPressCamera={() => groupImg.picImg("openCamera")}
        onPressGallery={() => groupImg.picImg("openPicker")}
      />
    </React.Fragment>
  )
}

export default PicImg

const styles = (() => {
  const wrapSize = pxW2dp(110)
  return StyleSheet.create({
    wrap: {
      width: wrapSize, height: wrapSize, borderRadius: wrapSize/2,
      overflow: "hidden", backgroundColor: cyanMore, position: "relative"
    },
    img: {
      width: wrapSize, height: wrapSize,
    },
    mask: {
      alignItems: "center", justifyContent: "center",
      position: "absolute", top: 0, left: 0, width: wrapSize, height: wrapSize,
    },
    icon: {
      fontSize: wrapSize * 0.7, color: white
    },
  })
})()
