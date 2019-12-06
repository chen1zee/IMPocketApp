/**
 * Base64 加解码
 * */
import Base64 from "crypto-js/enc-base64"
import Utf8 from "crypto-js/enc-utf8"

const base64 = {
  /**
   * str 转为 base64
   * @param {string} str
   * */
  parse: (str: string) => Base64.stringify(Utf8.parse(str)),
  /**
   * base64Str 转 字符串
   * @param {string} base64Str
   * */
  stringify: (base64Str: string) => Utf8.stringify(Base64.parse(base64Str)),
  /**
   * base64Str 转 对象
   * @param {string} base64Str
   * */
  objectify: (base64Str: string) => JSON.parse(base64.stringify(base64Str))
}

export default base64
