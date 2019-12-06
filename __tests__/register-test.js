import {registered, sms} from "js_pro_src/api/common"

// jest.setTimeout(10000) // 10s超时

describe("公共api 调用，", () => {
  it('注册 && 获取 token', async function () {
    const phone = "13688881212"
    expect.assertions(1) // 预期断言
    /** 获取验证码 */
    const codeRes = await sms({phone, type: 2})
    console.log(codeRes)
    if (!codeRes.data) return
    /** 注册 */
    const regiRes = await registered({
      code: codeRes.data.code, passwd: "123123",
      phone, username: "asdasd"
    })
    console.log("注册返回")
    console.log(regiRes.data)
    expect(typeof regiRes.data).toBe("string")
  });
})


