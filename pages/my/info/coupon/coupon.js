// pages/my/info/coupon/coupon.js
var url = getApp().globalData.publicUrl;
Page({
  data: {
    menu: [ //导航
      {
        "id": 0,
        "text": "未使用",
        "num": 0
      },
      {
        "id": 1,
        "text": "已使用",
        "num": 0
      },
      {
        "id": 2,
        "text": "已过期",
        "num": 0
      }
    ],
    "notUse": 1,
    "used": 0,
    "validity": 1,
    selectid: 0,
    ShowList: []
  },
  onLoad() {
    var that = this;
    that.getdata()
  },
  ChangeSelect(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    that.setData({
      selectid: id
    });
    that.setData({
      ShowList: ''
    });
    that.getdata()
  },
  getdata() {
    var that = this;
    wx.request({ //获取内容
      url: url + 'user/myCoupon',
      method: 'POST',
      data: {
        openid: wx.getStorageSync('userinfo').openid,
        status: that.data.selectid
      },
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          var menu = that.data.menu;
          for (var i = 0; i < menu.length; i++) {
            if(i == 0){
              menu[i].num = res.data.data.notUse
            } else if (i == 1){
              menu[i].num = res.data.data.used
            }else{
              menu[i].num = res.data.data.validity
            }
          };
          that.setData({
            ShowList: res.data.data.list,
            menu: menu
          });
        }
      }
    })
  },
})