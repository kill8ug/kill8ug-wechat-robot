const config = require("./config")
const keyworDeply = require('./keyworDeply');
const moment = require('moment');
const dy = require("./dy")
const tp = require("./tp")
// node-request请求模块包
const request = require("request")
// 请求参数解码
const urlencode = require("urlencode")

const name = config.name
const roomList = config.room.roomList
// 消息监听回调
module.exports = bot => {
  return async function onMessage(msg) {
    if (msg.self()) return

    let time = moment().format("YYYY-MM-DD HH:mm:ss");
    var isRoomMsg = msg.room();
    var from = msg.from() ? msg.from().name() : null;
    var fromId = msg.from() ? msg.from().id : null;
    var to = msg.to()?msg.to().name():null;
    var toId = msg.to() ? msg.to().id : null;
    var baseMsg = "";
    var roomName = isRoomMsg?isRoomMsg.payload.topic:null;
    var msgText = msg.text();
    var msgType = msg.payload.type;
    if(isRoomMsg){//群消息

    }else {//个人消息
        // 是否获取群列表
        if (await isAddRoom(bot,msg)) return
        // 如果群名称在config配置，那么拉进群
        if (await isRoomName(bot, msg)) return
        // 抖音的转水印关键字
        if (await dy(bot,msg))return//抖音关键字回复
        if (await tp(bot,msg))return//图片转文字
        // 如果以上的功能都没匹配，那么自动回复
        let robotResp = await isAutoMsg(msg)//机器人自动回复，最后都不匹配才机器人
        await msg.say(robotResp)
        console.log(time+"\t"+from+":"+msg.text()+"\t机器人回复:"+robotResp)
    }


  // * - MessageType.Unknown     </br>
  // * - MessageType.Attachment  </br>
  // * - MessageType.Audio       </br>
  // * - MessageType.Contact     </br>
  // * - MessageType.Emoticon    </br>
  // * - MessageType.Image       </br>
  // * - MessageType.Text        </br>
  // * - MessageType.Video       </br>
  // * - MessageType.Url         </br>
  }
}

function isAutoMsg(msg) {
    return new Promise((resolve, reject) => {
        let url = `https://open.drea.cc/bbsapi/chat/get?keyWord=${urlencode(msg.text())}`
        request(url, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let res = JSON.parse(body)
                if (res.isSuccess) {
                    let send = res.data.reply
                    // 免费的接口，所以需要把机器人名字替换成为自己设置的机器人名字
                    send = send.replace(/Smile/g, name)
                    resolve(send)
                } else {
                    if (res.code == 1010) {
                        resolve("没事别老艾特我，我还以为爱情来了")
                    } else {
                        resolve("你在说什么，我听不懂")
                    }
                }
            } else {
                resolve("你在说什么，我脑子有点短路诶！")
            }
        })
    })
}

async function isAddRoom(bot,msg) {
    // 关键字 加群 处理
    if (msg.text() == "加群") {
        let roomListName = Object.keys(roomList)
        let info = `${name}当前管理群聊有${roomListName.length}个，回复群聊名即可加入哦\n\n`
        roomListName.map(v => {
            info += "【" + v + "】" + "\n"
        })
        msg.say(info)
        return true
    }
    return false
}
async function isRoomName(bot, msg) {
    // 回复信息为管理的群聊名
    if (Object.keys(roomList).some(v => v == msg.text())) {
        // 通过群聊id获取到该群聊实例
        const room = await bot.Room.find({ id: roomList[msg.text()] })
        // 判断是否在房间中 在-提示并结束
        if (await room.has(msg.from())) {
            await msg.say("您已经在房间中了")
            return true
        }
        // 发送群邀请
        await room.add(msg.from())
        await msg.say("已发送群邀请,邀请您进入："+room.payload.topic)
        return true
    }
    return false
}