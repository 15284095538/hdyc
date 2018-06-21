// pages/store/list/list.js
Page({
  data: {
    display: 'none',
    menuid: 0,
    ischenced: false,
    menuIndex: 0,
    Selectarray: [{
      "id": [1, 2, 3]
    }, {
      "id": [0]
    }],
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
        "text": "全车打蜡",
        "key": 0
      },
      {
        "path": "/images/xiala_normal@2x.png",
        "selectpath": "/images/xiala_hl@2x.png",
        "text": "筛选",
        "key": 0
      }
    ],
    menulist: [
      //导航列表
    ],
    city: [//城市列表
      {
        "text": "成都市"
      },
      {
        "text": "德阳"
      },
      {
        "text": "青羊"
      }
    ],
    listtype: [//类型
      {
        "text": '全车打蜡'
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
    sort: [//筛选
      {
        "text": '门店类型',
        "sub": ["美容保养", "维修厂", "保养"],
      },
      {
        "text": '到店服务',
        "sub": ["美容", "安装"],
      }
    ],
    list: [{
      "path": "/images/store_menu_01.png",
      "name": "邛崃市天和车王养护",
      "grade": 0,
      "address": "成都市崇州市老陈大路462号（汇蜀路口）",
      "tag": ["美容", "安装"],
      "distance": "3.1KM"
    }, {
      "path": "/images/store_menu_01.png",
      "name": "邛崃市天和车王养护",
      "grade": 0,
      "address": "成都市崇州市老陈大路462号（汇蜀路口）",
      "tag": ["美容", "安装"],
      "distance": "3.1KM"
    }, {
      "path": "/images/store_menu_01.png",
      "name": "邛崃市天和车王养护",
      "grade": 0,
      "address": "成都市崇州市老陈大路462号（汇蜀路口）",
      "tag": ["美容", "安装"],
      "distance": "3.1KM"
    }, {
      "path": "/images/store_menu_01.png",
      "name": "邛崃市天和车王养护",
      "grade": 0,
      "address": "成都市崇州市老陈大路462号（汇蜀路口）",
      "tag": ["美容", "安装"],
      "distance": "3.1KM"
    },
    {
      "path": "/images/store_menu_01.png",
      "name": "邛崃市天和车王养护",
      "grade": 0,
      "address": "成都市崇州市老陈大路462号（汇蜀路口）",
      "tag": ["美容", "安装"],
      "distance": "3.1KM"
    }, {
      "path": "/images/store_menu_01.png",
      "name": "邛崃市天和车王养护",
      "grade": 0,
      "address": "成都市崇州市老陈大路462号（汇蜀路口）",
      "tag": ["美容", "安装"],
      "distance": "3.1KM"
    }, {
      "path": "/images/store_menu_01.png",
      "name": "邛崃市天和车王养护",
      "grade": 0,
      "address": "成都市崇州市老陈大路462号（汇蜀路口）",
      "tag": ["美容", "安装"],
      "distance": "3.1KM"
    }]
  },
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
      delay: 100,
      transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    })
  },
  onLoad() {

  },
  listTopclick(e) {//头部点击切换样式
    var that = this;
    var menuid = e.currentTarget.dataset.id;
    var selectkey = e.currentTarget.dataset.key;
    that.setData({
      menuid: menuid,
      display: 'block',
      menuIndex: menuid,
    });
    that.setData({ menuid: menuid });
    if (menuid == 0) {
      that.setData({ menulist: that.data.city });
    } else if (menuid == 1) {
      that.setData({ menulist: that.data.listtype });
    } else {
      that.setData({ menulist: that.data.sort });
    }
    that.setData({ layerid: selectkey });
  },
  listToplayerLiclick(e) {//点击替换文字
    var that = this;
    var text = e.currentTarget.dataset.text;
    var key = e.currentTarget.dataset.id;
    var menu = that.data.menu;//获取数组
    menu[that.data.menuIndex].text = text;//改变值
    menu[that.data.menuIndex].key = key;//改变值
    that.setData({ menu });
    this.listToplayerclick();
  },
  Close(e) {//点击关闭遮罩
    this.listToplayerclick();
  },
  CloseStop() { //阻止冒泡事件
    return true;
  },
  listToplayerclick(e) {//点击背景隐藏
    var that = this;
    that.setData({ display: 'none', menuid: '99' });
  },
  ScreenClick(e) {// 筛选选中
    var that = this;
    var Array = that.data.Selectarray;
    let id = e.currentTarget.dataset.id;
    let type = e.currentTarget.dataset.type;
    let has = 0;
    for (var i = 0; i < Array.length; ++i) {
      if (type == i) {
        for (var s = 0; s < Array[i].id.length; ++s) {
          if (id == Array[i].id[s]) {
            has = 1;
            Array[i].id.splice(Array[i].id.indexOf(id), 1);
          }
        }
      }
    }
    if (has == 0) {
      Array[type].id.push(id)
    }
    that.setData({ Selectarray: Array })
  },
  reset() {//筛选重置
    var that = this;
    var Array = that.data.Selectarray;
    for (var i = 0; i < Array.length; ++i) {
      for (var s = 0; s < Array[i].id.length; ++s) {
        Array[i].id = [];
      }
    }
    that.setData({ Selectarray: Array })
  },
  confirm() {//筛选确定
    this.listToplayerclick();
  }
})
