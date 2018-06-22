// pages/my/home/index.js
Page({
  data: {
    userinfo: {
      "path": "/images/store_menu_01.png",
      "name": "Leslie",
      "code": "X34G7",
      "card_path": "/images/store_menu_01.png",
      "card_name": "上海大众-凌渡",
      "card_code": "川A UIX99",
      "card_info": "2017款 1.8TSI 双离合 330TSI豪华款",
      "integral": 2398
    },
    usermenu: [//订单导航
      {
        "path": "/images/daifukuan.png",
        "text": "待付款"
      },
      {
        "path": "/images/daianzhuang.png",
        "text": "待安装"
      },
      {
        "path": "/images/daipingjia.png",
        "text": "待评价"
      },
      {
        "path": "/images/tuihuanhuo.png",
        "text": "退换货"
      }],
  },
  onLoad: function (options) {

  }
})