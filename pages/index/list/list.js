var url = getApp().globalData.publicUrl;

Page({
  data: {
    display:'none',
    menuIndex:0,
    classify:'',
    sorttext:1,
    cityHeight:'',
    typeHeight:'',
    menulist:[],
    menu: [//导航
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath":"/images/xiala_hl@2x.png",
        "text": "成都市",
        "key":0
      },
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "养护推荐",
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
    listtype:[],//分类
    sort: [],//排序
    list:[],
  },
  onLoad(e) {
    var menu = this.data.menu;
    menu[1].text = e.name;
    this.setData({ classify: e.id, menu: menu })
    this.getdata();
  },
  listTopclick(e){//头部点击切换样式
    var that = this;
    var menuid = e.currentTarget.dataset.id;
    var selectkey = e.currentTarget.dataset.key;
    var menulist;
    if (menuid == 0 ){
      menulist = that.data.city 
    } else if (menuid == 1 ){
      menulist = that.data.listtype
    }else{
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
  listToplayerclick(e){//点击背景隐藏
    var that = this;
    that.setData({ display: 'none', menuid:'99' });
  },
  listToplayerLiclick(e){//点击替换文字
    var that = this;
    var text = e.currentTarget.dataset.text;
    var key = e.currentTarget.dataset.id;
    var menu = that.data.menu;//获取数组
    menu[that.data.menuIndex].text = text;//改变值
    menu[that.data.menuIndex].key = key;//改变值
    if ( that.data.menuIndex == 0 ){
      var cityid = e.currentTarget.dataset.areaid;
    } else if ( that.data.menuIndex == 1 ){
      var typeid = e.currentTarget.dataset.typeid;
    }else{
      var sorttext = e.currentTarget.dataset.areaid;
    }
    that.setData({ menu: menu, sorttext: sorttext, });
    this.getdata();
  },
  
  detLink(e){ //详情
    wx.navigateTo({
      url: '/pages/index/details/details'
    })
  },
  getdata(e) {//获取数据
    var that = this;
    var cityHeight, typeHeight;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取分类
      url: url + 'lists/refit',
      data:{
        to: wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude'),
        address: wx.getStorageSync('address_component').city,
        classify: that.data.classify,
        grade:1,
        sort: that.data.sorttext,
        level: wx.getStorageSync('userinfo').level,
      },
      method: 'POST',
      success: function (res) {
        if( res.data.code == 200 ){
          if (res.data.data.address.length * 100 >= wx.getSystemInfoSync().windowHeight) {//计算高度
            cityHeight = wx.getSystemInfoSync().windowHeight
          } else {
            cityHeight = res.data.data.address.length * 100
          }

          if (res.data.data.classify.length * 100 >= wx.getSystemInfoSync().windowHeight) {//计算高度
            typeHeight = wx.getSystemInfoSync().windowHeight
          } else {
            typeHeight = res.data.data.classify.length * 100
          }

          that.setData({
            city: res.data.data.address,
            listtype: res.data.data.classify,
            sort: res.data.data.sort,
            cityHeight: cityHeight,
            typeHeight: typeHeight,
            list: res.data.data.details
          })
          wx.hideToast();
        }else{
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 5000,
            mask: true
          })
        }
       
      }
    })
  }
})
