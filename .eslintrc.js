module.exports = {
  root: true,
  extends: '@react-native-community',
  globals: {
    global: true,
    HermesInternal: true,
    GLOBAL: true,
    process: true,
    WebSocket: true
  },
  rules: {
    "prettier/prettier": 0,
    "comma-dangle": 0,
    "quotes": 0,
    "semi": 0,
    "react-native/no-inline-styles": 0,
    "curly": 0,
    "eqeqeq": 0,
    "no-return-assign": 0,
    "space-infix-ops": 0,
    "no-trailing-spaces": 0,
    "consistent-this": 0,
    "dot-notation": 0
  }
};
/** 常用 */
// 下一行 忽略检测
// eslint-disable-next-line react-hooks/exhaustive-deps

