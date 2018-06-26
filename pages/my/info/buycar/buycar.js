Page({
  data: {
    navbar: ["车用品", "网约车","新车"],
    currentIndex: 0,//tabbar索引
    isAllSelect: false,
    totalMoney: 0,
    // 商品详情介绍
    carts: [
      {
        pic: "/images/car_03.png",
        name: "新款吉弘行车记录仪高清夜视",
        price: 200.08,
        yishou: 333,
        pinglun: 146,
        isSelect: false,
      },
      {
        pic: '/images/car_03.png',
        name: "新款吉弘行车记录仪高清夜视",
        price: 340.09,
        yishou: 365,
        pinglun: 146,
        isSelect: false,
      },
      {
        pic: '/images/car_03.png',
        name: "新款吉弘行车记录仪高清夜视",
        price: 390.09,
        yishou: 365,
        pinglun: 146,
        isSelect: false,
      },
      {
        pic: '/images/car_03.png',
        name: "新款吉弘行车记录仪高清夜视",
        price: 490.07,
        yishou: 365,
        pinglun: 146,
        isSelect: false,
      },
      {
        pic: '/images/car_03.png',
        name: "新款吉弘行车记录仪高清夜视",
        price: 289.06,
        yishou: 365,
        pinglun: 146,
        isSelect: false,
      },
      {
        pic: "/images/car_03.png",
        name: "新款吉弘行车记录仪高清夜视",
        price: 230.05,
        yishou: 365,
        pinglun: 146,
        isSelect: false,
      },
    ],
  },
  navbarTab: function (e) {
    if (e.currentTarget.dataset.index==1){
      this.setData({
        carts: [
          {
            pic: "/images/car_03.png",
            name: "晶锐Health Plus定制版",
            price: 200.05,
            zd:10.8,
            yg: 1921,
            isSelect: false,
          },
          {
            pic: '/images/car_03.png',
            name: "晶锐Health Plus定制版",
            price: 340.09,
            zd: 10.8,
            yg: 1921,
            isSelect: false,
          },
          {
            pic: '/images/car_03.png',
            name: "新款吉弘行车记录仪高清夜视",
            price: 390.05,
            zd: 10.8,
            yg: 1921,
            isSelect: false,
          },
          {
            pic: '/images/car_03.png',
            name: "晶锐Health Plus定制版",
            price: 490.05,
            zd: 10.8,
            yg: 1921,
            isSelect: false,
          },
          {
            pic: '/images/car_03.png',
            name: "晶锐Health Plus定制版",
            price: 289.05,
            zd: 10.8,
            yg: 1921,
            isSelect: false,
          },
          {
            pic: "/images/car_03.png",
            name: "晶锐Health Plus定制版",
            price: 230.05,
            zd: 10.8,
            yg:1921,
            isSelect: false,
          },
        ],
        currentIndex: e.currentTarget.dataset.index,
      });
    }
    if (e.currentTarget.dataset.index == 2) {
      this.setData({
        carts: [
          {
            pic: "/images/car_03.png",
            name: "晶锐Health Plus定制版",
            price: 200.04,
            zd: 10.8,
            yg: 1921,
            isSelect: false,
          },
          {
            pic: '/images/car_03.png',
            name: "晶锐Health Plus定制版",
            price: 340.09,
            zd: 10.8,
            yg: 1921,
            isSelect: false,
          },
          {
            pic: '/images/car_03.png',
            name: "新款吉弘行车记录仪高清夜视",
            price: 390.02,
            zd: 10.8,
            yg: 1921,
            isSelect: false,
          },
          {
            pic: '/images/car_03.png',
            name: "晶锐Health Plus定制版",
            price: 490.02,
            zd: 10.8,
            yg: 1921,
            isSelect: false,
          },
          {
            pic: '/images/car_03.png',
            name: "晶锐Health Plus定制版",
            price: 289.01,
            zd: 10.8,
            yg: 1921,
            isSelect: false,
          },
          {
            pic: "/images/car_03.png",
            name: "晶锐Health Plus定制版",
            price: 230.07,
            zd: 10.8,
            yg: 1921,
            isSelect: false,
          },
        ],
        currentIndex: e.currentTarget.dataset.index,
      });
    }
    if (e.currentTarget.dataset.index == 0) {
      this.setData({
        carts: [
          {
            pic: "/images/car_03.png",
            name: "新款吉弘行车记录仪高清夜视",
            price: 200.04,
            yishou: 365,
            pinglun: 146,
            isSelect: false,
          },
          {
            pic: '/images/car_03.png',
            name: "新款吉弘行车记录仪高清夜视",
            price: 340.09,
            yishou: 365,
            pinglun: 146,
            isSelect: false,
          },
          {
            pic: '/images/car_03.png',
            name: "新款吉弘行车记录仪高清夜视",
            price: 390.02,
            yishou: 365,
            pinglun: 146,
            isSelect: false,
          },
          {
            pic: '/images/car_03.png',
            name: "新款吉弘行车记录仪高清夜视",
            price: 490.20,
            yishou: 365,
            pinglun: 146,
            isSelect: false,
          },
          {
            pic: '/images/car_03.png',
            name: "新款吉弘行车记录仪高清夜视",
            price: 289.40,
            yishou: 365,
            pinglun: 146,
            isSelect: false,
          },
          {
            pic: "/images/car_03.png",
            name: "新款吉弘行车记录仪高清夜视",
            price: 230.50,
            yishou: 365,
            pinglun: 146,
            isSelect: false,
          },
        ],
        currentIndex: e.currentTarget.dataset.index,
      });
    }
  },
  //勾选事件处理函数  
  switchSelect: function (e) {
    // 获取item项的id，和数组的下标值  
    var Allprice = 0, i = 0;
    let id = e.target.dataset.id,

      index = parseInt(e.target.dataset.index);
    this.data.carts[index].isSelect = !this.data.carts[index].isSelect;
    //价钱统计
    if (this.data.carts[index].isSelect) {
      this.data.totalMoney = this.data.totalMoney + this.data.carts[index].price;
    }
    else {
      this.data.totalMoney = this.data.totalMoney - this.data.carts[index].price;
    }
    //是否全选判断
    for (i = 0; i < this.data.carts.length; i++) {
      Allprice = Allprice + this.data.carts[i].price;
    }
    if (Allprice == this.data.totalMoney) {
      this.data.isAllSelect = true;
    }
    else {
      this.data.isAllSelect = false;
    }
    this.setData({
      carts: this.data.carts,
      totalMoney: this.data.totalMoney,
      isAllSelect: this.data.isAllSelect,
    })
  },
  //全选
  allSelect: function (e) {
    //处理全选逻辑
    let i = 0;
    if (!this.data.isAllSelect) {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = true;
        this.data.totalMoney = Math.floor((this.data.totalMoney + this.data.carts[i].price) * 100) / 100 ;
      }
    }
    else {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = false;
      }
      this.data.totalMoney = 0;
    }
    this.setData({
      carts: this.data.carts,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: this.data.totalMoney,
    })
  },
  // 去结算
  toBuy() {
    wx.showToast({
      title: '去结算',
      icon: 'success',
      duration: 3000
    });
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  //数量变化处理
  handleQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;
    this.data.carts[componentId].count.quantity = quantity;
    this.setData({
      carts: this.data.carts,
    });
  }
});