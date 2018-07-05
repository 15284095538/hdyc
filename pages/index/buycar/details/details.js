var url = getApp().globalData.publicUrl;

Page({
  data: {
    detailsid:'',
    swiper: {//banner图
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      indicatorcolor: '#d5d5d5',
      indicatoractivecolor: "#0084ff",
      imgUrl: []
    },
    detailslist:[],
    layerColorDisplay:'none',
    layerLiftcarDisplay: 'none',
    bglayerfqDisplay:'none',
    scheme:[],
    lastX: 0,     //滑动开始x轴位置
    lastY: 0,     //滑动开始y轴位置
    currentGesture: 0, //标识手势
    isScroll: false
  },
  onLoad(e){
    this.setData({
      detailsid:e.id,
    })
    this.getdata();
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
        text = "向上滑动",this.data.isScroll = true
      else if (ty > 0)
        text = "向下滑动"
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
    if (this.data.isScroll) {
      wx.navigateTo({
        url: '/pages/index/buycar/pic/pic?id=' + this.data.detailsid
      })
    }
  },
  layerColorclick(e){
    this.setData({ layerColorDisplay:'block' })
  },
  bglayerColorclick(e){
    this.setData({ layerColorDisplay: 'none' })
  },
  closelayerColor(e){
    this.bglayerColorclick();
  },
  bglayerLiftcarclick(e){
    this.setData({ layerLiftcarDisplay: 'none' })
  },
  layerLiftcarclick(e){
    this.setData({ layerLiftcarDisplay: 'block' })
  },
  layerfqclick(e){
    this.setData({ bglayerfqDisplay: 'block' })
  },
  bglayerfqclick(e){
    this.setData({ bglayerfqDisplay: 'none' })
  },
  getdata(e){
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取分期
      url: url + 'car/scheme',
      data: {
        id: that.data.detailsid
      },
      method: 'POST',
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            scheme:res.data.data
          })
        }
      }
    })
    wx.request({//获取内容
      url: url + 'car/car_details',
      data:{
        id: that.data.detailsid
      },
      method: 'POST',
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          that.setData({
            ["swiper.imgUrl"]: res.data.data.imgs,
            detailslist: res.data.data
          })
          wx.hideToast();
        }
      }
    })
  }
})
