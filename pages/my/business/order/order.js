// pages/my/business/order/order.js
Page({
  data: {
    menu: [ //导航
      {
        "id": 0,
        "text": "今日订单"
      },
      {
        "id": 1,
        "text": "历史订单"
      }
    ],
    selectid: 0,
    ShowList: [],
    list1: [{
      "order_ns": "TH28497737",
      "path": "/images/store_menu_01.png",
      "name": "3M高效发动机内部清洗剂204Ml",
      "num": 3,
      "price": 68.00,
      "status": "已到店"
    },
    {
      "order_ns": "TH28497737",
      "path": "/images/store_menu_01.png",
      "name": "3M高效发动机内部清洗剂204Ml",
      "num": 4,
      "price": 68.00,
      "status": "已到店"
    }
    ],
    list2: [{
      "order_ns": "TH28497737",
      "path": "/images/store_menu_01.png",
      "name": "3M高效发动机内部清洗剂",
      "num": 5,
      "price": 68.00,
      "status": "待付款"
    },
    {
      "order_ns": "TH28497737",
      "path": "/images/store_menu_01.png",
      "name": "发动机内部清洗剂204Ml",
      "num": 6,
      "price": 68.00,
      "status": "待评价"
    }
    ]
  },
  onLoad(option) {
    wx.setNavigationBarTitle({
      title: '我的订单'
    });
    var that = this;
    that.setData({
      ShowList: that.data.list1
    });
    if (option.id) {
      that.setData({
        selectid: option.id
      });
      if (option.id == 0) {
        that.setData({
          ShowList: that.data.list1
        });
      } else {
        that.setData({
          ShowList: that.data.list2
        });
      }
    };
  },
  ChangeSelect(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    that.setData({
      selectid: id
    });
    if (id == 0) {
      that.setData({
        ShowList: that.data.list1
      });
    } else {
      that.setData({
        ShowList: that.data.list2
      });
    }
  }
})