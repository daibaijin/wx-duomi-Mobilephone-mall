//校验登录

let token = wx.getStorageSync('token');
let userId = wx.getStorageSync('userId');

module.exports = () => {
    console.log("token","userId");
    console.log(token,userId);
  return wx.cloud.callFunction({
    name: 'valid_login',
    data: {
      token,
      userId
    }
  })

}