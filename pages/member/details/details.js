var url = getApp().globalData.publicUrl;

var WxParse = require('../../../wxParse/wxParse.js');

Page({
  data: {
    adList:[],
  },
  onLoad: function (options) {
    this.setData({
      type: options.type,
      surplus_num: options.surplus_num,
      is_vip: options.is_vip
    })
    WxParse.wxParse('article', 'html', options.content, this, 0);
  },
  menberBtn(){
    wx.redirectTo({
      url: '/pages/member/details/Receive?surplus_num=' + this.data.surplus_num,
    })
  }
})