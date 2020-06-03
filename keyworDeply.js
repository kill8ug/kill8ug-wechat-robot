exports.greeting = "关键字回复字典。";

exports.getReply = function (msgText,msg) {
    msgText = msgText.toLowerCase();
  switch(msgText) {
    case "#h":
      return "目前支持抖音去水印和图片转文字功能；" +
          "dy 加入抖音去水印群" +
          "tp 加入图片转文字群"
  }
}
