import React from "react"
import {StyleSheet, TouchableHighlight, View} from "react-native"
import Ionicon from "react-native-vector-icons/Ionicons"
import {Header} from "react-navigation-stack";
import {gray, greatBlack} from "js_pro_src/styles/color";
import navigators, {mainStackNavigator} from "js_pro_src/navigators/navigators";
import {StackActions} from "react-navigation";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";

class ChatHeaderRght extends React.PureComponent {
  private goChatDetail = () => {
    navigators.get(mainStackNavigator).dispatch(StackActions.push({
      routeName: SCREEN_NAMES.ChatDetail
    }))
  }
  render() {
    return (
      <View style={styles.wrap}>
        <TouchableHighlight style={styles.btnWrap} underlayColor={gray} onPress={this.goChatDetail}>
          <Ionicon name="ios-more" style={styles.searchBtn} />
        </TouchableHighlight>
      </View>
    )
  }
}

export default ChatHeaderRght

const styles = StyleSheet.create({
  wrap: {
    position: "relative", paddingRight: 0,
    flexDirection: "row", alignItems: "center", justifyContent: "flex-start"
  },
  btnWrap: {
    height: Header.HEIGHT, width: Header.HEIGHT, alignItems: "center", justifyContent: "center"
  },
  searchBtn: { color: greatBlack,marginLeft: 4,marginRight: 4, fontSize: 24 },
})
