// pages/store/home/index.js
Page({
  data: {
    menu: [//导航
      {
        "path": "/images/store_menu_01.png",
        "text": "美容保养"
      },
      {
        "path": "/images/store_menu_02.png",
        "text": "维修厂"
      },
      {
        "path": "/images/store_menu_03.png",
        "text": "洗车"
      }],
    list: [{
      "path": "/images/store_menu_01.png",
      "name": "邛崃市天和车王养护",
      "grade": 1,
      "order": {
        "status": "hass",
        "score": 3.5,
        "order_num": 12,
      },
      "address": "成都市崇州市老陈大路462号（汇蜀路口）",
      "tag": ["美容", "安装"],
      "distance": "3.1KM"
    }, {
      "path": "/images/store_menu_01.png",
      "name": "邛崃市天和车王养护",
      "grade": 2,
      "order": {
        "status": "none",
        "score": 3.5,
        "order_num": 12,
      },
      "address": "成都市崇州市老陈大路462号（汇蜀路口）",
      "tag": ["美容", "安装"],
      "distance": "3.1KM"
    }, {
      "path": "/images/store_menu_01.png",
      "name": "邛崃市天和车王养护",
      "grade": 1,
      "order": {
        "status": "none",
        "score": 3.5,
        "order_num": 102,
      },
      "address": "成都市崇州市老陈大路462号（汇蜀路口）",
      "tag": ["美容", "安装"],
      "distance": "3.1KM"
    }, {
      "path": "/images/store_menu_01.png",
      "name": "邛崃市天和车王养护",
      "grade": 3,
      "order": {
        "status": "none",
        "score": 3.5,
        "order_num": 1221,
      },
      "address": "成都市崇州市老陈大路462号（汇蜀路口）",
      "tag": ["美容", "安装"],
      "distance": "3.1KM"
    }]
  },
  ToPage() {//页面跳转
    wx.navigateTo({
      url: '../list/list'
    })
  },
  ToDetails(){//跳转详情
    wx.navigateTo({
      url: '../details/details'
    })
  }
})