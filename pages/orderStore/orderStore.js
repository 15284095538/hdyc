var url = getApp().globalData.publicUrl;

Page({
  data: {
    display: 'none',
    menuIndex: 0,
    classify: '13',
    sorttext: 1,
    cityHeight: '',
    areaId: '',
    menulist: [],
    menu: [//导航
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "成都市",
        "key": 0
      },
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "默认排序",
        "key": 0
      }
    ],
    city: [],//城市列表
    sort: [],//排序
    list: [],
  },
  page: {
    pages: 1,
    pagebuler: true
  },
  onReachBottom: function () {//下拉加载更多
    if (this.page.pagebuler) {
      this.page.pages++;
      this.getdata();
    }
  },
  onPullDownRefresh: function () {//上拉刷新
    wx.showNavigationBarLoading();
    this.page.pages = 1;
    this.page.pagebuler = true
    this.getdata();
  },
  onLoad(e) {
    this.getdata();
  },
  listTopclick(e) {//头部点击切换样式
    var that = this;
    var menuid = e.currentTarget.dataset.id;
    var selectkey = e.currentTarget.dataset.key;
    var menulist;
    if (menuid == 0) {
      menulist = that.data.city
    } else{
      menulist = that.data.sort
    }
    that.setData({
      menuid: menuid,
      display: 'block',
      menuIndex: menuid,
      layerid: selectkey,
      menulist: menulist,
    });
  },
  listToplayerclick(e) {//点击背景隐藏
    var that = this;
    that.setData({ display: 'none', menuid: '99' });
  },
  listToplayerLiclick(e) {//点击替换文字
    var that = this;
    var text = e.currentTarget.dataset.text;
    var key = e.currentTarget.dataset.id;
    var menu = that.data.menu;//获取数组
    menu[that.data.menuIndex].text = text;//改变值
    menu[that.data.menuIndex].key = key;//改变值
    var cityid = this.data.areaId;
    var sorttext = this.data.sorttext;
    if (that.data.menuIndex == 0) {
      cityid = e.currentTarget.dataset.areaid;
    } else{
      sorttext = e.currentTarget.dataset.areaid;
    }
    that.setData({ menu: menu, sorttext: sorttext, areaId: cityid, });
    this.getdata();
  },

  detLink(e) {
    var goods_id = e.currentTarget.dataset.goods_id;
    wx.navigateTo({
      url: '/pages/index/spraypaint/pay/pay'
    })
  },
  getdata(e) {//获取数据
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取分类
      url: url + 'lists/refit',
      data: {
        to: wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude'),
        address: wx.getStorageSync('address_component').city,
        classify: that.data.classify,
        grade: 1,
        sort: that.data.sorttext,
        level: wx.getStorageSync('userinfo').level,
        page: this.page.pages * 10,
        areaId: this.data.areaId,
      },
      method: 'POST',
      success: function (res) {
        if (res.data.data.details) {
          var list = res.data.data.details;
          wx.hideToast();
        } else {
          that.page.pagebuler = false;
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 1000,
            mask: true
          })
        }
        that.setData({
          city: res.data.data.address,
          sort: res.data.data.sort,
          cityHeight: wx.getSystemInfoSync().windowHeight,
          list: list
        })

        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
      }
    })
  }
})
