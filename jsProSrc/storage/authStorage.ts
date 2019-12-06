/**
 * 权限验证相关 storage
 * */

import {StorageCreator} from "js_pro_src/storage/storage";
import {TOKEN, DEVICE_TOKEN} from "js_pro_src/storage/storageKeys";

const authStorage = new StorageCreator([
  TOKEN, // token 用于 http请求
  DEVICE_TOKEN, // device_token 用于 websocket 连接
])

export default authStorage
