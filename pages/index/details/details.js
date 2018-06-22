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
      ]
    },
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

    ]
  },
  ToPage(){
    wx.navigateTo({
      url: '/pages/index/comment/comment'
    })
  }
})
