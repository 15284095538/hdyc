// pages/my/info/receivingaddress/home/index.js
var url = getApp().globalData.publicUrl;
Page({
  data: {
    list: [],
  },
  onLoad(e){
    this.setData({
      surplus_num: e.surplus_num
    })
  },
  onShow: function () {
    this.getdata();
  },  
  getdata() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    });
    var that = this;
    wx.request({ //获取内容
      url: url + 'User/myAddress',
      method: 'POST',
      data: {
        openid: wx.getStorageSync('userinfo').openid
      },
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            list: res.data.data
          });
        }
        wx.hideToast();
      }
    })
  },
  Default(e) { //设为默认
    var that = this;
    wx.showToast({
      title: '设置中',
      icon: 'loading',
      duration: 55000,
      mask: true
    });
    var id = e.currentTarget.dataset.id
    wx.request({ //获取内容
      url: url + 'User/setDefault',
      method: 'POST',
      data: {
        openid: wx.getStorageSync('userinfo').openid,
        id: id
      },
      success: res => {
        if (res.data.code == 200) {
          that.getdata()
        }
        wx.hideToast();
      }
    })
  },
  Change(e) { //修改地址
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/my/info/receivingaddress/edit/edit?id=' + id + ''
    })
  },
  Delete(e) { //删除地址
    var that = this;
    var id = e.currentTarget.dataset.id
    wx.showModal({
      content: "请确认是否删除该收货地址？",
      confirmText: "确定",
      cancelText: "取消",
      mask: true,
      success: function (res) {
        if (res.confirm) { //确认
          wx.showToast({
            title: '请稍后',
            icon: 'loading',
            duration: 55000,
            mask: true
          });
          var id = e.currentTarget.dataset.id
          wx.request({ //获取内容
            url: url + 'User/delAddress',
            method: 'POST',
            data: {
              openid: wx.getStorageSync('userinfo').openid,
              id: id
            },
            success: res => {
              if (res.data.code == 200) {
                that.getdata()
              }
              wx.hideToast();
            }
          })
        } else if (res.cancel) { //取消
        }
      }
    })
  },
  Add() {
    wx.navigateTo({
      url: '/pages/my/info/receivingaddress/details/details'
    })
  },
  info(e){
    console.log( e )
    var index = e.currentTarget.dataset.index;
    var realname = this.data.list[index].realname;
    var phone = this.data.list[index].phone;
    var area = this.data.list[index].area;
    var id = this.data.list[index].id;
    wx.redirectTo({
      url: '/pages/member/details/Receive?id=' + id + '&realname=' + realname + '&phone=' + phone + '&area=' + area + '&surplus_num=' + this.data.surplus_num,
    })
  }
})