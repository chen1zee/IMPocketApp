import {useLocalStore} from "mobx-react-lite";
import {action, flow} from "mobx";
import ProToast from "js_pro_src/components/ProToast";

type ConfItem = {
  selected: boolean, // 选中flag
  packNum: number // 发x个包
  confArr: {
    hitNum: number, // 中雷数
    time: string, // 倍数
    warning: boolean // 警告flag
  }[]
}
type ValidateItem = ( // 验证 某项，， ignoreSelected 强制验证，忽略 selected
  time: string, pacIndex: number, hitIndex: number, force: boolean
) => Promise<true>
export type UseBanGrabConf = {
  val: ConfItem[],
  toggle: (pacIndex: number) => Promise<void> // 切换选中
  // 修改倍数
  changeTime: (time: string, pacIndex: number, hitIndex: number) => Promise<void>
  validateItem: ValidateItem,
  changeWarning: (flag: boolean, pacIndex: number, hitIndex: number) => void // change 警告
  validate: () => Promise<boolean> // 验证
}

function useBanGrabConf(): UseBanGrabConf {
  const banGrabConf = useLocalStore<UseBanGrabConf>(() => {
    const val: UseBanGrabConf["val"] = []
    const packNums = [5, 6, 9] // 发 5,6,9 个红包
    packNums.forEach(packNum => { // 制造 val初始值
      const confArr: ConfItem["confArr"] = []
      for (let i = 0; i < packNum; i++) {
        confArr.push({hitNum: i+1, time: "5.0", warning: false})
      }
      val.push({selected: packNum==5, packNum, confArr})
    })
    return {
      val, // 禁抢模式设置
      changeWarning: action<UseBanGrabConf["changeWarning"]>(function (flag, pacIndex, hitIndex) {
        const tempVal = banGrabConf.val.slice()
        tempVal[pacIndex].confArr[hitIndex].warning = flag
        banGrabConf.val = tempVal
      }),
      // 切换选中
      toggle: flow<void, number[]>(function * (pacIndex) {
        const tempVal = banGrabConf.val.slice()
        const futureSelected = !tempVal[pacIndex].selected
        tempVal[pacIndex].selected = futureSelected
        banGrabConf.val = tempVal
        let err
        const confArr = tempVal[pacIndex].confArr
        for (let i = confArr.length; i--;) {
          try {
            yield banGrabConf.validateItem(confArr[i].time, pacIndex, i, futureSelected)
          } catch (e) {
            err = e
          }
        }
        if (err) ProToast.showTop({content: err.message}) // 验证不通过
      }),
      // 修改倍数
      changeTime: flow<void, any>(function * (time, pacIndex, hitIndex) {
        const tempVal = banGrabConf.val.slice()
        tempVal[pacIndex].confArr[hitIndex].time = time
        banGrabConf.val = tempVal
        // 验证
        let err
        try {
          yield banGrabConf.validateItem(time, pacIndex, hitIndex)
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
      validateItem: async function(time, pacIndex, hitIndex, force=false) {
        const pacItem = banGrabConf.val[pacIndex]
        const item = pacItem.confArr[hitIndex]
        if (!force && !pacItem.selected) { // 无选择， 不验证
          // warning 设置 false
          if (item.warning) banGrabConf.changeWarning(false, pacIndex, hitIndex)
          return true
        }
        /** 有选中 */
        if (!time.trim()) { // 没填
          if (!item.warning) banGrabConf.changeWarning(true, pacIndex, hitIndex)
          throw new Error("请填写倍数")
        }
        if (!/^(\d+|\d+\.(\d)?)$/.test(time.trim())) { // 支持 1位小数
          if (!item.warning) banGrabConf.changeWarning(true, pacIndex, hitIndex)
          throw new Error("倍数最多只支持1位小数")
        }
        // 通过
        if (item.warning) banGrabConf.changeWarning(false, pacIndex, hitIndex)
        return true
      },
      // 验证全部 && 检查是否 全空
      validate: async function() {
        let err
        let allEmpty = true // 全空 flag
        for (let pacIndex = banGrabConf.val.length; pacIndex--;) {
          const packItem = banGrabConf.val[pacIndex]
          if (packItem.selected) allEmpty = false
          // 验证子项
          for (let hitIndex = packItem.confArr.length; hitIndex--;) {
            const conf = packItem.confArr[hitIndex]
            try {
              await banGrabConf.validateItem(conf.time, pacIndex, hitIndex)
            } catch (e) {
              err = e
            }
          }
        }
        if (allEmpty) err = new Error("请至少选择一个发包选项") // 检查 是否全空
        if (err) throw err // 抛错
        return true
      }
    }
  })
  return banGrabConf
}

export default useBanGrabConf
