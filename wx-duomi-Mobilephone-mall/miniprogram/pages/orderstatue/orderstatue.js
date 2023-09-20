// pages/orderstatue/orderstatue.js
import Notify from '@vant/weapp/notify/notify';
const validLogin = require('../../valid/valid');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        isempty1: true,
        isempty2: true,
        isempty3: true,
        isempty4: true,
        ispay: false,
        userInfo: [],
        islogin: false,
        addresslist: [],
        formlist: [],
        addressshow: [],
        createdate:'',
        radio:0,
        editindex:0,
        edititem:"",
        removedate:"",
        waitpay:[],
        waitget:[],
        waitcomment:[]


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
               title: '修改中...',
               mask: true
             })
             let curname=this.data.username
         
             wx.cloud.callFunction({
               name: 'update_usermessage',
               data: {
                
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
                Notify({ type: 'success', message: '修改地址成功' });

              
           
       }else{
        //    wx.navigateTo({
        //        url: '../login/login'
        //    })
        Notify({ type: 'danger', message: '未登录' });
       }


     
     },
     // 删除订单
       async updateformlist1() {
        console.log("updatebuylist");
        let _id=this.data._id
        let username=this.data.userInfo.username
        let password=this.data.userInfo.password
        let buylist=this.data.userInfo.buylist
       
       let address=this.data.userInfo.addresslist
       let loginStatus = await validLogin();
       let formlist=this.data.formlist
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
               title: '取消中...',
               mask: true
             })
             let curname=this.data.username
         
             wx.cloud.callFunction({
               name: 'update_usermessage',
               data: {
                
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
                Notify({ type: 'success', message: '已取消订单' });

              
           
       }else{
        //    wx.navigateTo({
        //        url: '../login/login'
        //    })
        Notify({ type: 'danger', message: '未登录' });
       }


     
     },
     clickremove(e){
         console.log("e",e);
         let _this=this
         let editindex=e.currentTarget.dataset.index
         let edititem=e.currentTarget.dataset.key
         let removedate=edititem.create
         let formlist=this.data.formlist;
         this.setData({
             removedate:removedate
         })
         console.log("this.data.removedate",this.data.removedate);
         formlist.forEach(function (item,index) {
             console.log(item.create==removedate);
             if (item.create==removedate) {
                 let removeindex=index
                 formlist.splice(removeindex,1)
                 _this.setData({
                    formlist:formlist
                 })
             }
         })
         if (_this.data.formlist.length!=0) {
             _this.setData({
                isempty1:false
             })
         }
         this.updateformlist1();
         console.log("formlist",this.data.formlist);
     },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(e) {
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

        var value = wx.getStorageSync('key')
        console.log(value) //输出"value"
        this.getUserInfo()
        this.setData({
            removedate:"",
            active:value
        })
        console.log("this.data.active",this.data.active);
    },

    async getUserInfo() {
        console.log("获取用户数据");
        let _this = this;
        let totalPrice = this.data.totalPrice
        let totalcount = this.data.totalcount
        let loginStatus = await validLogin();
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

                let formlist = res.result.data.formlist


                this.setData({
                    userInfo: res.result.data,
                    islogin: true,
                    addresslist: res.result.data.address,
                    formlist: formlist
                })

                if (_this.data.formlist.length != 0) {
                    _this.setData({
                        isempty1: false
                    })
                }

                console.log("isempty1", _this.data.isempty1);
                console.log("this.datat.userInfo", _this.data.userInfo);
                console.log("this.datat.formlist", _this.data.formlist);
                console.log("this.datat.addresslist", _this.data.addresslist);

                _this.data.addresslist.forEach(function (item, index) {
                    console.log("item",item);
                    console.log("item.checked",item.checked);
                    if (item.checked == true) {
                        _this.data.addressshow.push(item)
                        _this.setData({
                            radio: index,
                            addressshow: _this.data.addressshow,

                        });
                    }
                })
                console.log(_this.data.radio);
                console.log("_this.data.addressshow", _this.data.addressshow);

                //    let informlist=_this.data.formlist[0].formlist
                //    console.log("informlist",informlist);

                let createdate=""
                let datearr=[]
                let waitpay=[]
                let waitget=[]
                let waitcomment=[]
                   formlist.forEach(function (item,index) {
                       console.log("item",item);
                      console.log(" item.create", item.create);
                      createdate=_this.timestampToTime(item.create,1) 
                      datearr.push(createdate)
                      if (item.formstate==0) {
                        waitpay.push(item)
                          _this.setData({
                            waitpay:waitpay
                          })
                      }
                      if (item.formstate==1) {
                        waitget.push(item)
                          _this.setData({
                            waitget:waitget
                          })
                      }
                      if (item.formstate==2) {
                        waitcomment.push(item)
                          _this.setData({
                            waitcomment:waitcomment
                          })
                      }
                   })
                   
                   console.log("_this.data.waitpay",_this.data.waitpay);
                   console.log("_this.data.waitget",_this.data.waitget);
                   console.log("_this.data.waitcomment",_this.data.waitcomment);
                   if (_this.data.waitpay.length!=0) {
                        _this.setData({
                            isempty2:false
                        })
                   }
                   if (_this.data.waitget.length!=0) {
                        _this.setData({
                            isempty3:false
                        })
                   }
                   if (_this.data.waitcomment.length!=0) {
                        _this.setData({
                            isempty4:false
                        })
                   }
                   _this.setData({
                    createdate:datearr,
                  
                   })
                   console.log("this.data.createdate",_this.data.createdate);
                //    console.log("totalPrice",totalPrice);
                //    console.log("totalcount",totalcount);

                //    let formlist1=_this.data.formlist
                //    let create=formlist1[0].create

                //    console.log("create",create);

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

    timestampToTime(value, type = 0) {

        // timestampToTime(1591841249)   //返回2020-06-11

        // timestampToTime(1591841249,1) //返回 2020-06-11 10:10:10

        // timestampToTime(1591841249,2)   //返回2020年06月11日



        var time = new Date(value);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
        month = month < 10 ? "0" + month : month;
        date = date < 10 ? "0" + date : date;
        hour = hour < 10 ? "0" + hour : hour;
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        var arr = [
            year + "-" + month + "-" + date,
            year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second,
            year + "年" + month + "月" + date,
            year + "年" + month + "月" + date + " " + hour + ":" + minute + ":" + second,
            hour + ":" + minute + ":" + second
        ]
        return arr[type];
    },
    onChange(event) {
        console.log("event", event);
      
        wx.showToast({
            title: `切换到${event.detail.title}`,
            icon: 'none',
        });
    },

    gopay() {
        wx.navigateTo({
            url: '../orderform/orderform'
        })
    },
    showPopupaddress(e){
        console.log("e",e);
        let _this=this
        let editindex=e.currentTarget.dataset.index
        let edititem=e.currentTarget.dataset.key
        console.log("edititem",edititem);
        let newarr=[]
       newarr.push(edititem)
        let newarr1=[]
        newarr1.push(newarr[0].defaultaddress)
        _this.data.addresslist.forEach(function (item,index) {
            console.log("item",item);
            console.log(item,edititem.defaultaddress);
            console.log(item==edititem.defaultaddress);
            if (item==edititem.defaultaddress) {
                let curindex=index
                _this.setData({
                    radio:curindex
                })
            }
        })
        console.log("radio",_this.data.radio);

        this.setData({
            edititem:edititem,
            editindex:editindex,
            addressshow:newarr1[0]
        })
        console.log("newarr",newarr);
        console.log("addressshow",this.data.addressshow);
        this.setData({ showaddress: true });
    },
    Closeaddress(e){
        console.log("e",e);
        let _this=this
        let editindex=this.data.editindex
        let edititem=this.data.edititem
        let addressshow=this.data.addressshow
        let formlist=this.data.formlist
        formlist.forEach(function (item,index) {
            console.log("item",item);
            console.log(item.create==edititem.create);
            console.log("item.defaultaddress",item.defaultaddress);
            if (item.create==edititem.create) {
                item.defaultaddress=addressshow[0]
            }
            _this.setData({
                formlist:formlist
            })
        })
        this.updateformlist();
        console.log("this.data.formlist",this.data.formlist);
        this.Closeaddress1()
    },
    Closeaddress1(){
      
        this.setData({ showaddress: false });
       
    },
    selectaddress(event) {
        console.log("event",event);
        let _this=this;
        let index= event.detail
        let key =event.key
        let addresslist=this.data.addresslist
        console.log("index",index);
        let item=addresslist[index]
        this.setData({
            addressshow:[]
        })
        let newarr=[]
        newarr.push(item)
        _this.setData({
            radio:index,
            addressshow:  newarr
          });
          console.log(this.data.addressshow);
        this.setData({
          radio: event.detail,
        });
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
        this.getUserInfo()
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