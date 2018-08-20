var url = getApp().globalData.publicUrl;
Page({
  data: {
    selectid:0,
    store_id:'',
    class_id:'',
    goods_id:'',//商品id
    goods_idprice:'',
    value_id:'',
  },
  onLoad: function (e) {
    this.setData({ 
      store_id: e.store_id,
      class_id: e.class_id
    })
    this.getdata();
  },
  selectclick(e){
    var selectid = e.currentTarget.dataset.selectid; 
    var id = e.currentTarget.dataset.id;
    var goods_idprice = e.currentTarget.dataset.goods_idprice;
    var value_id = e.currentTarget.dataset.value_id;
    this.setData({ selectid: selectid, goods_id: id, goods_idprice: goods_idprice, value_id:value_id })
  },
  payorder(e){
    wx.navigateTo({
      url: '/pages/index/washcar/paybuy/paybuy?goods_id=' + this.data.goods_id + '&mend=' + this.data.detdata.s_name + '&store_id=' + this.data.store_id + '&price=' + this.data.goods_idprice + '&value_id=' + this.data.value_id ,
    })
  },
  getdata(e) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取内容
      url: url + 'car/store_goods',
      data: {
        store_id: this.data.store_id,
        to: wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude'),
        class_id: this.data.class_id,
        openid: wx.getStorageSync('userinfo').openid,
      },
      method: 'POST',
      success: res => {
        console.log(res )
        that.setData({
          goods_id: res.data.data.goods[0].id,
          goods_idprice: res.data.data.goods[0].price,
          detdata: res.data.data,
          value_id: res.data.data.goods[0].value_id,
        })
        wx.hideToast();
      }
    })
  },
})