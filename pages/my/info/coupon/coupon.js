// pages/my/info/coupon/coupon.js
Page({
  data: {
    menu: [ //导航
      {
        "id": 0,
        "text": "未使用",
        "num": 2
      },
      {
        "id": 1,
        "text": "已使用",
        "num": 2
      },
      {
        "id": 2,
        "text": "已过期",
        "num": 0
      }
    ],
    selectid: 0,
    ShowList: [],
    list1: [{
        "money": 80,
        "condition": 600,
        "time": {
          "str": "2018.07.15",
          "end": "2018.09.15",
        },
        "days": 20
      },
      {
        "money": 80,
        "condition": 600,
        "time": {
          "str": "2018.07.15",
          "end": "2018.09.15",
        },
        "days": 2
      }
    ],
    list2: [{
        "money": 800,
        "condition": 600,
        "time": {
          "str": "2018.07.15",
          "end": "2018.09.15",
        },
        "days": 20
      },
      {
        "money": 200,
        "condition": 600,
        "time": {
          "str": "2018.07.15",
          "end": "2018.09.15",
        },
        "days": 2
      }
    ],
    list3: [{
        "money": 500,
        "condition": 600,
        "time": {
          "str": "2018.07.15",
          "end": "2018.09.15",
        },
        "days": 20
      },
      {
        "money": 80,
        "condition": 600,
        "time": {
          "str": "2018.07.15",
          "end": "2018.09.15",
        },
        "days": 2
      }
    ],
  },
  onLoad() {
    var that = this;
    that.setData({
      ShowList: that.data.list1
    });
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
    } else if (id == 1) {
      that.setData({
        ShowList: that.data.list2
      });
    } else {
      that.setData({
        ShowList: that.data.list3
      });
    }
  }
})