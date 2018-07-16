// pages/my/info/order/myorder/myorder.js
var url = getApp().globalData.publicUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    navbar: ["全部", "代付款", "待安装","待评价","退换货"],
    currentIndex: 0,//tabbar索引
    carts:[
      
    ]
  },
  navbarTab: function (e) {
    if (e.currentTarget.dataset.index == 0) {
      var that = this;
      var value = wx.getStorageSync('userinfo');
      wx.request({//获取全部
        url: url + 'user/myOrderList',
        data: {
          // 'openid': value.openid,
          'openid': 'oY8zl5VzLFNYkfTTLBqDceqhvgtk',
          'status': '10',
        },
        method: 'POST',
        success: function (res) {
          that.setData({
            ['carts']: res.data.data,
            currentIndex: e.currentTarget.dataset.index,
          })
        }
      })
    }
    if (e.currentTarget.dataset.index == 1) {
      var that = this;
      var value = wx.getStorageSync('userinfo');
      wx.request({//获取待付款
        url: url + 'user/myOrderList',
        data: {
          // 'openid': value.openid,
          'openid': 'oY8zl5VzLFNYkfTTLBqDceqhvgtk',
          'status': '0',
        },
        method: 'POST',
        success: function (res) {
          that.setData({
            ['carts']: res.data.data,
            currentIndex: e.currentTarget.dataset.index,
          })
        }
      })
    }
    if (e.currentTarget.dataset.index == 2) {
      var that = this;
      var value = wx.getStorageSync('userinfo');
      wx.request({//获取待安装
        url: url + 'user/myOrderList',
        data: {
          // 'openid': value.openid,
          'openid': 'oY8zl5VzLFNYkfTTLBqDceqhvgtk',
          'status': '1',
        },
        method: 'POST',
        success: function (res) {
          that.setData({
            ['carts']: res.data.data,
            currentIndex: e.currentTarget.dataset.index,
          })
        }
      })
    }
    if (e.currentTarget.dataset.index == 3) {
      var that = this;
      var value = wx.getStorageSync('userinfo');
      wx.request({//获取待评价
        url: url + 'user/myOrderList',
        data: {
          // 'openid': value.openid,
          'openid': 'oY8zl5VzLFNYkfTTLBqDceqhvgtk',
          'status': '2',
        },
        method: 'POST',
        success: function (res) {
          that.setData({
            ['carts']: res.data.data,
            currentIndex: e.currentTarget.dataset.index,
          })
        }
      })
    }
    if (e.currentTarget.dataset.index == 4) {
      var that = this;
      var value = wx.getStorageSync('userinfo');
      wx.request({//获取退换货
        url: url + 'user/myOrderList',
        data: {
          // 'openid': value.openid,
          'openid': 'oY8zl5VzLFNYkfTTLBqDceqhvgtk',
          'status': '3',
        },
        method: 'POST',
        success: function (res) {
          that.setData({
            ['carts']: res.data.data,
            currentIndex: e.currentTarget.dataset.index,
          })
        }
      })
    }
  },
  qxdd:function(e){
   console.log('fafaf');
  },
  sqsh: function (e) {
    console.log('sqsh');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata(options.id);
    console.log(options);
    this.setData({
      ['currentIndex']: options.id,
    })
  },
  getdata(e) {//获取数据
  console.log(e);
    var that = this;
    var value = wx.getStorageSync('userinfo');
    wx.request({//获取爱车信息
      url: url + 'user/myOrderList',
      data: {
        // 'openid': value.openid,
        'openid':'oY8zl5VzLFNYkfTTLBqDceqhvgtk',
        'status': e, 
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          ['carts']: res.data.data
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