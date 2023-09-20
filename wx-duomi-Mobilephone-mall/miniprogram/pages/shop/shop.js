// pages/shop/shop.js
import Notify from '@vant/weapp/notify/notify';
const validLogin = require('../../valid/valid');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading:true,
        recommendlist: [
        ],
        adddata: [
        ],
        cartlist: [
            {   
                id:0,
                isCheck: false,
                url: "../../images/shopimg1.png",
                name: "Redmi K60 至尊版",
                type: "12GB+256GB 墨羽",
                price: "2599",
                count: "1"
            },
            {   
                id:1,
                isCheck: false,
                url: "../../images/shopimg1.png",
                name: "Redmi K60 至尊版",
                type: "12GB+256GB 墨羽",
                price: "2599",
                count: "1"
            },
            {   
                id:3,
                isCheck: false,
                url: "../../images/shopimg1.png",
                name: "Redmi K60 至尊版",
                type: "12GB+256GB 墨羽",
                price: "2599",
                count: "1"
            }
        ],//buylist
        isempty: true,
        islogin: false,
        // checked: true,
        checked: false,
        isAllCheck: false,
        alltotal:0,
        totalPrice:0,
        totalcount:0,
        userInfo:[],
        formlist:[],
        totalform:[],
       adddresslist:[],
       radio:0,
       addressshow:[],
       removeid:[],
       buylist:[],
       initform:[],
       index:0,
       idindex:""

    },

    // 删除购物车
    onClose(event) {
        const { position, instance } = event.detail;
        switch (position) {
          case 'left':
          case 'cell':
            instance.close();
            break;
          case 'right':
           console.log("删除");
            break;
        }
      },

      recordindex(e){
        console.log("e",e);
        let index=e.currentTarget.dataset.index
        let key=e.currentTarget.dataset.key
        let idindex=key.id1
        console.log("key",key);
        console.log("index",index);
        this.setData({
            index:index,
            idindex:idindex
        })
        console.log("idindex",this.data.idindex);
       
      },
      removebuylist(){
          console.log("removebuylist");

        let index=this.data.index
        let idindex=this.data.idindex
          let cartlist=this.data.cartlist

          cartlist.forEach(function (item,index) {
              console.log(item.id1);
              if (item.id1==idindex) {
                  let newindex=index
                  cartlist.splice(newindex,1)
              }
          })
         
          this.setData({
            cartlist:cartlist
          })
          console.log("cartlist",this.data.cartlist);
          this.updatebuylist1();

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
               
                let cartlist=res.result.data.buylist
                let formlist=res.result.data.formlist
                console.log("cartlist.length",cartlist.length);
                if (cartlist.length!=0) {
                    console.log("cartlist.length判断执行了吗");
                    _this.setData({
                        isempty:false
                    })
                }
                this.setData({
                    userInfo: res.result.data,
                    islogin: true,
                    cartlist:cartlist,
                    addresslist:res.result.data.address,
                    initform:formlist
                })
                
                console.log("this.datat.initform",_this.data.initform);
                console.log("this.datat.userInfo",_this.data.userInfo);
                console.log("this.datat.cartlist",_this.data.cartlist);
                console.log("this.datat.addresslist",_this.data.addresslist);

                _this.data.addresslist.forEach(function (item,index) {
                    if (item.checked==true) {
                        _this.data.addressshow.push(item)
                        _this.setData({
                            radio:index,
                            addressshow: _this.data.addressshow,
                            
                          });
                    }
                })
               console.log(_this.data.radio);
               console.log("_this.data.addressshow",_this.data.addressshow);
             
             
            }).catch(err => {
                console.log('err ==> ', err);
                wx.hideLoading();
            })
            
           

        } else {
            //跳转到登录页面
            // wx.navigateTo({
            //     url: '../login/login'
            // })
            this.setData({
                isempty:true
            })
        }
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
                this.loadImages();
                // this.onImageLoad();
            }
        })
        this.getUserInfo();
        this.getshoplist();
        this.setData({
            totalcount:0,
            removeid:[]
        })
    },

    // 修改购物车
    async updatebuylist() {
        console.log("是否调用了updateaddress");
        let _id=this.data._id
        let username=this.data.userInfo.username
        let password=this.data.userInfo.password
        let buylist=this.data.cartlist
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
           
               

               
           
       }else{
        //    wx.navigateTo({
        //        url: '../login/login'
        //    })
        Notify({ type: 'danger', message: '未登录' });
       }


     
     },
    //  删除购物车
    async updatebuylist1() {
        console.log("是否调用了updateaddress");
        let _this=this
        let _id=this.data._id
        let username=this.data.userInfo.username
        let password=this.data.userInfo.password
        let buylist=this.data.cartlist
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
               title: '删除中...',
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

               Notify({ type: 'success', message: '删除成功' });

               _this.setData({
                isempty:true
               })
               wx.hideLoading();

               wx.reLaunch({
                 url: '../shop/shop',
               })
             }).catch(err => {
               console.log('err ==> ', err);
               wx.hideLoading();
             })
           
               

               
           
       }else{
        //    wx.navigateTo({
        //        url: '../login/login'
        //    })
        Notify({ type: 'danger', message: '未登录' });
       }


     
     },

       // 修改订单
       async updateformlist() {
        console.log("updateformlist");
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
                Notify({ type: 'success', message: '已生成订单' });

              
           
       }else{
        //    wx.navigateTo({
        //        url: '../login/login'
        //    })
        Notify({ type: 'danger', message: '未登录' });
       }


     
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
    goorderform(){
        wx.navigateTo({
            url: '../orderform/orderform'
          })
    },
    onClickButton(){
        let ok=false;
        let _this=this;
        let isAllCheck=this.data.isAllCheck;
        let cartlist=this.data.cartlist;
        let totalPrice=this.data.totalPrice
        let totalcount=this.data.totalcount
        let addressshow=this.data.addressshow
        let removeid=this.data.removeid
        let initform=this.data.initform
        console.log("addressshow",addressshow);
        cartlist.forEach(function (item,index) {
            if (item.isCheck==true) {
                ok=true
            }
        })
        console.log("ok",ok);

        let formlist=this.data.formlist
        
        if (isAllCheck) {

            
            let formstate=0
            let defaultaddress=""
    
            let id=new Date();
            let create=id.getTime()
            console.log("iddate",id);
            console.log("create",create);
    
            this.data.userInfo.address.forEach(function (item,index) {
                console.log("item",item);
                if (item.checked==true) {
                    defaultaddress=item
                }
            })
           console.log("defaultaddress",defaultaddress);

          
           let newarr=[]
           let obj={
            formstate:formstate,
            create:create,
            defaultaddress,
            formlist:formlist,
            totalPrice:totalPrice/100,
            address:addressshow,
            totalcount:totalcount
           }
           newarr.push(obj)
           initform.unshift(obj)
           _this.setData({
            totalform:initform,
            cartlist:[],
            initform:initform
           })
           console.log("_this.data.cartlist",_this.data.cartlist);
           console.log("_this.data.initform",_this.data.initform);
           console.log(_this.data.totalform);

           this.updatebuylist();
           this.updateformlist();
           
            
            this.goorderform();
        }else if(ok==true){

            let formstate=0
            let defaultaddress=""
            let removeid=this.data.removeid
            let id=new Date();
            let create=id.getTime()
            console.log("iddate",id);
            console.log("create",create);

            removeid.forEach(function (item1,index1) {
            _this.data.cartlist.forEach(function (item,index) {
              
                console.log(item.id1,Number(removeid[index1]));
                console.log(item.id1==Number(removeid[index1]));
                
                // console.log("item",item);
                if (item.id1==Number(removeid[index1])) {
                    let removeindex=index
                    _this.data.cartlist.splice(removeindex,1)
                    _this.setData({
                        cartlist: _this.data.cartlist
                    })
                }
              })
            })
          
            console.log("_this.data.cartlist",_this.data.cartlist);
            this.data.userInfo.address.forEach(function (item,index) {
                console.log("item",item);
                if (item.checked==true) {
                    defaultaddress=item
                }
            })
           console.log("defaultaddress",defaultaddress);
            console.log("formlist",formlist);
          
           let newarr=[]
           let obj={
            formstate:formstate,
            create:create,
            defaultaddress,
            formlist:formlist,
            totalPrice:totalPrice/100,
            address:addressshow,
            totalcount:totalcount

           }
           newarr.push(obj)
           initform.unshift(obj)
           _this.setData({
            totalform:initform,
            initform:initform
           })
           console.log("_this.data.initform",_this.data.initform);
           console.log(_this.data.totalform);

           this.updatebuylist();
           this.updateformlist();
         
           
            this.goorderform();
        }
        
    },
    gologin() {
        //详情页面位非tabbar页面
        console.log("点击跳转1");
        wx.navigateTo({
          url: '../login/login'
        })
      },
    isgologin(){
        console.log("是否isgologin");
        let cartlist=this.data.cartlist.length
        let _this=this;
        if (cartlist==0) {
            _this.setData({
                islogin:false,
                isempty:true
            })
        }else{
            _this.setData({
                islogin:true,
                isempty:false
            })
        }
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
    gohome() {
        //详情页面位非tabbar页面
        console.log("点击跳转1");
        wx.navigateTo({
            url: '../index/index'
        })

    },
    switch () {
        wx.switchTab({
            url: '../index/index',
            success: (res) => {
                console.log("跳转首页");
            },
            fail: (res) => {},
            complete: (res) => {},
        })
    },
    onChange(event) {
        console.log("onChange", onChange);
        this.setData({
            checked: event.detail,
        });
    },
    onChangeall(event) {
        this.setData({
            checkedall: event.detail,
        });
    },
    selectOne(e) {
        console.log('e ==> ', e);
        let _this=this
        let okckecked=true
        let curchecked=e.detail
        let index = e.currentTarget.dataset.index;
        let formlist=this.data.formlist
        let item = this.data.cartlist[index];
        let key=e.currentTarget.dataset.key;
       let totalcount=this.data.totalcount
        let removeid=this.data.removeid
       
        
        console.log("key",key);
        item.isCheck = !item.isCheck;
        console.log("item",item);
        console.log('this.data.cartlist ==> ', this.data.cartlist);
        console.log("curchecked",curchecked);
        if (curchecked==true) {
            console.log("yi");
            
            _this.data.formlist.push(item)
            _this.data.removeid.push(key)
            console.log(item.count);
            totalcount+=item.count
            _this.setData({
                totalcount:totalcount,

            })
        }else{
            console.log("er");
            console.log(index);
            
            _this.data.formlist.forEach(function (item,index) {
                console.log(item.id1==key);
                if (item.id1==key) {
                    let reindex=index
                    console.log("reindex",reindex);
                    _this.data.formlist.splice(index,1)
                    _this.data.removeid.splice(index,1)
                    totalcount-=item.count
                    _this.setData({
                        totalcount:totalcount
                    })
                }
            })
        }
        console.log("totalcount",_this.data.totalcount);

        for (let i = 0; i < this.data.cartlist.length; i++) {
            
            if (!_this.data.cartlist[i].isCheck) {
                console.log("运行了吗");
                this.setData({
                    isAllCheck: false,
                    cartlist: this.data.cartlist,
                    formlist: this.data.formlist,
                    removeid:removeid
                })
                
                break;
            }
        }
        
        this.data.cartlist.forEach(function (item,index) {
            if (!item.isCheck) {
                okckecked=false
            }
        })
        if (okckecked) {
            this.setData({
                isAllCheck: true, 
                cartlist: this.data.cartlist,
            })
        }
       console.log("formlist",this.data.formlist);
       console.log("removeid",this.data.removeid);
        this.total();
    },
    allSelect() {
        let _this=this;
        let status = !this.data.isAllCheck;
        let totalcount=this.data.totalcount
        let removeid=this.data.removeid
        // console.log('status ==> ', status);

        _this.setData({
            cartlist: _this.data.cartlist,
            isAllCheck: status,
        })
        console.log("_this.data.isAllCheck",_this.data.isAllCheck);
      
        
        if (_this.data.isAllCheck==false) {
            _this.data.cartlist.forEach(item => {
                item.isCheck = status;
                totalcount+=item.count
                _this.data.formlist.push(item)
              
            })
            _this.setData({
                alltotal:0,
                totalcount:0,
                formlist: [],
                cartlist:  _this.data.cartlist,
                removeid:[]
            })
            console.log(" _this.data.formlist", _this.data.formlist);
           
        }else{
            _this.data.cartlist.forEach(item => {
                item.isCheck = status;
                totalcount+=item.count
                _this.data.formlist.push(item)
                _this.data.removeid.push(item.id1)

                this.setData({
                    totalcount:totalcount,
                    formlist:  _this.data.formlist,
                    cartlist:  _this.data.cartlist,
                    removeid:  _this.data.removeid
                })
            })
            console.log(" _this.data.formlist", _this.data.formlist);
            console.log(" _this.data.removeid", _this.data.removeid);
           
        }
        this.total();
        console.log("totalcount",this.data.totalcount);
    },
    
    total() {
        // 获取商品列表数据
        let cartlist = this.data.cartlist;
        // 声明一个变量接收数组列表price
        let alltotal = 0;
        // 循环列表得到每个数据
        for (let i = 0; i < cartlist.length; i++) {
          // 判断选中计算价格
          if (cartlist[i].isCheck) {
            // 所有价格加起来 count_money
            alltotal += cartlist[i].count * cartlist[i].curprice*100;
          }
        }
        // 最后赋值到data中渲染到页面
        this.setData({
            cartlist: cartlist,
          totalPrice: alltotal
        });
      },
      btn_add(e) {
        // 获取点击的索引
        console.log("e",e);
        const index = e.currentTarget.dataset.index;
        // 获取商品数据
        let cartlist = this.data.cartlist;
        // 获取商品数量
        let count = cartlist[index].count;
        // 点击递增
        count += 1-1;
        cartlist[index].count = count;
        // 重新渲染 ---显示新的数量
        this.setData({
            cartlist: cartlist
        });
        // 计算金额方法
        this.total();
      },
      btn_minus(e) {
        //   // 获取点击的索引
        const index = e.currentTarget.dataset.index;
        // const obj = e.currentTarget.dataset.obj;
        // console.log(obj);
        // 获取商品数据
        let cartlist = this.data.cartlist;
        // 获取商品数量
        let count = cartlist[index].count;
        // 判断num小于等于1  return; 点击无效
        if (count <= 1) {
          return false;
        }
        // else  num大于1  点击减按钮  数量--
        count -= 1-1;
        cartlist[index].count = count;
        // 渲染页面
        this.setData({
            cartlist: cartlist
        });
        // 调用计算金额方法
        this.total();
      },
      value_update(e) {
        //   // 获取点击的索引
        console.log("e",e);
        let update=e.detail
        console.log("update",update);
        const index = e.currentTarget.dataset.index;
        // const obj = e.currentTarget.dataset.obj;
        // console.log(obj);
        // 获取商品数据
        let cartlist = this.data.cartlist;
        // 获取商品数量
        let count = cartlist[index].count;
       
      
        cartlist[index].count = update;
     
        // 渲染页面
        this.setData({
            cartlist: cartlist
        });
        // 调用计算金额方法
        this.total();
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
        this.getUserInfo();
        this.getshoplist();
        this.setData({
            totalcount:0,
            removeid:[]
        })
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