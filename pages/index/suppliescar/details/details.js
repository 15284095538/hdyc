Page({
  data: {
    swiper: {//banner图
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      indicatorcolor: '#d5d5d5',
      indicatoractivecolor: "#0084ff",
      imgUrl: [
        '/images/banner.jpg',
        '/images/banner.jpg',
        '/images/banner.jpg'
      ],
    },
    layerColorDisplay:'none',
    layerLiftcarDisplay: 'none',
    upMoreDisplay:'none',
    cans: [
      {
        "bt": "套餐分类",
        "sub": [
          {
            'text': "套餐一"
          },
          {
            'text': "套餐二"
          }
        ]
      },
      {
        "bt": "颜色",
        "sub": [
          {
            'text': "红"
          },
          {
            'text': "黑"
          }
        ]
      }
    ],
    pinglun: [
      {
        npic: '/images/car_03.png',
        name: '李小姐',
        flag: '4',
        time: '2018-05-21',
        message: '每次都在这里洗车，洗的非常专业，服务特别好，很用心。',
        pic: [
          '/images/car_03.png',
          '/images/car_03.png',
          '/images/car_03.png',
          '/images/car_03.png',
        ],
        stype: '标准洗车'
      },
      {
        npic: '/images/car_03.png',
        name: '李小姐',
        flag: '4',
        time: '2018-05-21',
        message: '每次都在这里洗车，洗的非常专业，服务特别好，很用心。',
        pic: [
          '/images/car_03.png',
          '/images/car_03.png',
          '/images/car_03.png',
          '/images/car_03.png',
        ],
        stype: '标准洗车'
      },

    ],
    lastX: 0,     //滑动开始x轴位置
    lastY: 0,     //滑动开始y轴位置
    currentGesture: 0, //标识手势
    isScroll:false
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
    if (this.data.isScroll) {
      wx.navigateTo({
        url: '/pages/index/suppliescar/pic/pic'
      })
    }
  },
  onReachBottom(e){
    this.setData({ isScroll: true })
  }
})
