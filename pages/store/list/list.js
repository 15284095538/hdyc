// pages/store/list/list.js
var url = getApp().globalData.publicUrl;
Page({
  data: {
    display: 'none',
    menuid: 0,
    menuIndex: 0,
    winHeight: '',
    menu: [ //导航
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "全部区域",
        "key": 0,
        "areaId": 0
      },
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "默认排序",
        "key": 0,
        "areaId": 0
      },
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "筛选",
        "key": 0,
      }
    ],
    menulist: [], //导航列表
    city: [], //城市列表
    listtype: [], //类型
    sort: [ //筛选
      {
        "text": '门店类型',
        "sub": []
      },
      {
        "text": '到店服务',
        "sub": [],
      }
    ],
    list: [],
    typeid: ''
  },
  page: {
    pages: 1,
    pagebuler: true
  },
  onReady: function() {
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
      delay: 100,
      transformOrigin: 'left top 0',
      success: function(res) {
        console.log(res)
      }
    });
    wx.setNavigationBarTitle({
      title: '门店列表'
    });
  },
  onLoad(options) {
    this.getmenu();
    this.setData({
      typeid: options.id
    });
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight: res.windowHeight
        })
      }
    })
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
  listTopclick(e) { //头部点击切换样式
    var that = this;
    var menuid = e.currentTarget.dataset.id;
    var selectkey = e.currentTarget.dataset.key;
    that.setData({
      menuid: menuid,
      display: 'block',
      menuIndex: menuid,
    });
    that.setData({
      menuid: menuid
    });
    if (menuid == 0) {
      that.setData({
        menulist: that.data.city
      });
    } else if (menuid == 1) {
      that.setData({
        menulist: that.data.listtype
      });
    } else {
      that.setData({
        menulist: that.data.sort
      });
    }
    that.setData({
      layerid: selectkey
    });
  },
  listToplayerLiclick(e) { //点击替换文字
    var that = this;
    var text = e.currentTarget.dataset.text;
    var key = e.currentTarget.dataset.id;
    var areaId = e.currentTarget.dataset.areaid;
    var menu = that.data.menu; //获取数组
    menu[that.data.menuIndex].text = text; //改变值
    menu[that.data.menuIndex].key = key; //改变值
    menu[that.data.menuIndex].areaId = areaId; //改变值
    that.setData({
      menu
    });
    this.listToplayerclick();
    that.getdata();
  },
  Close(e) { //点击关闭遮罩
    this.listToplayerclick();
  },
  CloseStop() { //阻止冒泡事件
    return true;
  },
  listToplayerclick(e) { //点击背景隐藏
    var that = this;
    that.setData({
      display: 'none',
      menuid: '99'
    });
  },
  ScreenClick(e) { // 筛选选中
    var that = this;
    var sort = that.data.sort;
    var menulist = e.currentTarget.dataset.menulist;
    var id = e.currentTarget.dataset.id;
    var arry = sort[menulist].sub;
    for (var i = 0; i < arry.length; i++) {
      if (id == i) {
        arry[i].type = !arry[i].type;
      }
    }
    that.setData({
      menulist: sort,
    })
  },
  reset() { //筛选重置
    var that = this;
    var Array = that.data.sort;
    for (var i = 0; i < Array.length; ++i) {
      for (var s = 0; s < Array[i].sub.length; ++s) {
        Array[i].sub[s].type = false;
      }
    }
    that.setData({
      sort: Array
    });
    that.setData({
      menulist: that.data.sort,
    })
  },
  confirm() { //筛选确定
    var that = this;
    that.setData({
      sort: that.data.menulist,
    })
    this.listToplayerclick();
    that.getdata();
  },
  getmenu() { //获取筛选条件
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    });
    var that = this;
    var address = '';
    if (wx.getStorageSync('address_component')) {
      address = wx.getStorageSync('address_component').city
    }
    wx.request({ //获取内容
      url: url + 'store/Store_class',
      method: 'POST',
      data: {
        address: address
      },
      success: res => {
        if (res.data.code == 200) {
          var menu = that.data.menu; //获取数组
          menu[0].areaId = res.data.data.address[0].areaId; //改变值
          var sort = that.data.sort; //获取数组
          sort[0].sub = res.data.data.lx; //改变值
          sort[1].sub = res.data.data.fw; //改变值
          that.setData({
            menu: menu,
            city: res.data.data.address,
            listtype: res.data.data.sort,
            sort: sort,
          });
          that.getdata()
        }
        wx.hideToast();
      }
    })
  },
  getdata() { //获取数据
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    });
    var that = this;
    var to = '';
    if (wx.getStorageSync('latitude') || wx.getStorageSync('longitude')) {
      to = wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude');
    }
    var areaId = that.data.menu[0].areaId;
    var sort = that.data.menu[1].areaId;
    var serviceList = that.data.sort;
    var service = '';
    for (var i = 0; i < serviceList.length; i++) {
      for (var x = 0; x < serviceList[i].sub.length; x++) {
        var item = serviceList[i].sub[x];
        if (item.type === true) {
          if (service == '') {
            service = item.id
          } else {
            service = service + ',' + item.id
          }
        }
      }
    }
    wx.request({ //获取内容
      url: url + 'store/storeList',
      method: 'POST',
      data: {
        type: that.data.typeid,
        to: to,
        areaId: areaId,
        sort: sort,
        service: service,
        page: that.page.pages * 10
      },
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            list: res.data.data
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
  ToDetails(e) { //跳转详情
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/store/details/details?id=' + id + ''
    })
  }
})