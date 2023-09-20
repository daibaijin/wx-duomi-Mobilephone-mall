// pages/Home/Home.js
const { envList } = require('../../envList.js');

var app = getApp()  
Page( {  
 data: {  
  /** 
    * 页面配置 
    */  
  winWidth: 0,  
  winHeight: 0,  
  // tab切换  
  currentTab: 0,  
 },  
 onLoad: function() {  
  var that = this;  
  
  /** 
   * 获取系统信息 
   */  
  wx.getSystemInfo( {  
  
   success: function( res ) {  
    that.setData( {  
     winWidth: res.windowWidth,  
     winHeight: res.windowHeight  
    });  
   }  
  
  });  
 },  
 /** 
   * 滑动切换tab 
   */  
 bindChange: function( e ) {  
  
  var that = this;  
  that.setData( { currentTab: e.detail.current });  
  
 },  
 /** 
  * 点击tab切换 
  */  
 swichNav: function( e ) {  
  
  var that = this;  
  console.log(this.data.currentTab);
  console.log(e.target.dataset.current);
  if( this.data.currentTab == e.target.dataset.current ) {  
      console.log("yi");
   return false;  
  } else {  
      console.log("er");
    //   that.gotest1();
   that.setData( {  
    currentTab: e.target.dataset.current  
   })  
  }   
 }, 
 /** 
 * 点击分享 
 */ 
 onShareAppMessage: function () { 
  return { 
   title: '装逼小程序', 
   path: '/page/user?id=123' 
  } 
 } ,
 gotest1() {
    //详情页面位非tabbar页面
    console.log("点击跳转1");
    wx.navigateTo({
      url: '../classify/classify'
    })
  },
})