var url = getApp().globalData.publicUrl;
Page({
  data: {
    class_id: '',
    count_board: '',
    count_price: '',
    price: '',
    store_id: '',
    text: '',
    data: [],
    paintId:'',
  },

  onLoad: function (e) {
    this.setData({
      class_id: e.class_id,
      count_board: e.count_board,
      count_price: e.count_price,
      price: e.price,
      store_id: e.store_id,
      text: e.text,
      paintId: e.paintId
    })
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
    wx.request({//获取分类
      url: url + 'paint/paintOrder',
      data: {
        store_id: this.data.store_id,
        board: this.data.text,
        count_price: this.data.count_price,
        price: this.data.price,
        count_board: this.data.count_board,
        openid: wx.getStorageSync('userinfo').openid,
        to: wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude'),
        paintId: this.data.paintId
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            data: res.data.data
          })
          wx.hideToast();
        }
      }
    })
  }
})