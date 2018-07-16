var url = getApp().globalData.publicUrl;
// pages/my/home/index.js
Page({
  data: {
    IsUser: true,
    userinfo: {
      "header": "/images/store_menu_01.png",
      "user_name": "海豆养车",
      "code": "TvT",
      "card_path": "/images/store_menu_01.png",
      "card_name": "上海大众-凌渡",
      "card_code": "川A UIX99",
      "hd_coin": 0
    },
    Userinfo:true,
    usermenu: [//订单导航
      {
        "path": "/images/daifukuan.png",
        "text": "待付款",
        "id": 0
      },
      {
        "path": "/images/daianzhuang.png",
        "text": "待安装",
        "id": 1
      },
      {
        "path": "/images/daipingjia.png",
        "text": "待评价",
        "id": 2
      },
      {
        "path": "/images/tuihuanhuo.png",
        "text": "退换货",
        "id": 3
      }],
    archivesIndent: 81923.05,
    archivesOrder: [{
      "num": 12,
      "text": "今日订单"
    },{
      "num": 122,
      "text": "历史订单"
    }],
    archivesMember: {
      "num": 12,
      "indent": 6201,
    }
  },
  onLoad(e) {
    wx.setNavigationBarTitle({
      title: '个人中心'
    });
    this.onGoUserinfoSetting();
    this.onGotUserInfo();
  },
  ToPage(e) {//导航跳转
    var link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link
    })
  },
  onGotUserInfo(e) {//用户授权
    var that = this;
    wx.login({
      success: res => {
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 55000,
          mask: true
        })
        var code = res.code;
        wx.getUserInfo({
          success: function (res) {
            wx.request({
              url: url + 'user/myInfo',
              method: 'post',
              data: {
                encryptedData: res.encryptedData,
                iv: res.iv,
                code: code
              },
              success: function (data) {
                wx.setStorageSync('userinfo', data.data.data)
                that.setData({
                  Userinfo: false
                })
                that.setData({
                  userinfo: data.data.data
                })
                wx.hideToast();
              }
            })
          }
        })
      }
    })
  },
  onGoUserinfoSetting(e) {//授权判断
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
})