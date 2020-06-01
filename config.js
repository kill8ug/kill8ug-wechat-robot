
module.exports = {
  // puppet_padplus Token
  token: "",
  // 机器人名字
  name: "圈子",
  // 房间/群聊
  videoBasePath: "/Users/lixin/Desktop/",
  room: {
    // 管理群组列表
    roomList: {
      // 群名(用于展示，最好是群名，可随意) : 群id(这个可不能随意)
      xx: "*****@chatroom",
      aa: "*****@chatroom"
    },
    // 加入房间回复
    roomJoinReply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流`
  },
  // 私人
  personal: {
    // 好友验证自动通过关键字
    addFriendKeywords: ["加群"],
    // 是否开启加群
    addRoom: true
  }
}
