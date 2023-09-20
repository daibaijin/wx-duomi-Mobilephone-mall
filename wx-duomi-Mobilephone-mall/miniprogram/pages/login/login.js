// pages/login/login.js
const app = getApp()
const validLogin = require('../../valid/valid');
import Notify from '@vant/weapp/notify/notify'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            username: '',
            password: '',
            buylist:[],
            formlist:[],
            address:[],
            history:[],
            searchhistory:[]
          },
          islogin:true
    },

    inputUserInfo(e) {
        console.log("e",e);
        console.log("this",this);
        let value = e.detail.value;
        let key = e.currentTarget.dataset.key;
        // this.setData({
        //     username:value
        // })
        this.data.userInfo[key] = value;
        console.log("key",key);
        console.log("this.data.userInfo[key]",this.data.userInfo[key]);
      },
    inputUserInfo1(e) {
        console.log("e",e);
        let value = e.detail.value;
        let key = e.currentTarget.dataset.key;
        // this.setData({
        //     password:value
        // })
        this.data.userInfo[key] = value;
        console.log("key",key);
        console.log("this.data.userInfo[key]",this.data.userInfo[key]);
      },
    
      login() {
        console.log('this.data.userInfo ==> ', this.data.userInfo);
        let _this=this;
        wx.showLoading({
          title: '加载中...',
          mask: true
        })
    
        wx.cloud.callFunction({
          name: 'shoplogin',
          data: {
            ...this.data.userInfo
          }
        }).then(res => {
          console.log('res ==> ', res);
          console.log("res.result.code",res.result.code);
        
        
          wx.hideLoading();
    
          if (res.result.code === 1) {
            //将token保存在本地存储
            wx.setStorageSync('token', res.result.token);
    
            wx.setStorageSync('userId', res.result.userId)
            console.log("res.result.token",res.result.token);
            console.log("res.result.userId",res.result.userId);

            Notify({ type: 'success', message: res.result.msg});
            // _this.getUserInfo();
            
            _this.switch();
          }else{
            Notify({ type: 'danger', message: res.result.msg });
          }
         
          
        }).catch(err => {
          console.log('err ==> ', err);
          wx.hideLoading();
        })
      },


      switch(){
          wx.switchTab({
            url: '../my/my',
            success: (res) => {
                console.log("跳转my");
            },
            fail: (res) => {},
            complete: (res) => {},
          })
      },
      async getUserInfo() {
        console.log("获取用户数据");
        let _this=this;
      let loginStatus = await validLogin();
      console.log('loginStatus ==> ', loginStatus);
      if (loginStatus.result.isLogin) {
  
  
        let userId = wx.getStorageSync('userId');
  
        wx.showLoading({
          title: 'title',
          mask: true
        })
  
        wx.cloud.callFunction({
          name: 'shopget_user',
          data: {
            userId
          }
        }).then(res => {
          console.log('获取用户数据 res ==> ', res);
          wx.hideLoading();
  
          this.setData({
            userInfo: res.result.data,
            islogin:true
          })

          app.globalData.userInfo = _this.data.userInfo;
        app.globalData.islogin = _this.data.islogin;
        }).catch(err => {
          console.log('err ==> ', err);
          wx.hideLoading();
        })
  
  
      } else {
        //跳转到登录页面
        wx.navigateTo({
          url: '../login/login'
        })
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
       
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.log('set111', app.globalData.userInfo);
        console.log('ser111', app.globalData.islogin);
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})