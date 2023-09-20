// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 云函数获取数据写法

//获取数据库引用
const db = cloud.database();
exports.main = async (event, context) => {
    return cloud.database().collection('shoplist').get()
}