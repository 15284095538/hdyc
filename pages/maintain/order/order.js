var url = getApp().globalData.publicUrl;
Page({
  data: {
    getBespokeTimePoint: [],
    changeTimeYear: '请选择日期',
    changeTimeTime: '请选择时间',
    payFlg: false,
    nowDate: '',
  },
  onShow(){
    if (this.data.store_id){
      this.getTime();
    }
    
  },
  onLoad(options) {

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

    var that = this;
    var goodsImgArr = JSON.parse(options.goodsImgArr);
    var goodsIdArr = options.goodsIdArr;
    var goodsNumArr = options.goodsNumArr;
    var num = JSON.parse(goodsNumArr).length;
    var cellphone = options.cellphone;
    var name = options.name;
    var allprice = options.allprice;
    var jsonStr = options.jsonStr;
    that.setData({
      cellphone,
      name,
      goodsImgArr,
      goodsIdArr,
      goodsNumArr,
      allprice,
      num,
      jsonStr,
      nowDate: nowDate
    })
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({ openid: res.data.openid })
      }
    })
    
  },
  bindPickerdate(e) {//日期
    if (!this.data.store_id) {
      wx.showToast({
        title: '请选择门店',
        icon: 'none',
        duration: 500,
        mask: true
      })
      return false
    }
    let changeTimeYear = e.detail.value;
    this.setData({
      changeTimeYear: changeTimeYear
    })
    if (this.data.changeTimeTime !== '请选择时间') {
      this.getgetBespokeNums();
    }
  },
  bindPickerselector(e) {//时间
    if (!this.data.store_id) {
      wx.showToast({
        title: '请选择门店',
        icon: 'none',
        duration: 500,
        mask: true
      })
      return false
    }
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
        store_id: this.data.store_id,
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
  goaddress(e){
    wx.navigateTo({
      url: '/pages/maintain/address/address'
    })
  },
  gobuy(e){
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

    if (!this.data.store_id){
      wx.showToast({
        icon:'none',
        title: '请选择配送地址',
      })
    }else{
      var goodsid = JSON.parse(this.data.goodsIdArr);
      var goodsNum = JSON.parse(this.data.goodsNumArr);
      var goods_id = goodsid.join(",");
      var goods_number = goodsNum.join(",");
      this.request(true, 'order/addOrder', {
        openid: this.data.openid,
        goods_type: 3,
        store_id: this.data.store_id,
        linkman: this.data.name,
        phone: this.data.cellphone,
        goods_id: goods_id,
        coupon_id: '',
        goods_number: goods_number,
        value_id: '',
        jsonStr: this.data.jsonStr,
        bespoke_time: this.data.changeTimeYear + ' ' + this.data.changeTimeTime + '',
      },
        'POST', res => {
          //console.log(res);
          wx.requestPayment({
            timeStamp: res.timeStamp,
            nonceStr: res.nonceStr,
            package: res.package,
            signType: res.signType,
            paySign: res.paySign,
            success: function (res) {
              wx.showToast({
                title: '支付成功',
                duration: 1200
              })
              console.log(res);
            },
            fail: function (res) {
              if (res.errMsg == "requestPayment:fail cancel") {
                wx.showToast({
                  title: '支付取消',
                  duration: 1200
                })
              } else {
                wx.showToast({
                  title: '支付失败',
                  duration: 1200
                })
              }
            },
            complete: function (res) {
              console.log("complete");
              console.log(res)
            }
          })
        });
    }
    

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

