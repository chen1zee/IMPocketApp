import React, {useEffect} from "react"
import {StyleSheet, Text, View} from "react-native"
import {NavigationScreenProp, StackActions} from "react-navigation";
import handleNaviLifecyleHOC from "js_pro_src/HOC/handleNaviLifecyleHOC";
import {level2Word} from "js_pro_src/styles/color";
import {pxW2dp} from "js_pro_src/utils/sizes";
import authStorage from "js_pro_src/storage/authStorage";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import {TOKEN} from "js_pro_src/storage/storageKeys";

type NavigationParams = {}
type Props = {
  navigation: NavigationScreenProp<{}, NavigationParams>
}

function Comp({navigation}: Props) {
  useEffect(() => {
    (async function () {
      // await authStorage.remove(TOKEN) // TODO dev 清token
      const token = await authStorage.get(TOKEN)

      const routeName = token ? SCREEN_NAMES.MainTabNavi : SCREEN_NAMES.Login
      navigation.dispatch(StackActions.replace({routeName})) // TODO 调试中 ing
      // navigation.dispatch(StackActions.replace({routeName: SCREEN_NAMES.FriendDetail})) // TODO 调试中 ing
      // navigation.dispatch(StackActions.replace({routeName: SCREEN_NAMES.MainTabNavi})) // TODO 调试中 ing
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
      <View style={styles.wrap}>
        <Text style={styles.title}>
          {/*Welcome*/}
        </Text>
      </View>
  )
}

const WelComeScreen = handleNaviLifecyleHOC(Comp, {
  // willFocus: () => StatusBar.setHidden(true),
  // willBlur: () => StatusBar.setHidden(false),
  // willUnmount: () => StatusBar.setHidden(false)
})

export default WelComeScreen

const styles = StyleSheet.create({
  wrap: {
    flex: 1, justifyContent: "center", alignItems: "center"
  },
  title: {
    fontSize: pxW2dp(40), color: level2Word,
  }
})
