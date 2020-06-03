var CronJob = require('cron').CronJob;
var http = require('https')
// cheerio模块
var cheerio = require('cheerio')
// 字符转码
var iconv = require('iconv-lite')
const config = require("./config")
// const weibospider = require("./weibospider")
// 配置文件
module.exports = bot => {
  return async function onStart() {
      // const rooms = await bot.Room.findAll();
      // rooms.forEach(function (item, index) {
      //     var roomId = item.id;
      //     var roomName = item.payload.topic;
      //     var roomImage = item.payload.avatar;
      //     var roomMembers = item.payload.memberIdList;
      //     var ownerId = item.owner().id;
      //     var ownerName = item.owner().name();
      //     console.log(index+"\troomId:"+roomId+"\troomName:"+roomName+"\townerId:"+ownerId+"\townerName:"+ownerName);
      //     if("18111474247@chatroom"==roomId){
      //         item.say("kx...");
      //     }
      // });
      // 好友
      // const list = await bot.Contact.findAll();
      // list.forEach(function (item) {
      //     if(item.friend()){//好友
      //         var nickName = item.payload.alias;
      //         var avatar = item.payload.avatar;
      //         var city = item.payload.city;
      //         var gender = item.payload.gender;
      //         var id = item.payload.id;
      //         var name = item.payload.name;
      //         var weixin = item.payload.weixin;
      //         var type = item.payload.type;
      //         console.log("\tnickName:"+nickName+"\tavatar:"+avatar+"\tcity:"+city+"\tgender:"+gender+"\tid:"+id+"\tname:"+name+"\tweixin:"+weixin+"\ttype:"+type)
      //     }else{//非好友
      //         // console.log("not friend"+item.name()+item.id)
      //     }
      // })
      //好友消息测试
      // const lxr = await bot.Contact.load("Aov-alan");
      // lxr.say("xixi.....");
      console.log("【"+bot.self().payload.name+"】登录了。。。")
      //启动定时器
//       秒：0-59
//       分钟：0-59
//       小时：0-23
//       天：1-31
//       月份：0-11（1月至12月）
//       星期几：0-6（周日至周六）
//       new CronJob('*/5 * * * * *', function() {
      //定时发送消息模板
      new CronJob('1 30 * * * *', function() {
          weiboSpider(bot)
      }, null, true);
  }
}
function weiboSpider(bot){
    const sufix = 'https://s.weibo.com'

    var url = "https://s.weibo.com/top/summary?cate=realtimehot"

    http.get(url, res => {

        var html = '';

        res.on('data', data => {

            html += iconv.decode(data, 'utf-8');

        })

        res.on('end', () => {

            findStock(html)

        })

    })

    function findStock(html) {

        if (html) {

            var $ = cheerio.load(html, {

                decodeEntities: false

            });

            var slideList = $('#pl_top_realtimehot tbody');

            let ranking = 1;

            let dateTime = new Date();

            var text = '';

            slideList.find('tr').each((idx, element) => {

                var $tr = cheerio.load($(element).html(), {

                    decodeEntities: false

                })

                let hot_url = $tr('a').attr('href')

                let hot_name = $tr('a').html().replace(/\<.*?\>/g, '')

                // text+=ranking+"、"+hot_name+(sufix + hot_url)+"\n";
                text+=ranking+"、"+hot_name+"\n";

                ranking++

            })
            const lxr = bot.Contact.load(config.cronReceive);
            lxr.say(text);
        }
    }
}

