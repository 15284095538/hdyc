var url = getApp().globalData.publicUrl;
Page({
  data: {

  },
  onLoad(options) {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({ openid: res.data.openid })
        that.request(true, 'order/selectStore', {
          to: wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude'),
          class_id:7,
          page: 1,
        },
          'POST', res => {
            console.log(res);
            var list = res.data;
            that.setData({
              list
            })
        });
      }
    })

  },
  goback(e){
    var store_id = e.currentTarget.dataset.storeid;
    var store_name = e.currentTarget.dataset.storename;
    var km = e.currentTarget.dataset.km;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      store_id,
      store_name,
      km
    })
    wx.navigateBack({
      delta: 1
    })
  },
  request: function (loading, reurl, params, method, callBack) {
    if (loading == true) {
      wx.showToast({
        title: '加载中...',
        icon: 'loading'
      })
    }
    wx.request({
      url: url + reurl,
      data: params,
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      method: method,
      success: function (res) {
        if (loading == true) {
          wx.hideToast();
        }
        callBack(res.data);
      },
      complete: function () {
        if (loading == true) {
          wx.hideToast();
        }
      }
    })
  }
})

