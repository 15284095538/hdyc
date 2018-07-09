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
    isScroll: false,
    bot: false,
    carcolor:'',
    carattribute:{
      carattributeindex:0,
      carattributeimg:'',
      carattributeval:'',
      carattributeprice:'',
      carattributepid:0,
      carattributeinventory:'',
    },
    carattributeTwo:[],
    displacement:{
      displacementindex:0,
      displacementpid:'',
      displacementval:'',
    },
    tel:'',
  },
  onLoad(e){
    this.setData({
      detailsid:e.id,
    })
    this.getdata();
  },
  onPageScroll(e){
    this.setData({ isScroll: false })
  },
  onReachBottom(e) {
    this.setData({ isScroll: true })
  },
  telphone(e){//拨打电话
    wx.makePhoneCall({
      phoneNumber: this.data.tel,
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
    if (this.data.isScroll) {
      wx.navigateTo({
        url: '/pages/index/buycar/pic/pic?id=' + this.data.detailsid
      })
      this.setData({ isScroll: false })
    }
  },
  colorclick(e){//颜色点击
    var that = this;
    var price = e.currentTarget.dataset.price;
    var img = e.currentTarget.dataset.img;
    var pid = e.currentTarget.dataset.pid;
    var index = e.currentTarget.dataset.index;
    var val = e.currentTarget.dataset.val;
    var inventory = e.currentTarget.dataset.inventory;
    this.setData({
      ['carattribute.carattributeimg']: img,
      ['carattribute.carattributeval']: val,
      ['carattribute.carattributeprice']: price,
      ['carattribute.carattributeindex']: index,
      ['carattribute.carattributepid']: pid,
      ['carattribute.carattributeinventory']: inventory,
      ['displacement.displacementpid']: pid,
    });
    if (this.data.carattributeTwo.length !== 0) {
      this.getcarinventory();
    }
  },
  displacementclick(e){//二级点击
    var that = this;
    var index = e.currentTarget.dataset.index;
    var pid = e.currentTarget.dataset.pid;
    this.setData({
      ['displacement.displacementindex']: index,
      ['displacement.displacementpid']: pid,
    });
  },
  addshoppingcar(e){//加入购物车
    wx.showToast({
      title: '请稍后',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取二级属性
      url: url + 'shopping/setCar',
      data: {
        openid: wx.getStorageSync('userinfo').openid,
        goods_id: this.data.detailsid,
        number: 1,
        goods_type:2,
        value_id: this.data.displacement.displacementpid
      },
      method: 'POST',
      success: res => {
        if (res.data.code == 200) {
          wx.showToast({
            title: '加入购物车成功',
            icon: 'success',
            duration: 500,
            mask: true
          })
        }
      }
    })
  },
  getcarinventory(e){//获取二级属性
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取二级属性
      url: url + 'car/get_car_value',
      data: {
        id: this.data.detailsid,
        pid: this.data.carattribute.carattributepid,
      },
      method: 'POST',
      success: res => {
        if (res.data.code == 200) {
          console.log( res )
          if (res.data.data.name !== '' ){
            that.setData({
              carattributeTwo: res.data.data,
              ['displacement.displacementval']: res.data.data.data[0].val,
              ['carattribute.carattributeinventory']: res.data.data.data[0].inventory,
              ['carattribute.carattributeprice']: res.data.data.data[0].price,
              ['displacement.displacementpid']: res.data.data.data[0].id,
            })
          }
        }
        wx.hideToast();
      }
    })
  },
  layerColorclick(e){
    this.setData({ layerColorDisplay: 'block' })
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
  onShareAppMessage(e) {//分享
    return {
      title: this.data.detailslist.car_name,
      path: '/pages/index/buycar/details/details?id=' + this.data.detailsid,
      imageUrl: this.data.swiper.imgUrl[0].path
    }
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
        if (res.data.code == 200) {
          wx.hideToast();
          that.setData({
            ["swiper.imgUrl"]: res.data.data.imgs,
            detailslist: res.data.data,
            carcolor: res.data.data.sx,
            tel: res.data.data.tel,
          })
          if ( res.data.data.sx !== '' ){
            that.setData({
              ['carattribute.carattributeimg']: res.data.data.sx.data[0].img,
              ['carattribute.carattributeval']: res.data.data.sx.data[0].val,
              ['carattribute.carattributeprice']: res.data.data.sx.data[0].price,
              ['carattribute.carattributepid']: res.data.data.sx.data[0].id,
              ['carattribute.carattributeinventory']: res.data.data.sx.data[0].inventory,
              ['displacement.displacementpid']: res.data.data.sx.data[0].id,
            })
            this.getcarinventory();
          }
          wx.hideToast();
        }
      }
    })
  }
})
