const app = getApp()
import Notify from '@vant/weapp/notify/notify';
// pages/set/set.js
const validLogin = require('../../valid/valid');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        userInfo: {},
        islogin: false,
        newcode:1,
        show1:false,
        username:""
    },
    showPopup() {
        this.setData({
            show: true
        });
    },
    showPopup1() {
        let _this=this;
        if (this.data.userInfo.username) {
            _this.setData({
                show1: true,
                username:_this.data.userInfo.username
            });
        }
      
    },

    Changeusername(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            username:event.detail
        })
      },
    onClose() {
        this.setData({
            show: false,
            show1:false
        });
    },
    editname(){
        let _this=this;
        let curname=this.data.username

       
        this.updateUser();
        
            
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(e) {
        this.getUserInfo();
        wx.getSystemInfo({
            success: (res) => {
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let imgWidth = ww * 0.48;
                let scrollH = wh;

                this.setData({
                    scrollH: scrollH,
                    imgWidth: imgWidth
                });
                console.log("ww", ww);
                console.log("wh", wh);
                console.log("imgWidth", imgWidth);
                console.log("scrollH", scrollH);
                // this.loadImages();
                // this.onImageLoad();
            }
        })
        // this.setData({
        //     userInfo:app.globalData.userInfo,
        //     islogin:app.globalData.islogin,
        // })
    },

    gologin() {
        //详情页面位非tabbar页面
        console.log("点击跳转1");
        wx.navigateTo({
            url: '../login/login'
        })
    },
    goaddress() {
        //详情页面位非tabbar页面
        console.log("点击跳转1");
        wx.navigateTo({
            url: '../address/address'
        })
    },

    
    //获取用户数据
    async getUserInfo() {
        console.log("获取用户数据");

        let loginStatus = await validLogin();
        console.log("loginStatus", loginStatus);
        if (loginStatus) {


            let userId = wx.getStorageSync('userId');

            wx.showLoading({
                title: '登录中',
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
                    islogin: true
                })

             
            }).catch(err => {
                console.log('err ==> ', err);
                wx.hideLoading();
            })
            
            this.onClose();

        } else {
            //跳转到登录页面
            wx.navigateTo({
                url: '../login/login'
            })
        }
    },

    //修改用户头像
    updateUSerImg() {
        console.log("修改用户头像");
        wx.chooseMedia({
            count: 9,
            mediaType: ['image', 'video'],
            sourceType: ['album', 'camera'],
            maxDuration: 30,
            camera: 'back',
            success: async res => {
                console.log('res ==> ', res);

                let filePath = res.tempFiles[0].tempFilePath;

                let fileName = filePath.split(/\//).pop();

                console.log('fileName ==> ', fileName);

                let cloudPath = `user_img/${fileName}`;

                let loginStatus = await validLogin();
                console.log("loginStatus",loginStatus);

                console.log("cloudPath",cloudPath);
                console.log("filePath",filePath);
                if (loginStatus) {

                    this.uploadFile(filePath, cloudPath).then(res => {
                        console.log('res ==> ', res);
                        if (res.fileID) {
                            this.updateUserImg(res.fileID);
                        } else {
                            wx.showToast({
                                title: '修改失败'
                            })
                        }
                    }).catch(err => {
                        console.log('err ==> ', err);
                    })

                } else {
                    //跳转到登录页面
                    wx.navigateTo({
                        url: '../login/login'
                    })
                }



            }
        })

    },

    //上传文件到云存储
    uploadFile(filePath, cloudPath) {
        return wx.cloud.uploadFile({
            cloudPath, // 对象存储路径，根路径直接填文件名，文件夹例子 test/文件名，不要 / 开头
            filePath, // 微信本地文件，通过选择图片，聊天文件等接口获取
            config: {
                env: 'cloud1-5gbqe03v8e747423' // 需要替换成自己的微信云托管环境ID
            }
        })
    },

    // 修改用户姓名
    async updateUser() {

        let loginStatus = await validLogin();
        console.log('loginStatus ==> ', loginStatus);
        // console.log(this.data.userInfo);
        // let userId=this.data.userInfo._id
        // console.log("userId",userId);
        if (loginStatus) {
            let userId = wx.getStorageSync('userId');
            console.log("user",userId);
            wx.showLoading({
                title: '加载中...',
                mask: true
              })
              let curname=this.data.username
          
              wx.cloud.callFunction({
                name: 'update_usermessage',
                data: {
                  userId,
                  username: curname
                }
              }).then(res => {
                console.log('res ==> ', res);
                wx.hideLoading();
              }).catch(err => {
                console.log('err ==> ', err);
                wx.hideLoading();
              })
              wx.reLaunch({
                url: '../set/set',
              })
                 // 成功通知
                 Notify({ type: 'success', message: '修改成功' });
            
        }else{
            wx.navigateTo({
                url: '../login/login'
            })
        }


      
      },

    //修改头像
    async updateUserImg(fileID) {
        //校验登录
        let loginStatus = await validLogin();
        console.log('loginStatus ==> ', loginStatus);

        if (loginStatus) {

            let userId = wx.getStorageSync('userId');

            wx.showLoading({
                title: '加载中...',
                mask: true
            })

            wx.cloud.callFunction({
                name: 'update_user_img',
                data: {
                    userId,
                    userImg: fileID
                }
            }).then(res => {
                console.log('res ==> ', res);
                wx.hideLoading();
                if (res.result.stats.updated === 1) {
                    this.data.userInfo.userImg = fileID;

                    this.setData({
                        userInfo: this.data.userInfo
                    })

                } else {
                    wx.showToast({
                        title: '修改失败'
                    })
                }
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
    //删除用户
  removeUser() {
      let _id=this.data.userInfo._id
      console.log("this.data.userInfo",this.data.userInfo);
      console.log("id",_id);
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    wx.cloud.callFunction({
      name: 'remove_user',
      data: {
        user_id: _id
      }
    }).then(res => {
      console.log('res ==> ', res);
      wx.hideLoading();
    }).catch(err => {
      console.log('err ==> ', err);
      wx.hideLoading();
    })
  },

    //退出登录
    async updatetoken() {
        //校验登录
        let loginStatus = await validLogin();
        console.log('loginStatus ==> ', loginStatus);
        let _this = this;
        if (loginStatus.result.isLogin) {

            let token = wx.getStorageSync('token');
            console.log("token", token);
            wx.showLoading({
                title: '加载中...',
                mask: true
            })

            wx.cloud.callFunction({
                name: 'valid_login',
                data: {
                    token: null,
                    user_id: null
                }
            }).then(res => {
                console.log('res ==> ', res);
                console.log('res.result.code == 0', res.result.code == 0);
                wx.hideLoading();
                if (res.result.code == 0) {
                    console.log("已退出登录");
                    let obj = {}
                    this.setData({
                        userInfo: obj,
                        islogin: false
                    })
                    console.log("this.data.userInfo", _this.data.userInfo);


                    app.globalData.userInfo = _this.data.userInfo;
                    app.globalData.islogin = _this.data.islogin;
                    app.globalData.newcode =0;
                    _this.onClose();

                } else {
                    wx.showToast({
                        title: '修改失败'
                    })
                }
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
    quit() {
        console.log("点击退出");
        this.updatetoken();
        console.log("this.data.userInfo", this.data.userInfo);
        this.removeUser();
        // wx.navigateBack()
    },
    gousermessage(){
        wx.navigateTo({
            url: '../usermessage/usermessage'
          })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        console.log('set111', app.globalData.userInfo);
        console.log('ser111', app.globalData.islogin);

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.log('set111', app.globalData.userInfo);
        console.log('ser111', app.globalData.islogin);
        // this.setData({
        //     userInfo:app.globalData.userInfo,
        //     islogin:app.globalData.islogin,
        // })
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