import {createStackNavigator, NavigationStackOptions} from "react-navigation-stack";
import {SCREEN_2_TITLE, SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import MineListScreen from "js_pro_src/screens/MainTabNavi/MineListScreen/MineListScreen";
import {lessGray} from "js_pro_src/styles/color";

const MineStackNavigator = createStackNavigator({
  [SCREEN_NAMES.MineList]: { screen: MineListScreen }
}, {
  headerMode: "screen",
  initialRouteName: SCREEN_NAMES.MineList,
  defaultNavigationOptions: ({navigation}) => {
    const routeName = navigation.state.routeName
    const temp: NavigationStackOptions = {
      headerTitle: SCREEN_2_TITLE[routeName],
      headerStyle: {backgroundColor: lessGray}
    }
    return temp
  }
})

export default MineStackNavigator
