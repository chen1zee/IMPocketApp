/**
 * 最外层主路由
 * */
import {createStackNavigator, NavigationStackOptions} from "react-navigation-stack";
import {SCREEN_2_TITLE, SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import {createAppContainer} from "react-navigation";
import MainTabNavigator from "js_pro_src/navigators/mainTabNavigator/mainTabNavigator";
import ChatScreen from "js_pro_src/screens/ChatScreen/ChatScreen";
import navigators, {mainStackNavigator} from "js_pro_src/navigators/navigators";
import ChatDetailScreen from "js_pro_src/screens/ChatDetailScreen/ChatDetailScreen";
import PocketDetailsScreen from "js_pro_src/screens/PocketDetailsScreen/PocketDetailsScreen";
import CreateChatStackNavigator from "js_pro_src/navigators/createChatStackNavigator/createChatStackNavigator";
import CreatePocketScreen from "js_pro_src/screens/CreatePocketScreen/CreatePocketScreen";
import SetGrabPeopleScreen from "js_pro_src/screens/SetGrabPeopleScreen/SetGrabPeopleScreen";
import SendPocketRecordScreen from "js_pro_src/screens/SendPocketRecordScreen/SendPocketRecordScreen";
import ComplainScreen from "js_pro_src/screens/ComplainScreen/ComplainScreen";
import ComplainNeedKnowScreen from "js_pro_src/screens/ComplainNeedKnowScreen/ComplainNeedKnowScreen";
import WelComeScreen from "js_pro_src/screens/WelcomeScreen/WelComeScreen";
import LoginScreen from "js_pro_src/screens/LoginScreen/LoginScreen";
import FindPswScreen from "js_pro_src/screens/FindPswScreen/FindPswScreen";
import RegisterScreen from "js_pro_src/screens/RegisterScreen/RegisterScreen";
import ChangePswScreen from "js_pro_src/screens/ChangePsw/ChangePswScreen";
import CashInListScreen from "js_pro_src/screens/CashInListScreen/CashInListScreen";
import CashInDetailScreen from "js_pro_src/screens/CashInDetailScreen/CashInDetailScreen";
import CashOutListScreen from "js_pro_src/screens/CashOutListScreen/CashOutListScreen";
import CashOutDetailScreen from "js_pro_src/screens/CashOutDetailScreen/CashOutDetailScreen";
import RecentSendPocketScreen from "js_pro_src/screens/RecentSendPocketScreen/RecentSendPocketScreen";
import RecentGrabPocketScreen from "js_pro_src/screens/RecentGrabPocketScreen/RecentGrabPocketScreen";
import BindPayScreen from "js_pro_src/screens/BindPayScreen/BindPayScreen";
import BindAliScreen from "js_pro_src/screens/BindAliScreen/BindAliScreen";
import BindBankScreen from "js_pro_src/screens/BindBankScreen/BindBankScreen";
import BindIDCardScreen from "js_pro_src/screens/BindIDCardScreen/BindIDCardScreen";
import SearchFriendScreen from "js_pro_src/screens/SearchFriendScreen/SearchFriendScreen";
import FriendDetailScreen from "js_pro_src/screens/FriendDetailScreen/FriendDetailScreen";
import ApplyAddFrndScreen from "js_pro_src/screens/ApplyAddFrndScreen/ApplyAddFrndScreen";
import NewFriendsScreen from "js_pro_src/screens/NewFriendsScreen/NewFriendsScreen";

const MainStackNavigator = createStackNavigator({
  [SCREEN_NAMES.WelCome]: {screen: WelComeScreen},
  [SCREEN_NAMES.MainTabNavi]: { screen: MainTabNavigator },
  [SCREEN_NAMES.Chat]: { screen: ChatScreen },
  [SCREEN_NAMES.ChatDetail]: { screen: ChatDetailScreen },
  [SCREEN_NAMES.CreateChatStack]: { screen: CreateChatStackNavigator }, // 发起群聊 stack
  [SCREEN_NAMES.PocketDetails]: {screen: PocketDetailsScreen},
  [SCREEN_NAMES.CreatePocket]: {screen: CreatePocketScreen},
  [SCREEN_NAMES.GlobalSetGrabPeople]: {screen: SetGrabPeopleScreen},
  [SCREEN_NAMES.SendPocketRecord]: {screen: SendPocketRecordScreen},
  [SCREEN_NAMES.Complain]: {screen: ComplainScreen},
  [SCREEN_NAMES.ComplainNeedKnow]: {screen: ComplainNeedKnowScreen},
  [SCREEN_NAMES.Login]: {screen: LoginScreen},
  [SCREEN_NAMES.FindPsw]: {screen: FindPswScreen},
  [SCREEN_NAMES.Register]: {screen: RegisterScreen},
  [SCREEN_NAMES.ChangePsw]: {screen: ChangePswScreen},
  [SCREEN_NAMES.CashInList]: {screen: CashInListScreen},
  [SCREEN_NAMES.CashInDetail]: {screen: CashInDetailScreen},
  [SCREEN_NAMES.CashOutList]: {screen: CashOutListScreen},
  [SCREEN_NAMES.CashOutDetail]: {screen: CashOutDetailScreen},
  [SCREEN_NAMES.RecentSendPocket]: {screen: RecentSendPocketScreen},
  [SCREEN_NAMES.RecentGrabPocket]: {screen: RecentGrabPocketScreen},
  [SCREEN_NAMES.BindPay]: {screen: BindPayScreen},
  [SCREEN_NAMES.BindAli]: {screen: BindAliScreen},
  [SCREEN_NAMES.BindBank]: {screen: BindBankScreen},
  [SCREEN_NAMES.BindIDCard]: {screen: BindIDCardScreen},
  [SCREEN_NAMES.SearchFriend]: {screen: SearchFriendScreen},
  [SCREEN_NAMES.FriendDetail]: {screen: FriendDetailScreen},
  [SCREEN_NAMES.ApplyAddFrnd]: {screen: ApplyAddFrndScreen},
  [SCREEN_NAMES.NewFriends]: {screen: NewFriendsScreen},
}, {
  initialRouteName: SCREEN_NAMES.WelCome, // TODO 调试 ing
  // initialRouteName: SCREEN_NAMES.NewFriends, // TODO 调试 ing
  // initialRouteName: SCREEN_NAMES.MainTabNavi, // TODO 调试 ing
  defaultNavigationOptions: ({navigation}) => {
    const routeName = navigation.state.routeName
    navigators.set(mainStackNavigator, navigation)
    const temp: NavigationStackOptions = {}
    if ([
      SCREEN_NAMES.MainTabNavi, SCREEN_NAMES.CreateChatStack,
      SCREEN_NAMES.WelCome, SCREEN_NAMES.Login, SCREEN_NAMES.Register,
      SCREEN_NAMES.FindPsw, SCREEN_NAMES.ChangePsw
    ].includes(routeName)) {
      temp.header = null
    } else {
      temp.headerTitle = SCREEN_2_TITLE[routeName]
    }
    return temp
  }
})

const NavigatorAppContainer = createAppContainer(MainStackNavigator)

export default NavigatorAppContainer
