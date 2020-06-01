const moment = require('moment');
const dy = require("./dy")
const { FileBox } = require("wechaty")

let time = moment().format("YYYY-MM-DD HH:mm:ss");


// 消息监听回调
module.exports = bot => {
  return async function onMessage(msg) {
    // 判断消息来自自己，直接return
    // if (msg.self()) return
    var isRoomMsg = msg.room();
    var from = msg.from() ? msg.from().name() : null;
    var fromId = msg.from() ? msg.from().id : null;
    var to = msg.to()?msg.to().name():null;
    var toId = msg.to() ? msg.to().id : null;
    // var dateStr = new Date().toLocaleDateString();
    var dateStr = time;
    var baseMsg = "";
    if(isRoomMsg){
      var roomName = msg.room().payload.topic;
      baseMsg+=dateStr+"\t群【"+roomName+"】:"+from+"\t发送一条消息\t";
    }else{
      baseMsg+=dateStr+"\t好友："+from+"\t发送一条消息\t";
    }
    var msgType = msg.payload.type;
  // * - MessageType.Unknown     </br>
  // * - MessageType.Attachment  </br>
  // * - MessageType.Audio       </br>
  // * - MessageType.Contact     </br>
  // * - MessageType.Emoticon    </br>
  // * - MessageType.Image       </br>
  // * - MessageType.Text        </br>
  // * - MessageType.Video       </br>
  // * - MessageType.Url         </br>
    if(msgType==bot.Message.Type.Text){
        baseMsg+=msg.text();
        console.log(baseMsg+"\n");
        if(!isRoomMsg){
            var msginfo = msg.text();
            if(msginfo.indexOf("v.douyin.com")!=-1){
                dy(msginfo,bot);
                // console.log(savePath);
                // msg.from().say("hello!");
                // const contact = await bot.Contact.find()
                // await bot.say(contact)
                // const fileBox = FileBox.fromFile('/Users/lixin/Desktop/timg.jpeg')
                // await bot.say(fileBox)
                // const fileBox2 = FileBox.fromUrl('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590388339096&di=78a90bec5591e4842e76cbbc5af365f7&imgtype=0&src=http%3A%2F%2Ft7.baidu.com%2Fit%2Fu%3D3616242789%2C1098670747%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D900%26h%3D1350')
                // await bot.say(fileBox2)
                // const linkPayload = new UrlLink ({
                //     description : 'WeChat Bot SDK for Individual Account, Powered by TypeScript, Docker, and Love',
                //     thumbnailUrl: 'https://avatars0.githubusercontent.com/u/25162437?s=200&v=4',
                //     title       : 'Welcome to Wechaty',
                //     url         : 'https://github.com/wechaty/wechaty',
                // })
                // await bot.say(linkPayload)
                // const fileBox3 = FileBox.fromFile('/Users/lixin/Desktop/1590142204166.mp4')
                // await bot.say(fileBox3)

            }
        }
    }
  }
}