// pages/address/address.js
import Notify from '@vant/weapp/notify/notify';
const validLogin = require('../../valid/valid');
const app = getApp()

// 引入SDK核心类，根据自己放的路径来写这个SDK核心类的位置
var QQMapWX = require('../../qqmap-wx-jssdk');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'WR4BZ-2H2W7-SLAXE-HLSDW-MLEC2-WRBVN'
    // 必填，填自己在腾讯位置服务申请的key
});

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 定位
        latitude: null,
        longitude: null,
        city: null,
        value: '',
        
        markers:null,
        suggestion:null,
        backfill:null,
        mylatitude: null,

        mylongitude: null,
  
       
        myaddress:null,






        isempty: false,
        show: false,
        value: '',
        checked: true,
        username: '',
        phone: '',
        address1: '',
        address2: '',
        desc: '',
        isaddresslist:false,
        item:[],
        index:0,
        // addresslist: [{
        //     address1: "广东广州市从化区鳌头镇",
        //     address2: "粤嵌科技(从化园区)",
        //     username: "戴百津",
        //     phone: "13268014733",
        //     checked: true
        // }],
        addresslist: [],
        isedit:false,
        index:0,
        item1:"",
        userInfo:[],
        islogon:false
    },

    // 位置定位
    getLocation() {
        console.log("getLocation");
        var that = this;
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                console.log("res", res);
                const latitude = res.latitude;
                const longitude = res.longitude

                const speed = res.speed;
                const accuracy = res.accuracy;
                console.log(res);
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                   
                })
                //新增
                qqmapsdk.reverseGeocoder({
                    //位置坐标，默认获取当前位置，非必须参数 
                    //Object格式
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude
                    },
                    success: function (res) {
                        var mks = [];
                        console.log("res",res);
                        mks.push({ // 获取返回结果，放到mks数组中
                                
                            latitude: res.result.location.lat,
                            longitude: res.result.location.lng,
                            iconPath: "../../images/marker2.jpeg",  //图标路径
                            width: 30,
                            height: 30
                          })
                        //成功后的回调
                        console.log(res.result.ad_info.city);
                        that.setData({
                            province: res.result.ad_info.province,
                            city: res.result.ad_info.city,
                            district: res.result.ad_info.district,
                            address1:res.result.ad_info.province+res.result.ad_info.city+res.result.ad_info.district,
                            markers:mks,
                           
                        })
                        console.log("address1",that.data.address1);
                    },
                    fail: function (error) {
                        console.error(error);
                    },
                    complete: function (res) {
                        console.log(res);
                    }
                })
            }
        })
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

                // this.onImageLoad();
            }
        })
        this.getUserInfo()
        
    },
     //获取用户数据
     async getUserInfo() {
        console.log("获取用户数据");
        let _this=this;
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
                    islogin: true,
                     addresslist:res.result.data.address,
                })
                console.log("this.datat.userInfo",_this.data.userInfo);
                console.log("this.datat.addresslist",_this.data.addresslist);
                if (_this.data.addresslist.length!=0) {
                    this.setData({
                        isaddresslist:true
                    })
                }
             
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

     // 修改用户地址
     async updateaddress() {
         console.log("是否调用了updateaddress");
         let username=this.data.userInfo.username
         let password=this.data.userInfo.password
         let buylist=this.data.userInfo.buylist
         let formlist=this.data.userInfo.formlist
        let address=this.data.addresslist
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
            //   wx.reLaunch({
            //     url: '../set/set',
            //   })
                 // 成功通知
                 Notify({ type: 'success', message: '修改成功' });
            
        }else{
            wx.navigateTo({
                url: '../login/login'
            })
        }


      
      },

    showPopup(e) {
        console.log("e",e);
        let index=e.currentTarget.dataset.index;
        let key=e.currentTarget.dataset.key
        this.setData({
            index:index,
            item:key,
            checked:true
        })
        console.log("item",this.data.item);
        let _this=this;
        let item="";
        console.log(index!==undefined);
        // console.log("item",item);
        if (index!==undefined) {
          
            console.log("有没有判断");
            item=_this.data.addresslist[index]
            _this.setData({
                item1:item
            })
            console.log("item",item);
            // let username=item
            _this.setData({
                username: item.username,
                phone: item.phone,
                address1: item.address1,
                address2: item.address2,
                desc: item.desc,
                checked: item.checked,
                isedit:true
            })

           
        }else{
             _this.setData({
                username: "",
                phone:"",
                address1: "",
                address2: "",
                desc: "",
                checked: false,
                isedit:false
            })
        }

        console.log("item",item);
        this.setData({
            show: true
        });
    },

    onClose() {
        this.setData({
            show: false
        });
    },
    Changeusername(event) {
        // event.detail 为当前输入的值


        this.setData({
            username: event.detail
        })
        console.log(this.data.username);
    },
    Changephone(event) {
        // event.detail 为当前输入的值


        this.setData({
            phone: event.detail
        })
        console.log(this.data.phone);
    },
    Changeaddress1(event) {
        // event.detail 为当前输入的值

        this.setData({
            address1: event.detail
        })
        console.log(this.data.address1);
    },
    Changeaddress2(event) {
        // event.detail 为当前输入的值


        this.setData({
            address2: event.detail
        })
        console.log(this.data.address2);
    },
    Changedesc(event) {
        // event.detail 为当前输入的值


        this.setData({
            desc: event.detail
        })
        console.log(this.data.desc);
    },
    onChange1(event) {
        console.log("event", event.detail);
        this.setData({
            checked: event.detail,
        });
    },
    editok() {
        let _this = this;
        let username = this.data.username;
        let phone = this.data.phone;
        let address1 = this.data.address1;
        let address2 = this.data.address2;
        let desc = this.data.desc;
        let checked = this.data.checked
        console.log("checked", checked);

        console.log("比较", username == "");
        if (checked==true) {
            _this.data.addresslist.forEach(function (item, index) {
                item.checked = false
            })
        }
      

        if (
            username == "" ||
            phone == "" ||
            address1 == "" ||
            address2 == ""
        ) {
            Notify({
                type: 'danger',
                message: '添加失败'
            });
            return
        } else {
            console.log("全部正确");
            Notify({
                type: 'success',
                message: '添加成功'
            });
            let obj = {
                username: username,
                phone: phone,
                address1: address1,
                address2: address2,
                desc: desc,
                checked: checked
            }

            _this.data.addresslist.push(obj)
            _this.setData({
                addresslist: _this.data.addresslist
            })

            _this.updateaddress();
        }

        console.log("this.data.addresslist", this.data.addresslist);
        this.onClose();
    },
    editaddress(e){
        console.log("e",e);
       var index=e.currentTarget.dataset.index;
       var _this=this;
       var item="";
       var username = this.data.username;
       var phone = this.data.phone;
       var address1 = this.data.address1;
       var address2 = this.data.address2;
       var desc = this.data.desc;
       var checked = this.data.checked
        
        
        console.log();
      console.log("index",index);

        _this.data.addresslist.forEach(function (item, index) {
            
            item.checked = false
        })

        if (
            username == "" ||
            phone == "" ||
            address1 == "" ||
            address2 == ""
        ) {
            Notify({
                type: 'danger',
                message: '修改失败'
            });
            return
        } else {
            console.log("修改正确");
            Notify({
                type: 'success',
                message: '修改成功'
            });
            let obj = {
                username: username,
                phone: phone,
                address1: address1,
                address2: address2,
                desc: desc,
                checked: checked
            }
            var index=_this.data.index;
            console.log("obj",obj);
            console.log("index",index);
            
            let newlist =_this.data.addresslist.splice(index,1,obj);
            console.log("newlist",newlist);
                _this.data.addresslist.forEach(function (item,index) {
                    if (item==_this.data.item1) {
                        item=obj
                    }
                })
                console.log("_this.data.addresslist",   _this.data.addresslist);
            _this.setData({
                addresslist:_this.data.addresslist
            })
            _this.updateaddress();
            _this.onClose();
        }

        
    },
    removeaddress(){
        let _this=this
        let index=this.data.index
        let item=this.data.item
        let addresslist=this.data.addresslist
        console.log("index",index);
        this.data.addresslist.splice(index,1)
        this.setData({
            addresslist: this.data.addresslist
        })
        console.log("this.data.addresslist",this.data.addresslist);
        _this.updateaddress();
        _this.onClose();
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