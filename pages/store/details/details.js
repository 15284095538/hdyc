// pages/store/details/details.js
var url = getApp().globalData.publicUrl;
Page({
  data: {
    aheight:"",
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    navbar: ["服务类别", "客户评价"],
    currentIndex: 0,//tabbar索引 
    store:{
      s_level:'1',
    },
    pinglun:[
      {
        npic:'/images/car_03.png',
        name:'李小姐',
        flag:5,
        time:'2018-05-21',
        message:'每次都在这里洗车，洗的非常专业，服务特别好，很用心。',
        pic:[
          '/images/car_03.png',
          '/images/car_03.png',
          '/images/car_03.png',
          '/images/car_03.png',
        ],
        stype:'标准洗车'
      },
      {
        npic: '/images/car_03.png',
        name: '李小姐',
        flag: 4,
        time: '2018-05-21',
        message: '每次都在这里洗车，洗的非常专业，服务特别好，很用心。',
        pic: [
          '/images/car_03.png',
          '/images/car_03.png',
          '/images/car_03.png',
          '/images/car_03.png',
        ],
        stype: '标准洗车'
      },
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var to = wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude');
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取门店信息
      url: url + 'car/store_details',
      data: {
        store_id:'1',
        class_id:'',
        to:to
      },
      method: 'POST',
      success: function (res) {
        that.setData({ 
          ['store']: res.data.data
        })
        wx.hideToast();
        console.log(res);
      }
    })
    wx.request({//获取门店评论信息
      url: url + 'Store/store_eval',
      data: {
        store_id: '1',
        type: '-1',
        goods_id:'',
        status:'',
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          ['pinglun']: res.data.data
        })
        wx.hideToast();
        console.log(res.data.data.list);
      }
    })


    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          aheight: res.windowHeight
        });
      }

    });



  },
  navbarTab: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    });
  },
  ToPage() {
    wx.navigateTo({
      url: '/pages/store/comment/comment'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTba: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }  ,
  

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