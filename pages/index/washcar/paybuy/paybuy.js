var url = getApp().globalData.publicUrl;

Page({
  data: {
    pay:{
      mend:'',
      price:'',
      goods_id: '',
      store_id: '',
      value_id:''
    },
    phone:'',
    name:'',
    getBespokeTimePoint: [],
    changeTimeYear: '请选择日期',
    changeTimeTime: '请选择时间',
    payFlg: false,
    nowDate: '',
  },
  onLoad: function (options) {
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
    this.setData({
      ['pay.mend']: options.mend,
      ['pay.price']: options.price,
      ['pay.goods_id']: options.goods_id,
      ['pay.store_id']: options.store_id,
      ['pay.value_id']: options.value_id,
      nowDate: nowDate,
    });
    this.getdata();
    this.getTime();
  },
  bindPickerdate(e) {//日期
    let changeTimeYear = e.detail.value;
    this.setData({
      changeTimeYear: changeTimeYear
    })
    if (this.data.changeTimeTime !== '请选择时间') {
      this.getgetBespokeNums();
    }
  },
  bindPickerselector(e) {//时间
    let changeTimeTime = this.data.getBespokeTimePoint[e.detail.value];
    this.setData({
      changeTimeTime: changeTimeTime
    })
    if (this.data.changeTimeYear !== '请选择日期') {
      this.getgetBespokeNums();
    }
  },
  getTime(e) { //预约时间
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
        store_id: this.data.pay.store_id,
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
  getgetBespokeNums(e) { //预约次数
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

    if (timestamp2 > timestamp1) {
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
        store_id: this.data.pay.store_id,
        time: this.data.changeTimeYear + ' ' + this.data.changeTimeTime + '',
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          if (res.data.data.nu > 0) {
            payFlg = true;
            changeTimeYear = that.data.changeTimeYear;
            changeTimeTime = that.data.changeTimeTime;
          } else {
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
    if (this.data.changeTimeYear == '请选择日期') {
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
    if (!this.data.payFlg) {
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
        value_id: this.data.pay.value_id,
        bespoke_time: this.data.changeTimeYear + ' ' + this.data.changeTimeTime + '',
      },
      method: 'POST',
      success: res => {
        wx.hideToast();
        if( res.data.code == 400 ){
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1000,
            mask: true
          })
        }else{
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