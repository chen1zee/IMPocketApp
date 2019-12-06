import {StyleSheet} from "react-native";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {green, lessGreenLight, level1Word, level2Word, level3Word, orange, red} from "js_pro_src/styles/color";

/**
 * 扫雷 && 禁抢 组件的 公共样式
 * */

const MineSweepAndBanGrabCommonStyle = StyleSheet.create({
  /** 扫雷模式 && 公用 */
  wrap: {
    paddingTop: pxW2dp(20), paddingHorizontal: pxW2dp(20),
    backgroundColor: lessGreenLight,
  },
  tipsWrap: {
    flexDirection: "row", marginBottom: pxW2dp(20),
  },
  tipsIcon: {
    fontSize: pxW2dp(34), color: green, paddingRight: pxW2dp(10)
  },
  tipsText: {
    flex: 1,
    fontSize: pxW2dp(24), lineHeight: pxW2dp(36), color: green,
  },
  normalText: {
    fontSize: pxW2dp(28), lineHeight: pxW2dp(38), color: level3Word,
  },
  goldColor: { color: orange, },
  pocketConfWrap: {
    flexDirection: "row", alignItems: "center", marginBottom: pxW2dp(14)
  },
  checkbox: {
    marginRight: pxW2dp(10),
  },
  pocketConfLabel: {
    marginBottom: pxW2dp(30)
  },
  pocketConfTextInput: {
    fontSize: pxW2dp(28), lineHeight: pxW2dp(30),
    paddingVertical: 0, paddingHorizontal: pxW2dp(10),
    marginHorizontal: pxW2dp(10),
    borderWidth: pxW2dp(1), borderColor: level2Word,
    color: level1Word, width: pxW2dp(100),
  },
  /** 禁抢模式 */
  alertTipIcon: {
    fontSize: pxW2dp(38), color: red, paddingRight: pxW2dp(10)
  },
  tipsTextWrap: { flex: 1 },
  link: { textDecorationLine: "underline" },
  /** 中雷个数 bar */
  hitMineBarWrap: {
    flexDirection: "row", alignItems: "center", marginBottom: pxW2dp(5),
    marginLeft: pxW2dp(60),
  },
  smallerNormalText: {
    fontSize: pxW2dp(24), lineHeight: pxW2dp(32), color: level3Word,
  },
  smallerPocketConfTextInput: {
    fontSize: pxW2dp(24), lineHeight: pxW2dp(23),
    paddingVertical: 0, paddingHorizontal: pxW2dp(20),
    marginHorizontal: pxW2dp(10),
    borderWidth: pxW2dp(1), borderColor: level2Word,
    color: level1Word, width: pxW2dp(100),
  }
})

export default MineSweepAndBanGrabCommonStyle
