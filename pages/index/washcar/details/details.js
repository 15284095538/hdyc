var url = getApp().globalData.publicUrl;

Page({
  data: {
    aheight:"",
    store_id:'',
    class_id:'',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    detdata:[],
    navbar: ["服务类别", "客户评价"],
    currentIndex: 0,//tabbar索引 
    pinglun:[]
  },
  onLoad: function (e) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          aheight: res.windowHeight,
          class_id: e.class_id,
          store_id: e.store_id,
        });
      }
    });
    this.getdata();
    this.getstoreeval();
  },

  navbarTab: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    });
  },
  ToPage(e) {
    var store_id = e.currentTarget.dataset.store_id
    wx.navigateTo({
      url: '/pages/index/washcar/comment/comment?store_id=' + store_id,
    })
  },
  getdata(e){
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取内容
      url: url + 'car/store_details',
      data: {
        store_id: this.data.store_id,
        to: wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude'),
        class_id: this.data.class_id,
      },
      method: 'POST',
      success: res => {
        if( res.data.code == 200 ){
          that.setData({
            detdata: res.data.data
          })
        }
        wx.hideToast();
      }
    })
  },
  getstoreeval(e) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取内容
      url: url + 'Store/store_eval',
      data: {
        store_id: this.data.store_id,
        type: -1,
        goods_id:'',
        status:'',
      },
      method: 'POST',
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          that.setData({
            pinglun: res.data.data
          })
        }
        wx.hideToast();
      }
    })
  },
})