var url = getApp().globalData.publicUrl;

Page({
  data: {
    winHeight: '',
    goods_id: '',
    goods_type: '',
    store_id: '',
    value_id: '',
    orderdata: [],
    classify: '',
    spDisplay: 'none',
    couponDisplyClick: "none",
    couponindex: 0,
    num: '',
    paycoupon: {
      id: '',
      cost: ''
    },
    phone: '',
    name: '',
    address_id: ''
  },
  onLoad(e) {
    console.log(e)
    var that = this;
    if (!e.name) {
      e.name = ''
    }
    if (!e.phone) {
      e.phone = ''
    }
    if (!e.address_id) {
      e.address_id = ''
    }
    if (!e.classify) {
      e.classify = ''
    }
    that.setData({
      goods_id: e.goods_id,
      goods_type: e.goods_type,
      store_id: e.store_id,
      value_id: e.value_id,
      num: e.num,
      classify: e.classify,
      name: e.name,
      phone: e.phone,
      address_id: e.address_id
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight: res.windowHeight
        })
      }
    })
    this.getdata();
  },
  onShow(e) {
    this.onLoad();
  },
  phoneinput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  nameinput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  spDisplayClick(e) { //商品图片点击
    this.setData({
      spDisplay: 'block'
    })
  },
  spDisplayNclick(e) {
    this.setData({
      spDisplay: 'none'
    })
  },
  couponDisplyClick(e) { //优惠券点击
    if (this.data.orderdata.coupon.length > 0) {
      this.setData({
        couponDisplyClick: 'block'
      })
    }
  },
  couponDisplyNClick(e) {
    this.setData({
      couponDisplyClick: 'none'
    })
  },
  shdiz(e) {
    wx.redirectTo({
      url: '/pages/my/info/receivingaddress/home/index?goods_id=' + this.data.goods_id + '&goods_type=' + this.data.goods_type + '&store_id=' + this.data.store_id + '&value_id=' + this.data.value_id + '&classify=' + this.data.classify + '&num=' + this.data.num + '&name=' + this.data.name + '&phone=' + this.data.phone
    })
  },
  couponliClick(e) { //优惠券列表点击
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
  storeId(e) {
    wx.redirectTo({
      url: '/pages/orderStore/orderStore?goods_id=' + this.data.goods_id + '&goods_type=' + this.data.goods_type + '&store_id=' + this.data.store_id + '&value_id=' + this.data.value_id + '&classify=' + this.data.classify + '&num=' + this.data.num + '&name=' + this.data.name + '&phone=' + this.data.phone
    })
  },
  pay(e) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (this.data.goods_type == 1) {
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
    } else if (this.data.orderdata.address_info.area == '') {
      wx.showToast({
        title: '请选择收货地址',
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
    wx.request({ //获取分类
      url: url + 'order/addOrder',
      data: {
        goods_id: this.data.goods_id,
        goods_type: this.data.goods_type,
        store_id: this.data.store_id,
        value_id: this.data.value_id,
        goods_number: this.data.num,
        linkman: this.data.name,
        phone: this.data.phone,
        openid: wx.getStorageSync('userinfo').openid,
        coupon_id: this.data.paycoupon.id,
        address_id: this.data.address_id,
      },
      method: 'POST',
      success: function(res) {
        wx.hideToast();
        console.log( res )
        if (res.data.code == 400) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1000,
            mask: true
          })
        } else {
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
                success: function () {
                  setTimeout(function () {
                    wx.switchTab({
                      url: '/pages/my/home/index'
                    })
                  }, 500);
                }
              })
            },
            'fail': function (res) {
              wx.showToast({
                title: '支付失败',
                icon: 'success',
                duration: 500,
                mask: true,
                success: function () {
                  setTimeout(function () {
                    wx.switchTab({
                      url: '/pages/my/home/index'
                    })
                  }, 500);
                }
              })
            }
          })
        }
      }
    })
  },
  getdata(e) { //获取数据
    var that = this;
    var spprice = 0;
    var paycouponid, paycouponcost;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({ //获取分类
      url: url + 'order/order',
      data: {
        goods_id: this.data.goods_id,
        goods_type: this.data.goods_type,
        store_id: this.data.store_id,
        value_id: this.data.value_id,
        number: this.data.num,
        openid: wx.getStorageSync('userinfo').openid,
        to: wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude'),
        level: wx.getStorageSync('userinfo').level,
        address_id: this.data.address_id
      },
      method: 'POST',
      success: function(res) {
        if (res.data.code == 200) {
          if (res.data.data.coupon.length > 0) { //判断优惠券是否
            paycouponid = res.data.data.coupon[0].id;
            paycouponcost = res.data.data.coupon[0].cost;
          } else {
            paycouponid = ''
            paycouponcost = ''
          }
          that.setData({
            orderdata: res.data.data,
            ['paycoupon.id']: paycouponid,
            ['paycoupon.cost']: paycouponcost,
            name: res.data.data.user.name,
            phone: res.data.data.user.cellphone
          })
          wx.hideToast();
        }
      }
    })
  }
})