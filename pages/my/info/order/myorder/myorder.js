// pages/my/info/order/myorder/myorder.js
var url = getApp().globalData.publicUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     
    navbar: ["全部", "待付款", "待安装","待评价","退换货"],
    currentIndex: 0,//tabbar索引
    carts:[
      
    ],
    num: 5,
    page: 1,
    scrollHeight:0
  },
  page: {
    pages: 1,
    pagebuler: true
  },
  // loadMore: function () {//上拉加载更多
  //    if (this.page.pagebuler) {
  //     wx.showToast({
  //     title: '上拉成功',
  //     icon: 'success',
  //     duration: 1000,
  //     mask: true
  //   })
  //     this.page.pages++;
  //     if (this.data.currentIndex==0){
  //       this.getdata(10);
  //     }else{
  //       this.getdata(this.data.currentIndex-1);
  //     }
  //   }
  // },
  // refresh: function () {
  //   wx.showNavigationBarLoading() //在标题栏中显示加载
  //   this.page.pages = 1;
  //   this.page.pagebuler = true
  //   if (this.data.currentIndex == 0) {
  //     this.getdata(10);
  //   } else {
  //     this.getdata(this.data.currentIndex - 1);
  //   }
    
  //   wx.showToast({
  //     title: '下拉成功',
  //     icon: 'success',
  //     duration: 1000,
  //     mask: true
  //   })
  // },
  navbarTab: function (e) {
    if (e.currentTarget.dataset.index == 0) {
      this.getdata(10);
      this.setData({
        currentIndex: e.currentTarget.dataset.index,
      })
    }
    if (e.currentTarget.dataset.index == 1) {
      this.getdata(0);
      this.setData({
        currentIndex: e.currentTarget.dataset.index,
      })
    }
    if (e.currentTarget.dataset.index == 2) {
      this.getdata(1);
      this.setData({
        currentIndex: e.currentTarget.dataset.index,
      })
    }
    if (e.currentTarget.dataset.index == 3) {
      this.getdata(2);
      this.setData({
        currentIndex: e.currentTarget.dataset.index,
      })
    }
    if (e.currentTarget.dataset.index == 4) {
      this.getdata(3);
      this.setData({
        currentIndex: e.currentTarget.dataset.index,
      })
    }
  },
  qxdd:function(e){
   console.log('fafaf');
  },
  sqsh: function (e) {
    console.log('sqsh');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata(options.id);
    if(Number(options.id)==10){
      this.setData({
        ['currentIndex']: 0 ,
      })
      return false;
    }
    this.setData({
      ['currentIndex']: Number(options.id) + 1,
    })
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  getdata(e) {//获取数据
    var that = this;
    var value = wx.getStorageSync('userinfo');
    wx.request({//获取订单信息
      url: url + 'user/myOrderList',
      data: {
        //'openid': value.openid,
        'openid':'oY8zl5VzLFNYkfTTLBqDceqhvgtk',
        'status': e, 
      },
      method: 'POST',
      success: function (res) {
        if(res.data.code == 200){
          that.setData({
            ['carts']: res.data.data
          })
        }
        if (res.data.code == 400){
          that.setData({
            ['page.pagebuler'] : false
          })
          
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 1000,
            mask: true
          })
         }
        console.log(res);
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})