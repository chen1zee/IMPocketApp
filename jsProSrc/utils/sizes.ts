import { Dimensions, PixelRatio } from "react-native"
/**
 *  尺寸转换公用函数
 * */

// 设计稿 px
const designW = 750
const designH = 1334
// 物理屏幕点 / 显示像素   -> 即一个像素 以多少个屏幕点显示 , 如 retina 为 2
const pixelRatio = PixelRatio.get()

// 获取屏幕的dp
export const { width: screenW, height: screenH } = Dimensions.get("window")

/**
 * 设计稿 px 转 dp (相对设计稿宽度计算)
 * @param {number} px 设计稿 宽度
 * */
export function pxW2dp(px) {
  return parseFloat((px * screenW / designW).toFixed(2))
  // return px * screenW / designW
}

/**
 * 设计稿 px 转 dp (相对设计稿高度计算)
 * @param {number} px 设计稿 高度
 * */
export function pxH2dp(px) {
  return px * screenH / designH
}

/**
 * 按照宽度进行 百分比 计算
 * @param {number} perc 百分比
 * */
export function percW2dp(perc) {
  return perc / 100 * screenW
}

/**
 * 按照高度进行 百分比 计算
 * @param {number} perc 百分比
 * */
export function percH2dp(perc) {
  return perc / 100 * screenH
}

/**
 * 按照 pixelRatio 计算
 * @param {number} pR 想呈现的 物理点数  如在 rentina 屏中，想 展示 1个物理点
 * */
export function pR2dp(pR) {
  return pR / pixelRatio
}
