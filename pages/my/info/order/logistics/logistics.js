// pages/my/info/order/logistics/logistics.js
Page({
  data: {
    "list": [{
        "path": "/images/store_menu_01.png"
      },
      {
        "path": "/images/store_menu_01.png"
      },
      {
        "path": "/images/store_menu_01.png"
      }
    ],
    "status": [{
        "title": "商品正在运送中",
        "time": "2018-07-01 10：08：06"
      },
      {
        "title": "商品正在出库",
        "time": "2018-07-01 10：08：06"
      },
      {
        "title": "订单已提交",
        "time": "2018-07-01 10：08：06"
      }
    ]
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '物流信息'
    });
  },
  onReady: function() {

  }
})