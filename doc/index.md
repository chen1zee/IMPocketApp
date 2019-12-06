### 文档
`后续再细分各文档`

### 需求及解决
1. 引用项目以外的 文件夹
    1. tsconfig.json->.compilerOptions.path 配置别名
    2. 对应的外部文件夹 添加 package.json 如： {"name": "ccc"}
    3. metro.config.js->.watchFolders 添加外部文件夹路径
2. network 面板，查看记录
    * `使用fetch (fetch 在 react-native-debugger 中可拦截，
    但 response为空，后续查看什么原因， 现暂用 XHR方案)`
    1. 使用 XHR，
    2. 使用 react-native-debugger，右键 enable network inspect
    3. network 面板中 查看请求记录
3. jsProSrc/config.ts 用于配置环境变量
    * /scripts/changeConfig.js 用于 配合脚本 修改 ENV环境变量 可见 命令 `TEST:change:ENV:run:android`
4. 安卓中， overlap(元素展示空间 大于 父元素 空间) 的元素，onPress 等事件无法触发
    * 相关issue https://github.com/facebook/react-native/issues/22397
5. 待优化项
    * 项目搜索关键词 `@optimize-later`
6. 相关文档
    * immer 不变性 https://immerjs.github.io/immer/docs/produce
    
7. 相关插件 需要 在 对应 android ios 中修改配置
    * jcore-react-native 极光推送相关
    * jpush-react-native 极光推送相关
    * react-native-audio 录音
    * react-native-sound 播放音频
    * react-native-fs 操作文件
    * react-native-gesture-handler 手势事件封装
    * react-native-reanimated 动画封装
    * react-native-vector-icons 图标库
    * react-navigation 导航
    * react-native-device-info  设备信息
    
### 已知问题及解决
1. hook.useEffect 中 navigation.setParams
        1.1 setParams 导致 re-render -> 导致多次调用 useEffect 死循环
        1.2 解决 方法， 使用 useRef + useEffect 接收对应参数
        1.3 使用 useEffect(() => void, []) // 来只 setParams 一次
2. mainStack->tabNavi里的页面，
调用 mainStack.navigate 到 另外的 mainStack.page后,
按 android 的 返回按钮，要按两下才能返回 tabNavi,
并且 tabNavi 返回到 initialPage。
解决：监听 BackHandler.addEventListener("hardwareBackPress", () => void)
并手动 调用 mainStack.pop({n: 1}) 来做 栈推出
 
