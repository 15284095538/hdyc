var url = getApp().globalData.publicUrl;

Page({
  data: {
    type:'',
  },
  onLoad: function (options) {
    this.setData({ type: options.type })
    this.getdata();
  },
  listClick(e){
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
        type: this.data.type
      },
      method: 'POST',
      success: function (res) {
        wx.hideToast();
        that.setData({
          data: res.data.data
        })
      }
    })
  }
})