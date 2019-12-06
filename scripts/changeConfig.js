/**
 * 用 fs 修改 项目配置
 * jsProSrc/config.ts
 * 使其 环境变量 匹配 process.env.ENV 
 * */
const fs = require("fs")
const path = require("path")
const chalk = require("chalk")

function main () {
  const ENV = process.env.ENV

  if (!ENV) return // 不需要处理 config.ts 文件

  const configPath = path.resolve(__dirname, "../jsProSrc/config.ts")

  let content = fs.readFileSync(configPath)

  content = content.toString()

  let hasMatch = false // 是否有 match 对应字符串
  const newContent = content.replace(/(const ENV: ENVType = )(["'][^"']+["'])/, (match, p1) => {
    hasMatch = true
    return `${p1}"${process.env.ENV}"`
  })

  if (!hasMatch) {
    console.log(chalk.red(`
/**
 * 请修改 jsProSrc/config.ts 中
 * const ENV: ENVType = #aaa
 * 其中 #aaa 格式 应为 "TEST" 等
 * 错误码: 100001
 * */
  `))
    process.exit(100001)
    return // config.ts 格式不对
  }

  /** 写入 文件 */
  fs.writeFileSync(configPath, newContent)
}

main()
