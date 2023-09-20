// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database();

//获取查询指令引用
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  
  // return await db.collection('user').where({
  //   _id: event._id
  // }).remove();

  //删除age >= 25
  console.log("evnet",event);
  return await db.collection('login_status').where({
    user_id: event.user_id
  }).remove();

}