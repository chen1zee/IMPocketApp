import React, {useCallback, useMemo} from "react"
import {Image, ImageSourcePropType, StyleSheet, Text, View} from "react-native"
import {SpringScrollView} from "react-native-spring-scrollview"
import {pxW2dp} from "js_pro_src/utils/sizes";
import {borderColor, level1Word, level2Word, white} from "js_pro_src/styles/color";
import {PocketType, RecieveItem, UseDetailStore} from "js_pro_src/screens/PocketDetailsScreen/hooks/useDetailStore";

type Props = {
  recieveList: UseDetailStore["recieveList"]
}
type PocketTypeDisplay = {
  type: PocketType, // 类型码
  icon: ImageSourcePropType, // icon图
  desc: string // 描述
}
function PocketList({
  recieveList
                    }: Props) {
  // 红包类型，显示
  const pocketTypeDisplay = useMemo<{[key: string]: PocketTypeDisplay}>(() => ({
    "1": { type: 1, icon: require("js_pro_src/assets/images/smiley_13.png"), desc: "手气最佳" },
    "2": { type: 2, icon: require("js_pro_src/assets/images/smiley_50.png"), desc: "手气最差" },
    "3": { type: 3, icon: require("js_pro_src/assets/images/smiley_70.png"), desc: "中雷" },
  }), [])
  const RenderItem = useCallback(({item}:{item: RecieveItem}) => (
    <View style={styles.itemWrap}>
      <Image style={styles.personImg} source={item.avatar} />
      <View style={styles.nameDate}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>{item.dateTxt}</Text>
      </View>
      <View style={styles.moneyDesc}>
        <Text style={styles.money}>{item.money}元</Text>
        {Boolean(item.type) &&
        <View style={styles.descWrap}>
          <Image style={styles.descIcon} source={pocketTypeDisplay[String(item.type)].icon} />
          <Text style={styles.descTxt}>{pocketTypeDisplay[String(item.type)].desc}</Text>
        </View>}
      </View>
    </View>
  ), [pocketTypeDisplay])
  return (
    <SpringScrollView
      style={styles.wrap} bounces={false}
    >
      {recieveList.map(item => (
        <RenderItem key={item.id} item={item} />
      ))}
      <View style={styles.empty} />
    </SpringScrollView>
  )
}

export default PocketList

const styles = (() => {
  const personImgSize = pxW2dp(100)
  return StyleSheet.create({
    wrap: {
      flex: 1
    },
    itemWrap: {
      height: pxW2dp(140), borderBottomWidth: pxW2dp(1), borderBottomColor: borderColor,
      paddingHorizontal: pxW2dp(30), backgroundColor: white,
      flexDirection: "row", alignItems: "center"
    },
    personImg: {
      width: personImgSize, height: personImgSize, marginRight: pxW2dp(20)
    },
    nameDate: {
      flex: 1,
    },
    name: {
      fontSize: pxW2dp(30), lineHeight: pxW2dp(44), color: level1Word,
      marginBottom: pxW2dp(10),
    },
    date: {
      fontSize: pxW2dp(26), lineHeight: pxW2dp(44), color: level1Word
    },
    moneyDesc: {
      width: pxW2dp(180), alignItems: "flex-end", justifyContent: "flex-start"
    },
    money: {
      fontSize: pxW2dp(30), lineHeight: pxW2dp(44), color: level1Word,
      marginBottom: pxW2dp(10),
    },
    descWrap: {
      height: pxW2dp(50), flexDirection: "row", alignItems: "center"
    },
    descIcon: {
      width: pxW2dp(40), height: pxW2dp(40), marginRight: pxW2dp(20)
    },
    descTxt: {
      fontSize: pxW2dp(26), color: level2Word,
    },
    empty: {
      height: pxW2dp(90)
    }
  })
})()
