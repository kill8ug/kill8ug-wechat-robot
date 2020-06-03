const axios = require('axios')
const cheerio = require('cheerio')
var fs=require("fs");
const { Message } = require("wechaty")
const config = require("./config")

// npm i -S baidu-aip-sdk
var AipOcrClient = require("baidu-aip-sdk").ocr;
// 设置APPID/AK/SK
// https://console.bce.baidu.com/ai/?_=1591165733123#/ai/ocr/report/index
// 百度申请ocr key 一天50000次普通图片文字转换
var APP_ID = "20206164";
var API_KEY = "ON9s0Unfp0pl2isACdC6YbRC";
var SECRET_KEY = "XyROl75MGUUIoDsKN7s91h3hy73z9DCD";

module.exports = async function image2Words(bot,msg) {
    if(msg.payload.type != Message.Type.Image){
        return false;
    }
// 新建一个对象，建议只保存一个对象调用服务接口
    var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
    var fs = require('fs');

    var image = fs.readFileSync(config.videoBasePath+"2.jpeg").toString("base64");
    var options = {};
// 调用通用文字识别, 图片参数为本地图片
    client.generalBasic(image,options).then(function(result) {
        console.log("图片解析文字结果："+JSON.stringify(result));
        var words_result = result['words_result']
        var parseResult='';
        for(var x=0;x<words_result.length;x++){
            parseResult+=words_result[x]['words']+"\n";
        }
        msg.say(parseResult)
        return true;
    }).catch(function(err) {
        // 如果发生网络错误
        console.log(err);
    });

}