// pages/addshop/shopapp.js
import Notify from '@vant/weapp/notify/notify';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        radio: '1',
        radiotag:0,
        type1: "",
        type2: "",
        type3: "",
        curpirce1: 0,
        curpirce2: 0,
        curpirce3: 0,
        imgUrl1: "",
        imgUrl2: "",
        imgUrl3: "",
        imgUrl4: "",
        descDetail1: "",
        descDetail2: "",
        descDetail3: "",
        partDetail1: "",
        partDetail2: "",
        partDetail3: "",
        partDetail4: "",


        id: "",
        id1:"",
        imgurl: [],
        title: "",
        desc: "",
        securities1: "满1000减60",
        securities2: "3期免息",
        securities3: "加价购",
        issecur1: 0,
        issecur2: 0,
        issecur3: 0,
        curpirce: [],
        postprice: 0,
        ispost: false,
        type: [],
        color: [],
        send: ["商城配送", "到店自取"],
        setmeal: ["标配"],
        descDetail: [],
        partlist: ["CPU", "三摄像头", "超大屏", "储存容量", "四摄像头"],
        partDetail: [],
        tag:0,
        ishot:false,
        isnew:false,
        isrecommend:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    async addshop() {

        let id = this.data.id;
        let tagid=this.data.id1
        let ishot=this.data.ishot
        let isnew=this.data.isnew
        let isrecommend=this.data.isrecommend
        let imgurl = this.data.imgurl;
        let title = this.data.title;
        let desc = this.data.desc;
        let securities1 = this.data.securities1;
        let securities2 = this.data.securities1;
        let securities3 = this.data.securities1;
        let issecur1 = this.data.issecur1;
        let issecur2 = this.data.issecur2;
        let issecur3 = this.data.issecur3;
        let curpirce = this.data.curpirce;
        let postprice = this.data.postprice;
        let ispost = this.data.ispost;
        let type = this.data.type;
        let color = this.data.color;
        let issend = this.data.issend;
        let setmeal = this.data.setmeal;
        let descDetail = this.data.descDetail;
        let partlist = this.data.partlist;
        let partDetail = this.data.partDetail;


        //本地函数调用云函数 
        wx.cloud.callFunction({
            name: 'addshop',
            data: {
                id: id,
                tagid:tagid,
                ishot:ishot,
                isnew:isnew,
                isrecommend:isrecommend,
                imgurl: imgurl,
                title: title,
                desc: desc,
                securities1: securities1,
                securities2: securities1,
                securities3: securities1,
                issecur1: issecur1,
                issecur2: issecur2,
                issecur3: issecur3,
                curpirce: curpirce,
                postprice: postprice,
                ispost: ispost,
                type: type,
                color: color,
                issend: issend,
                setmeal: setmeal,
                descDetail:descDetail,
                partlist:partlist,
                partDetail:partDetail
            },
            complete: res => {
                console.log('callFunction test result: ', res)
                Notify({
                    type: 'success',
                    message: '成功上传'
                });
            }
        })

        this.setData({
            id: "",
            id1:"",
            ishot:false,
            isnew:false,
            isrecommend:false,
            imgurl: [],
            title: "",
            desc: "",
            type: [],
            color: [],
            curpirce: [],
            descDetail: [],
            partDetail: []
        })
    },

    Changehot(event) {
        console.log("ishot",event.detail);
        this.setData({
          ishot: event.detail,
        });
      },
      Changenew(event) {
        console.log("isnew",event.detail);
        this.setData({
          isnew: event.detail,
        });
      },
      Changerecommend(event) {
          console.log("isrecommend",event.detail);
        this.setData({
          isrecommend: event.detail,
        });
      },
    Changeid(event) {
        console.log("id", event.detail);
        this.setData({
            radio: event.detail,
            id: event.detail
        });
    },
    
    Changetag(event) {
        
        console.log("id1", event.detail);
        this.setData({
            radiotag: event.detail,
            id1: event.detail
        });
    },
    Changeurl1(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            imgUrl1: event.detail
        })
    },
    Changeurl2(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            imgUrl2: event.detail
        })
    },
    Changeurl3(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            imgUrl3: event.detail
        })
    },
    Changeurl4(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            imgUrl4: event.detail
        })
    },
    Changetitle(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            title: event.detail
        })
    },
    Changedesc(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            desc: event.detail
        })
    },
    ChangedescDetail1(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            descDetail1: event.detail
        })
    },
    ChangedescDetail2(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            descDetail2: event.detail
        })
    },
    ChangedescDetail3(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            descDetail3: event.detail
        })
    },
    ChangepartDetail1(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            partDetail1: event.detail
        })
    },
    ChangepartDetail2(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            partDetail2: event.detail
        })
    },
    ChangepartDetail3(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            partDetail3: event.detail
        })
    },
    ChangepartDetail4(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            partDetail4: event.detail
        })
    },

    Changecurpirce1(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            curpirce1: event.detail
        })
    },
    Changecurpirce2(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            curpirce2: event.detail
        })
    },
    Changecurpirce3(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            curpirce3: event.detail
        })
    },
    Changetype1(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            type1: event.detail
        })
    },
    Changetype2(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            type2: event.detail
        })
    },
    Changetype3(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            type3: event.detail
        })
    },
    Changecolor1(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            color1: event.detail
        })
    },
    Changecolor2(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            color2: event.detail
        })
    },
    Changecolor3(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            color3: event.detail
        })
    },
    sendshop() {
        let typearr = [];
        let colorarr = [];
        let pircearr = [];
        let urlarr = [];
        let partdetarr = [];
        let descdetarr = [];
        let data = this.data
        if (data.type1 !== "") {
            typearr.push(data.type1)
        }
        if (data.type2 !== "") {
            typearr.push(data.type2)
        }
        if (data.type3 !== "") {
            typearr.push(data.type3)
        }

        if (data.color1 !== "") {
            colorarr.push(data.color1)
        }
        if (data.color2 !== "") {
            colorarr.push(data.color2)
        }
        if (data.color3 !== "") {
            colorarr.push(data.color3)
        }
        if (data.imgUrl1 !== "") {
            urlarr.push(data.imgUrl1)
        }
        if (data.imgUrl2 !== "") {
            urlarr.push(data.imgUrl2)
        }
        if (data.imgUrl3 !== "") {
            urlarr.push(data.imgUrl3)
        }
        if (data.imgUrl4 !== "") {
            urlarr.push(data.imgUrl4)
        }
        if (data.curpirce1 !== 0) {
            pircearr.push(data.curpirce1)
        }
        if (data.curpirce2 !== 0) {
            pircearr.push(data.curpirce2)
        }
        if (data.curpirce3 !== 0) {
            pircearr.push(data.curpirce3)
        }
        if (data.partDetail1 !== "") {
            partdetarr.push(data.partDetail1)
        }
        if (data.partDetail2 !== "") {
            partdetarr.push(data.partDetail2)
        }
        if (data.partDetail3 !== "") {
            partdetarr.push(data.partDetail3)
        }
        if (data.partDetail4 !== "") {
            partdetarr.push(data.partDetail4)
        }
        if (data.descDetail1 !== "") {
            descdetarr.push(data.descDetail1)
        }
        if (data.descDetail2 !== "") {
            descdetarr.push(data.descDetail2)
        }
        if (data.descDetail3 !== "") {
            descdetarr.push(data.descDetail3)
        }
        console.log("typearr", typearr);
        console.log("colorarr", colorarr);
        console.log("pircearr", pircearr);
        console.log("urlarr", urlarr);
        this.setData({
            type: typearr,
            color: colorarr,
            curpirce: pircearr,
            imgurl: urlarr,
            partDetail: partdetarr,
            descDetail: descdetarr
        })
        if (
            data.id == "" ||
            data.id==""||
            data.imgurl == [] ||
            data.title == "" ||
            data.desc == "" ||
            data.type == [] ||
            data.color == [] ||
            data.curpirce == [] ||
            data.descDetail == [] ||
            data.partDetail == []
        ) {
            Notify({
                type: 'danger',
                message: '上传失败'
            });
            console.log("信息不完整");
            return
        } else {
            console.log("正在上传");
            this.addshop()
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