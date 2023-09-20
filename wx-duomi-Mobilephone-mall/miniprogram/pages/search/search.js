// pages/search/search.js
const validLogin = require('../../valid/valid');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        recommendlist: [],
        adddata1: [],
        _idarr: [],
        history:[],
        isexecute:true,
        searchrecommend:["Xiaomi","Redmi","MIX","Note","K60","Civi","Xiaomi 13","Redmi 12"],
        showrecommend:[],
        adddata:[],
        initrecommend:[],
        showindex:0,
        hotsearch:[],
        _id:"",
        value: '',
        isshow:false,
        shopshow:false,
        searchresult:[],
        isempty:true,
        count:0,
        userInfo:[]
    },
    // clickresult(e){
    //     console.log("e",e);
    //     let key=e.currentTarget.dataset.key
    //     console.log("key",key);
    //     let _id=key._id
    //     this.setData({
    //         _id:_id
    //     })
    // },

    clickhistory(e){
        console.log("e",e);
        let key =e.currentTarget.dataset.key
        this.setData({
            value:key
        })

        this.onSearch();
    },
    clickwant(e){
        console.log("e",e);
        let key =e.currentTarget.dataset.key
        console.log("key",key);
        this.setData({
            value:key
        })
        this.onSearch();
    },
    showPopupaddress(){
        this.setData({ shopshow: true });
    },
    Closeaddress(){
        this.setData({ shopshow: false });
    },

     //搜索
  searchshop() {
      let _this=this
    console.log('this.data.username ==> ', this.data.username);
    let value=this.data.value
    console.log("this.data.value",this.data.value);
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    wx.cloud.callFunction({
      name: 'seach_shop',
      data: {
        title: value,
        sortType: 'asc',
        sortName: 'title',
        limit: 0,
        offset: 0
      }
    }).then(res => {
      console.log('res ==> ', res);
      let searchresult=res.result.data

      _this.setData({
        searchresult:searchresult
      })
      console.log("this.data.searchresult",this.data.searchresult);
      let count=searchresult.length;
      _this.setData({
        count:count
      })
      if (searchresult.length!=0) {
          _this.setData({
            isempty:false
          })
      }
      
      wx.hideLoading();
    }).catch(err => {
      console.log('err ==> ', err);
      wx.hideLoading();
    })
  },



    more(){
        let _this=this
        let showindex=this.data.showindex
        let showrecommend=this.data.showrecommend
        let initrecommend=this.data.initrecommend
        let searchrecommend=this.data.searchrecommend
        let length=searchrecommend.length-5
        let adddata1=this.data.adddata1
        adddata1.forEach(function (item,index) {
            // console.log(item,"item");
            searchrecommend.push(item)
        _this.setData({
            searchrecommend:searchrecommend
        })
        })
        
        // console.log("this.data.searchrecommend",this.data.searchrecommend);
        
        showindex+=4
        this.setData({
            showindex:showindex
        })
        console.log(showindex,length);
        console.log(showindex>length);
        let newarr=[]
        for (let i = showindex; i < showindex+4; i++) {
            newarr.push(searchrecommend[i])
            _this.setData({
                showrecommend:newarr
            })
        }
        
       
    },

    showdel(e){
        let isshow=this.data.isshow
        let newisshow=!isshow
        this.setData({
            isshow:newisshow
        })
        console.log("this.data.isshow",this.data.isshow);
    },
   
    onChange(e) {
        console.log("e",e);
        this.setData({
          value: e.detail,
        });
        console.log("this.data.value",this.data.value);
      },

    onSearch() {
        console.log("onSearch");
        let _this=this
        let value=this.data.value
        let history=this.data.history

        let isexecute=_this.data.isexecute
        // if (history.length==0) {
         
        // }
        history.unshift(value)
        this.setData({
            history:history
        })
      
        history.forEach(function (item,index) {
            console.log(item,value);
            if (item==value) {
                _this.setData({
                    isexecute:false
                })
            }
        })
        if (isexecute==true) {
            this.setData({
                history:history
            })
        }
        
       
        console.log("this.data.history",this.data.history);
        this.searchshop();
        this.showPopupaddress()
        this.setData({ shopshow: true });
     
        if (isexecute==true) {
            _this.updatesearchhistory()
        }
       
        // Toast('搜索' + this.data.value);
      },

    


    oninput(e){
        console.log("e",e);
        console.log("detail",e.dedatil);
    },
    delhistory(e){
        console.log("e",e);
        let _this=this
        let index=e.currentTarget.dataset.index
        console.log("index",index);
        let history=this.data.history
        wx.showLoading({
            title: '删除中',
          })
        history.forEach(function (item,index) {     
           history.splice(index,1)
            _this.setData({
                history:history
            })
        })
        console.log("this.data.history",this.data.history);
        this.updatesearchhistory()
        wx.hideLoading()

    },
    // 修改搜索历史
    async updatesearchhistory() {
        console.log("是否调用了updateaddress");
        let _id=this.data._id
        let username=this.data.userInfo.username
        let password=this.data.userInfo.password
        let buylist=this.data.userInfo.buylist
        let formlist=this.data.userInfo.formlist
       let address=this.data.userInfo.addresslist
       let loginStatus = await validLogin();
       let searchhistory=this.data.history
       

       console.log("buylist",buylist);
       console.log('loginStatus ==> ', loginStatus);
       // console.log(this.data.userInfo);
       // let userId=this.data.userInfo._id
       // console.log("userId",userId);
       if (loginStatus) {
           let userId = wx.getStorageSync('userId');
           console.log("user",userId);
        //    wx.showLoading({
        //        title: '加入中...',
        //        mask: true
        //      })
             let curname=this.data.username
         
             wx.cloud.callFunction({
               name: 'update_usermessage',
               data: {
                 userId,
                 username:username,
                 password:password,
                 buylist:buylist,
                 formlist:formlist,
                 address: address,
                 searchhistory:searchhistory
               }
             }).then(res => {
               console.log('res ==> ', res);
            //    wx.hideLoading();
             }).catch(err => {
               console.log('err ==> ', err);
            //    wx.hideLoading();
             })
           
               

               
           
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
        this.getshoplist()
        this.getUserInfo();
        console.log("this.data.history",this.data.history);
        let _this=this
        let showindex=this.data.showindex
        let showrecommend=this.data.showrecommend
        let searchrecommend=this.data.searchrecommend
        let newarr=[]
        let initrecommend=this.data.initrecommend
        for (let i = 0; i < 4; i++) {
          
            
            newarr.push(searchrecommend[i])
            this.setData({
                showrecommend:newarr,
                initrecommend:newarr
            })
        }
        let newarr2=[]
        let adddata1=this.data.adddata1
        for (let l = 0; l < searchrecommend.length; l++) {
            console.log(searchrecommend[l]);
            adddata1.push(searchrecommend[l])
            _this.setData({
                adddata1:adddata1
            })
            
        }
        console.log("this.data.adddata1",this.data.adddata1);
        console.log("this.data.showrecommend",this.data.initrecommend);
        console.log("this.data.showrecommend",this.data.initrecommend);
       
    },
    //获取商品列表
    async getshoplist() {
        let _this = this;
        wx.cloud.callFunction({ // 云函数名称
                name: 'get_shoplist',
            }).then(res => {

                console.log('云函数获取数据成功', res)
                let recommendlist = res.result.data
                let adddata = res.result.data
                let idarr = [];
                adddata.forEach(function (item, index) {

                    idarr.push(item._id)
                })
                let _idarr = idarr
                _this.setData({
                    recommendlist: recommendlist,
                    adddata: adddata,
                    _idarr: _idarr
                })

                for (let i = 0; i < 6; i++) {
                    _this.data.hotsearch.push(recommendlist[i])
                    _this.setData({
                        hotsearch: _this.data.hotsearch
                    })
                    
                }
                console.log("_this.data.hotsearch",_this.data.hotsearch);

            })
            .catch(err => {
                console.log('云函数获取数据失败', err)
            })
    },
    goshopdetail(e){
        console.log("e",e);
        let index=e.currentTarget.dataset.index
        let key=e.currentTarget.dataset.key
        console.log("key",key);
        let _id=key._id
        console.log("_id",_id);
        this.setData({
            _id:_id
        })
        wx.setStorageSync('key', _id)
        wx.navigateTo({
            url: '../shopdetail/shopdetail',
        })
     
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
                let searchhistory=res.result.data.searchhistory

                if (cartlist.length!=0) {
                    _this.setData({
                        isempty:false
                    })
                }
                this.setData({
                    userInfo: res.result.data,
                    islogin: true,
                    cartlist:cartlist,
                    addresslist:res.result.data.address,
                    initform:formlist,
                    history:searchhistory
                })
                
                console.log("this.datat.initform",_this.data.initform);
                console.log("this.datat.userInfo",_this.data.userInfo);
                console.log("this.datat.cartlist",_this.data.cartlist);
                console.log("this.datat.addresslist",_this.data.addresslist);

                
             
             
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

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getshoplist()
        this.getUserInfo();
        let _this=this
        let showindex=this.data.showindex
        let showrecommend=this.data.showrecommend
        let searchrecommend=this.data.searchrecommend
        let newarr=[]
        let initrecommend=this.data.initrecommend
        for (let i = 0; i < 4; i++) {
          
            
            newarr.push(searchrecommend[i])
            this.setData({
                showrecommend:newarr,
                initrecommend:newarr
            })
        }
        let newarr2=[]
        let adddata1=this.data.adddata1
        for (let l = 0; l < searchrecommend.length; l++) {
            adddata1.push(searchrecommend[l])
            this.setData({
                adddata1:adddata1
            })
            
        }
        console.log("this.data.adddata1",this.data.adddata1);
        console.log("this.data.showrecommend",this.data.initrecommend);
        console.log("this.data.showrecommend",this.data.initrecommend);
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