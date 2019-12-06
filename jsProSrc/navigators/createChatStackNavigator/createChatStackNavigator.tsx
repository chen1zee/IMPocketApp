/**
 * 创建群聊 stack
 * */
import {createStackNavigator, NavigationStackOptions} from "react-navigation-stack";
import {SCREEN_2_TITLE, SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import PicPeopleScreen from "js_pro_src/screens/CreateChatStack/PicPeopleScreen/PicPeopleScreen";
import {lessGray} from "js_pro_src/styles/color";
import PocketConfScreen from "js_pro_src/screens/CreateChatStack/PocketConfScreen/PocketConfScreen";
import SetGrabPeopleScreen from "js_pro_src/screens/SetGrabPeopleScreen/SetGrabPeopleScreen";

const CreateChatStackNavigator = createStackNavigator(
  {
    [SCREEN_NAMES.PicPeople]: { screen: PicPeopleScreen }, // 选群成员页
    [SCREEN_NAMES.PocketConf]: { screen: PocketConfScreen }, // 设置红包配置
    [SCREEN_NAMES.SetGrabPeople]: { screen: SetGrabPeopleScreen }, // 群主设置抢包号
  },
  {
    initialRouteName: SCREEN_NAMES.PicPeople,
    defaultNavigationOptions: ({navigation}) => {
      const routeName = navigation.state.routeName
      const temp: NavigationStackOptions = {
        headerTitle: SCREEN_2_TITLE[routeName],
        headerStyle: {backgroundColor: lessGray}
      }
      return temp
    }
  }
)

export default CreateChatStackNavigator
