// pages/store/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _num: 1,
    pinglun: [
      {
        npic: '../../../images/car_03.png',
        name: '李小姐',
        flag: 4,
        time: '2018-05-21',
        message: '每次都在这里洗车，洗的非常专业，服务特别好，很用心。',
        pic: [
          '../../../images/car_03.png',
          '../../../images/car_03.png',
          '../../../images/car_03.png',
          '../../../images/car_03.png',
        ],
        stype: '标准洗车'
      },
      {
        npic: '../../../images/car_03.png',
        name: '李小姐',
        flag: 5,
        time: '2018-05-21',
        message: '每次都在这里洗车，洗的非常专业，服务特别好，很用心。',
        pic: [
          '../../../images/car_03.png',
          '../../../images/car_03.png',
          '../../../images/car_03.png',
          '../../../images/car_03.png',
        ],
        stype: '标准洗车'
      },

    ]
  }, 
  click: function (e) {
    console.log(e.target.dataset.num)
    this.setData({
      _num: e.target.dataset.num
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;


    
  },

  navbarTab: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    });
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