const app = getApp()
const validLogin = require('../../valid/valid');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading:true,
        recommendlist:[
        ],
        adddata:[
        ],
        userInfo: {},
        islogin:false,
        active:0
    },
    goshopdetail(e) {
        console.log("e",e);
        console.log("点击跳转1");
        let index=e.currentTarget.dataset.index;
        let id=this.data._idarr[index]
        wx.setStorageSync('key', id)
        wx.navigateTo({
            url: '../shopdetail/shopdetail',
        })

        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(e) {
        console.log('111',app.globalData.userInfo);
       
        
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
                console.log("ww",ww);
                console.log("wh",wh);
                console.log("imgWidth",imgWidth);
                console.log("scrollH",scrollH);
                this.loadImages();
                // this.onImageLoad();
            }
        })

        this.getshoplist()
        // this.setData({
        //     userInfo:app.globalData.userInfo,
        //     islogin:app.globalData.islogin,
        // })
    },
     //获取商品列表
     async getshoplist() {
        let _this=this;
        wx.cloud.callFunction({ // 云函数名称
                name: 'get_shoplist',
            }).then(res => {

                console.log('云函数获取数据成功', res)
                let recommendlist=res.result.data
                let adddata=res.result.data
                let idarr=[];
                adddata.forEach(function (item,index) {
                  
                    idarr.push(item._id)
                })
                let _idarr=idarr
                _this.setData({
                    recommendlist:recommendlist,
                    adddata:adddata,
                    _idarr:_idarr
                })
                
            })
            .catch(err => {
                console.log('云函数获取数据失败', err)
            })
    },


    loadImages: function () {
        let images = [{
                pic: "../../images/recommend1.jpg",
                height: 0
            },
            {
                pic: "../../images/recommend2.jpg",
                height: 0
            },
            {
                pic: "../../images/recommend3.jpg",
                height: 0
            },
            {
                pic: "../../images/recommend2.jpg",
                height: 0
            },
            {
                pic: "../../images/recommend3.jpg",
                height: 0
            },
            {
                pic: "../../images/recommend2.jpg",
                height: 0
            },
            {
                pic: "../../images/recommend3.jpg",
                height: 0
            },
            {
                pic: "../../images/recommend1.jpg",
                height: 0
            }

        ];
        let recommendlsit1 = this.data.recommendlist;

        let baseId = "img-" + (+new Date());

        // for (let i = 0; i < recommendlsit1.length; i++) {
        //     images[i].id = baseId + "-" + i;
        // }
        console.log("recommendlsit", recommendlsit1);
        this.refresh();
        this.setData({
            loadingCount: recommendlsit1.length,
            // recommendlsit: recommendlsit1
        });
    },
    onImageLoad: function (e) {
        console.log("e", e);
        // console.log("onImageLoad==>e",e);
        let imageId = e.currentTarget.id;
        let oImgW = e.detail.width; //图片原始宽度
        let oImgH = e.detail.height; //图片原始高度
        let imgWidth = this.data.imgWidth; //图片设置的宽度
        let scale = imgWidth / oImgW; //比例计算
        let imgHeight = oImgH * scale; //自适应高度
        console.log("imageId,oImgW,oImgH");
        console.log(imageId, oImgW, oImgH);
        console.log("imgWidth,scale,imgHeight");
        console.log(imgWidth, scale, imgHeight);
        let recommend1 = this.data.recommendlist;
        let imageObj = null;

        for (let i = 0; i < recommend1.length; i++) {
            let img = recommend1[i];
            if (img.id === imageId) {
                imageObj = img;
                break;
            }
        }
        console.log("imageObj", imageObj);
        imageObj.height = imgHeight;

        let loadingCount = this.data.loadingCount - 1;
        let col1 = this.data.col1;
        let col2 = this.data.col2;

        if (col1H <= col2H) {
            col1H += imgHeight;
            col1.push(imageObj);
        } else {
            col2H += imgHeight;
            col2.push(imageObj);
        }

        let data = {
            loadingCount: loadingCount,
            col1: col1,
            col2: col2
        };

        if (!loadingCount) {
            data.images = [];
        }
        console.log("data.col1", data.col1);
        console.log("data.col2", data.col2);
        this.setData(data);
    },
    refresh() {
        console.log("调用了refresh");
        let _this = this;
        let newarr = this.data.recommendlist;
        console.log("newarr", newarr);

        _this.data.adddata.forEach(function (item, index) {
            // console.log(item,index);
            newarr.push(item)
        })
        console.log("newarr", newarr);
        this.setData({
            "recommendlist": newarr
        })
        console.log(this.data.recommendlist);
    },
    gologin() {
        //详情页面位非tabbar页面
        console.log("点击跳转1");
        wx.navigateTo({
          url: '../login/login'
        })
      },
    goorderstatue(e) {
        console.log("e",e);
        let index=e.currentTarget.dataset.index
        this.setData({
            radio:index
        })
        //详情页面位非tabbar页面
        console.log("点击跳转1");
        // wx.navigateTo({
        //   url: '../orderstatue/orderstatue'
        // })
        let radio=1
        wx.setStorageSync('key', index)
        wx.navigateTo({
            url: '../orderstatue/orderstatue',
        })
      },

        //获取用户数据
  async getUserInfo() {
      console.log("获取用户数据");
      
    let loginStatus = await validLogin();
    console.log('loginStatus ==> ', loginStatus);
    // loginStatus.result.isLogin
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
          islogin:true
        })
      }).catch(err => {
        console.log('err ==> ', err);
        wx.hideLoading();
      })


    } else {
        console.log("false");
        let loginStatus = await validLogin();
        
        console.log('loginStatus ==> ', loginStatus);
    //   跳转到登录页面
    //   wx.navigateTo({
    //     url: '../login/login'
    //   })
    }
  },
  async getUserInfo1() {
      console.log("获取用户数据");
      
    let loginStatus = await validLogin();
    console.log('loginStatus ==> ', loginStatus);
    if (loginStatus.result.isLogin) {


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
          islogin:true
        })
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
  goset(){
      console.log("跳转到set");
      this.setData({
        userInfo:app.globalData.userInfo,
        islogin:app.globalData.islogin,
    })
    wx.navigateTo({
        url: '../set/set'
      })

  },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        console.log('my111',app.globalData.userInfo);
        console.log('my111',app.globalData.islogin);
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.log('my111',app.globalData.userInfo);
        console.log('my111',app.globalData.islogin);
        this.getUserInfo();
    //    this.setData({
    //         userInfo:app.globalData.userInfo,
    //         islogin:app.globalData.islogin,
    //     })
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