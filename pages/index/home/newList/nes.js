var url = getApp().globalData.publicUrl;

var WxParse = require('../../../../wxParse/wxParse.js');

Page({
  data: {
    id:''
  },
  onLoad: function (options) {
    this.setData({ id: options.id });
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
      url: url + 'home/articlesInfo',
      method: 'POST',
      data: {
        id: this.data.id,
      },
      success: function (res) {
        wx.hideToast();
        WxParse.wxParse('article', 'html', res.data.data.content, that, 0);
        that.setData({ data: res.data.data })
      }
    })
  }
})