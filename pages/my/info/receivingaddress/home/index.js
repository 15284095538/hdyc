// pages/my/info/receivingaddress/home/index.js
var url = getApp().globalData.publicUrl;
Page({
  data: {
    list: [],
    list: [],
    classify: '',
    goods_id: '',
    goods_type: '',
    store_id: '',
    value_id: '',
    num: '',

    store_id: '',
    count_board: '',
    count_price: '',
    class_id: '',
    price: '',
    text: '',
    phone: '',
    name: '',
  },
  onLoad: function (e) {
    if (!e.name) { e.name = '' }
    if (!e.phone) { e.phone = '' }
    this.setData({
      goods_id: e.goods_id,
      goods_type: e.goods_type,
      store_id: e.store_id,
      value_id: e.value_id,
      classify: e.classify,
      num: e.num,
      phone: e.phone,
      name: e.name,
    })
    this.getdata();
  },
  onShow: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    });
    var that = this;
    var address = '';
    if (wx.getStorageSync('address_component')) {
      address = wx.getStorageSync('address_component').city
    }
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
  info(e){
    var address_id = e.currentTarget.dataset.addressid;
    if (this.data.goods_type == 0 ){
      wx.redirectTo({
        url: '/pages/orderPay/orderPay?goods_id=' + this.data.goods_id + '&goods_type=' + this.data.goods_type + '&store_id=' + this.data.store_id + '&value_id=' + this.data.value_id + '&classify=' + this.data.classify + '&num=' + this.data.num + '&name=' + this.data.name + '&phone=' + this.data.phone + '&address_id=' + address_id
      })
    }
  },
  getdata() { //获取地址
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    });
    var that = this;
    var address = '';
    if (wx.getStorageSync('address_component')) {
      address = wx.getStorageSync('address_component').city
    }
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
      url: '/pages/my/info/receivingaddress/edit/edit?id=' + id +''
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
  Add(){
    wx.navigateTo({
      url: '/pages/my/info/receivingaddress/details/details'
    })
  }
})