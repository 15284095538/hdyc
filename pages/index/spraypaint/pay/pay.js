var url = getApp().globalData.publicUrl;


Page({
  data: {
    class_id:'',
    count_board:'',
    count_price:'',
    price:'',
    store_id:'',
    text:'',
    data:[],
    winHeight:'',
    couponDisplyClick:'none',
    couponindex:0,
    paycoupon: {
      id: '',
      cost: ''
    },
    phone: '',
    name: '',
    paintId:'',
  },
  onLoad(e) {
    var that = this;
    if (!e.name) { e.name = ''; e.phone = '' }
    this.setData({ 
      class_id: e.class_id,
      count_board: e.count_board,
      count_price: e.count_price,
      price: e.price,
      store_id: e.store_id,
      text: e.text,
      phone: e.phone,
      name: e.name,
      paintId: e.paintId
     })
    this.getdata();
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ winHeight: res.windowHeight })
      }
    })
  },
  couponliClick(e) {//优惠券列表点击
    var id = e.currentTarget.dataset.id;
    var cost = e.currentTarget.dataset.cost;
    var index = e.currentTarget.dataset.index;
    this.setData({
      ['paycoupon.id']: id,
      ['paycoupon.cost']: cost,
      couponindex: index
    })
    this.couponDisplyNClick();
  },
  couponDisplyClick(e) {//优惠券点击
    if (this.data.data.coupon.length > 0) {
      this.setData({ couponDisplyClick: 'block' })
    }
  },
  phoneinput(e) {
    this.setData({ phone: e.detail.value })
  },
  nameinput(e) {
    this.setData({ name: e.detail.value })
  },
  pay(e){
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (this.data.phone.length < 11 && this.data.phone.length) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none',
        duration: 500,
        mask: true
      })
      return false
    }
    if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none',
        duration: 500,
        mask: true
      })
      return false
    }
    if (!this.data.name) {
      wx.showToast({
        title: '请输入联系人',
        icon: 'none',
        duration: 500,
        mask: true
      })
      return false
    }
    if (this.data.store_id == '') {
      wx.showToast({
        title: '请选择门店',
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
    wx.request({//获取分类
      url: url + 'order/paintOrder',
      data: {
        store_id: this.data.store_id,
        board: this.data.text,
        linkman: this.data.name,
        phone: this.data.phone,
        openid: wx.getStorageSync('userinfo').openid,
        coupon_id: this.data.paycoupon.id,
        price: this.data.price,
        goods_id: this.data.paintId
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
            wx.switchTab({
              url: '/pages/my/home/index'
            })
          }
        })
      }
    })
  },
  couponDisplyNClick(e) {
    this.setData({ couponDisplyClick: 'none' })
  },
  listClick(e){
    wx.navigateTo({ //查看列表
      url: '/pages/index/spraypaint/servicelist/servicelist?store_id=' + '&&count_board=' + this.data.data.count_board + '&&count_price=' + this.data.data.count_price + '&&class_id=' + this.data.class_id + '&&price=' + this.data.price + '&&text=' + this.data.text + '&&paintId=' + this.data.paintId
    })
  },
  storeClick(e){// 选择门店
    wx.redirectTo({
      url: '/pages/orderStore/orderStore?store_id=' + this.data.store_id + '&&count_board=' + this.data.count_board + '&&count_price=' + this.data.count_price + '&&class_id=' + this.data.class_id + '&&price=' + this.data.price + '&&text=' + this.data.text + '&name=' + this.data.name + '&phone=' + this.data.phone + '&&paintId=' + this.data.paintId
    })
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
          if (res.data.data.coupon != '' ){
            that.setData({
              ['paycoupon.id']: res.data.data.coupon[0].id,
              ['paycoupon.cost']: res.data.data.coupon[0].cost,
            })
          }
          wx.hideToast();
        }
      }
    })
  }
})