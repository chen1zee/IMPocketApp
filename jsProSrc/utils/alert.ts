import {Alert} from "react-native";

/**
 * 封装 Alert 弹窗
 * 一个按钮: 'positive' ,
 * 两个按钮: 'negative', 'positive'
 * 三个按钮: 'neutral', 'negative', 'positive'
 * 点击 弹窗外 来 取消 'dismiss'
 * */
type simpleAlertType = {
  title?: string,
  content: string,
  cancelable?: boolean,
  buttons?: {text: string}[],
  buttonNum?: number,
}
export function simpleAlert({
                       title="提示", content, cancelable=false,
                       buttons, buttonNum=1
}: simpleAlertType): Promise<'neutral'|'negative'|'positive'|"dismiss"> {
  return new Promise(resolve => {
    let finalButtons: {text: string, onPress: () => void}[] = []
    /**
     * 传如buttons时， 顺序为 ['neutral', 'negative', 'positive']
     * 或 ['negative', 'positive'] 或 ['positive']
     * */
    if (buttons) {
      const actions = ['neutral', 'negative', 'positive']
      for (let i = buttons.length; i--;) {
        finalButtons.unshift({
          // @ts-ignore
          text: buttons[i].text, onPress: () => resolve(actions.pop()),
        })
      }
    } else {
      finalButtons = buttonNum == 1 ? [{text: "好的", onPress: () => resolve("positive")}] :
        buttonNum == 2 ? [
            {text: "取消", onPress: () => resolve("negative")},
            {text: "确定", onPress: () => resolve("positive")}
          ] :
          [
            {text: "稍后再说", onPress: () => resolve("neutral")},
            {text: "取消", onPress: () => resolve("negative")},
            {text: "确定", onPress: () => resolve("positive")},
          ]
    }
    Alert.alert(
      title, content, finalButtons, {
        cancelable, onDismiss: () => resolve('dismiss')
      }
    )
  })
}
