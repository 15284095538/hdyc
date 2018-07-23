// pages/my/info/order/myorder/myorder.js
var url = getApp().globalData.publicUrl;
Page({
  data: {
    navbar: ["全部", "待付款", "待安装","待评价","退换货"],
    currentIndex: 0,//tabbar索引
    carts:[],
    num: 5,
    scrollHeight:0,
    status:10,
  },
  page: {
    pages: 1,
    pagebuler: true
  },
  onReachBottom: function () { //上拉加载更多
    var that = this;
    if (that.page.pagebuler) {
      that.page.pages++;
      that.getdata();
    }
  },
  onPullDownRefresh: function () { //下拉刷新
    var that = this;
    wx.showNavigationBarLoading();
    that.page.pages = 1;
    that.page.pagebuler = true
    that.getdata();
  },
  navbarTab: function (e) {//切换选项卡
    if (e.currentTarget.dataset.index == 0) {//全部
      this.setData({
        currentIndex: e.currentTarget.dataset.index,
        status:10,
      })
    }
    if (e.currentTarget.dataset.index == 1) {//待付款
      this.setData({
        currentIndex: e.currentTarget.dataset.index,
        status:0
      })
    }
    if (e.currentTarget.dataset.index == 2) {//待安装
      this.setData({
        currentIndex: e.currentTarget.dataset.index,
        status:1
      })
    }
    if (e.currentTarget.dataset.index == 3) {//待评价
      this.setData({
        currentIndex: e.currentTarget.dataset.index,
        status:2
      })
    }
    if (e.currentTarget.dataset.index == 4) {//退换货
      this.setData({
        currentIndex: e.currentTarget.dataset.index,
        status:3
      })
    }
    this.page.pages = 1;
    this.getdata();
  },
  qxdd:function(e){//取消订单
    var order_id = e.currentTarget.id;
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取订单信息
      url: url + 'order/cancelOrder',
      data: {
        //'openid': value.openid,
        'openid': 'oY8zl5VzLFNYkfTTLBqDceqhvgtk',
        'order_id': order_id,
      },
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 500,
          mask: true
        })
        that.getdata();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = 0;
    if (options.id == 10){
      index = 0;
    }else{
      index = Number(options.id) + 1
    }
    this.setData({
      ['currentIndex']: index,
      status: options.id
    })
    this.getdata(options.id);
  },
  getdata(e) {//获取数据
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取订单信息
      url: url + 'user/myOrderList',
      data: {
        //'openid': value.openid,
        'openid':'oY8zl5VzLFNYkfTTLBqDceqhvgtk',
        'status': this.data.status, 
        'page':that.page.pages*10,
      },
      method: 'POST',
      success: function (res) {
        if(res.data.data){
          that.setData({
            ['carts']: res.data.data,
          })
          wx.hideToast();
        }else{
          that.page.pagebuler = false
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 500,
            mask: true
          })
        }
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
      }
    })

  },
})