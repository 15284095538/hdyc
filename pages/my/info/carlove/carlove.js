var url = getApp().globalData.publicUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    cars:[
      {
        'name':'一汽大众奥迪',
        'kuan':'1996款 2.4L 手动',
        'img':'/images/car_03.png',
        'mr':1
      },
      {
        'name': '一汽大众奥迪2',
        'img': '/images/car_03.png',
        'kuan': '1996款 2.4L 手动',
        'mr': 0
      },
      {
        'name': '一汽大众奥迪3',
        'img': '/images/car_03.png',
        'kuan': '1996款 2.4L 手动',
        'mr': 0
      }
      , {
        'name': '一汽大众奥迪4',
        'kuan': '1996款 2.4L 手动',
        'img':'/images/car_03.png',
        'mr': 0
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getdata();
  },
  getdata(e) {//获取数据
    var that = this;
    var value = wx.getStorageSync('userinfo');
    wx.request({//获取爱车信息
      url: url + 'user/myCar',
      data: {
        'openid': value.openid, 
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          ['cars']: res.data.data
        })
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