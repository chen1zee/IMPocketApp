/**
 * obj <-> param 互换函数
 * */


/**
 * 组装 json -> aaa=123&bbb=321
 * 对象 {aaa: 123, bbb: 'ccc'} 转 param   aaa=123&bbb=ccc
 * */
export function obj2Param(json:{[key: string]: any}) {
  if (!json) return ''
  return Object.keys(json).reduce((tmp, key) => {
    if (json[key] == undefined) return tmp
    // @ts-ignore
    tmp.push(encodeURIComponent(key) + '=' + encodeURIComponent(json[key]))
    return tmp
  }, []).join('&')
}

/**
 * url 中的 param 转对象
 * */
export function param2Obj(url: string) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/[=]/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}
