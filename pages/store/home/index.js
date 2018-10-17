var url = getApp().globalData.publicUrl;

// pages/store/home/index.js
Page({
  data: {
    Userinfo: true,
    menu: [],
    list: [],
    num: 5,
    page: 1
  },
  page: {
    pages: 1,
    pagebuler: true
  },
  onLoad(e) {
    this.onGoUserinfoSetting();
    this.getdata();
    this.getmenu();
  },
  onReachBottom: function () {//上拉加载更多
    var that = this;
    if (that.page.pagebuler) {
      that.page.pages++;
      that.getdata();
    }
  },
  onPullDownRefresh: function () {//下拉刷新
    var that = this;
    wx.showNavigationBarLoading();
    that.page.pages = 1;
    that.page.pagebuler = true
    that.getdata();
  },
  ToPage(e) { //页面跳转
    if (wx.getStorageSync('userinfo').car.car_brand == '暂未选择爱车') {
      wx.showToast({
        title: '请添加爱车',
        icon: 'loading',
        duration: 3000,
        mask: true,
        success: function () {
          wx.navigateTo({
            url: '/pages/my/info/mycar/addcar/addcar',
          })
        }
      })
      return false
    }
    var link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link
    })
  },
  ToDetails(e) { //跳转详情
    if (wx.getStorageSync('userinfo').car.car_brand == '暂未选择爱车') {
      wx.showToast({
        title: '请添加爱车',
        icon: 'loading',
        duration: 3000,
        mask: true,
        success: function () {
          wx.navigateTo({
            url: '/pages/my/info/mycar/addcar/addcar',
          })
        }
      })
      return false
    }
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/store/details/details?id=' + id + ''
    })
  },
  onGotUserInfo(e) {//用户授权
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.login({
      success: res => {
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
                wx.setStorageSync('userinfo', data.data.data);
                that.setData({
                  Userinfo: false
                });
                wx.hideToast();
              }
            })
          }
        })
      }
    })
  },
  onShow(e) {
    this.onGoUserinfoSetting();
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
  getmenu() { //获取分类数据
    var that = this;
    wx.request({ //获取内容
      url: url + 'store/Store_class',
      method: 'POST',
      data: {
        address: ''
      },
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            menu: res.data.data.lx
          });
        }
      }
    })
  },
  getdata() { //获取数据
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    var to = '';
    to = wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude');
    wx.request({ //获取内容
      url: url + 'store/recomStore',
      method: 'POST',
      data: {
        id: '',
        to:to,
        address: '',
        areaId: '',
        type: '',
        sort: '',
        service: '',
        page: that.page.pages * 10
      },
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            list: res.data.data
          });
          wx.hideToast();
        }
        else{
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
  }
})