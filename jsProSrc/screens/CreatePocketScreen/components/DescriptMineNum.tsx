import React from "react";
import {View, Text} from "react-native";
import commonStyles from "../commonStyles";
import AntIcon from "react-native-vector-icons/AntDesign"

/**
 * 解释 雷电数字 填法
 * */
function DescriptMineNum() {
  return (
    <View style={commonStyles.dscptWrap}>
      <AntIcon name="infocirlce" style={commonStyles.dscptIcon} />
      <View style={commonStyles.dscptWordWrap}>
        <View>
          <Text style={commonStyles.dscptWord}>
            单雷：1个数字，如 “<Text style={commonStyles.dscptWordGreen}>3</Text>”
          </Text>
        </View>
        <View>
          <Text style={commonStyles.dscptWord}>
            禁抢：连环雷：2-9个数字，如 “
            <Text style={commonStyles.dscptWordGreen}>012345678</Text>
            ”。
          </Text>
        </View>
        <View>
          <Text style={commonStyles.dscptWord}>
            扫雷:  尾数大小单双均为拼音首字母，
          </Text>
        </View>
        <View>
          <Text style={commonStyles.dscptWord}>
            如：大=D 小=x 单=d 双=s。
          </Text>
        </View>
        <View>
          <Text style={commonStyles.dscptWord}>
            可通过下方快速设置 大小 单双
          </Text>
        </View>
      </View>
    </View>
  )
}

export default DescriptMineNum
