var url = getApp().globalData.publicUrl;

Page({
  data: {
    selectid: 0,
    text:'',
    price:299,
    data:[],
    class_id:'',
    list: [
      {
        'path': '/images/xiche1.png',
        'name': '标准漆',
        'priceT': 299,
        'price': '￥299.00/标准面',
        't': '标准漆包括：打蜡、普通轮胎更换、7座机器打蜡'
      },
      {
        'path': '/images/xiche2.png',
        'name': '高端漆',
        'priceT': 399,
        'price': '￥399.00/标准面',
        't': '高端漆包括：打蜡、普通轮胎更换、7座机器打蜡、强效动力进气系统清洗、空调系统内循环清洗'
      }
    ]
  },
  onLoad(e) {
    this.setData({ text: e.text, class_id: e.class_id })
    this.getdata();
  },
  selectclick(e) {
    var selectid = e.currentTarget.dataset.selectid;
    var pricet = e.currentTarget.dataset.pricet;
    this.setData({ selectid: selectid, price: pricet, })
    this.getdata();
  },
  payClick(e){
    if (this.data.data.my_car ){
      wx.navigateTo({
        url: '/pages/index/spraypaint/pay/pay?store_id=' + '&&count_board=' + this.data.data.count_board + '&&count_price=' + this.data.data.count_price + '&&class_id=' + this.data.class_id + '&&price=' + this.data.price + '&&text=' + this.data.text
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
    wx.navigateTo({
      url: '/pages/my/info/mycar/home/index?type=2&&text=' + this.data.text
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
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            data: res.data.data
          })
          wx.hideToast();
        }
      }
    })
  }
})