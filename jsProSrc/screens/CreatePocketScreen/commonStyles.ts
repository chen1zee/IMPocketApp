/**
 * CreatePocketScreen
 * 公用 styles
 * */
import {StyleSheet} from "react-native";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {cyanMore, greenBlack, level1Word, red} from "js_pro_src/styles/color";

const commonStyles = StyleSheet.create({
  /** descript */
  dscptWrap: {
    flexDirection: "row"
  },
  dscptIcon: {
    marginHorizontal: pxW2dp(10),
    fontSize: pxW2dp(30), color: cyanMore
  },
  dscptWordWrap: { flex: 1 },
  dscptWord: {
    fontSize: pxW2dp(26), lineHeight: pxW2dp(34),
    color: level1Word
  },
  dscptWordGreen: { color: greenBlack },
  dscptWordRed: { color: red }
})

export default commonStyles
