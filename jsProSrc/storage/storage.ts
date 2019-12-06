import AsyncStorage from "@react-native-community/async-storage"
import log from "js_pro_src/utils/log";

/**
 * 创建 storage 类
 * */
export class StorageCreator {
  private store:{[key:string]:any} = {} // 存储 mapper
  constructor(storageKeys:string[]) { // 构造 添加 storageKeys
    storageKeys.forEach(key => {
      this.store[key] = undefined
    })
  }
  /** 通过key 获取item */
  private static getItem = async function(key: string) {
    let val: string|null = null
    try {
      val = await AsyncStorage.getItem(key)
    } catch (e) { log.w(e) }
    return val
  }
  /** 设置item */
  private static setItem = async function(key: string, val: string) {
    try {
      await AsyncStorage.setItem(key, val)
    } catch (e) { log.w(e) }
  }
  /** 删除 item */
  private static removeItem = async function(key: string) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) { log.w(e) }
  }


  /**
   * 获取 对应 storageKey 的值
   * */
  public async get(key) {
    /** 内存取出 */
    if (this.store[key] !== undefined) return this.store[key]
    /** 设备取出 */
    const deviceStore = await StorageCreator.getItem(key)
    if (deviceStore !== null) this.store[key] = deviceStore
    return deviceStore
  }
  /**
   * 设置 对应 storageKey 的值
   * */
  public async set(key:string, val:string) {
    this.store[key] = val
    return await StorageCreator.setItem(key, val)
  }
  /**
   * 移除 token
   * */
  public async remove(key:string) {
    try {
      await StorageCreator.removeItem(key)
    } catch (e) { log.w(e) }
  }
}

