/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require("path")

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  // server: {
  //   port: 8082
  // }

  // resolver: {
  //   extraNodeModules: {
  //   }
  // }
  watchFolders: [
    // path.resolve(__dirname, "../pro_common"),
    // path.resolve(__dirname, "../ccc"),
  ],
  // 每次 都 请缓存打包 慢 暂不使用
  // resetCache: true
};
