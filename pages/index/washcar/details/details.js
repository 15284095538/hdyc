var url = getApp().globalData.publicUrl;

Page({
  data: {
    aheight:"",
    store_id:'',//门店id
    class_id:'',//分类id
    orderclass_id:'',//洗车服务id
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
  onShareAppMessage(e) {//分享
    return {
      title: this.data.detdata.s_name,
      imageUrl: this.data.detdata.banner[0],
      path: '/pages/index/washcar/details/details?class_id=' + this.data.class_id + '&store_id=' + this.data.store_id
    }
  },
  navbarTab: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    });
  },
  ToPage(e) {
    var store_id = e.currentTarget.dataset.store_id
    wx.navigateTo({
      url: '/pages/index/washcar/comment/comment?store_id=' + store_id +'&goods_id=',
    })
  },
  orderClick(e){//
    var store_id = e.currentTarget.dataset.store_id;
    var class_id = e.currentTarget.dataset.class_id;
    wx.navigateTo({
      url: '/pages/index/washcar/payselect/payselect?store_id=' + store_id + '&class_id=' + class_id + '&mend=' + this.data.detdata.s_name
    })
  },
  Navigation(e) {
    var longitude = Number(this.data.detdata.longitude);
    var latitude = Number(this.data.detdata.latitude);
    wx.openLocation({
      latitude: Number(longitude),
      longitude: Number(latitude),
      name: this.data.detdata.s_address,
      scale: 30
    })
  },
  getdata(e){
    var that = this;
    var orderclass_id = '';
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