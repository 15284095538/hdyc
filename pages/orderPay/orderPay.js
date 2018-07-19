var url = getApp().globalData.publicUrl;

Page({
  data: {
    winHeight:'',
    goods_id:'',
    goods_type:'',
    store_id:'',
    value_id:'',
    orderdata:[],
    spDisplay:'none',
    couponDisplyClick:"none",
    couponindex:0,
    num:'',
    paycoupon:{
      id:'',
      cost:''
    }
  },
  onLoad(e){
    var that = this
    that.setData({
      goods_id: e.goods_id,
      goods_type: e.goods_type,
      store_id: e.store_id,
      value_id: e.value_id,
      num: e.num,
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ winHeight: res.windowHeight })
      }
    })
    this.getdata();
  },
  spDisplayClick(e){//商品图片点击
    this.setData({ spDisplay:'block' })
  },
  spDisplayNclick(e){
    this.setData({ spDisplay: 'none' })
  },
  couponDisplyClick(e){//优惠券点击
    if (this.data.orderdata.coupon.length > 0 ){
      this.setData({ couponDisplyClick: 'block' })
    }
  },
  couponDisplyNClick(e){
    this.setData({ couponDisplyClick: 'none' })
  },
  shdiz(e){
    wx.navigateTo({
      url: '/pages/my/info/receivingaddress/home/index'
    })
  },
  couponliClick(e){//优惠券列表点击
    var id = e.currentTarget.dataset.id;
    var cost = e.currentTarget.dataset.cost;
    var index = e.currentTarget.dataset.index;
    this.setData({ 
      ['paycoupon.id']: id,
      ['paycoupon.cost']: cost,
      couponindex:index
    })
    this.couponDisplyNClick();
  },
  getdata(e) {//获取数据
    var that = this;
    var spprice = 0;
    var paycouponid, paycouponcost;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取分类
      url: url + 'order/order',
      data: {
        goods_id: this.data.goods_id,
        goods_type: this.data.goods_type,
        store_id: this.data.store_id,
        value_id: this.data.value_id,
        number: this.data.num,
        openid: wx.getStorageSync('userinfo').openid,
        to: wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude'),
        level: wx.getStorageSync('userinfo').level,
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          if (res.data.data.coupon.length > 0 ){//判断优惠券是否
            paycouponid = res.data.data.coupon[0].id;
            paycouponcost = res.data.data.coupon[0].cost;
          }
          that.setData({
            orderdata: res.data.data,
            ['paycoupon.id']: paycouponid,
            ['paycoupon.cost']: paycouponcost
          })
          wx.hideToast();
        }
      }
    })
  }
})