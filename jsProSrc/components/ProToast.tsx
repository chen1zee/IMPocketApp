import React from "react"
import Toast, {Positions} from "react-native-root-toast";

type State = {
  content: string
  show: boolean,
  position: Positions[keyof Positions]
}
type ShowParams = {
  content: string, // 内容
  duration?: number, // ms
  position?: Positions[keyof Positions] // 位置
}

/**
 * 此为 全局 单例
 * warning 只在 App.tsx 中渲染一次，其他地方 禁止 使用
 * */
class ProToast extends React.PureComponent<any, State> {
  /** 显示 toast */
  public static show({
    content, duration=2000, position=Toast.positions.BOTTOM
                     }: ShowParams) {
    const instance = ProToast.singleton
    clearInterval(ProToast.timer)
    instance && instance.setState({
      show: true, content, position
    }, () => {
      ProToast.timer = setTimeout(() => { // 倒计时关闭 toast
        instance.setState({show: false})
      }, duration)
    })
  }
  /** 显示在顶部 */
  public static showTop({ content }: {content: string}) {
    ProToast.show({content, position: Toast.positions.TOP})
  }
  /** 隐藏toast */
  public static hide() {
    ProToast.singleton && ProToast.singleton.setState({ show: false })
    clearInterval(ProToast.timer)
  }
  private static timer // 计时器 id
  /** toast 单例 */
  private static singleton?: ProToast
  constructor(props) {
    super(props)
    if (ProToast.singleton) ProToast.singleton = undefined // 挂载新实例后，， 重载
    this.state = {
      content: "",
      show: false,
      position: Toast.positions.BOTTOM
    }
  }
  /** 隐藏toast */
  private hide = () => { ProToast.hide() }
  componentDidMount(): void {
    ProToast.singleton = this
  }
  componentWillUnmount(): void {
    if (ProToast.singleton) ProToast.singleton = undefined
    clearInterval(ProToast.timer)
  }
  render() {
    const {show, content, position} = this.state
    return (
      <Toast
        visible={show} position={position}
        shadow={false} animation={true} hideOnPress={false}
        onPress={this.hide}
      >{content}</Toast>
    )
  }
}

export default ProToast
