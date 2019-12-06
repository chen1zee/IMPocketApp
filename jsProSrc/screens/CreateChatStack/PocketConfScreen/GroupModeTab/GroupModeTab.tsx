import React from "react"
import {StyleSheet, View, KeyboardAvoidingView} from "react-native"
import TabTop from "./TabTop";
import {pxW2dp} from "js_pro_src/utils/sizes";
import MineSweep from "js_pro_src/screens/CreateChatStack/PocketConfScreen/GroupModeTab/MineSweep";
import {ScreenMode} from "js_pro_src/screens/CreateChatStack/PocketConfScreen/PocketConfScreen";
import BanGrab from "js_pro_src/screens/CreateChatStack/PocketConfScreen/GroupModeTab/BanGrab";
import {UseMineSweepConf} from "js_pro_src/screens/CreateChatStack/PocketConfScreen/hooks/useMineSweepConf";
import {UseBanGrabConf} from "js_pro_src/screens/CreateChatStack/PocketConfScreen/hooks/useBanGrabConf";

type Props = {
  mode: ScreenMode,
  changeMode: (mode: ScreenMode) => void,
  mineSweepConfVal: UseMineSweepConf["val"],
  changeTime: UseMineSweepConf["changeTime"], toggle: UseMineSweepConf["toggle"],
  banGrabConfVal: UseBanGrabConf["val"],
  toggleBanGrabConf: UseBanGrabConf["toggle"],
  changeTimeBanGrabConf: UseBanGrabConf["changeTime"]

}
function GroupModeTab({
  mode, changeMode,
  mineSweepConfVal, changeTime, toggle,
  banGrabConfVal, toggleBanGrabConf, changeTimeBanGrabConf,
}: Props) {
  return (
    <React.Fragment>
      {/* Tab */}
      <View style={styles.tab}>
        <View style={styles.tabTops}>
          <TabTop
            active={mode=="mineSweep"} text="扫雷"
            onPress={() => changeMode("mineSweep")}
          />
          <TabTop
            active={mode=="banGrab"} text="禁抢"
            onPress={() => changeMode("banGrab")}
          />
        </View>
      </View>
      <KeyboardAvoidingView>
        {/** 扫雷模式 */}
        <View style={[styles.modeWrap, {display:mode=="mineSweep"?"flex":"none"}]}>
          <MineSweep
            mineSweepConfVal={mineSweepConfVal}
            changeTime={changeTime}
            toggle={toggle}
          />
        </View>
        {/** 禁抢模式 */}
        <View style={[styles.modeWrap, {display:mode=="banGrab"?"flex":"none"}]}>
          <BanGrab
            banGrabConfVal={banGrabConfVal}
            toggleBanGrabConf={toggleBanGrabConf}
            changeTimeBanGrabConf={changeTimeBanGrabConf}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.btmEmpty} />
    </React.Fragment>
  )
}

export default GroupModeTab

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: pxW2dp(20),
  },
  tabTops: {
    flexDirection: "row",
  },
  modeWrap: {
    paddingHorizontal: pxW2dp(20),
  },
  btmEmpty: {
    height: pxW2dp(30)
  }
})
