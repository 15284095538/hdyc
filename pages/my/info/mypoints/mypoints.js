var url = getApp().globalData.publicUrl;


Page({
  data: {
    points:[],
    head:'',
    num:'',
  },
  onLoad: function (options) {
    this.getdata();
  },
  listClick(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/my/info/integral/list/list?id=' + id
    })
  },
  getdata(e) {//获取数据
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//列表
      url: url + 'goods/integralMenu',
      data: {
        type: 0
      },
      method: 'POST',
      success: function (res) {
        wx.hideToast();
        that.setData({
          points: res.data.data,
          userinfo: wx.getStorageSync('userinfo')
        })
      }
    })
  }
})