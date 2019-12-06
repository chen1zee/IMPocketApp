import {createStackNavigator, NavigationStackOptions} from "react-navigation-stack";
import {SCREEN_2_TITLE, SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import FindListScreen from "js_pro_src/screens/MainTabNavi/FindListScreen/FindListScreen";
import {lessGray} from "js_pro_src/styles/color";

const FindStackNavigator = createStackNavigator({
  [SCREEN_NAMES.FindList]: { screen: FindListScreen }
}, {
  headerMode: "screen",
  initialRouteName: SCREEN_NAMES.FindList,
  defaultNavigationOptions: ({navigation}) => {
    const routeName = navigation.state.routeName
    const temp: NavigationStackOptions = {
      headerTitle: SCREEN_2_TITLE[routeName],
      headerStyle: {backgroundColor: lessGray}
    }
    return temp
  }
})

export default FindStackNavigator
