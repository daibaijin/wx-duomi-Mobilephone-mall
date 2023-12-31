// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('user').where({
    userId: event.userId,
    create:event.create
     }).update({
    data: {
        username: event.username,
        password:event.password,
        buylist:event.buylist,
        formlist:event.formlist,
        address: event.address
    }
  })
}