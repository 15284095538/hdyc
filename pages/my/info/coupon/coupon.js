// pages/my/info/coupon/coupon.js
var url = getApp().globalData.publicUrl;
Page({
  data: {
    dispaly: 'none',
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
  page: {
    pages: 1,
    pagebuler: true
  },
  onLoad() {
    var that = this;
    that.getdata()
  },
  ChangeSelect(e) { //TAB切换
    var that = this;
    var id = e.currentTarget.dataset.id;
    that.setData({
      selectid: id
    });
    that.setData({
      ShowList: ''
    });
    that.page.pages = 1;
    that.page.pagebuler = true
    that.getdata()
  },
  onReachBottom: function() { //上拉加载更多
    var that = this;
    if (that.page.pagebuler) {
      that.page.pages++;
      that.getdata();
    }
  },
  onPullDownRefresh: function() { //下拉刷新
    var that = this;
    wx.showNavigationBarLoading();
    that.page.pages = 1;
    that.page.pagebuler = true
    that.getdata();
  },
  getdata() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    var that = this;
    wx.request({ //获取内容
      url: url + 'user/myCoupon',
      method: 'POST',
      data: {
        openid: wx.getStorageSync('userinfo').openid,
        status: that.data.selectid,
        page: that.page.pages * 10
      },
      success: res => {
        if (res.data.code == 200) {
          var menu = that.data.menu;
          for (var i = 0; i < menu.length; i++) {
            if (i == 0) {
              menu[i].num = res.data.data.notUse
            } else if (i == 1) {
              menu[i].num = res.data.data.used
            } else {
              menu[i].num = res.data.data.validity
            }
          };
          that.setData({
            ShowList: res.data.data.list,
            menu: menu
          });
          wx.hideToast();
        } else {
          that.page.pagebuler = false
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 1000,
            mask: true
          })
        }
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
      }
    })
  },
})