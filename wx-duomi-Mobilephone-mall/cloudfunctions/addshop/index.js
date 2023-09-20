// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    return await db.collection('shoplist').add({
        data: {

            id:event.id,
            tagid:event.tagid,
            ishot:event.ishot,
            isnew:event.isnew,
            isrecommend:event.isrecommend,
            imgurl: event.imgurl,
            title: event.title,
            desc: event.desc,
            securities1: event.securities1,
            securities2: event.securities1,
            securities3: event.securities1,
            issecur1: event.issecur1,
            issecur2: event.issecur2,
            issecur3: event.issecur3,
            curpirce: event.curpirce,
            postprice: event.postprice,
            ispost: event.ispost,
            type: event.type,
            color: event.color,
            issend: event.issend,
            setmeal: event.setmeal,
            descDetail: event.descDetail,
            partlist: event.partlist,
            partDetail: event.partDetail

        },
        success: function (res) {
            wx.showToast({
                title: "添加成功",
                duration: 2000
            })
            that.setData({
                id: event.id,
                imgurl: event.imgurl,
                title: event.title,
                desc: event.desc,
                securities1: event.securities1,
                securities2: event.securities1,
                securities3: event.securities1,
                issecur1: event.issecur1,
                issecur2: event.issecur2,
                issecur3: event.issecur3,
                curpirce: event.curpirce,
                postprice: event.postprice,
                ispost: event.ispost,
                type: event.type,
                color: event.color,
                issend: event.issend,
                setmeal: event.setmeal,
                descDetail: event.descDetail,
                partlist: event.partlist,
                partDetail: event.partDetail
            })
        },
        fail: function (res) {
            wx.showToast({
                title: "添加失败",
                duration: 2000
            })
        }
    })


}