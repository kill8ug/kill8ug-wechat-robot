const { Wechaty } = require('wechaty');
const { PuppetPadplus } = require('wechaty-puppet-padplus');
const onScan = require("./onScan") // 机器人需要扫描二维码时监听回调
const onMessage = require("./onMessage") // 消息监听回调
const onFriendShip = require("./onFriendShip") // 好友添加监听回调
const onLogin = require("./onLogin") //登录
const onLogout = require("./onLogout") //登出
const onRoomJoin = require("./onRoomJoin") //入群
const onRoomLeave = require("./onRoomLeave") //离开群
const onRoomTopic = require("./onRoomTopic") //群话题
const onRoomInvite = require("./onRoomInvite") //群邀请
const onStart = require("./onStart")
const config = require("./config")

const puppet = new PuppetPadplus({
    token:config.token
});

const bot = new Wechaty({
    name: "kill8ug",
    puppet: puppet
});

bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.on('message', onMessage(bot));
bot.on('friendship', onFriendShip);
// bot.on('dong', async function(){console.log("dong")});
// bot.on('error', async function(){console.log("error")});
// bot.on('heartbeat', async function(){console.log("heartbeat")});
// bot.on('ready', async function(){console.log("ready")});
bot.on('room-invite', onRoomInvite);
bot.on('room-join', onRoomJoin);
bot.on('room-leave', onRoomLeave);
bot.on('room-topic', onRoomTopic);
bot.on('start',onStart(bot));
// bot.on('stop', async function(){console.log("stop")});



bot.start()
    .then(() => {console.log('Starter Bot Started.');
    })
.catch(e => console.error(e));


