import {createStackNavigator, NavigationStackOptions} from "react-navigation-stack";
import {SCREEN_2_TITLE, SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import CommunicateScreen from "js_pro_src/screens/MainTabNavi/CommuStackScreens/CommunicateScreen/CommunicateScreen";
import {lessGray} from "js_pro_src/styles/color";

const CommuStackNavigator = createStackNavigator({
  [SCREEN_NAMES.Communicate]: { screen: CommunicateScreen },
}, {
  headerMode: "screen",
  initialRouteName: SCREEN_NAMES.Communicate,
  defaultNavigationOptions: ({navigation}) => {
    const routeName = navigation.state.routeName
    const temp: NavigationStackOptions = {
      headerTitle: SCREEN_2_TITLE[routeName],
      headerStyle: {backgroundColor: lessGray}
    }
    return temp
  }
})

export default CommuStackNavigator


