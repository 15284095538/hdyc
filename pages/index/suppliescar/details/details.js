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
    shuxIndex:0,
    ershuxIndex:0,
    num: 1,
    minusStatus: 'disabled',
    category_id:'',
  },
  onLoad(e){
    this.setData({ goods_id: e.goods_id, category_id: e.category_id, })
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
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    num++;
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  bindManual: function (e) {
    var num = e.detail.value;
    this.setData({
      num: num
    });
  },
  handletouchmove: function (event) {//滑动移动事件
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
  goshoppingcar(e){
    wx.showToast({
      title: '请稍后',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    var value_id;
    if (this.data.selectSx ){
      value_id = this.data.selectSx.value_id
    }else{
      value_id = ''
    }
    var that = this;
    wx.request({//获取分类
      url: url + 'shopping/setCar',
      method: 'POST',
      data: {
        openid: wx.getStorageSync('userinfo').openid,
        goods_id: this.data.goods_id,
        number: this.data.num,
        goods_type:0,
        value_id: value_id,
      },
      success: function (res) {
        if( res.data.code == 200 ){
          wx.showToast({
            title: '加入购物车成功',
            icon: 'success',
            duration: 500,
            mask: true
          })
        }else{
          wx.showToast({
            title: '重新加入购物车',
            icon: 'success',
            duration: 500,
            mask: true
          })
        }
        
      }
    })
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
    var name = e.currentTarget.dataset.name;
    this.setData({
      ['selectSx.img']: img,
      ['selectSx.name']: name,
      ['selectSx.price']: price,
      ['selectSx.inventory']: inventory,
      ['selectSx.value_id']: value_id,
      shuxIndex: index,
    })
    this.getAttr();
  },
  ershuxClick(e){
    var index = e.currentTarget.dataset.index;
    var img = e.currentTarget.dataset.img;
    var price = e.currentTarget.dataset.price;
    var inventory = e.currentTarget.dataset.inventory;
    var value_id = e.currentTarget.dataset.value_id;
    var name = e.currentTarget.dataset.name;
    this.setData({
      ['selectSx.img']: img,
      ['selectSx.name']: name,
      ['selectSx.price']: price,
      ['selectSx.inventory']: inventory,
      ['selectSx.value_id']: value_id,
      ershuxIndex: index,
    })
  },
  payclick(e) {
    var value_id;
    if (this.data.selectSx) {
      value_id = this.data.selectSx.value_id
    } else {
      value_id = ''
    }
    wx.navigateTo({
      url: '/pages/orderPay/orderPay?goods_id=' + this.data.goods_id + '&store_id=' + '&value_id=' + value_id + '&goods_type=0' + '&num=' + this.data.num + '&classify=' + this.data.category_id
    })
  },
  getAttr(e){
    var that = this;
    wx.request({//获取分类
      url: url + 'goods/goods_value',
      method: 'POST',
      data: {
        id: this.data.goods_id,
        level: wx.getStorageSync('userinfo').level,
        value_id: this.data.selectSx.value_id
      },
      success: function (res) {
        wx.hideToast();
        that.setData({
          attributes: res.data.data,
        })
        if( res.data.data.data.length > 0 ){
          that.setData({
            ['selectSx.img']: res.data.data.data[0].img,
            ['selectSx.price']: res.data.data.data[0].price,
            ['selectSx.name']: res.data.data.data[0].name,
            ['selectSx.inventory']: res.data.data.data[0].inventory,
            ['selectSx.value_id']: res.data.data.data[0].id,
          })
        }
      }
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
          that.setData({
            dettels: res.data.data,
            selectSx: res.data.data.sx.data[0]
          })
          if (res.data.data.sx.data.length > 0 ){
            that.getAttr();
          }else{
            wx.hideToast();
          }
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
