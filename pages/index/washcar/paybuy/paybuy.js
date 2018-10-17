var url = getApp().globalData.publicUrl;

Page({
  data: {
    pay:{
      mend:'',
      price:'',
      goods_id: '',
      store_id: '',
      value_id:'',
    },
    phone:'',
    name:'',
  },
  onLoad: function (options) {
    console.log( options )
    this.setData({
      ['pay.mend']: options.mend,
      ['pay.price']: options.price,
      ['pay.goods_id']: options.goods_id,
      ['pay.store_id']: options.store_id,
      ['pay.value_id']: options.value_id
    });
    this.getdata();
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
        icon: 'none',
        duration: 500,
        mask: true
      })
      return false
    }
    if (!myreg.test(this.data.phone) ){
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none',
        duration: 500,
        mask: true
      })
      return false
    }
    if (!this.data.name ){
      wx.showToast({
        title: '请输入联系人',
        icon: 'none',
        duration: 500,
        mask: true
      })
      return false
    }
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55500,
      mask: true
    })
    var that = this;
    wx.request({//获取内容
      url: url + 'order/addOrder',
      data: {
        openid: wx.getStorageSync('userinfo').openid,
        goods_type:2,
        store_id: this.data.pay.store_id,
        goods_id: this.data.pay.goods_id,
        phone: this.data.phone,
        linkman: this.data.name,
        value_id: this.data.pay.value_id
      },
      method: 'POST',
      success: res => {
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
              mask: true,
              success: function(){
                wx.switchTab({
                  url: '/pages/my/home/index'
                })
              }
            })
          },
          'fail': function (res) {
            wx.showToast({
              title: '支付失败',
              icon: 'success',
              duration: 500,
              mask: true,
              success: function(){
                wx.switchTab({
                  url: '/pages/my/home/index'
                })
              }
            })
          }
        })
      }
    })

  },
  getdata(e) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取内容
      url: url + 'user/userInfo',
      data: {
        openid: wx.getStorageSync('userinfo').openid,
      },
      method: 'POST',
      success: res => {
        that.setData({
          name: res.data.data.name,
          phone: res.data.data.cellphone,
        })
        wx.hideToast();
      }
    })
  },
})