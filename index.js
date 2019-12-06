import {configure} from "mobx"
import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {lessGray} from "js_pro_src/styles/color";

// 不允许在动作外部修改状态
configure({ enforceActions: "always" })

/** 设置 statusBar 样式 */
StatusBar.setBackgroundColor(lessGray, true)
StatusBar.setBarStyle("dark-content")

// 直接使用 react-native-debugger 工具 开启 enable network inspect -> 监控 network
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
// GLOBAL.WebSocket = GLOBAL.originalWebSocket || GLOBAL.WebSocket

AppRegistry.registerComponent(appName, () => App);
