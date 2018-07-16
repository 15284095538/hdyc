// pages/my/info/receivingaddress/home/index.js
var url = getApp().globalData.publicUrl;
Page({
  data: {
    list: []
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '收货地址'
    });
    this.getdata();
  },
  getdata() { //获取地址
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    });
    var that = this;
    var address = '';
    if (wx.getStorageSync('address_component')) {
      address = wx.getStorageSync('address_component').city
    }
    wx.request({ //获取内容
      url: url + 'User/myAddress',
      method: 'POST',
      data: {
        openid: wx.getStorageSync('userinfo').openid
      },
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            list: res.data.data
          });
        }
        wx.hideToast();
      }
    })
  },
  Default(e) { //设为默认
    var id = e.currentTarget.dataset.id
    console.log(id);
  },
  Change(e) { //修改地址
    var id = e.currentTarget.dataset.id
  },
  Delete(e) { //删除地址
    var id = e.currentTarget.dataset.id
  }
})