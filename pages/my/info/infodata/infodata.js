// pages/my/info/infodata/infodata.js
var url = getApp().globalData.publicUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
        user:{
        },
        gettel:false,
        name:'',
        tel:'',
  },
  searchBox: function (e) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (this.data.tel.length < 11 && this.data.tel.length){
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return false;
    }
    if (!myreg.test(this.data.tel)) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none',
        duration: 500,
        mask: true
      })
      return false
    }
    if (this.data.name==""){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return false;
    }
    if (this.data.name.length>10) {
      wx.showToast({
        title: '姓名不能超过10位',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return false;
    }
    var that = this;
    wx.showToast({
      title: '提交中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//修改个人信息
      url: url + 'User/editMyData',
      data: {
        openid: wx.getStorageSync('userinfo').openid,
        phone: this.data.tel,
        name: this.data.name,
      },
      method: 'POST',
      success: function (res) {
        wx.hideToast();
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 500,
          mask: true
        })
        wx.switchTab({
          url: '/pages/my/home/index'
        })
      }
    })
  },
  ques:function(e){
    wx.showToast({
      title: '不能修改哦',
      icon: 'none',
      duration: 1000,
      mask: true
    })
  },
  voteTitle: function (e) {
    this.data.name = e.detail.value;
  },
  voteTitle1: function (e) {
    this.data.tel = e.detail.value;
  },
  radioChange: function (e) {
    this.data.sex = e.detail.value;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata();
  },
  getPhoneNumber(e){
    console.log( e )
    if (e.detail.errMsg == 'getPhoneNumber:ok' ){
      wx.login({
        success: res => {
          var code = res.code;
          console.log( code )
          wx.request({
            url: url + 'user/bandWx',
            method: 'post',
            data: {
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
              code: code,
              openid: wx.getStorageSync('userinfo').openid,
            },
            success: function (data) {
              that.getdata();
            }
          })
        }
      })
    }
  },
  getdata(e) {//获取数据
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取个人信息
      url: url + 'user/myData',
      data: {
        openid: wx.getStorageSync('userinfo').openid  
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          ['user']: res.data.data,
          ['name']: res.data.data.name,
          ['tel']: res.data.data.cellphone
        })
        if ( res.data.data.cellphone == ''  ){
          that.setData({
            gettel:true
          })
        }
        wx.hideToast();
      }
    })
  },
})