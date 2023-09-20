// pages/shopdetail/shopdetail.js
import Notify from '@vant/weapp/notify/notify';
const validLogin = require('../../valid/valid');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperCurrent: 0,

    indicatorDots: true,

    autoplay: true,

    interval: 3000,

    duration: 800,

    circular:true,
    imgUrls:[
        "../../images/shopimg1.png",
        "../../images/shopimg2.png",
        "../../images/shopimg3.png",
        "../../images/shopimg4.png"
    ],
    isshow:true,
    isshow1:false,
    showyixuan:false,
    showaddress:false,
    scrollH:0,
    scrollW:0,
    partlist:[
        {
            img:"../../images/cpu.png",
            partname:"CPU",
            partdesc:"天玑 9200+"
        },
        {
            img:"../../images/camera.png",
            partname:"三摄像头",
            partdesc:"天玑 9200+"
        },
        {
            img:"../../images/screen.png",
            partname:"超大屏",
            partdesc:"天玑 9200+"
        },
        {
            img:"../../images/store.png",
            partname:"存储容量",
            partdesc:"天玑 9200+"
        },
       
    ],
    partcount:0,
    active: 0,
    scrollTop: 0,
    offsetTop: 0,
    isint:true,
    istype:false,
    show: false,
    scrollTop1: 0,
    offsetTop1: 0,
    issubmit:true,
    issubmit1:false,
    _id:"",
    shopdetail:[],
    radio: 1,
    userInfo:[],
    islogin:false,
    addresslist:[],
    addressshow:[],
    typeactive:0,
    coloractive:0,
    curtype1:"",
    curcolor1:"",
  
    detailtype:"",
    totaltype:"",
    mealactive:0,
    meallist:["标配"],
    curmeal:"",
    sendactive:0,
    sendlist:["商城配送"],
    cursend:"",
    shopprice:0,
    buylist:[],
    buylength:0,
    totalprice:0,
    count1:1,
    id1:"",
    formstate:0,
    formlist:[],
    address:[],
    initform:[],
    totalform:[],
    recommendlist: [],
    adddata: [],
    _idarr:[]

    
    },

    goorderform(){
        wx.navigateTo({
          url: '../orderform/orderform',
        })
    },

    suretype(){
        let shopdetail=this.data.shopdetail[0]
        let title=shopdetail.title
        let type=this.data.curtype1
        let color=this.data.curcolor1
        let count=this.data.count1

        if (color=="") {
            color=shopdetail.color[0]
        }
        
        if (type=="") {
            type=shopdetail.type[0]
        }
        
      
        let totaltype=title+" "+type+" "+" "+color+" ×"+count
        this.setData({
            totaltype:totaltype
        })
        console.log(this.data.totaltype);
        this.Closeyixuan();
    },
    Changecount1(event) {
        console.log(event.detail);
        this.setData({
            count1:event.detail
        })
      },
      selectsend(e){
        console.log("e",e);
        let index=e.currentTarget.dataset.index;
        let  cursend=e.currentTarget.dataset.key
       
       
        this.setData({
            sendactive:index,
            cursend:cursend
        })
    },
      selectmeal(e){
        console.log("e",e);
        let index=e.currentTarget.dataset.index;
        let  curmeal=e.currentTarget.dataset.key
       
       
        this.setData({
            mealactive:index,
            curmeal:curmeal
        })
    },
    selecttype1(e){
        console.log("e",e);
        this.setData({
            count1:1
        })
        let index=e.currentTarget.dataset.index;
        let  curtype1=e.currentTarget.dataset.key
        let shopprice=this.data.shopdetail[0].curpirce[index]

      
        let curprice=this.data.shopdetail[0].curpirce[index]
        let totalprice=curprice*this.data.count1
        this.setData({
            typeactive:index,
            curtype1:curtype1,
            shopprice:shopprice,
            totalprice:totalprice,
            count1:1
        })
    },
    selectcolor1(e){
        console.log("e",e);
        let index=e.currentTarget.dataset.index;
        let  curcolor1=e.currentTarget.dataset.key
      
        this.setData({
            coloractive:index,
            curcolor1:curcolor1
        })
    },
    selectaddress(event) {
        let _this=this;
        let index= event.detail
        let addresslist=this.data.addresslist
        let item=addresslist[index]
        _this.setData({
            radio:index,
            addressshow:item
          });
          console.log(this.data.addressshow);
        this.setData({
          radio: event.detail,
        });
      },
    Closeyixuan(){
        this.setData({ showyixuan: false });
    },
    showPopupyixuan(){
        this.setData({ showyixuan: true });
    },
    Closeaddress(){
        this.setData({ showaddress: false });
    },
    showPopupaddress(){
        this.setData({ showaddress: true });
    },
    onClickIcon() {
        // Toast('点击图标');
      },
    
      onClickButton() {
        // Toast('点击按钮');
        console.log("'点击按钮'");
        this.setData({
            show: true ,
            issubmit:true,
            issubmit1:false
            
        });
    
      },
      onClickButton1() {
        // Toast('点击按钮');
        console.log("'点击按钮'");
        this.setData({ show: true,
            issubmit1:true,
            issubmit:false });
      },
      onClickHide() {
        this.setData({ 
            show: false
        });
      },
      swiperChange: function (e) {
        console.log("swiperChange");
       console.log("e",e);
        // this.setData({
    
        //   swiperCurrent: e.detail.current
    
        // })
    
      },
      swipclick:function (e) {
          console.log("swipclick");
        this.setData({
    
            isshow: false,
            isshow1: true
      
          })
      },
      swipclick1:function (e) {
          console.log("swipclick1");
        this.setData({
    
            isshow: true,
            isshow1: false
      
          })
      },
        // 商品介绍、规格参数  
      onChange(event) {
          console.log("event",event);
          let index=event.detail.index
          if (index==0) {
            this.setData({
                isint:true,
                istype:false
              });
          }else{
            this.setData({
                isint:false,
                istype:true
              });
          }
        wx.showToast({
          title: `切换到标签 ${event.detail.name}`,
          icon: 'none',
        });
      },
      onBeforeChange(event) {
        const { callback, title } = event.detail;
        
        wx.showModal({
          title: '异步切换',
          content: `确定要切换至 ${title} tab吗？`,
          success: (res) => {
            if (res.confirm) {
              callback(true)
            } else if (res.cancel) {
              callback(false)
            }
          },
        })
      },
      onScroll(event) {
        wx.createSelectorQuery()
          .select('#scroller')
          .boundingClientRect((res) => {
            //   console.log("res",res);
            this.setData({
              scrollTop: event.detail.scrollTop,
              offsetTop: res.top
            });
          })
          .exec();
      },
      onScroll1(event) {
        // wx.createSelectorQuery()
        //   .select('#scroller')
        //   .boundingClientRect((res) => {
        //     //   console.log("res",res);
        //     this.setData({
        //       scrollTop1: event.detail.scrollTop1,
        //       offsetTop1: res.top
        //     });
        //   })
        //   .exec();
      },
      onChangecount(event) {
        console.log(event.detail);
       
        let typeindex=this.data.typeactive
        let curprice=this.data.shopdetail[0].curpirce[typeindex]
        let totalprice=curprice*event.detail
       
        this.setData({
            totalprice:totalprice,
            count1:event.detail
        })
      },
      gobuy(){
        this.switch();
         
      },
      switch(){
        wx.switchTab({
          url: '../shop/shop',
          success: (res) => {
              console.log("跳转购物车");
          },
          fail: (res) => {},
          complete: (res) => {},
        })
    },
      addbuy(){
          let _this=this;
        let buylist=this.data.buylist
        let imgurl=this.data.shopdetail[0].imgurl[0]
        let title=this.data.shopdetail[0].title
        let type=this.data.curtype1
        let color=this.data.curcolor1
        let curprice=this.data.shopprice
        let count=this.data.count1
        let cursend=this.data.cursend
        let curmeal=this.data.curmeal

        let id=new Date();
        let id1=id.getTime()
        console.log("iddate",id);
        console.log("idtime",id1);

        this.setData({
            id1:id1
        })

        
        if (type=="") {
            type=this.data.shopdetail[0].type[0]
        }
        if (color=="") {
            color=this.data.shopdetail[0].color[0]
        }
        let obj={
            imgurl:imgurl,
            title:title,
            type:type,
            color:color,
            curprice:curprice,
            count:count,
            cursend:cursend,
            curmeal:curmeal,
            id1:id1
        }
        console.log("obj",obj);
        _this.data.buylist.unshift(obj)
       
        _this.setData({
            buylist: _this.data.buylist
        })
        console.log(_this.data.buylist);
        this.onClickHide();
        let addresslist=this.data.addresslist
        if (addresslist.length!=0) {
            this.updatebuylist();
        }else{
            Notify({ type: 'danger', message: '添加失败，没有收货地址，请前往设置' });
        }
        
      },

      createform(){
            let _this=this;
        let imgurl=this.data.shopdetail[0].imgurl[0]
        let title=this.data.shopdetail[0].title
        let type=this.data.curtype1
        let color=this.data.curcolor1
        let curprice=this.data.shopprice
        let count=this.data.count1
        let cursend=this.data.cursend
        let curmeal=this.data.curmeal

        let id=new Date();
        let id1=id.getTime()
        console.log("iddate",id);
        console.log("idtime",id1);

        this.setData({
            id1:id1
        })

        
        if (type=="") {
            type=this.data.shopdetail[0].type[0]
        }
        if (color=="") {
            color=this.data.shopdetail[0].color[0]
        }
        let obj={
            imgurl:imgurl,
            title:title,
            type:type,
            color:color,
            curprice:curprice,
            count:count,
            cursend:cursend,
            curmeal:curmeal,
            id1:id1
        }
        console.log("obj",obj);
        _this.data.formlist.unshift(obj)
       
        _this.setData({
            formlist: _this.data.formlist
        })
        console.log(_this.data.formlist);
      },
      gopay(){

        // 购物车

        let _this=this;
        let addresslist=this.data.addresslist

        if (addresslist.length!=0) {
            this.createform();

        }else{
            Notify({ type: 'danger', message: '购买失败，没有收货地址，请前往设置' });
        }
        

        // 支付
        let formlist=this.data.formlist
        let initform=this.data.initform
        let formstate=0
        let defaultaddress=""
        let totalPrice=this.data.totalprice
        let totalcount=this.data.count1
        // let addresslist=this.data.addresslist
        let addressshow=this.data.addressshow
        let id2=new Date();
        let create=id2.getTime()
        console.log("iddate",id2);
        console.log("create",create);
        console.log("formlist",formlist);

        let newarr=[]
        let obj1={
         formstate:formstate,
         create:create,
         defaultaddress:addressshow,
         formlist:formlist,
         totalPrice:totalPrice,
         address:addresslist,
         totalcount:totalcount
        }
        newarr.push(obj1)
        initform.unshift(obj1)
        _this.setData({
         totalform:initform,
         cartlist:[],
         initform:initform
        })

        
        
        console.log("_this.data.initform",_this.data.initform);
        console.log(_this.data.totalform);

        this.onClickHide();

       
        if (addresslist.length!=0) {
            this.updateformlist();
        }
        
    
        
      },

        // 修改订单
        async updateformlist() {
            console.log("updateformlist");
            let _this=this
            let _id=this.data._id
            let username=this.data.userInfo.username
            let password=this.data.userInfo.password
            let buylist=this.data.userInfo.buylist
            let formlist=this.data.totalform
           let address=this.data.userInfo.addresslist
           let loginStatus = await validLogin();
           let initform=this.data.initform
           
    
        //    console.log("buylist",buylist);
           console.log('loginStatus ==> ', loginStatus);
           // console.log(this.data.userInfo);
           // let userId=this.data.userInfo._id
           // console.log("userId",userId);
           if (loginStatus) {
               let userId = wx.getStorageSync('userId');
               console.log("user",userId);
               wx.showLoading({
                   title: '请稍后...',
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
                   _this.goorderform();
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let _this=this
        let partlist=this.data.partlist
        let partcount=partlist.length
        this.setData({
            partcount: partcount
        });
        console.log("partcount",partcount);
      
        wx.getSystemInfo({
            success: (res) => {
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let imgWidth = ww * 0.48;
                let scrollH = wh;
                let scrollW=ww+ww;
    
                this.setData({
                    scrollH: scrollH,
                    scrollW: scrollW
                   
                });
                console.log("ww",ww);
                console.log("wh",wh);
                console.log("imgWidth",imgWidth);
                console.log("scrollH",scrollH);
                
               
            }
        })

        // let id=new Date();
        // let id1=id.getTime()
        // console.log("iddate",id);
        // console.log("idtime",id1);
        
        // const eventChannel = this.getOpenerEventChannel()
        // eventChannel.on('acceptDataFromOpenerPage', function(data) {
        //   console.log(data) //输出{data: 'test'}
        //   _this.setData({
        //     _id: data.id
        //   })
        // })

        var value = wx.getStorageSync('key')
        console.log(value)
        _this.setData({
            _id: value
          })

        console.log("_id",this.data._id);
        this.getUserInfo()
        this.getshopdetail();
        this.getshoplist();
        

    },
    inittype(){
        let shopdetail=this.data.shopdetail[0]
        let title=shopdetail.title
        let type=shopdetail.type[0]
        let color=shopdetail.color[0]
        let count=1
        let shopprice=shopdetail.curpirce[0]
        let cursend=this.data.sendlist[0]
        let curmeal=this.data.meallist[0]
      
        let totaltype=title+" "+type+" "+" "+color+" ×"+count
        this.setData({
            totaltype:totaltype,
            shopprice:shopprice,
            cursend:cursend,
            curmeal:curmeal
        })
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

    // 获取用户数据
      //获取用户数据
      async getUserInfo() {
        console.log("获取用户数据");
        let _this=this;
        let loginStatus = await validLogin();
        console.log("loginStatus", loginStatus);
         // loginStatus.result.isLogin
        if (loginStatus) {


            let userId = wx.getStorageSync('userId');

           

            wx.cloud.callFunction({
                name: 'shopget_user',
                data: {
                    userId
                }
            }).then(res => {
                console.log('获取用户数据 res ==> ', res);
                
                let buylength=res.result.data.buylist.length
                let buylist=res.result.data.buylist
                this.setData({
                    userInfo: res.result.data,
                    islogin: true,
                    addresslist:res.result.data.address,
                    buylength:buylength,
                    buylist:buylist
                })
                console.log("this.datat.userInfo",_this.data.userInfo);
                console.log("this.datat.addresslist",_this.data.addresslist);
                let newarr3=[]
                _this.data.addresslist.forEach(function (item,index) {
                  
                    if (item.checked==true) {
                        newarr3.push(item)
                        _this.setData({
                            radio:index,
                            addressshow:item,
                            
                          });
                    }
                 
                })
              if (_this.data.addressshow.length==0) {
                _this.data.addresslist.forEach(function (item,index) {
                  
                    _this.setData({
                        
                        addressshow:item,
                        
                      });
                    
                 
                })
              }
               console.log(_this.data.radio);
               console.log("_this.data.addressshow",_this.data.addressshow);

               let formlist=res.result.data.formlist

               this.setData({
                
                initform:formlist
               })
             
            }).catch(err => {
                console.log('err ==> ', err);
                
            })
            
           

        } else {
            //跳转到登录页面
            // wx.navigateTo({
            //     url: '../login/login'
            // })
        }
    },

    // 获取商品详情
    async getshopdetail() {
        let _this=this;
        let _id=this.data._id
        wx.cloud.callFunction({ // 云函数名称
                name: 'get_shopdetail',
                data: {
                    _id:_id
                  }
            }).then(res => {

                console.log('云函数获取数据成功', res)
                let shopdetail=res.result.data
                console.log("shopdetail",shopdetail);
                let totalprice=res.result.data[0].curpirce[0]*1
                // let adddata=res.result.data
                let _id=res.result.data[0]._id
                _this.setData({
                    shopdetail:shopdetail,
                    totalprice:totalprice,
                    _id:_id
                })
                this.inittype();
                
            })
            .catch(err => {
                console.log('云函数获取数据失败', err)
            })
    },

     // 修改购物车
     async updatebuylist() {
        console.log("是否调用了updateaddress");
        let _id=this.data._id
        let username=this.data.userInfo.username
        let password=this.data.userInfo.password
        let buylist=this.data.buylist
        let formlist=this.data.userInfo.formlist
       let address=this.data.userInfo.addresslist
       let loginStatus = await validLogin();

       console.log("buylist",buylist);
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
                Notify({ type: 'success', message: '加入购物车成功' });

                setTimeout(() => {
                    wx.setStorageSync('id', _id)
                    wx.reLaunch({
                        url: '../shopdetail/shopdetail',
                      })
                }, 1000);
           
       }else{
        //    wx.navigateTo({
        //        url: '../login/login'
        //    })
        Notify({ type: 'danger', message: '未登录' });
       }


     
     },
     goaddress(){
         wx.navigateTo({
           url: '../address/address',
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
        this.getUserInfo()
        this.getshopdetail();
        this.getshoplist();
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