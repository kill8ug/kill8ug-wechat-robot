// 配置文件
module.exports = bot => {
  return async function onStart() {
      //群
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
      //         // item.say("kx...");
      //     }
      // });
      //好友
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
      //         if("一路有我"==name){
      //             item.say("kx..");//给好友发送消息
      //         }
      //     }else{//非好友
      //         // console.log("not friend"+item.name()+item.id)
      //     }
      // })
      //好友消息测试
      // const lxr = await bot.Contact.load("Aov-alan");
      // lxr.say("xixi.....");
  }
}
