import React, {useEffect, useMemo} from "react";
import {NavigationStackOptions} from "react-navigation-stack";
import {NavigationScreenProp} from "react-navigation";

React.Component

type callBackType = ({payload,navigation}:{payload?:any, navigation?:NavigationScreenProp<any,any>}) => void
type cbsType = {
  willFocus?: callBackType, didFocus?: callBackType,
  willBlur?: callBackType, didBlur?: callBackType,
  // 组件移除 当 Navigation.replace 时， 不会触发 willBlur , 注册 willUnmount来清除特定
  willUnmount?: callBackType
}
/**
 * screen组件 控制 navi 生命周期 切片
 * 在 screen focus时 触发 willFocus回调函数
 * @param {React.Component} Comp 要添加 切片的 组件
 * @param {object=} cbs 回调函数s
 * @param {boolean=} passNavigation 是否把 props.navigation 传递下去 flag
 *   当 Comp 为 Navigator Class 时(即 Comp 为 其他路由，本身就有 props.navigation)
 *   则 不应 传递 props.navigation,, 此种情况 应将 passNavigation 设为 false
 * */
function handleNaviLifecyleHOC(Comp, cbs: cbsType, passNavigation: boolean = true) {
  function InnerComp(props: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {children, navigation, ...restProps} = props
    // willFocus 监听器 只在 willMount 调用一次
    const willFocusSubscr = useMemo(() => {
      if (!cbs.willFocus) return null
      return navigation.addListener("willFocus", payload => {
        cbs.willFocus && cbs.willFocus({payload, navigation})
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // willBlur 监听器 只在 willMount 调用一次
    const willBlurSubscr = useMemo(() => {
      if (!cbs.willBlur) return null
      return navigation.addListener("willBlur", payload => {
        cbs.willBlur && cbs.willBlur({payload, navigation})
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // 在 componentWillUnmount 中 清除监听器
    useEffect(() => () => {
      cbs.willUnmount && cbs.willUnmount({navigation}) // 触发 willUnmount callback
      willFocusSubscr && willFocusSubscr.remove()
      willBlurSubscr && willBlurSubscr.remove()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (passNavigation) return <Comp {...restProps} navigation={navigation} />
    // 不传递 navigation 若 child 为 Navigator 则不能覆盖 props.navigation
    return <Comp {...restProps} />
  }
  InnerComp.navigationOptions = (opt): NavigationStackOptions => {
    return Comp.navigationOptions && Comp.navigationOptions(opt)
  }
  return InnerComp
}

export default handleNaviLifecyleHOC
