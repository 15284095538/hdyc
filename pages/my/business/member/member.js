// pages/my/business/member/member.js
Page({
  data: {
    "user": [{
      "path": "/images/store_menu_01.png",
      "name": "李子木",
      "time": "2018-50-20",
      "num": "5432.10"
    },
    {
      "path": "/images/store_menu_01.png",
      "name": "李子木",
      "time": "2018-50-20",
      "num": "5432.10"
    }, {
      "path": "/images/store_menu_01.png",
      "name": "李子木",
      "time": "2018-50-20",
      "num": "5432.10"
    }
    ]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的会员'
    });
  }
})