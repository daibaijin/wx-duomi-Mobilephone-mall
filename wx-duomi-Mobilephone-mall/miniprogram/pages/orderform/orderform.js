// pages/orderform/orderform.js
import Notify from '@vant/weapp/notify/notify';
const validLogin = require('../../valid/valid');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showaddress: false,
        imageURL1: [
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/xmix1.jpg",
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/xmix2.png",
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/xmix3.jpg",
        ],
        totalPrice: 0,
        totalcount:0,
        maskshow: false,
        content: "", //输入内容
        KeyboardKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'],
        keyShow: true, //默认显示键盘
       
        userInfo:[],
        islogin: false,
        addresslist:[],
        radio:0,
        addressshow:[],
        formlist:[],
        curform:[],
        addressempty:true,
        onepay:true,
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(e) {
        console.log("执行onLoad");
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

            }
        })
        
      
        this.getUserInfo();
        console.log("onepay",this.data.onepay);
    },
    goaddress(){
        wx.navigateTo({
          url: '../address/address',
        })
    },


       // 修改订单
       async updateformlist() {
        console.log("updatebuylist");
        let _id=this.data._id
        let username=this.data.userInfo.username
        let password=this.data.userInfo.password
        let buylist=this.data.userInfo.buylist
       
       let address=this.data.userInfo.addresslist
       let loginStatus = await validLogin();
       let formlist=this.data.formlist
        let create=formlist[0].create
        console.log("create",create);
        console.log("formlist",formlist);
    //    console.log("buylist",buylist);
       console.log('loginStatus ==> ', loginStatus);
       // console.log(this.data.userInfo);
       // let userId=this.data.userInfo._id
       // console.log("userId",userId);
       if (loginStatus) {
           let userId = wx.getStorageSync('userId');
           console.log("user",userId);
           wx.showLoading({
               title: '加入中...',
               mask: true
             })
             let curname=this.data.username
         
             wx.cloud.callFunction({
               name: 'update_usermessage',
               data: {
                create:create,
                 userId,
                 username:username,
                 password:password,
                 buylist:buylist,
                 formlist:formlist,
                 address: address
               }
             }).then(res => {
               console.log('res ==> ', res);
               wx.hideLoading();
             }).catch(err => {
               console.log('err ==> ', err);
               wx.hideLoading();
             })
           
                // 成功通知
                Notify({ type: 'success', message: '已生成订单' });

              
           
       }else{
        //    wx.navigateTo({
        //        url: '../login/login'
        //    })
        Notify({ type: 'danger', message: '未登录' });
       }


     
     },


    async getUserInfo() {
        console.log("获取用户数据");

        console.log("onepay",this.data.onepay);
        this.setData({
            totalPrice:0,
            totalcount:0,
            userInfo:[],
            islogin: false,
            addresslist:[],
            radio:0,
            addressshow:[],
            formlist:[],
            curform:[],
           
        })
        if (this.data.onepay==false) {
            this.setData({
                onepay:false
            })
        }else{
            this.setData({
                onepay:true
            })
        }


        console.log("onepay",this.data.onepay);


        let _this=this;
        let totalPrice=this.data.totalPrice
        let totalcount=this.data.totalcount
        let loginStatus = await validLogin();
        let curform=this.data.curform
        console.log("loginStatus", loginStatus);
        if (loginStatus) {


            let userId = wx.getStorageSync('userId');
            wx.showLoading({
                title: '加载中...',
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
                
                let formlist=res.result.data.formlist
                console.log("formlist[formlist.length-1]",formlist[formlist.length-1]);
                curform.push(formlist[0])
                this.setData({
                    userInfo: res.result.data,
                    islogin: true,
                    addresslist:res.result.data.address,
                    formlist:formlist,
                    curform:curform
                })
                console.log("this.datat.curform",_this.data.curform);
                console.log("this.datat.userInfo",_this.data.userInfo);
                console.log("this.datat.formlist",_this.data.formlist);
                console.log("this.datat.addresslist",_this.data.addresslist);



                let defaultaddress=_this.data.userInfo.formlist[0].defaultaddress
                console.log("defaultaddress",defaultaddress);
                _this.data.addressshow.push(defaultaddress)
                _this.setData({
                    addressshow: _this.data.addressshow
                })
              
                if (_this.data.addresslist.length!=0) {
                    _this.setData({
                        addressempty:false
                    })
                }
                if (_this.data.addressshow.length>1) {
                    _this.data.addressshow.splice(_this.data.addressshow.length-1,1)
                    this.setData({
                        addressshow:_this.data.addressshow
                    })
                }
                console.log("_this.data.addressshow",_this.data.addressshow);
                // let newarr=[]
                // _this.data.addresslist.forEach(function (item,index) {
                //     console.log("item",item);
                //     console.log("item.checked",item.checked);
                //     if (item.checked==true) {
                //         newarr.push(item)
                //         _this.setData({
                //             radio:index,
                //             // addressshow:newarr,
                            
                //           });
                //     }
                // })
                
               console.log(_this.data.radio);
              

               let informlist=_this.data.curform[0].formlist
               console.log("informlist",informlist);
               informlist.forEach(function (item,index) {
                   console.log("item",item);
                   console.log("item.curprice*item.count",item.curprice*item.count);
                   totalPrice+=item.curprice*item.count
                   totalcount+=item.count
                   
               })
               this.setData({
                totalPrice:totalPrice,
                totalcount
               })
               console.log("totalPrice",totalPrice);
               console.log("totalcount",totalcount);

               let formlist1=_this.data.formlist
               let create=formlist1[0].create

               console.log("create",create);
             
            }).catch(err => {
                console.log('err ==> ', err);
                wx.hideLoading();
            })
            
           

        } else {
            //跳转到登录页面
            // wx.navigateTo({
            //     url: '../login/login'
            // })
        }
    },



    //点击界面键盘消失
    hindKeyboard() {
        var _this = this;
        _this.setData({
            keyShow: false
        });
    },
    //点击输入框，键盘显示
    showKeyboard() {
        var _this = this;
        _this.setData({
            keyShow: true
        });
    },
    keyTap(e) {
        var _this = this,
            keys = e.currentTarget.dataset.keys,
            content = _this.data.content,
            len = content.length;
        switch (keys) {
            case '.': //点击小数点，（注意输入字符串里的是小数点，但是我界面显示的点不是小数点，是居中的点，在中文输入法下按键盘最左边从上往下数的第二个键，也就是数字键 1左边的键可以打出居中的点）
                if (len < 11 && content.indexOf('.') == -1) { //如果字符串里有小数点了，则不能继续输入小数点，且控制最多可输入10个字符串
                    if (content.length < 1) { //如果小数点是第一个输入，那么在字符串前面补上一个 0，让其变成 0.
                        content = '0.';
                    } else { //如果不是第一个输入小数点，那么直接在字符串里加上小数点
                        content += '.';
                    }
                }
                break;
            case 0:
                console.log(content)
                if (len < 4) {
                    console.log(content.length)
                    if (content.length < 1) { //如果0是第一个输入，让其变成 0.
                        content = '0.';
                    } else {
                        content += '0'
                    }
                }
                break;
            case '<': //如果点击删除键就删除字符串里的最后一个
                content = content.substr(0, content.length - 1);
                break;
            default:
                let Index = content.indexOf('.'); //小数点在字符串中的位置
                if (Index == -1 || len - Index != 3) { //这里控制小数点只保留两位
                    if (len < 11) { //控制最多可输入 10个字符串
                        content += keys;
                    }
                }
                break
        }
        _this.setData({
            content
        });
    },
    //付款
    payTap() {
        // wx.showLoading({
        //     title: '付款中',
        //     mask: true
        //   })
      
        let onepay=this.data.onepay
        console.log("onepay",onepay);
        if (onepay==true) {
            var _this = this;
            let totalPrice = this.data.totalPrice
            let content = this.data.content;
            console.log(_this.data.content)
            let formlist=this.data.formlist
    
            let defaultaddress=this.data.addressshow
            // this.data.userInfo.address.forEach(function (item,index) {
            //     console.log("item",item);
            //     if (item.checked==true) {
            //         defaultaddress=item
            //     }
            // })
    
            // setTimeout(function () {
            //     wx.hideLoading();
            // }, 500);5
            if (totalPrice == content) {
                console.log("支付成功");
                Notify({
                    type: 'success',
                    message: '支付成功'
                });
    
                console.log("defaultaddress",defaultaddress);
                let formstate=1
                formlist.forEach(function (item,index) {
                    item.formstate=formstate
                    item.defaultaddress=defaultaddress
                })
    
                this.setData({
                    formlist: formlist
                })
                console.log("_this.data.formlist",_this.data.formlist);
    
    
    
    
    
    
                _this.updateformlist();
    
    
             
    
    
    
                setTimeout(() => {
                    _this.goorderstatue();
                    _this.setData({
                        totalPrice:0,
                        totalcount:0,
                        userInfo:[],
                        islogin: false,
                        addresslist:[],
                        radio:0,
                        addressshow:[],
                        formlist:[],
                        curform:[],
                    })
                }, 1000);
            } else {
                console.log("支付失败");
                Notify({
                    type: 'danger',
                    message: '支付失败'
                });
    
    
            }
            _this.setData({
                onepay:false
            })
        }else{
            Notify({
                type: 'danger',
                message: '不要重复付款'
            });
        }
       
    },


    showPopupaddress(){
        this.setData({ showaddress: true });
    },
    backToTop() {
        wx.pageScrollTo({
          scrollTop:0,
          duration:500 //设置滚动延时
        })
      },
       //置底
       goToBottom(){
           console.log("调用goToBottom");
        wx.createSelectorQuery().select('#scroll-y').boundingClientRect(function(rect){
          // 使页面滚动到底部
          console.log(rect);
          wx.pageScrollTo({
            scrollTop: rect.height,
            duration:500 //设置滚动延时
          })
        }).exec()
      },
    
 
      Closeaddress(){
        this.setData({ showaddress: false });
    },
    selectaddress(event) {
        let _this=this;
        let index= event.detail
        let addresslist=this.data.addresslist
        let item=addresslist[index]
        this.setData({
            addressshow:[]
        })
        _this.data.addressshow.push(item)
        _this.setData({
            radio:index,
            addressshow:   _this.data.addressshow
          });
          console.log(this.data.addressshow);
        this.setData({
          radio: event.detail,
        });
      },
    onClickButton: function () {
        var that = this;
        console.log(that.data.totalPrice);

        this.goToBottom();
        // 调起支付
        wx.requestPayment({
            'timeStamp': '',
            'nonceStr': '',
            'package': '',
            'signType': 'MD5',
            'paySign': '',
            'success': function (res) {},
            'fail': function (res) {},
            'complete': function (res) {}
        })
        // wx.showModal({
        //   title: '提示',
        //   content: '合计金额-' + that.data.totalPrice + "暂未开发",
        // })

        // this.onClickShow();
    },
    onClickShow() {
        this.setData({
            show: true
        });
    },

    onClickHide() {
        this.setData({
            show: false
        });
    },
    goorderstatue(){
        wx.navigateTo({
            url: '../orderstatue/orderstatue'
          })
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
        console.log("执行onShow");
      
        this.getUserInfo();
        // wx.reLaunch({
        //   url: '../orderform/orderform.wxml',
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