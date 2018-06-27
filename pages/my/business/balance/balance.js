// pages/my/business/balance/balance.js
Page({
  data: {
    "allnumber": 89102.60,
    "number": 16,
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '当前余额'
    })
  },
  onReady: function () {
  
  }
})