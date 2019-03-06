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
    address_id: '',
    getBespokeTimePoint: [],
    changeTimeYear:'请选择日期',
    changeTimeTime:'请选择时间',
    payFlg:true,
    nowDate:'',
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

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var nowDate = year + "-" + month + "-" + day;

    that.setData({
      goods_id: e.goods_id,
      goods_type: e.goods_type,
      store_id: e.store_id,
      value_id: e.value_id,
      num: e.num,
      classify: e.classify,
      name: e.name,
      phone: e.phone,
      address_id: e.address_id,
      nowDate: nowDate,
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight: res.windowHeight
        })
      }
    })
    this.getdata();
    if ( this.data.store_id ){
      this.getTime();
      this.data.payFlg = false
    }
  },
  onShow(e) {
    this.onLoad();
  },
  bindPickerdate(e){//日期
    let changeTimeYear = e.detail.value;
    this.setData({
      changeTimeYear: changeTimeYear
    })
    if (this.data.changeTimeTime !== '请选择时间') {
      this.getgetBespokeNums();
    }
  },
  bindPickerselector(e){//时间
    console.log( e )
    let changeTimeTime = this.data.getBespokeTimePoint[e.detail.value];
    this.setData({
      changeTimeTime: changeTimeTime
    })
    if (this.data.changeTimeYear !== '请选择日期' ){
      this.getgetBespokeNums();
    }
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
      if (this.data.changeTimeYear == '请选择日期' ){
        wx.showToast({
          title: '请选择日期',
          icon: 'none',
          duration: 500,
          mask: true
        })
        return false
      }
      if (this.data.changeTimeTime == '请选择时间') {
        wx.showToast({
          title: '请选择时间',
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
    if ( !this.data.payFlg ){
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
        bespoke_time: this.data.changeTimeYear + ' ' + this.data.changeTimeTime + '',
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
    var num = 0;
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

          if (that.data.goods_type == 1 ){
            num = (Number(res.data.data.vip_discount) + Number(res.data.data.store.service_price) - Number(paycouponcost)).toFixed(1);
          }else{
            num = (Number(res.data.data.vip_discount) + Number(res.data.data.count_exp) - Number(paycouponcost)).toFixed(1);
          }

          if( num < 0 ){
            num = 0.01;
          }

          that.setData({
            orderdata: res.data.data,
            ['paycoupon.id']: paycouponid,
            ['paycoupon.cost']: paycouponcost,
            name: res.data.data.user.name,
            phone: res.data.data.user.cellphone,
            numSS: num
          })
          wx.hideToast();
        }
      }
    })
  },
  getTime(e){ //预约时间
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({ //获取分类
      url: url + 'order/getBespokeTimePoint',
      data: {
        store_id: this.data.store_id,
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            getBespokeTimePoint: res.data.data.arr
          })
        }
        wx.hideToast();
      }
    })
  },
  getgetBespokeNums(e){ //预约次数
    var that = this;
    var payFlg = false;
    var changeTimeYear = '请选择日期';
    var changeTimeTime = '请选择时间';
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })

    var date = this.data.changeTimeYear + ' ' + this.data.changeTimeTime + '',
    date = date.substring(0, 19);
    date = date.replace(/-/g, '/');
    var timestamp1 = new Date(date).getTime(); //选择时间戳

    var timestamp2 = Date.parse(new Date()); //当前时间戳

    if ( timestamp2 > timestamp1 ){
      wx.showToast({
        title: '请选择之后时间',
        icon: 'none',
        duration: 500,
        mask: true
      })
      this.setData({
        payFlg: false
      })
      return false
    }
    wx.request({ //获取分类
      url: url + 'order/getBespokeNums',
      data: {
        store_id: this.data.store_id,
        time: this.data.changeTimeYear + ' ' + this.data.changeTimeTime + '',
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          if (res.data.data.nu > 0 ){
            payFlg = true;
            changeTimeYear = that.data.changeTimeYear;
            changeTimeTime = that.data.changeTimeTime;
          }else{
            payFlg = false;
            changeTimeYear = '请选择日期';
            changeTimeTime = '请选择时间';
            wx.showToast({
              title: '预约次数满',
              icon: 'none',
              duration: 500,
              mask: true
            })
          }
          that.setData({
            payFlg: payFlg,
            changeTimeYear: changeTimeYear,
            changeTimeTime: changeTimeTime
          })
        }
        wx.hideToast();
      }
    })
  }
})