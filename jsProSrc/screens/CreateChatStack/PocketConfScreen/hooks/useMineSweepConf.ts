import ProToast from "js_pro_src/components/ProToast";
import {useLocalStore} from "mobx-react-lite";
import {action, flow} from "mobx";

/**
 * 扫雷模式配置项
 * */
type ConfItem = {
  selected: boolean, // 选中flag
  packNum: number, // 发 x 个包
  time: string // 倍数
  warning: boolean // 警告flag
}
type ValidateItem = ( // 验证 某项，， ignoreSelected 强制验证，忽略 selected
  time: string, index: number, force?: boolean
) => Promise<true>

export type UseMineSweepConf = { // 临时占用
  val: ConfItem[],
  changeTime: (time: string, index: number) => Promise<void>, // change 倍数
  validateItem: ValidateItem,
  changeWarning: (flag: boolean, index: number) => void // change 警告
  validate: () => Promise<boolean> // 验证
  toggle: (index: number) => void // 切换 selected
}
function useMineSweepConf(): UseMineSweepConf {
  const mineSweepConf = useLocalStore<UseMineSweepConf>(() => ({
    val: [ // 扫雷模式设置
      {packNum: 3, time: "5.0", selected: true, warning: false},
      {packNum: 5, time: "2.0", selected: false, warning: false},
      {packNum: 6, time: "1.8", selected: false, warning: false},
      {packNum: 9, time: "1.6", selected: false, warning: false},
      {packNum: 15, time: "0.8", selected: false, warning: false}
    ],
    // 修改 某项 警告flag
    changeWarning: action<UseMineSweepConf["changeWarning"]>(function (flag, index) {
      mineSweepConf.val[index].warning = flag
    }),
    // 切换 选中
    toggle: flow<true, any>(function * (index) {
      const tempVal = mineSweepConf.val.slice()
      const futureSelected = !tempVal[index].selected
      tempVal[index].selected = futureSelected
      mineSweepConf.val = tempVal
      try {
        yield mineSweepConf.validateItem(tempVal[index].time, index, futureSelected)
      } catch (e) {
        ProToast.showTop({content: e.message})
      }
    }),
    // 修改 某项 倍数
    changeTime: flow<void, any>(function * (time, index) {
      const temp = mineSweepConf.val.slice()
      temp[index].time = time
      mineSweepConf.val = temp
      // 验证
      let err
      try {
        yield mineSweepConf.validateItem(time, index)
      } catch (e) {
        err = e
      }
      if (err) { // 验证不通过
        ProToast.showTop({content: err.message})
      } else { // 验证通过
        ProToast.hide()
      }
    }),
    // 检查某一项 抛错
    validateItem: async function(time, index, force=false) {
      const item = mineSweepConf.val[index]
      if (!force && !item.selected) { // 无选择 不验证
        // warning 设置 false
        if (item.warning) mineSweepConf.changeWarning(false, index)
        return true
      }
      /** 有选择 */
      if (!time.trim()) { // 没填
        if (!item.warning) mineSweepConf.changeWarning(true, index)
        throw new Error("请填写倍数")
      }
      if (!/^(\d+|\d+\.(\d)?)$/.test(time.trim())) { // 支持 1位小数
        if (!item.warning) mineSweepConf.changeWarning(true, index)
        throw new Error("倍数最多只支持1位小数")
      }
      // 通过
      if (item.warning) mineSweepConf.changeWarning(false, index)
      return true
    },
    // 验证全部 && 检查是否全空
    validate: async function() {
      let err
      let allEmpty = true // 全空 flag
      for (let i = mineSweepConf.val.length; i--;) {
        if (mineSweepConf.val[i].selected) allEmpty = false
        try {
          await mineSweepConf.validateItem(mineSweepConf.val[i].time, i)
        } catch (e) {
          err = e
        }
      }
      if (allEmpty) err = new Error("请至少选择一个发包选项") // 检查 是否全空
      if (err) throw err // 抛错
      return true
    },
  }))
  return mineSweepConf
}

export default useMineSweepConf
