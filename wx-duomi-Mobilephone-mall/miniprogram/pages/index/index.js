// index.js
// const app = getApp()
const {
    envList
} = require('../../envList.js');

var app = getApp()
// var common = require('../../utils/common.js')
var leftList = new Array();
var rightList = new Array();
var leftHight = 0,
    rightHight = 0,
    itemWidth = 0,
    maxHeight = 500;
Page({
    data: {
        loading:true,
        focus: false,
        inputValue: '',
        swiperCurrent: 0,

        indicatorDots: true,

        autoplay: true,

        interval: 3000,

        duration: 800,

        circular: true,

        imgUrls: [

            'cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/bannerimg/banner1.jpeg@base@tag=imgScale&F=webp&h=1080&q=90&w=2560',

            'cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/bannerimg/banner2.jpeg@base@tag=imgScale&F=webp&h=1080&q=90&w=2560',

            'cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/bannerimg/banner3.jpeg@base@tag=imgScale&F=webp&h=1080&q=90&w=2560'

        ],

      

        dataList: null,

     
        
        app1: app,
        windowWidth: app.globalData.windowWidth,
        // CustomBar:app.globalData.CustomBar,
        screenHeight: app.globalData.screenHeight,
        page: 1,
        imgwidth: 400,
        recommendlist: [],
        adddata: [],
        scrollH: 0,
        imgWidth: 0,
        loadingCount: 0,
        images: [],
        col1: [],
        col2: [],
        ishide: true,
        _idarr:[]

    },
    onLoad: function (e) {
        console.log("e", e);

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
        this.getshoplist()
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
    onReady: function (e) {
        console.log(e);
        console.log("this.data.app1", this.data.app1);
        console.log("this.data.windowWidth", this.data.windowWidth);
        //  console.log("this.data.CustomBar",this.data.CustomBar);
        console.log("this.data.screenHeight", this.data.screenHeight);
    },
    bindKeyInput: function (e) {
        console.log("e", e);
        this.setData({
            inputValue: e.detail.value
        })
    },
    bindReplaceInput: function (e) {
        console.log("e", e);
        var value = e.detail.value
        var pos = e.detail.cursor
        var left
        if (pos !== -1) {
            // 光标在中间
            left = e.detail.value.slice(0, pos)
            // 计算光标的位置
            pos = left.replace(/11/g, '2').length
        }

        // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
        return {
            value: value.replace(/11/g, '2'),
            cursor: pos
        }

        // 或者直接返回字符串,光标在最后边
        // return value.replace(/11/g,'2'),
    },
    bindHideKeyboard: function (e) {
        console.log("e", e);
        if (e.detail.value === '123') {
            // 收起键盘
            wx.hideKeyboard()
        }
    },
    //轮播图的切换事件

    swiperChange: function (e) {

        this.setData({

            swiperCurrent: e.detail.current

        })

    },

    //点击指示点切换

    chuangEvent: function (e) {

        this.setData({

            swiperCurrent: e.currentTarget.id

        })

    },

    //点击图片触发事件

    swipclick: function (e) {
        console.log("e",e);
        console.log(this.data.swiperCurrent);
        let _id=""
        if (this.data.swiperCurrent==2) {
            _id="8de6ebcc65048347025cf33b7538a6ce"
        }
        if (this.data.swiperCurrent==1) {
            _id="7dc1d5026504881e0262e5ca0c57a245"
        }
        if(this.data.swiperCurrent==1){
            _id="7dc1d5026507293002ab5ce649ebb34f"
        }
      
        console.log("_id",_id);
        wx.setStorageSync('key', _id)
        wx.navigateTo({
            url: '../shopdetail/shopdetail',
        })
    },
    backToTop() {
        wx.pageScrollTo({
            scrollTop: rect.height,
            duration: 500 //设置滚动延时
        })
    },
    //置底
    goToBottom() {
        console.log("调用goToBottom");
        wx.createSelectorQuery().select('#scroll-y').boundingClientRect(function (rect) {
            // 使页面滚动到底部

            wx.pageScrollTo({
                scrollTop: 100,
                duration: 500 //设置滚动延时
            })
        }).exec()
    },





    // 1.调用接口获取信息
    getDataList() {
        let that = this;
        let timestamp = Date.parse(new Date()) / 1000;
        const data = {
            page: that.data.page.toString(),
            t: timestamp,
            openid: that.data.openId
        }
        // 调用秘钥方法
        let sign = CryptoJS.AesEncryptECB(JSON.stringify(data))
        wx.request({
            url: 'http://xxxxx?',
            data: {
                ...data,
                sign
            },
            method: 'GET',
            header: {
                'content-type': 'application/xml'
            },
            success: function (res) {
                let resData = res.data.data;
                // 获取图片信息
                that.getImgData(resData, 0);
            },
            fail: function (err) {
                console.log(err)
            },
        })
    },

    // 获取图片尺寸，判断image的mode属性，
    // 如果长宽比例 > 1.5 则使用aspectFill，否则使用widthFix
    getImgData(resData, index) {
        console.log("调用了getImgData");
        let that = this;
        if (index < resData.length) {
            wx.request({
                url: resData[index].imglist[0].split('@base')[0] + '@base@tag=imageInfo',
                method: 'GET',
                header: {
                    'content-type': 'application/xml'
                },
                success: function (res) {
                    if (res.data.height / res.data.width > 1.5) {
                        resData[index].mode = 'screenshot';
                        index += 1
                        that.getImgData(resData, index)
                    } else {
                        resData[index].mode = '';
                        index += 1
                        that.getImgData(resData, index)
                    }
                },
                fail: function (err) {
                    console.log(err)
                },
            })
        } else {
            that.setData({
                dataList: that.data.dataList.concat(resData),
            })
            // 调用瀑布流布局方法
            that.isLeft();
        }
    },

    /* 首页瀑布流布局 */
    // 判断左右插入
    async isLeft() {
        const {
            dataList,
            leftList,
            rightList
        } = this.data;
        let newDataList = dataList.slice(-10);
        query = wx.createSelectorQuery();
        for (const item of newDataList) {
            leftHeight <= rightHeight ? leftList.push(item) : rightList.push(item);
            //判断两边高度，来觉得添加到那边
            await this.getBoxHeight(leftList, rightList);
        }
    },

    // 布局对比
    getBoxHeight(leftList, rightList) { //获取左右两边高度
        return new Promise((resolve, reject) => {
            this.setData({
                leftList,
                rightList
            }, () => {
                query.select('#left').boundingClientRect();
                query.select('#right').boundingClientRect();
                query.exec((res) => {
                    leftHeight = res[0].height; //获取左边列表的高度
                    rightHeight = res[1].height; //获取右边列表的高度
                    resolve();
                });
            });
        })
    },

    // 通过监听滚动条，动态加载数据
    /* onPageScroll: tools.throttle(function (res) { */ // 引入外部节流函数
    //   onPageScroll: function (res,e) {
    //       console.log("调用了onPageScroll",res);
    //       console.log("this",this);
    //      console.log("this.data.scrollHight",this.data.scrollHight);
    //     let scrollTop = res.scrollTop;
    //     if (scrollTop >= this.data.scrollHight) {
    //       console.log("加载下一页")
    //       this.setData({
    //         scrollHight: this.data.scrollHight + 800
    //       })
    //       this.getDataList()
    //     }
    //   },
    addrecommend() {
        console.log("addrecommend");
    },
    onReachBottom() {
        // this.onPageScroll();
        this.addrecommend();
        // this.refresh();
    },
    onPageScroll() {
        // this.refresh();
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

    getbottom() {
        var that = this;
        var page = that.data.page + 1;
        that.setData({
            page: page
        });
        var url = "请求地址"
        common.get(url).then((res) => {
            var postList = res.data.data.post_list;
            for (let i = 0, len = postList.length; i < len; i++) {
                let tmp = postList[i];
                tmp.width = tmp.width; //获取图片真实宽度
                tmp.height = tmp.height; //获取图片真实高度
                tmp.itemWidth = this.data.imgwidth; //获取图片显示宽度
                let per = tmp.width / tmp.itemWidth;
                tmp.itemHeight = tmp.height / per;
                if (tmp.itemHeight > maxHeight) {
                    tmp.itemHeight = maxHeight; //超限时候
                }
                if (leftHight == rightHight) {
                    leftList.push(tmp);
                    leftHight = leftHight + tmp.itemHeight;
                } else if (leftHight < rightHight) {
                    leftList.push(tmp);
                    leftHight = leftHight + tmp.itemHeight;
                } else {
                    rightList.push(tmp);
                    rightHight = rightHight + tmp.itemHeight;
                }
            }
            that.setData({
                leftList: leftList,
                rightList: rightList,
            });
        })
    },
    gosearch() {
        //详情页面位非tabbar页面
        console.log("点击跳转1");
        wx.navigateTo({
            url: '../search/search'
        })
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

        // wx.navigateTo({
        //     url: '../shopdetail/shopdetail',
        //     success: function(res) {
        //       // 通过eventChannel向被打开页面传送数据
        //       res.eventChannel.emit('acceptDataFromOpenerPage', {id: id})
        //     }
        //   })
    },
    goaddshop() {
        console.log("点击跳转1");
        wx.navigateTo({
            url: '../addshop/addshop'
        })
    }

})