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
    }]
  },
  ToPage() {
    wx.navigateTo({
      url: '../list/list'
    })
  }
})