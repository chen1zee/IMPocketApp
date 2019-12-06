/**
 * 各环境的 配置项
 * */
import {Platform} from "react-native";

/**
 * "TEST":测试环境
 * */
type ENVType = "TEST" | "TO_ADD" | "PROD" | undefined

// 通过 /scripts/changeConfig.js 脚本 可修改值, 对应 npm run
const ENV: ENVType = "TEST"

const configs = {
  TEST: { // 测试环境 默认配置
    env: "test", // env
    // baseURL: "http://10.15.11.59:9090" // 服务器地址
    baseURL: "http://10.15.11.59:9090", // 服务器地址
    socketURL: "ws://10.15.11.59:9091/chat", // socket 地址
  },
  PROD: { // 生产
    env: "prod",
    baseURL: "asdsadsad",
    socketURL: "asdasd"
  }
}

// 编译环境 特定 config
const envSpeConfig = ENV ? configs[ENV] : configs.TEST

/**
 * 添加 全环境 通用参数
 * */
const config = Object.assign({}, envSpeConfig, {
  os: Platform.OS // 运行环境  "ios" "android"
} as {
  os: "ios"|"android"
})

export default config
