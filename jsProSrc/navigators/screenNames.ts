/** 注册 screen Name */
export const SCREEN_NAMES = {
  /**
   * 欢迎页 用于 判断用户登录态， 初始跳转 登录页 || MainTab
   * */
  WelCome: "WelCome",

  /** 主 tab (消息(默认)， 通讯录， 发现， 我) */
  MainTabNavi: "MainTabNavi",
  /** 消息页 Stack 导航 */
  MsgStack: "MsgStack",
  MsgList: "MsgList", // 消息列表（默认页）
  /** 通讯录 */
  CommuStack: "CommuStack", // 通讯录 stack
  Communicate: "Communicate", // 通讯录
  NewFriends: "NewFriends", // 新的朋友 列表页
  /** 发现 */
  FindStack: "FindStack", // 发现 stack
  FindList: "FindList", // 发现页 列表
  /** 我 */
  MineStack: "MineStack", // 我 stack
  MineList: "MineList", // 我(个人资料) 列表


  /** 发起群聊 Stack 导航 */
  CreateChatStack: "CreateChatStack",
  PicPeople: "PicPeople", // 选择群成员
  PocketConf: "PocketConf", // 设置 群 抢红包配置  // 扫雷， 禁抢
  SetGrabPeople: "SetGrabPeople", // 群主设置抢包号

  Chat: "Chat", // 聊天界面
  ChatDetail: "ChatDetail", // 聊天信息
  PocketDetails: "PocketDetails", // 红包详情页
  CreatePocket: "CreatePocket", // 发(创建)红包页
  // 后续 将 CreateChatStack.SetGrabPeople 提到此路由处理
  GlobalSetGrabPeople: "GlobalSetGrabPeople", // 设置抢包号 页面
  SendPocketRecord: "SendPocketRecord", // 发包记录
  Complain: "Complain", // 投诉页
  ComplainNeedKnow: "ComplainNeedKnow", // 投诉须知页
  Login: "Login", // 登录页
  FindPsw: "FindPsw", // 找回密码
  Register: "Register", // 注册页
  ChangePsw: "ChangePsw", // 修改密码
  CashInList: "CashInList", // 充值记录 列表
  CashInDetail: "CashInDetail", // 充值详情
  CashOutList: "CashOutList", // 提现记录 列表
  CashOutDetail: "CashOutDetail", // 提现详情
  RecentSendPocket: "RecentSendPocket", // 最近(7天)发出去的包
  RecentGrabPocket: "RecentGrabPocket", // 最近(7天)抢到的包
  BindPay: "BindPay", // 绑定支付宝 和 银行卡
  BindAli: "BindAli", // 绑定 支付宝
  BindBank: "BindBank", // 绑定 银行卡
  BindIDCard: "BindIDCard", // 绑定 身份证
  SearchFriend: "SearchFriend", // 添加好友页
  FriendDetail: "FriendDetail", // 好友详情页 (未添加状态 && 已是好友 状态)
  ApplyAddFrnd: "ApplyAddFrnd", // 好友 验证申请
}

/** 注册 screen 显示名称 */
export const SCREEN_2_TITLE = {
  /**
   * 欢迎页 用于 判断用户登录态， 初始跳转 登录页 || MainTab
   * */
  WelCome: "欢迎页",
  /** 主 tab (消息(默认)， 通讯录， 发现， 我) */
  MainTabNavi: "MainTabNavi",
  /** 消息页 Stack 导航 */
  MsgStack: "消息",
  MsgList: "消息",
  /** 通讯录 */
  CommuStack: "通讯录", // 通讯录 stack
  Communicate: "通讯录", // 通讯录
  NewFriends: "新的朋友", // 新的朋友 列表页
  /** 发现 */
  FindStack: "发现", // 发现 stack
  FindList: "发现", // 发现页 列表
  /** 我 */
  MineStack: "我", // 我 stack
  MineList: "个人中心", // 我(个人资料) 列表


  /** 发起群聊 Stack 导航 */
  CreateChatStack: "CreateChatStack",
  PicPeople: "发起群聊", // 选择群成员
  PocketConf: "群聊", //
  SetGrabPeople: "群主设置抢包号",

  Chat: "聊天",
  ChatDetail: "聊天信息",
  PocketDetails: "红包详情",
  CreatePocket: "发红包",
  GlobalSetGrabPeople: "群主设置抢包号",
  SendPocketRecord: "发包记录",
  Complain: "投诉",
  ComplainNeedKnow: "投诉须知",
  Login: "登录",
  FindPsw: "找回密码",
  Register: "注册",
  ChangePsw: "修改密码",
  CashInList: "充值记录",
  CashInDetail: "充值详情",
  CashOutList: "提现记录",
  CashOutDetail: "提现详情",
  RecentSendPocket: "发出去的包(7天)",
  RecentGrabPocket: "抢到的包(7天)",
  BindPay: "绑定支付宝和银行卡",
  BindAli: "绑定支付宝",
  BindBank: "绑定银行卡",
  BindIDCard: "绑定身份证",
  SearchFriend: "添加好友", // 添加好友页
  FriendDetail: "详细资料", // 好友详情页 (未添加状态 && 已是好友 状态)
  ApplyAddFrnd: "验证申请", // 好友 验证申请页
}
