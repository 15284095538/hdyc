// pages/store/list/list.js
Page({
  data: {
    list: [
      {
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
      }
    ]
  },
  onLoad() {

  },
  listClick(e){
    wx.navigateTo({
      url: '/pages/index/spraypaint/servicelist/servicelist'
    })
  },
  storeClick(e){
    wx.navigateTo({
      url: '/pages/orderStore/orderStore'
    })
  }
})