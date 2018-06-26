Page({
  data: {
    navbar: ["车用品", "网约车","新车"],
    currentIndex: 0,//tabbar索引
    isAllSelect: false,
    totalMoney: 0,
    delBtnWidth: 150,
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
  },
  //左滑操作
//手指刚放到屏幕触发  
 touchS: function (e) {
    console.log(e);
    //判断是否只有一个触摸点  
    // console.log(e.touches[0].clientX)  
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标  
        startX: e.touches[0].clientX
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次  
  touchM: function (e) {
    // console.log("touchM:" + e);  
    var that = this
    var index = e.currentTarget.dataset.index;
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标  
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值  
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度  
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变  
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离  
        txtStyle = "margin-left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度  
          txtStyle = "margin-left:-" + delBtnWidth + "px";
        }
        var txt = disX > delBtnWidth / 2 ? "display:flex " : "display:none";
        that.data.carts[index].Style = txtStyle;
        that.data.carts[index].txtStyle = txt;
        //获取手指触摸的是哪一项  
        that.setData({
          carts: that.data.carts,
          index: index,
        })
        // console.log(that.data.carts);
      }
    }
  },
  touchE: function (e) {
    var that = this
    that.clearDelete()
    console.log("下标" + e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    console.log(this.data);

    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标  
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离  
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮  
      var sty = disX > delBtnWidth / 2 ? "margin-left:-" + 150 + "rpx" : "left:0px";
      var txt = disX > delBtnWidth / 2 ? "display:flex " : "display:none";
      that.data.carts[index].Style = sty;
      console.log(sty);
      that.data.carts[index].txtStyle = txt;
      //获取手指触摸的是哪一项  
      that.setData({
        carts: that.data.carts,
        index: index,
      })
      console.log(that.data.carts);
    }
  },
  clearDelete: function () { //移动其他商品时，当前商品删除none  
    for (var i = 0; i < this.data.carts.length; i++) {
      this.data.carts[i].Style = "left:0px";
      this.data.carts[i].txtStyle = "display:none";
    }
    this.setData({
      carts: this.data.carts,
    })
  }  

});