var url = getApp().globalData.publicUrl;

Page({
  data: {
    pay:{
      mend:'',
      price:'',
      goods_id: '',
      store_id: '',
    },
    phone:'',
    name:'',
  },
  onLoad: function (options) {
    this.setData({
      ['pay.mend']: options.mend,
      ['pay.price']: options.price,
      ['pay.goods_id']: options.goods_id,
      ['pay.store_id']: options.store_id,
    })
  },
  phoneinput(e){
    this.setData({ phone: e.detail.value })
  },
  nameinput(e){
    this.setData({ name: e.detail.value })
  },
  pay(e){
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (this.data.phone.length < 11 && this.data.phone.length ){
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'success',
        duration: 500,
        mask: true
      })
    }
    if (!myreg.test(this.data.phone) ){
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'success',
        duration: 500,
        mask: true
      })
    }
    if (!this.data.name ){
      wx.showToast({
        title: '请输入联系人',
        icon: 'success',
        duration: 500,
        mask: true
      })
    }
    var that = this;
    wx.request({//获取内容
      url: url + 'order/addOrder',
      data: {
        openid: wx.getStorageSync('userinfo').openid,
        goods_type:1,
        store_id: this.data.pay.store_id,
        goods_id: this.data.pay.goods_id,
        phone: this.data.phone,
        linkman: this.data.name,
      },
      method: 'POST',
      success: res => {
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
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

  }
})