// pages/classify/classify.js
// import Notify from '@vant/weapp/notify/notify';
let col1H = 0;
let col2H = 0;
Page({

    data: {
        loading:true,
        scrollH: 0,
        imgWidth: 0,
        loadingCount: 0,
        images: [],
        col1: [],
        col2: [],
        activeKey: 0,
        swiperCurrent: 0,

        indicatorDots: true,

        autoplay: true,

        interval: 3000,

        duration: 800,

        circular: true,
        selecttext: [
            " Xiaomi MIX系列",
            " Xiaomi 数字系列",
            " Xiaomi Civi",
        ],
        selecttext1: [
            " K系列",
            " Note系列",
            " 数字系列",
        ],
        scrollTop: 0,
        offsetTop: 0,
        isshow: 0,
        
        price:[
            "8999起",
            "8999起",
            "19999"
           
        ],
        title:[
            "Xiaomi MIX Fold 3",
            "Xiaomi MIX Fold 2",
            "Xiaomi MIX Alpha",
        ],
        imageURL1: [
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/xmix1.jpg",
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/xmix2.png",
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/xmix3.jpg",
        ],
        imageURL2:[
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/xshu1.png",
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/xshu2.png",
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/xshu3.png"
        ],
        imageURL3:[
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/civi1.png",
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/civi2.png"
        ],
        imageURL4:[
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/rk1.png",
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/rk2.png",
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/rk3.png"
        ],
        imageURL5:[
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/rn1.png",
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/rn2.png",
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/rn3.png",
        ],
        imageURL6:[
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/rshu1.png",
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/rshu2.jpg",
            "cloud://cloud1-5gbqe03v8e747423.636c-cloud1-5gbqe03v8e747423-1320647911/classify/classify/rshu3.png"
        ],
        xmix:[],
        xshu:[],
        xcivi:[],
        rk:[],
        rn:[],
        rshu:[],
        recommendlist:[],
        _idarr:[],
        xorr:0,
        _id:"",
        histroy:["手机","电脑"],
        wanttag:[]
    },
    selectitem(e){
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
    onScroll(event) {
        // wx.createSelectorQuery()
        //     .select('#scroller')
        //     .boundingClientRect((res) => {
        //         console.log("res", res);
        //         this.setData({
        //             scrollTop: event.detail.scrollTop,
        //             offsetTop: res.top
        //         });
        //     })
        //     .exec();
    },
    onChange(event) {
        console.log("event", event);
        let index = event.detail
        if (index == 0) {
            this.setData({
                isshow: 0,
                xorr:0
            })
        } else if (index == 1) {
            this.setData({
                isshow: 1,
                xorr:1
            })
        }
        // Notify({ type: 'primary', message: event.detail });
    },
    onLoad: function () {
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

                this.loadImages();
            }
        })
        this.getshoplist();
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
                recommendlist.forEach(function (item,index) {
                    console.log("item",item);
                    if (item.tagid==1) {
                        _this.data.xmix.push(item)
                        _this.setData({
                            xmix: _this.data.xmix
                        })
                    }
                    if (item.tagid==2) {
                        _this.data.xshu.push(item)
                        _this.setData({
                            xshu: _this.data.xshu
                        })
                    }
                    if (item.tagid==3) {
                        _this.data.xcivi.push(item)
                        _this.setData({
                            xcivi: _this.data.xcivi
                        })
                    }
                    if (item.tagid==4) {
                        _this.data.rk.push(item)
                        _this.setData({
                            rk: _this.data.rk
                        })
                    }
                    if (item.tagid==5) {
                        _this.data.rn.push(item)
                        _this.setData({
                            rn: _this.data.rn
                        })
                    }
                    if (item.tagid==6) {
                        _this.data.rshu.push(item)
                        _this.setData({
                            rshu: _this.data.rshu
                        })
                    }
                })

                console.log(" _this.data.xmix", _this.data.xmix);
                console.log(" _this.data.xshu", _this.data.xshu);
                console.log(" _this.data.xcivi", _this.data.xcivi);
                console.log(" _this.data.rk", _this.data.rk);
                console.log(" _this.data.rn", _this.data.rn);
                console.log(" _this.data.rshu", _this.data.rshu);
                
            })
            .catch(err => {
                console.log('云函数获取数据失败', err)
            })
    },

    onImageLoad: function (e) {
        console.log("onImageLoad==>e", e);
        let imageId = e.currentTarget.id;
        let oImgW = e.detail.width; //图片原始宽度
        let oImgH = e.detail.height; //图片原始高度
        let imgWidth = this.data.imgWidth; //图片设置的宽度
        let scale = imgWidth / oImgW; //比例计算
        let imgHeight = oImgH * scale; //自适应高度

        let images = this.data.images;
        let imageObj = null;

        for (let i = 0; i < images.length; i++) {
            let img = images[i];
            if (img.id === imageId) {
                imageObj = img;
                break;
            }
        }

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

        this.setData(data);
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

        let baseId = "img-" + (+new Date());

        for (let i = 0; i < images.length; i++) {
            images[i].id = baseId + "-" + i;
        }

        this.setData({
            loadingCount: images.length,
            images: images
        });
    },

})