// pages/my/info/infodata/infodata.js
var url = getApp().globalData.publicUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
        user:{
          'pic':'/images/car_03.png',
          'zname':'',
          'tel':'13618045260',
          'sex':'女',
          'usname':'阴雨小城',
        }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var value = wx.getStorageSync('userinfo');
    wx.request({//获取爱车信息
      url: url + 'user/myData',
      data: {
        'openid': value.openid
      },
      method: 'POST',
      success: function (res) {
        // that.setData({
        //   ['swiper.imgUrl']: res.data.data
        // })
        console.log(res);
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})