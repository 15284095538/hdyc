
var util = require('../../../utils/util');

var url = getApp().globalData.publicUrl;
Page({
  data: {
    menberData:[],
    activeData:[],
    menberBtnClick:false,
    priceindex:0,
    parameter:{
      id:0,
      vip_id:0,
      price:0,
    }
  },
  onShow(){
    this.getdata()
  },
  getdata(e) {//获取数据
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取会员
      url: url + 'vip/index',
      data: {
        'openid': wx.getStorageSync('userinfo').openid,
      },
      method: 'POST',
      success: function (res) {
        wx.hideToast();
        res.data.data.forEach( res => {
          if (res.vip_end_time == 0 ){
            res.time = false
          }else{
            res.time = util.formatTime(res.vip_end_time, 'Y-M-D')
          }
          
        });
        that.setData({
          menberData: res.data.data,
          activeData: res.data.data[0],
          ['parameter.id']: res.data.data[0].price[0].id,
          ['parameter.vip_id']: res.data.data[0].price[0].vip_id,
          ['parameter.price']: res.data.data[0].price[0].money,
          menberBtnClick:false
        })
      }
    })
  },
  swiperChang(e){
    this.setData({
      activeData: this.data.menberData[e.detail.current],
      ['parameter.id']: this.data.menberData[e.detail.current].price[0].id,
      ['parameter.vip_id']: this.data.menberData[e.detail.current].price[0].vip_id,
      ['parameter.price']: this.data.menberData[e.detail.current].price[0].money,
      priceindex:0,
    })
  },
  menberBtnClick(e){
    for (var i = 0; i < this.data.menberData.length; i++) {
      if (this.data.menberData[i].is_vip == 1) {
        wx.showToast({
          title: '已经是会员',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        return false
      }
    }
    this.setData({ 
      menberBtnClick: true
    })
  },
  timeClick(e){
    console.log( e )
    this.setData({
      priceindex: e.currentTarget.dataset.index,
      ['parameter.id']: e.currentTarget.dataset.id,
      ['parameter.vip_id']: e.currentTarget.dataset.vip_id,
      ['parameter.price']: e.currentTarget.dataset.price,
    })
  },
  layerMenberBoxClick(e){
    this.setData({
      menberBtnClick: true
    })
  },
  layerMenberClick(e){
    if (this.data.menberBtnClick ){
      this.setData({
        menberBtnClick: false
      })
    }
  },
  pay(){
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取爱车信息
      url: url + 'order/vipOrder',
      data: {
        openid: wx.getStorageSync('userinfo').openid,
        price_id: this.data.parameter.id
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
              mask: true,
              success: function () {
                that.getdata();
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
                that.getdata();
              }
            })
          }
        })

      }
    })
  },
  equityClick(e){
    let content = e.currentTarget.dataset.content;
    let type = e.currentTarget.dataset.type;
    let is_vip = e.currentTarget.dataset.is_vip;
    let surplus_num = e.currentTarget.dataset.surplus_num;

    wx.navigateTo({
      url: '/pages/member/details/details?content=' + content + '&type=' + type + '&surplus_num=' + surplus_num + '&is_vip=' + is_vip,
    })
  }
});