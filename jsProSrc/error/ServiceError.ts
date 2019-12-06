/**
 * 业务逻辑错误
 * 如：
 * 用户主动取消 ajax,处理 等
 * */
class ServiceError extends Error {
  public isServiceError = true
  public detail: any
  /**
   * @param {String=} message 错误消息
   * @param {object=} detail 详情
   * */
  constructor(message, detail) {
    super(message)
    /**
     * 在方法里 error instanceof ServiceError 出现 ServiceError未定义问题
     * 暂此实现
     * */
    this.message = message;
    this.detail = detail;
  }
  /** error 是否 业务逻辑错误 */
  static isInstance(error) {
    if (!error) return false
    return error.isServiceError
  }
}

export default ServiceError
