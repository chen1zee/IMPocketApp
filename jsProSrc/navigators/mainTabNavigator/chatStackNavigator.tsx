/**
 * 消息 stack 导航
 * */
import {createStackNavigator, NavigationStackOptions} from "react-navigation-stack"
import {SCREEN_2_TITLE, SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import MsgListScreen from "js_pro_src/screens/MainTabNavi/MsgListScreen/MsgListScreen";
import {lessGray} from "js_pro_src/styles/color";

const ChatStackNavigator = createStackNavigator({
  [SCREEN_NAMES.MsgList]: { screen: MsgListScreen },
}, {
  headerMode: "screen",
  initialRouteName: SCREEN_NAMES.MsgList,
  defaultNavigationOptions: ({navigation}) => {
    const routeName = navigation.state.routeName
    const temp: NavigationStackOptions = {
      headerStyle: {backgroundColor: lessGray}
    }
    if (routeName == SCREEN_NAMES.MsgList) {
    } else {
      temp.headerTitle = SCREEN_2_TITLE[routeName]
    }
    return temp
  }
})

export default ChatStackNavigator
