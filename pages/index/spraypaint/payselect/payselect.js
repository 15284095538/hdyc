var url = getApp().globalData.publicUrl;

Page({
  data: {
    selectid: 0,
    text:'',
    data:[],
    class_id:'',
    carid:'',
    list: [],
    all:{
      id:'',
      price:'',
      total_price:'',
    }
  },
  onShow() {
    this.getdata();
  },
  onLoad(e) {
    if (!e.carid) { e.carid = '' }
    this.setData({ text: e.text, class_id: e.class_id, carid: e.carid })
    this.getdata();
  },
  selectclick(e) {
    var selectid = e.currentTarget.dataset.selectid;
    var price = e.currentTarget.dataset.price;
    var id = e.currentTarget.dataset.id;
    var total_price = e.currentTarget.dataset.total_price;
    this.setData({ selectid: selectid, ['all.price']: price, ['all.id']: id, ['all.total_price']: total_price })
  },
  payClick(e){
    if (this.data.data.my_car ){
      wx.navigateTo({
        url: '/pages/index/spraypaint/pay/pay?store_id=' + '&&count_board=' + this.data.data.count_board + '&&count_price=' + this.data.data.count_price + '&&class_id=' + this.data.class_id + '&&price=' + this.data.all.total_price + '&&text=' + this.data.text + '&&paintId=' + this.data.all.id,
      })
    }else{
      wx.showToast({
        title: '请选择爱车',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
  },
  carselect(e){
    wx.redirectTo({
      url: '/pages/my/info/mycar/home/index?type=2&&text=' + this.data.text + '&class_id=' + this.data.class_id
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
      url: url + 'paint/selPro',
      data: {
        board: this.data.text,
        openid: wx.getStorageSync('userinfo').openid,
        price: this.data.price,
        my_car_id: this.data.carid
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            data: res.data.data,
            ['all.id']: res.data.data.goods[0].id,
            ['all.price']: res.data.data.goods[0].price,
            ['all.total_price']: res.data.data.goods[0].total_price,
          })
          wx.hideToast();
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1000,
            mask: true
          })
        }
      }
    })
  }
})