import React from "react"
import {NativeEventEmitter, Text, View} from "react-native"
import JPush from "js_pro_src/nativeModules/JPush";
import config from "js_pro_src/config";
import ProButton from "js_pro_src/components/ProButton";
import ToastExample from "js_pro_src/nativeModules/ToastExample";
import log from "js_pro_src/utils/log";

type StateType = {
  img?: string
}

/**
 * 测试 极光推送  api
 * 无使用，，
 * */
class TestJPush extends React.PureComponent<any, StateType> {
  private addConnectEventListener;
  private addNotificationListener;

  constructor(props) {
    super(props);
    this.state = {
      img: ""
    }
  }

  private localPush = () => {
    JPush.addLocalNotification({
      notificationID: 123,
      notificationBuilderID: 123,
      notificationContent: "asdads",
      notificationTitle: "localTitle",
      notificationExtra: { asd: 123, dsa: "asd" },
      notificationTime: Date.now() + 1000 * 60 * 60
    })
  };
  private testToast = async () => {
    // ToastExample.show("asdkop", ToastExample.SHORT)
    // ToastExample.showCb("asdkopqqq", ToastExample.SHORT, (res, msg) => {
    //   console.log(res, msg)
    // })
    const res = await ToastExample.showPromise("ko1111pkop", ToastExample.SHORT)
    console.log(res)
  }
  componentDidMount(): void {
    if (config.env == "test") JPush.setLoggerEnable({debug: true})
    JPush.init()
    // 连接状态
    this.addConnectEventListener = result => {
      log.d("connectListener: " + JSON.stringify(result))
    }
    this.addConnectEventListener = JPush.addConnectEventListener(this.addConnectEventListener)
    this.addNotificationListener = JPush.addNotificationListener((result) => {
      console.log(result)
    })
    /** 监听原生事件 */
      // @ts-ignore
    const eventEmitter = new NativeEventEmitter(ToastExample)
    eventEmitter.addListener("Test_native_emit", event => {
      console.log(event)
    })
  }
  componentWillUnmount(): void {
    JPush.removeListener(this.addConnectEventListener)
    JPush.removeListener(this.addNotificationListener)
  }
  render() {
    return (
      <View>
        <Text>123</Text>
        <ProButton text="本地推送" onPress={this.localPush} />
        <ProButton text="测试toast" onPress={this.testToast} />
      </View>
    )
  }
}

export default TestJPush
