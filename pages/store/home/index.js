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
    wx.setNavigationBarTitle({
      title: '门店'
    });
    this.onGoUserinfoSetting();
    this.getdata();
    this.getmenu();
  },
  onReachBottom: function () {//上拉加载更多
    if (this.page.pagebuler) {
      this.page.pages++;
      this.getdata();
    }
  },
  onPullDownRefresh: function () {//下拉刷新
    wx.showNavigationBarLoading();
    this.page.pages = 1;
    this.page.pagebuler = true
    this.getdata();
  },
  ToPage(e) { //页面跳转
    var link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link
    })
  },
  ToDetails(e) { //跳转详情
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/store/details/details?id=' + id + ''
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
      url: url + 'store/storeList',
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