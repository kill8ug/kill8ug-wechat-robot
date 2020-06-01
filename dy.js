const axios = require('axios')
const cheerio = require('cheerio')
var fs=require("fs");
const { FileBox } = require("wechaty")
const config = require("./config")

module.exports = function removeWaterMark(url,bot) {

    if(!url||url.indexOf("v.douyin.com")==-1){
        return;
    }

    function decodeHttpUrl(url){
        var start = url.indexOf("http");
        var end = url.lastIndexOf("/");
        var resultUrl=url.substring(start,end);
        return resultUrl;
    }

    // var savePath = '/Users/lixin/Desktop/'+new Date().getTime()+'.mp4';
    var fullUrl = decodeHttpUrl(url);
    console.log(fullUrl);
    axios.get(fullUrl, {
            headers: {
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'
            }
        })
        .then(function (response) {
            const $ = cheerio.load(response, {
                decodeEntities: false
            })
            var html = $.html();
            var redenUrl = html.match("(?<=playAddr: \")https?://.+(?=\",)")[0];
            redenUrl = redenUrl.replace("playwm","play");
            console.log(redenUrl)
            axios.get(redenUrl,{
                headers:{
                    "Connection":"keep-alive",
                    "Host":"aweme.snssdk.com",
                    "User-Agent":"User-Agent\", \"Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16D57 Version/12.0 Safari/604.1"
                },
                responseType:"stream"
            }).then((resp) => {
                var savePath = config.videoBasePath+new Date().getTime()+".mp4";
                const writer = fs.createWriteStream(savePath);
                resp.data.pipe(writer)
                writer.on('finish', () => {
                    console.log('finish')
                    const fileBox3 = FileBox.fromFile(savePath)
                    bot.say(fileBox3)
                })
                writer.on('error', () => {
                    console.log('error')
                })
                return;
            }).catch(function (error) {
                console.log(error)
            });
        })
        .catch(function (error) {
            console.log(error)
        });
}