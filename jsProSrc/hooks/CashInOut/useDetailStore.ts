/**
 * 详情 Store
 * */
import {useLocalStore} from "mobx-react-lite";
import {flow} from "mobx";
import {wllRechargeDtl} from "js_pro_src/api/wallet";

const mockData:Val = {
  status:1,date:"2019-12-12 12:12:12",type:"支付宝",induNo:"asdjio123",tranNo:"231231231232132huihui",
  money: "123.00",
}

type Val = { // 详情
  status: 1|-1, // -1:前端未获取 1:支付成功
  // statusTxt: string, // 显示
  date: string // 充值时间
  type: string // 充值方式
  money: string // 金额
  tranNo: string // 交易号
  induNo: string // 商户单号
}

type Store = {
  val: Val,
  statusTxt: string // getter
  getVal: (cancelMethodRef) => Promise<void>
}
type Props = {
  mode: "in"|"out"
}
function useDetailStore({
  mode
                        }: Props): Store {
  const store = useLocalStore<Store>(() => ({
    // 详情
    val: {status:-1,date:"",type:"",tranNo:"",induNo:"",money:""},
    get statusTxt() {
      const s = store.val.status
      const modeTxt = mode=="in"?"充值":"提现"
      if (s == -1) return ""
      if (s == 1) return `${modeTxt}成功`
      return ""
    },
    // 获取详情
    getVal: flow(function * (cancelMethodRef) {
      yield wllRechargeDtl({recharge_id: "asd"}, cancelMethodRef)
      store.val = mockData
    })
  }))
  return store
}

export default useDetailStore
