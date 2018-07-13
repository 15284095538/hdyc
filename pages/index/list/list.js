var url = getApp().globalData.publicUrl;

Page({
  data: {
    display:'none',
    menuIndex:0,
    classify:'',
    sorttext:1,
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
    menulist:[
      //导航列表
    ],
    city:[//城市列表
      {
        "text":"成都市"
      },
      {
        "text": "德阳"
      },
      {
        "text": "青羊"
      }
    ],
    listtype:[//类型
      {
        "text":'全车打蜡'
      },
      {
        "text": '内饰清洗'
      },
      {
        "text": '全车贴膜'
      },
      {
        "text": '全车镀晶'
      }
    ],
    sort:[//排序
      {
        "text":"默认排序"
      },
      {
        "text": "附近优先"
      },
      {
        "text": "评分最高"
      }
    ],
    list:[
      {
        "path":"/images/banner.jpg",
        "name":'全车打蜡',
        "num":'3.55',
        "order":"43",
        "address":"成都市崇州市老陈大路462号（汇蜀路口）",
        "price":"￥80.00",
        "jl":"1.3km",
      }
    ],
  },
  onLoad(e) {
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
      menulist: menulist
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
    that.setData({ menu });
  },
  detLink(e){ //详情
    wx.navigateTo({
      url: '/pages/index/details/details'
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
        console.log( res )
        wx.hideToast();
      }
    })
  }
})
