type Arr = (() => Promise<any>)[]
/**
 * 验证 验证函数 s
 * @param {Array} validateArr 验证函数 s
 * */
async function validateValidateFuncs(validateArr: Arr): Promise<true> {
  let err
  for (let i = validateArr.length; i--;) {
    try {
      await validateArr[i]()
    } catch (e) {
      err = e
    }
  }
  if (err) throw err
  return true
}

export default validateValidateFuncs
