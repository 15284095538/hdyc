var url = getApp().globalData.publicUrl;

var WxParse = require('../../../../wxParse/wxParse.js');
Page({
  data: {
    
  },
  onLoad(e){
    this.setData({ goods_id: e.goods_id })
    this.getdata();
  },
  getdata(e) {//获取数据
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取分类
      url: url + 'goods/goods_details',
      method: 'POST',
      data: {
        goods_id: this.data.goods_id,
        level: wx.getStorageSync('userinfo').level,
        openid: wx.getStorageSync('userinfo').openid
      },
      success: function (res) {
        wx.hideToast();
        WxParse.wxParse('article', 'html', res.data.data.g_details, that, 0);
        that.setData({ data: res.data.data })
      }
    })
  }
})