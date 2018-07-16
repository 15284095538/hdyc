var url = getApp().globalData.publicUrl;
Page({
  data: {
    isAllSelect: false,
    totalMoney: 0,
    delBtnWidth: 150,
    // 商品详情介绍
    carts: [

    ]
  }, 

  //左滑操作
  //手指刚放到屏幕触发  
  touchS: function (e) {
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
    var index = e.currentTarget.dataset.index;

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
      that.data.carts[index].txtStyle = txt;
      //获取手指触摸的是哪一项  
      that.setData({
        carts: that.data.carts,
        index: index,
      })
      // console.log(that.data.carts);
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
  },

  onLoad: function (options) {
    //获取数据
    console.log(wx.getStorageSync('userinfo').openid);
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取个人信息
      url: url + 'shopping/getCar',
      data: {
        openid: wx.getStorageSync('userinfo').openid,
        goods_type: '0',
        level: '',
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          ['carts']: res.data.data.data
        })

        wx.hideToast();
        console.log(res);
      }
    })
  },

});

