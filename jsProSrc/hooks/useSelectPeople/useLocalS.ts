import {useLocalStore} from "mobx-react-lite";
import {ImageSourcePropType} from "react-native";
import {action} from "mobx";

/**
 * 选择群成员 && 设置抢包号 页面 使用
 * */
// TODO mock
const makeId = (() => {
  let i = 0
  return () => ++i
})()
const createPerson = () => {
  const id = makeId()
  return {
    id, img: id % 2 == 1 ? require("js_pro_src/assets/u235.jpg") : require("js_pro_src/assets/u239.jpg"),
    name: "Asjdio", timeTxt: "前天10:18", selected: false
  }
}

export type personType = {
  id: number, img: ImageSourcePropType,
  name: string, timeTxt: string,
  selected: boolean, // 前端flag 是否选中
}
export type ListType = {
  items: personType[], // 二级数组的每一项
  section: string // 英文首字母 如: "A"
}[]
export type SelectedPersonType = { // 选中的person
  item: personType, // 选中person
  section: number // 一级坐标
  row: number // 二级坐标
}
export type LocalStore = {
  list: ListType,
  selectedPersons: SelectedPersonType[],
  toggle: (section: number, row: number) => void,
  unSelectPerson: (selectedPersonIndex: number) => void
}

/**
 * 群成员列表
 * 选中群成员列表
 * @param {Function} shouldResetPersonCursor 需要 重置 personCursor 回调
 * */
function useLocalS(
  shouldResetPersonCursor: () => void
): LocalStore {
  /** 需要 重置 personCursor 回调 */
  const localS = useLocalStore<LocalStore>(() => ({
    list: [
      { section: "A", items: [createPerson(), createPerson(), createPerson(), createPerson()] },
      { section: "B", items: [createPerson(), createPerson(), createPerson(), createPerson()] },
      { section: "C", items: [createPerson(), createPerson(), createPerson(), createPerson()] },
      { section: "D", items: [createPerson(), createPerson(), createPerson(), createPerson()] },
      { section: "E", items: [createPerson(), createPerson(), createPerson(), createPerson()] },
      { section: "F", items: [createPerson(), createPerson(), createPerson(), createPerson()] },
      { section: "G", items: [createPerson(), createPerson(), createPerson(), createPerson()] },
      { section: "H", items: [createPerson(), createPerson(), createPerson(), createPerson()] },
      { section: "I", items: [createPerson(), createPerson(), createPerson(), createPerson()] },
    ],
    selectedPersons: [],
    toggle: action<LocalStore["toggle"]>(function(section: number, row: number) {
      const item = localS.list[section].items[row]
      const futureSelected = !item.selected
      /** list 切换 selected */
      const tempList = localS.list.slice()
      tempList[section].items[row].selected = futureSelected
      localS.list = tempList
      if (futureSelected) { // 本来没选中 selectedPersons 推入
        localS.selectedPersons = localS.selectedPersons.concat({item, section, row})
        shouldResetPersonCursor()
        return
      }
      /** 推出 对应选中 person */
      const tempSelectedPersons = localS.selectedPersons.slice()
      let i
      for (i = tempSelectedPersons.length; i--;) {
        if (tempSelectedPersons[i].section != section || tempSelectedPersons[i].row != row) continue
        tempSelectedPersons.splice(i, 1)
        break
      }
      localS.selectedPersons = tempSelectedPersons
      shouldResetPersonCursor()
    }),
    // 取消选中
    unSelectPerson: action<LocalStore["unSelectPerson"]>(function (selectedPersonIndex) {
      const {section, row} = localS.selectedPersons[selectedPersonIndex]
      const tempList = localS.list.slice()
      tempList[section].items[row].selected = false
      localS.list = tempList
      /** 推出 selectedPerson */
      const tempSelectedPersons = localS.selectedPersons.slice()
      tempSelectedPersons.splice(selectedPersonIndex, 1)
      localS.selectedPersons = tempSelectedPersons
    })
  }))
  return localS
}

export default useLocalS
