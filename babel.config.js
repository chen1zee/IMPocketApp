module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // 暂不使用， 因 metro 缓存等原因
    // 将 process.env.XXX 内联到js代码中
    ["transform-inline-environment-variables"],
    // ["transform-inline-environment-variables", {
    //   "include": ["ENV"]
    // }],
    // 启用 装饰器
    ['@babel/plugin-proposal-decorators', {legacy: true}]
  ]
};
