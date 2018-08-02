// pages/store/details/details.js
var url = getApp().globalData.publicUrl;
Page({
  data: {
    aheight:"",
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    navbar: ["服务类别", "客户评价"],
    currentIndex: 0,//tabbar索引 
    store:{
      s_level:'1',
    },
    pinglun:[]
  },
  Navigation(e) {
    var longitude = Number(e.currentTarget.dataset.longitude);
    var latitude = Number(e.currentTarget.dataset.latitude);
    wx.openLocation({
      latitude: Number(longitude),
      longitude: Number(latitude),
      name: this.data.store.s_address,
      scale: 30
    })

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
        store_id: options.id,
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
        store_id: options.id,
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
  ToPage(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/store/comment/comment?id=' + id + ''
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
  listClick(e){
    var class_id = e.currentTarget.dataset.class_id;
    var name = e.currentTarget.dataset.name;
    var store_id = e.currentTarget.dataset.store_id;
    if( name == "洗车" ){
      wx.navigateTo({
        url: '/pages/index/washcar/payselect/payselect?class_id=' + class_id + "&store_id=" + store_id,
      })
    }else{
      wx.navigateTo({
        url: '/pages/index/list/list?id=' + class_id + '&name=' + name + "&store_id=" + store_id,
      })
    }
  }
})