// pages/my/info/order/myorder/myorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    navbar: ["全部", "代付款", "待安装","待评价","退换货"],
    currentIndex: 0,//tabbar索引
    carts:[
      {
        dnum: 'TH28497737',
        status: '待付款',
        pic: '/images/car_03.png',
        sname: '3M高效发动机内部清洗剂296MLM高效...',
        snum: 3,
        price: '68.00',
        stype: 1
      },
      {
        dnum: 'TH28497737',
        status: '已到店',
        pic: '/images/car_03.png',
        sname: '3M高效发动机内部清洗剂296MLM高效...',
        snum: 3,
        price: '68.00',
        stype: 2
      },
      {
        dnum: 'TH28497737',
        status: '待评价',
        pic: '/images/car_03.png',
        sname: '3M高效发动机内部清洗剂296MLM高效...',
        snum: 3,
        price: '68.00',
        stype: 3
      },
      {
        dnum: 'TH28497737',
        status: '退换货',
        pic: '/images/car_03.png',
        sname: '3M高效发动机内部清洗剂296MLM高效...',
        snum: 3,
        price: '68.00',
        stype: 4
      },
    ]
  },
  navbarTab: function (e) {
    if (e.currentTarget.dataset.index == 0) {
      this.setData({
        carts: [
          {
            dnum: 'TH28497737',
            status: '待付款',
            pic: '/images/car_03.png',
            sname: '3M高效发动机内部清洗剂296MLM高效...',
            snum: 3,
            price: '68.00',
            stype: 1
          },
          {
            dnum: 'TH28497737',
            status: '已到店',
            pic: '/images/car_03.png',
            sname: '3M高效发动机内部清洗剂296MLM高效...',
            snum: 3,
            price: '68.00',
            stype: 2
          },
          {
            dnum: 'TH28497737',
            status: '待评价',
            pic: '/images/car_03.png',
            sname: '3M高效发动机内部清洗剂296MLM高效...',
            snum: 3,
            price: '68.00',
            stype: 3
          },
          {
            dnum: 'TH28497737',
            status: '退换货',
            pic: '/images/car_03.png',
            sname: '3M高效发动机内部清洗剂296MLM高效...',
            snum: 3,
            price: '68.00',
            stype: 4
          },
        ],
        currentIndex: e.currentTarget.dataset.index,
      });
    }
    if (e.currentTarget.dataset.index == 1) {
      this.setData({
        carts: [
          {
            dnum: 'TH28497737',
            status: '待付款',
            pic: '/images/car_03.png',
            sname: '3M高效发动机内部清洗剂296MLM高效...',
            snum: 3,
            price: '68.00',
            stype: 1
          },
          {
            dnum: 'TH28497737',
            status: '待付款',
            pic: '/images/car_03.png',
            sname: '3M高效发动机内部清洗剂296MLM高效...',
            snum: 3,
            price: '68.00',
            stype: 1
          },
          {
            dnum: 'TH28497737',
            status: '待付款',
            pic: '/images/car_03.png',
            sname: '3M高效发动机内部清洗剂296MLM高效...',
            snum: 3,
            price: '68.00',
            stype: 1
          },
        ],
        currentIndex: e.currentTarget.dataset.index,
      });
    }
    if (e.currentTarget.dataset.index == 2) {
      this.setData({
        carts: [
          {
            dnum: 'TH28497737',
            status: '已到店',
            pic: '/images/car_03.png',
            sname: '3M高效发动机内部清洗剂296MLM高效...',
            snum: 3,
            price: '68.00',
            stype: 2
          },
          {
            dnum: 'TH28497737',
            status: '已到店',
            pic: '/images/car_03.png',
            sname: '3M高效发动机内部清洗剂296MLM高效...',
            snum: 3,
            price: '68.00',
            stype: 2
          },
          {
            dnum: 'TH28497737',
            status: '已到店',
            pic: '/images/car_03.png',
            sname: '3M高效发动机内部清洗剂296MLM高效...',
            snum: 3,
            price: '68.00',
            stype: 2
          },
        ],
        currentIndex: e.currentTarget.dataset.index,
      });
    }
    if (e.currentTarget.dataset.index == 3) {
      this.setData({
        carts: [
          {
            dnum: 'TH28497737',
            status: '待评价',
            pic: '/images/car_03.png',
            sname: '3M高效发动机内部清洗剂296MLM高效...',
            snum: 3,
            price: '68.00',
            stype: 3
          },
          {
            dnum: 'TH28497737',
            status: '待评价',
            pic: '/images/car_03.png',
            sname: '3M高效发动机内部清洗剂296MLM高效...',
            snum: 3,
            price: '68.00',
            stype: 3
          },
          {
            dnum: 'TH28497737',
            status: '待评价',
            pic: '/images/car_03.png',
            sname: '3M高效发动机内部清洗剂296MLM高效...',
            snum: 3,
            price: '68.00',
            stype: 3
          },

        ],
        currentIndex: e.currentTarget.dataset.index,
      });
    }
    if (e.currentTarget.dataset.index == 4) {
      this.setData({
        carts: [
          {
            dnum: 'TH28497737',
            status: '退换货',
            pic: '/images/car_03.png',
            sname: '3M高效发动机内部清洗剂296MLM高效...',
            snum: 3,
            price: '68.00',
            stype: 4
          },
          {
            dnum: 'TH28497737',
            status: '退换货',
            pic: '/images/car_03.png',
            sname: '3M高效发动机内部清洗剂296MLM高效...',
            snum: 3,
            price: '68.00',
            stype: 4
          },
          {
            dnum: 'TH28497737',
            status: '退换货',
            pic: '/images/car_03.png',
            sname: '3M高效发动机内部清洗剂296MLM高效...',
            snum: 3,
            price: '68.00',
            stype: 4
          },
        ],
        currentIndex: e.currentTarget.dataset.index,
      });
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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