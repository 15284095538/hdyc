var url = getApp().globalData.publicUrl;
Page({
  data: {
    IMgFalse: false,
    navbar: ["车用品","新车"],
    currentIndex: 0,//tabbar索引
    isAllSelect: false,
    totalMoney: 0,
    delBtnWidth: 150,
    // 商品详情介绍
    carts: [

    ],
    gid:"",
    vule_id:'',
  },
  navbarTab: function (e) {
    if (e.currentTarget.dataset.index==1){
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
          goods_type: '2',
          level: '',
        },
        method: 'POST',
        success: function (res) {
          wx.hideToast();
          that.setData({ currentIndex: e.currentTarget.dataset.index, })
          if (res.data.data.data.length == 0) {
            that.setData({
              ['carts']: res.data.data.data,
              IMgFalse: true,
            })
          } else {
            that.setData({
              ['carts']: res.data.data.data,
              IMgFalse: false,
            })
          }
          
          
        }
      })

    }
   
    if (e.currentTarget.dataset.index == 0) {
      //获取数据
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
          wx.hideToast();
          that.setData({ currentIndex: e.currentTarget.dataset.index, })
          if (res.data.data.data.length == 0){
            that.setData({
              ['carts']: res.data.data.data,
              IMgFalse: true,
            })
          } else {
            that.setData({
            ['carts']: res.data.data.data,
              IMgFalse: false,
          })
          }
          
        }
      })
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
    //统计价格
      this.data.totalMoney = Number(this.data.totalMoney + Number(this.data.carts[index].price) * Number(this.data.carts[index].number));
    }
    else {
      this.data.totalMoney = Number(this.data.totalMoney - Number(this.data.carts[index].price));
    }
    //是否全选判断
    for (i = 0; i < this.data.carts.length; i++) {
      
      Allprice = Number(Allprice) + (Number(this.data.carts[i].price) * Number(this.data.carts[i].number));
      if (this.data.carts[i].isSelect==true){
        if(this.data.gid==""){
        this.data.gid = this.data.carts[i].goods_id;
      }else{
        this.data.gid = this.data.gid + "," + this.data.carts[i].goods_id;
      }
      }
      
    }
    var gid = this.data.gid

    if (Allprice == this.data.totalMoney) {
      this.data.isAllSelect = true;
    }
    else {
      this.data.isAllSelect = false;
      this.data.gid='';
    }
    this.setData({
      carts: this.data.carts,
      totalMoney: this.data.totalMoney,
      isAllSelect: this.data.isAllSelect,
      vule_id: gid,
    })
    
  },
  //全选
  allSelect: function (e) {
    this.data.totalMoney = 0;
    //处理全选逻辑
    let i = 0;
    if (!this.data.isAllSelect) {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = true;
        //统计全选价格
        this.data.totalMoney = Math.floor((this.data.totalMoney + (Number(this.data.carts[i].price) * Number(this.data.carts[i].number))) * 100) / 100 ;
        if (this.data.gid == "") {
          this.data.gid = this.data.carts[i].goods_id;
        } else {
          this.data.gid = this.data.gid + "," + this.data.carts[i].goods_id;
        }
        
      }
    }
    else {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = false;
      }
      this.data.totalMoney = 0;
      this.data.gid='';
    }
    var gid = this.data.gid
    this.setData({
      carts: this.data.carts,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: this.data.totalMoney,
      vule_id: gid
    })
  },
  // 去结算
  toBuy() {
    if (this.data.vule_id ){
      wx.navigateTo({
        url: '/pages/orderPay/orderPay?goods_id=' + this.data.vule_id + '&store_id=' + '&value_id=' + '&goods_type=0' + '&num='
      })
    }else{
      wx.showToast({
        title: '请选择商品',
        icon: 'success',
        duration: 500,
        mask: true
      })
    }
    
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
      goods_type:'0',
      level:'', 
    },
    method: 'POST',
    success: function (res) { 
      wx.hideToast();

      
      if (res.data.data.data.length == 0) {
        that.setData({
          ['carts']: res.data.data.data,
          IMgFalse: true,
        })
      } else {
        that.setData({
          ['carts']: res.data.data.data,
          IMgFalse: false,
        })
      }
     
      
    }
  })
  },




  deleteProd(e) {//加入购物车
  var that = this;
    var id = e.currentTarget.id;
  wx.showToast({
    title: '请稍后',
    icon: 'loading',
    duration: 55000,
    mask: true
  })
  wx.request({//获取二级属性
    url: url + 'shopping/delCar',
    data: {
      shopping_id: e.currentTarget.id,
    },
    method: 'POST',
    success: res => {
      if (res.data.code == 200) {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        carts.splice(index, 1); // 删除购物车列表里这个商品
        this.setData({
          carts: carts
        });
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 500,
          mask: true
        })
        
      }
    }
  })
},
});

 