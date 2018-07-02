// pages/my/home/index.js
Page({
  data: {
    IsUser: false,
    userinfo: {
      "path": "/images/store_menu_01.png",
      "name": "Leslie",
      "code": "X34G7",
      "card_path": "/images/store_menu_01.png",
      "card_name": "上海大众-凌渡",
      "card_code": "川A UIX99",
      "card_info": "2017款 1.8TSI 双离合 330TSI豪华款",
      "integral": 2398
    },
    Userinfo:true,
    usermenu: [//订单导航
      {
        "path": "/images/daifukuan.png",
        "text": "待付款"
      },
      {
        "path": "/images/daianzhuang.png",
        "text": "待安装"
      },
      {
        "path": "/images/daipingjia.png",
        "text": "待评价"
      },
      {
        "path": "/images/tuihuanhuo.png",
        "text": "退换货"
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
  onLoad: function (options) {

  },
  ToPage(e) {//导航跳转
    var link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link
    })
  },
  onGotUserInfo(e) {//用户授权
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;
        that.setData({
          Userinfo: false
        })
      }
    })
  },
  onGoUserinfoSetting(e) {//授权判断
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            Userinfo: false
          })
        }
      }
    })
  },
})