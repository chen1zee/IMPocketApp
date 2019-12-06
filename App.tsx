/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import NavigatorAppContainer from "js_pro_src/navigators/mainStackNavigator";
import ProToast from "js_pro_src/components/ProToast";
import LoadingMask from "js_pro_src/components/LoadingMask";
import ws from "js_pro_src/websocket/ws";
import config from "js_pro_src/config";

const App = () => {
  useEffect(() => { // 初始化 websocket
    // ws.connect(config.socketURL)
  }, [])
  return (
    <React.Fragment>
      <NavigatorAppContainer />
      <ProToast />
      <LoadingMask />
    </React.Fragment>
  );
};

export default App;
