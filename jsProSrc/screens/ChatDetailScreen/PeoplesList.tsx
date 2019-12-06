import React from "react"
import {StyleSheet} from "react-native"
import {PeopleType} from "js_pro_src/screens/ChatDetailScreen/ChatDetailScreen";
import {TouchableWithoutFeedback} from "react-native";
import {Alert} from "react-native";
import {View} from "react-native";
import {Image} from "react-native";
import {Text} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import {pxW2dp} from "js_pro_src/utils/sizes";
import {grayRipple, level4Word} from "js_pro_src/styles/color";

type PropsType = {
  peoples: PeopleType[],
  peopleNum: number,
  maxShowPeopleNum: number,
  onAddMembers: () => void // 添加成员按钮
}
/**
 * 头部展示群成员头像和名称信息
 * */
function PeoplesList(props: PropsType) {
  return (
    <View style={styles.groupMembers}>
      {props.peoples.map((item,index) =>
      <TouchableWithoutFeedback key={index} onPress={()=>Alert.alert('待完成')}>
        <View style={styles.imgk}>
          <Image style={styles.imgs} source={item.img}/>
          <Text numberOfLines={1}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>)}
      <TouchableWithoutFeedback onPress={props.onAddMembers}>
        <View style={[styles.jiahao]}>
          <Ionicon name="md-add" style={styles.mdAddIcon}/>
        </View>
      </TouchableWithoutFeedback>
      {/*查看更多成员信息按钮设置*/}
      {props.peopleNum >= props.maxShowPeopleNum &&
      <TouchableWithoutFeedback>
        <View style={styles.morePeopleBar}>
          <Text
            style={styles.morePeopleTxt}
            onPress={()=>Alert.alert('查看更多成员')}
          >查看更多成员</Text>
          <Ionicon name="ios-arrow-forward" style={styles.morePeopleIcon} />
        </View>
      </TouchableWithoutFeedback>}
    </View>
  )
}

export default PeoplesList

const styles =(() => {
  const imgSize = pxW2dp(100)
  return StyleSheet.create({
    groupMembers:{
      flexDirection:'row', flexWrap:'wrap', paddingVertical: pxW2dp(10),
      width:pxW2dp(750), backgroundColor: 'white', paddingHorizontal:pxW2dp(25),
    },
    imgk:{
      borderRadius:pxW2dp(10), width:imgSize, height:imgSize + pxW2dp(35), alignItems: 'center',
      marginTop: pxW2dp(15), marginHorizontal:pxW2dp(20), marginBottom:pxW2dp(5)
    },
    jiahao:{
      width:imgSize, height:imgSize, borderRadius:pxW2dp(10),
      borderWidth:pxW2dp(3), borderColor:grayRipple,
      marginTop: pxW2dp(10), marginHorizontal:pxW2dp(20), marginBottom:pxW2dp(5),
      alignItems: 'center', justifyContent: "center"
    },
    imgs:{ width:imgSize, height:imgSize, borderRadius:pxW2dp(10) },
    mdAddIcon: { fontSize:pxW2dp(80) },
    morePeopleBar: {
      width:pxW2dp(700),height:pxW2dp(60),
      flexDirection: "row", justifyContent:'center', alignItems:'center'
    },
    morePeopleTxt: { fontSize:pxW2dp(26) },
    morePeopleIcon: {
      fontSize: pxW2dp(28), color: level4Word, marginLeft: pxW2dp(20)
    }
  })
})()
