var url = getApp().globalData.publicUrl;

// pages/store/home/index.js
Page({
  data: {
    Userinfo: true,
    menu: [ //导航
      {
        "menu_logo": "/images/store_menu_01.png",
        "type_name": "美容保养"
      },
      {
        "menu_logo": "/images/store_menu_02.png",
        "type_name": "维修厂"
      },
      {
        "menu_logo": "/images/store_menu_03.png",
        "type_name": "洗车"
      }
    ],
    list: []
  },
  onLoad(e) {
    this.onGoUserinfoSetting();
    this.getdata();
    this.getmenu();
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
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
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
        areaId: '',
        type: 1,
        sort: ''
      },
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            list: res.data.data.store
          });
        }
        wx.hideToast();
      }
    })
  }
})