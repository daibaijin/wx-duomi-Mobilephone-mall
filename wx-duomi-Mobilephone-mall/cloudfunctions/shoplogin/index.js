// 云函数入口文件
const cloud = require('wx-server-sdk');

//引入md5模块
const md5 = require('md5');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database();

let defaultImg = 'cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/userimg/loginimg.jpeg';

// 云函数入口函数
exports.main = async (event, context) => {
 
  //查询用户名是否存在, 如果存在, 则检验密码是否正确,如果不存在, 则直接注册并且登录成功

  //1.根据用户名查询用户数据
  let userData = await db.collection('user').where({
    username: event.username
  }).get();

  // console.log('userData ==> ', userData);

  //生成token
  let token = 'u' + Math.random().toString().slice(2) + new Date().getTime();

  //密码加盐
  let salt = 'tye5';

  //对密码进行加盐, 加密密码
  let password = md5(salt + event.password);

  //2.注册和登录
  if (userData.data.length === 0) {
    //进行注册
    

    let user = await db.collection('user').add({
      data: {
        username: event.username,
        password,
        userImg: defaultImg,
        buylist:event.buylist,
        formlist:event.formlist,
        address:event.address,
        history:event.history,
        searchhistory:event.searchhistory
      }
    })

    // console.log('user ==> ', user);

    if (user._id) {
      //注册成功
      

      // console.log('token ==> ', token);

      await db.collection('login_status').add({
        data: {
          user_id: user._id,
          token
        }
      })

      return {msg: '注册并登录成功', userId: user._id, token, code: 1}

    } else {
      return {msg: '注册失败', code: 0};
    }
  } else {
    //检验密码是否正确
    if (password === userData.data[0].password) {

      await db.collection('login_status').add({
        data: {
          user_id:  userData.data[0]._id,
          token
        }
      })

      return {msg: '登录成功', code: 1, token, userId: userData.data[0]._id};
    } else {
      return {msg: '密码错误', code: 0};
    }
    
  }

  

  

}