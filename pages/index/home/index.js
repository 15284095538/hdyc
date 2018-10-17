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
    loadCityFail:true,
    indexmenuMore:10,
    newLits:[],
    cypbanner:[],
    yhtjbanner:[],
    currentSwiper:0,
  },
  onLoad(){
    this.getdata();
    this.onGoUserinfoSetting();
    this.getLocation();
    this.getnewLits();
    this.cypbanner();
    this.yhtjbanner();
  },
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  suspensioncar(){
    wx.switchTab({
      url:'/pages/my/info/shoppingcar/shoppingcar'
    })
  },
  newListClick(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/home/newList/nes?id=' + id ,
    })
  },
  menulink(e){//导航跳转
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
    var name = e.currentTarget.dataset.name;
    var link = e.currentTarget.dataset.link;
    var id = e.currentTarget.dataset.menuid;
    var that = this;
    var length = 0;
    if (that.data.indexmenuMore == 10) {
      length = that.data.menu.length;
    } else {
      length = 10;
    }
    if( name == '更多' ){//判断显示条数
      this.setData({
        indexmenuMore: length,
      })
    }else{
      wx.navigateTo({
        url: link + id + '&name=' + name,
      })
    }
  },
  carlink(e){//
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
  cypClick(e){
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
    var goods_id = e.currentTarget.dataset.goods_id;
    var category_id = e.currentTarget.dataset.category_id;
    wx.navigateTo({
      url: '/pages/index/suppliescar/details/details?goods_id=' + goods_id + '&category_id=' + category_id
    })
  },
  yhtjClick(e){
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
    var goods_id = e.currentTarget.dataset.goods_id;
    var classify = e.currentTarget.dataset.classify;
    wx.navigateTo({
      url: '/pages/index/details/details?goods_id=' + goods_id + '&classify=' + classify,
    })
  },
  searchLink(e){
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
    wx.navigateTo({
      url: '/activity/pages/search/home/home'
    })
  },
  buycarlink(e){
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
    wx.navigateTo({
      url: '/pages/index/buycar/details/details?id=' + id,
    })
  },
  imgClick(e){

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
    if (link == "/pages/collage/home/home" ){
      link = '/pages/collage/home/home?openid=' + wx.getStorageSync('userinfo').openid
    }
    wx.navigateTo({
      url: link
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
  onShow(e){
    this.onGoUserinfoSetting();
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
    var that = this;
    if (!e.detail.authSetting['scope.userInfo']) {
      that.setData({
        Userinfo: true
      })
    }
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
          res.data.data[i].link = '/pages/index/list/list?id='
        }
        res.data.data[1].link = '/pages/index/washcar/list/list?id=';//洗车
        res.data.data[6].link = '/pages/index/spraypaint/home/home?id=';//钣金喷漆
        res.data.data[8].link = '/pages/index/suppliescar/list/list?id=';//车用品购买
        res.data.data.splice(9,0,{//添加更多
          menu_logo:"https://hd.mmqo.com/uploads/others/more.png",
          type_name:'更多'
        })
        that.setData({
          menu: res.data.data,
        })
        wx.hideToast();
      }
    })
  },
  getnewLits() { //新闻
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({ //获取内容
      url: url + 'home/headline',
      method: 'POST',
      success: res => {
        that.setData({
          newLits: res.data.data
        });
        wx.hideToast();
      }
    })
  },
  cypbanner() { //车用品banner
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({ //获取内容
      url: url + 'home/lb',
      method: 'POST',
      data:{
        cate:'3',
      },
      success: res => {
        that.setData({
          cypbanner: res.data.data
        });
        wx.hideToast();
      }
    })
  },
  yhtjbanner() { //养护推荐banner
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({ //获取内容
      url: url + 'home/lb',
      method: 'POST',
      data: {
        cate: '2',
      },
      success: res => {
        that.setData({
          yhtjbanner: res.data.data
        });
        wx.hideToast();
      }
    })
  }
})
