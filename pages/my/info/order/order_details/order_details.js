// pages/my/info/order/order_derails/order_details.js
var url = getApp().globalData.publicUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:3,
    // loadCity: '',
    id:'',
    carts: [
      {
        pic: "/images/car_03.png",
        name: "3M高效发动机内部清洗剂296ML ",
        price: 200.08,
        yishou: 333,
        pinglun: 1,
        isSelect: false,
      },
      {
        pic: '/images/car_03.png',
        name: "3M高效发动机内部清洗剂296ML ",
        price: 340.09,
        yishou: 365,
        pinglun: 2,
        isSelect: false,
      },
      {
        pic: '/images/car_03.png',
        name: "3M高效发动机内部清洗剂296ML ",
        price: 390.09,
        yishou: 365,
        pinglun: 3,
        isSelect: false,
      },
    ],
  },
  Navigation(e) {
    var longitude = Number(e.currentTarget.dataset.longitude);
    var latitude = Number(e.currentTarget.dataset.latitude);
    console.log(longitude, latitude);
    wx.openLocation({
      latitude: Number(longitude),
      longitude: Number(latitude),
      name: this.data.carts.store.address,
      scale: 30
    })

  },
  gittel:function(e){
    console.log(e);
  },
  ljfk: function (e) {//立即支付
    var order_sn = e.currentTarget.id;
    var value = wx.getStorageSync('userinfo');
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//立即支付
      url: url + 'order/nowPay',
      data: {
        'openid': value.openid,
        //'openid': 'oY8zl5VzLFNYkfTTLBqDceqhvgtk',
        'order_id': order_sn,
      },
      method: 'POST',
      success: function (res) {
        wx.hideToast();
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 500,
              mask: true
            })
            wx.switchTab({
              url: '/pages/my/home/index'
            })
          },
          'fail': function (res) {
            wx.showToast({
              title: '支付失败',
              icon: 'success',
              duration: 500,
              mask: true
            })
          }
        })
      }
    })
  },
  qxdd: function (e) {//取消订单
    var order_id = e.currentTarget.id;
    var value = wx.getStorageSync('userinfo');
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取订单信息
      url: url + 'order/cancelOrder',
      data: {
        'openid': value.openid,
        //'openid': 'oY8zl5VzLFNYkfTTLBqDceqhvgtk',
        'order_id': order_id,
      },
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 500,
          mask: true
        })
        wx.navigateBack();
      }
    })
  },
  scdd:function(e){
    var order_id = e.currentTarget.id;
    var value = wx.getStorageSync('userinfo');
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//删除订单信息
      url: url + 'order/delOrder',
      data: {
        'openid': value.openid,
        //'openid': 'oY8zl5VzLFNYkfTTLBqDceqhvgtk',
        'order_id': order_id,
      },
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 500,
          mask: true
        })
        wx.navigateBack();
      }
    })
  },

  refund(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '订单申请退款',
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 55000,
            mask: true
          })
          wx.request({//获取订单信息
            url: url + 'order/apply_return',
            data: {
              'order_id': id,
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 1000
              });
              setTimeout(function () {
                that.getdata();
              }, 1000)
            }
          })
        }
      }
    })
  },
  getdata(){
    var that = this;
    var to = wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude');
    wx.request({//获取订单详情
      url: url + 'user/myOrderInfo',
      data: {
        'order_id': this.data.id,
        'to': to,
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          ['carts']: res.data.data,
        })
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    this.getdata();
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