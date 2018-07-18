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
      imgUrl: [],
    },
    goods_id:'',
    isScroll: false,
    bot: false,
    layerColorDisplay:'none',
    layerLiftcarDisplay: 'none',
    upMoreDisplay:'none',
    dettels:[],
    lastX: 0,     //滑动开始x轴位置
    lastY: 0,     //滑动开始y轴位置
    currentGesture: 0, //标识手势
    selectSx:[],
    shuxIndex:0
  },
  onLoad(e){
    this.setData({ goods_id: e.goods_id })
    this.getdata();
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
        text = "向上滑动", this.data.isScroll = true
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
    if (this.data.isScroll && this.data.bot) {
      wx.navigateTo({
        url: '/pages/index/suppliescar/pic/pic?goods_id=' + this.data.goods_id
      })
      this.setData({ isScroll: false, bot: false })
    }

  },
  onReachBottom: function () {
    this.setData({ bot: true })
  },
  shuxClick(e){
    var index = e.currentTarget.dataset.index;
    var img = e.currentTarget.dataset.img;
    var price = e.currentTarget.dataset.price;
    var inventory = e.currentTarget.dataset.inventory;
    var value_id = e.currentTarget.dataset.value_id;
    this.setData({
      ['selectSx.img']: img,
      ['selectSx.price']: price,
      ['selectSx.inventory']: inventory,
      ['selectSx.value_id']: value_id,
      shuxIndex: index,
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
      url: url + 'goods/goods_details',
      method: 'POST',
      data: {
        goods_id: this.data.goods_id,
        level: wx.getStorageSync('userinfo').level,
      },
      success: function (res) {
        if( res.data.code == 200 ){
          wx.hideToast();
          that.setData({
            dettels: res.data.data,
            selectSx: res.data.data.sx.data[0]
          })
        }else{
          wx.showToast({
            title: '请求失败',
            icon: 'loading',
            duration: 55000,
            mask: true
          })
        }
      }
    })
  }
})
