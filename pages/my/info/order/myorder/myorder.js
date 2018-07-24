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
    // if (e.currentTarget.dataset.index == 5) {//已完成
    //   this.setData({
    //     currentIndex: e.currentTarget.dataset.index,
    //     status: 4
    //   })
    // }
    this.page.pages = 1;
    this.getdata();
  },
  ljfk:function(e){//立即支付
    var order_sn = e.currentTarget.id;
    var value = wx.getStorageSync('userinfo');
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//立即支付
      url: url + 'order/nowPay',
      data: {
        'openid': value.openid,
        //'openid': 'oY8zl5VzLFNYkfTTLBqDceqhvgtk',
        'order_id': order_sn,
      },
      method: 'POST',
      success: function (res) {
        wx.hideToast();
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 500,
              mask: true
            })
            wx.switchTab({
              url: '/pages/my/home/index'
            })
          },
          'fail': function (res) {
            wx.showToast({
              title: '支付失败',
              icon: 'success',
              duration: 500,
              mask: true
            })
          }
        })
      }
    })
  },
  qxdd:function(e){//取消订单
  var that = this;
    wx.showModal({
      title: '是否删除订单',
      success: function (res) {
        if (res.confirm) {
          var order_id = e.currentTarget.id;
          var value = wx.getStorageSync('userinfo');
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 55000,
            mask: true
          })
          wx.request({//获取订单信息
            url: url + 'order/cancelOrder',
            data: {
              'openid': value.openid,
              //'openid': 'oY8zl5VzLFNYkfTTLBqDceqhvgtk',
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
        } else {
          
        }

      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
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
        'openid': wx.getStorageSync('userinfo').openid,
        'status': this.data.status, 
        'page':that.page.pages*10,
      },
      method: 'POST',
      success: function (res) {
        if(res.data.msg=='暂无数据'){
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 500,
            mask: true
          })
          that.setData({
            ['carts']: res.data.data,
          })
          wx.hideToast();
        } else if (res.data.code == 200){
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
  onShow: function () {
    this.getdata(this.data.status)
  },
})
