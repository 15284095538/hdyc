var url = getApp().globalData.publicUrl;

Page({
  data: {
    isChecked:false,
    swiper: {//banner图
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      indicatorcolor: '#d5d5d5',
      indicatoractivecolor: "#0084ff",
      imgUrl:[],
      loadCity:'',
    },
    menu:'',//导航
    classify:'',
    Userinfo:true,
    loadCity:{
      latitude: '',
      longitude: '',
      text: '获取定位中'
    },
    loadCityFail:true
  },
  onLoad(){
    this.getdata();
    this.onGoUserinfoSetting();
    this.getLocation();
  },
  menulink(e){//导航跳转
    var link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link
    })
  },
  carlink(e){//
    var link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link
    })
  },
  onGotUserInfo(e) {//用户授权
    var that = this;
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
                wx.setStorageSync('userinfo', data.data.data)
                that.setData({
                  Userinfo: false
                })
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
  getLocation(e) {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function (res) {
        that.setData({
          ["loadCity.latitude"]: res.latitude,
          ["loadCity.longitude"]: res.longitude,
          loadCityFail: true
        });
        wx.setStorageSync('latitude', res.latitude)
        wx.setStorageSync('longitude', res.longitude)
        that.getCity();
      }, fail: function () {
        that.setData({
          loadCityFail:false
        });
      }
    })
  },
  onGoopenSetting(e){
    var that = this
    if (e.detail.authSetting['scope.userLocation'] ){
      wx.getLocation({
        type: 'gcj02',
        altitude: true,
        success: function (res) {
          that.setData({
            ["loadCity.latitude"]: res.latitude,
            ["loadCity.longitude"]: res.longitude,
            loadCityFail:true
          });
          wx.setStorageSync('latitude', res.latitude)
          wx.setStorageSync('longitude', res.longitude)
          that.getCity();
        }, fail: function () {
          that.setData({
            loadCityFail: false
          });
        }
      })
    }
  },
  getCity(){//获取城市
    var that = this;
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + that.data.loadCity.latitude + ',' + that.data.loadCity.longitude + 
      '&key=VVIBZ-MLDK2-5XBUN-CZCJG-MEDMT-FTFE6&get_poi=1&get_poi=1',
      data: {},
      success: function (res) {
        wx.setStorageSync('address_component', res.data.result.address_component)
        that.setData({
          ["loadCity.text"]: res.data.result.address_component.city
        });
      },
      fail: function (res) {
        
      },
    })
  },
  getdata(e){//获取数据
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask:true
    })
    wx.request({//获取轮播图
      url: url + 'home/lb',
      data: {
        'cate': '1'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          ['swiper.imgUrl']: res.data.data
        })
      }
    })
    wx.request({//获取推荐
      url: url + 'home/classify',
      method: 'POST',
      success: function (res) {
        that.setData({
          classify: res.data.data
        })
      }
    })
    wx.request({//获取分类
      url: url + 'home/classifyS',
      method: 'POST',
      success: function (res) {
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].link = '/pages/index/list/list'
        }
        res.data.data[0].link = '/pages/index/washcar/list/list';//洗车
        res.data.data[5].link = '/pages/index/spraypaint/home/home';//钣金喷漆
        res.data.data[7].link = '/pages/index/suppliescar/list/list';//车用品购买
        that.setData({
          menu: res.data.data,
        })
        wx.hideToast();
      }
    })
  }
})
