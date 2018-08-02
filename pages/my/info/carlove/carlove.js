var url = getApp().globalData.publicUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IMgFalse: false,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    cars:[],
    swiperindex:0,
  },
  onLoad: function (options) {
     this.getdata();
  },
  detClick(e){
    var id = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/my/info/mycar/infodata/infodata?id=' + id,
    })
  },
  swiperchangge(e){
    this.setData({ swiperindex: e.detail.current })
  },
  getdata(e) {//获取数据
    var that = this;
    var value = wx.getStorageSync('userinfo');
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取爱车信息
      url: url + 'user/myCar',
      data: {
        'openid': value.openid, 
      },
      method: 'POST',
      success: function (res) {
        if (res.data.data == "") {
          that.setData({
            IMgFalse: true,
          })
        } else {
          that.setData({
            IMgFalse: false,
          })
        }
        that.setData({
          ['cars']: res.data.data
        })
        wx.hideToast();
      } 
    })
  },
})