/**
 * 指向 各个 navigator
 * */
import {NavigationScreenProp} from "react-navigation";

export const mainStackNavigator = "mainStackNavigator" // 主 stack navi

const _navigators = {
  [mainStackNavigator]: null
}

const navigators = {
  get(navigatorName): NavigationScreenProp<{}> { return _navigators[navigatorName] },
  set(navigatorName, navigation) {
    _navigators[navigatorName] = navigation
  }
}

export default navigators

