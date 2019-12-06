import React from "react"
import {View, Text} from "react-native"
import commonStyles from "js_pro_src/screens/CreatePocketScreen/commonStyles";
import AntIcon from "react-native-vector-icons/AntDesign";
import {Mode} from "../CreatePocketScreen";

type Props = {
  mode: Mode,
  toggle: () => void // 切换模式
}
function ModeBar({
  mode, toggle
                 }: Props) {
  return (
    <View style={commonStyles.dscptWrap}>
      <AntIcon name="infocirlce" style={commonStyles.dscptIcon} />
      <View style={commonStyles.dscptWordWrap}>
        <View>
          <Text style={commonStyles.dscptWord}>
            {mode=="group"?
            "当前所有成员可抢，":
            "当前为指定人领取，"
            }
            <Text
              style={commonStyles.dscptWordRed}
              onPress={toggle}
            >
              {mode=="group"?
              "改为指定人领取":
              "改为群发可抢"
              }
            </Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ModeBar
