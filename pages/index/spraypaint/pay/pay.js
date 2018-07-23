var url = getApp().globalData.publicUrl;


Page({
  data: {
    class_id:'',
    count_board:'',
    count_price:'',
    price:'',
    store_id:'',
    text:'',
    data:[],
    winHeight:'',
    couponDisplyClick:'none',
    couponindex:0,
    paycoupon: {
      id: '',
      cost: ''
    }
  },
  onLoad(e) {
    var that = this;
    this.setData({ 
      class_id: e.class_id,
      count_board: e.count_board,
      count_price: e.count_price,
      price: e.price,
      store_id: e.store_id,
      text: e.text,
     })
    this.getdata();
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ winHeight: res.windowHeight })
      }
    })
  },
  couponliClick(e) {//优惠券列表点击
    var id = e.currentTarget.dataset.id;
    var cost = e.currentTarget.dataset.cost;
    var index = e.currentTarget.dataset.index;
    this.setData({
      ['paycoupon.id']: id,
      ['paycoupon.cost']: cost,
      couponindex: index
    })
    this.couponDisplyNClick();
  },
  couponDisplyClick(e) {//优惠券点击
    if (this.data.data.coupon.length > 0) {
      this.setData({ couponDisplyClick: 'block' })
    }
  },
  couponDisplyNClick(e) {
    this.setData({ couponDisplyClick: 'none' })
  },
  listClick(e){
    wx.navigateTo({ //查看列表
      url: '/pages/index/spraypaint/servicelist/servicelist?store_id=' + '&&count_board=' + this.data.data.count_board + '&&count_price=' + this.data.data.count_price + '&&class_id=' + this.data.class_id + '&&price=' + this.data.price + '&&text=' + this.data.text
    })
  },
  storeClick(e){// 选择门店
    wx.navigateTo({
      url: '/pages/orderStore/orderStore?store_id=' + this.data.store_id + '&&count_board=' + this.data.count_board + '&&count_price=' + this.data.count_price + '&&class_id=' + this.data.class_id + '&&price=' + this.data.price + '&&text=' + this.data.text
    })
  },
  getdata(e) {//获取数据
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取分类
      url: url + 'paint/paintOrder',
      data: {
        store_id: this.data.store_id,
        board: this.data.text,
        count_price: this.data.count_price,
        price: this.data.price,
        count_board: this.data.count_board,
        openid: wx.getStorageSync('userinfo').openid,
        to: wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude'),
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            data: res.data.data
          })
          if (res.data.data.coupon ){
            that.setData({
              ['paycoupon.id']: res.data.data.coupon[0].id,
              ['paycoupon.cost']: res.data.data.coupon[0].cost,
            })
          }
          wx.hideToast();
        }
      }
    })
  }
})