var url = getApp().globalData.publicUrl;

// pages/store/home/index.js
Page({
  data: {
    Userinfo: true,
    menu: [ //导航
      {
        "path": "/images/store_menu_01.png",
        "text": "美容保养"
      },
      {
        "path": "/images/store_menu_02.png",
        "text": "维修厂"
      },
      {
        "path": "/images/store_menu_03.png",
        "text": "洗车"
      }
    ],
    list: []
  },
  onLoad(e) {
    this.onGoUserinfoSetting();
    this.getdata();
  },
  ToPage() { //页面跳转
    wx.navigateTo({
      url: '../list/list'
    })
  },
  ToDetails() { //跳转详情
    wx.navigateTo({
      url: '../details/details'
    })
  },
  onGotUserInfo(e) { //用户授权
    var that = this;
    wx.login({
      success: res => {
        var code = res.code;
        wx.getUserInfo({
          success: function(res) {
            wx.request({
              url: url + 'user/myInfo',
              method: 'post',
              data: {
                encryptedData: res.encryptedData,
                iv: res.iv,
                code: code
              },
              success: function(data) {
                wx.setStorageSync('userinfo', data.data.data)
                that.setData({
                  Userinfo: false
                })
                that.getdata()
              }
            })
          }
        })
      }
    })
  },
  onGoUserinfoSetting(e) { //授权判断
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            Userinfo: false
          })
        }
      }
    })
  },
  getdata() { //获取数据
    var to = '';
    to = wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude');
    var that = this;
    wx.request({ //获取内容
      url: url + 'car/store',
      method: 'POST',
      data: {
        id: '',
        to:to,
        address: '',
        areaId: ''
      },
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            list: res.data.data.store
          });
        }
      }
    })
  }
})