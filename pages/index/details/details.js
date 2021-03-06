var url = getApp().globalData.publicUrl;

Page({
  data: {
    swiper: {//banner图
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      indicatorcolor: '#d5d5d5',
      indicatoractivecolor: "#0084ff",
    },
    goods_id: '',
    lastX: 0,     //滑动开始x轴位置
    lastY: 0,     //滑动开始y轴位置
    currentGesture: 0, //标识手势
    isScroll: false,
    bot: false,
    details:[],
    pinglun: [],
    pingluntj:[],
    classify:'',
  },
  onLoad(e){
    this.setData({ goods_id: e.goods_id, classify: e.classify })
    this.getdata();
  },
  onReachBottom: function () {
    this.setData({ bot:true })
  },
  phoneClick(e){
    wx.makePhoneCall({
      phoneNumber: this.data.details.phone
    })
  },
  payclick(e){
    wx.navigateTo({
      url: '/pages/orderPay/orderPay?goods_id=' + this.data.goods_id + '&store_id=' + this.data.store_id + '&value_id=' + this.data.value_id + '&goods_type=1' + '&num=1' + '&classify=' + this.data.classify
    })
  },
  ToPage(){
    wx.navigateTo({
      url: '/pages/index/comment/comment?goods_id=' + this.data.goods_id
    })
  },
  Navigation(e){
    var longitude = Number(this.data.details.longitude);
    var latitude = Number(this.data.details.latitude);
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      name: this.data.details.s_address,
      scale: 30
    })
  },
  //滑动移动事件
  handletouchmove: function (event) {
    var currentX = event.touches[0].pageX
    var currentY = event.touches[0].pageY
    var tx = currentX - this.data.lastX
    var ty = currentY - this.data.lastY
    var isScroll = this.data.isScroll
    var text = ""
    //左右方向滑动
    if (Math.abs(tx) > Math.abs(ty)) {
      if (tx < 0)
        text = "向左滑动"
      else if (tx > 0)
        text = "向右滑动"
    }
    //上下方向滑动
    else {
      if (ty < 0)
        text = "向上滑动", this.setData({ isScroll: true })
      else if (ty > 0)
        text = "向下滑动", this.setData({ isScroll: false, bot: false })
    }
    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX
    this.data.lastY = currentY
  },
  //滑动开始事件
  handletouchtart: function (event) {
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
  },
  //滑动结束事件
  handletouchend: function (event) {
    this.data.currentGesture = 0;
    if (this.data.isScroll && this.data.bot ) {
      wx.navigateTo({
        url: '/pages/index/yhpic/yhpic?goods_id=' + this.data.goods_id
      })
      this.setData({ isScroll: false, })
    }
  },
  onShareAppMessage(e) {//分享
    return {
      title: this.data.details.g_name,
      imageUrl: this.data.details.img_path[0],
      path: '/pages/index/details/details?goods_id=' + this.data.goods_id + '&classify=' + this.data.classify
    }
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
      url: url + 'lists/getShow',
      data: {
        gid: this.data.goods_id,
        type: '-1',
        to: wx.getStorageSync('latitude') + ',' + wx.getStorageSync('longitude'),
        level: wx.getStorageSync('userinfo').level,
        openid: wx.getStorageSync('userinfo').openid,
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            details: res.data.data.details[0],
            pinglun: res.data.data.eval,
            store_id: res.data.data.details[0].store_id,
            value_id: res.data.data.details[0].value_id
          })
          wx.hideToast();
        }
      }
    })
    wx.request({//评论统计
      url: url + 'Store/store_eval',
      data: {
        goods_id: this.data.goods_id,
        type: 2,
        status:'',
        store_id:''
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            pingluntj: res.data.data
          })
          wx.hideToast();
        }
      }
    })
  }
})
