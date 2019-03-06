var url = getApp().globalData.publicUrl;
Page({
  data: {
    id:'',
    realname:'',
    phone:'',
    area:'',
    surplus_num:''
  },
  onLoad: function (options) {
    this.setData({
      surplus_num: options.surplus_num,
      id: options.id,
      realname: options.realname,
      phone: options.phone,
      area: options.area,
    })
  },
  typeClick(){
    wx.redirectTo({
      url: '/pages/member/details/address?surplus_num=' + this.data.surplus_num,
    })
  },
  menberBtn(){
    if ( !this.data.area ){
      wx.showToast({
        title: '请选择收货地址',
        icon: 'success',
        duration: 500,
        mask: true
      })
      return false
    }


    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取爱车信息
      url: url + 'vip/addEquityAddress',
      data: {
        phone: this.data.phone,
        name: this.data.realname,
        address: this.data.area,
        openid: wx.getStorageSync('userinfo').openid,
      },
      method: 'POST',
      success: function (res) {
        wx.hideToast();

        setTimeout(function () {
          wx.switchTab({
            url: '/pages/my/home/index'
          })
        }, 600);

        if( res.data.code == 200 ){
          wx.showToast({
            title: '领取成功',
            icon: 'success',
            duration: 500,
            mask: true
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 500,
            mask: true
          })
        }
      }
    })

  }
})