/** 公共 response 结构 */
export type DefaultRes<T> = {
  code: number, msg: string,
  data: T
}
