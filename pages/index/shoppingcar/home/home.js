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
    hotecar:[
      {
        "price":"￥1.43",
        "name":"雪佛兰科沃兹",
        "path":"/images/car_03.png"
      },
      {
        "price": "￥1.43",
        "name": "雪佛兰科沃兹",
        "path": "/images/car_03.png"
      },
      {
        "price": "￥1.43",
        "name": "雪佛兰科沃兹",
        "path": "/images/car_03.png"
      }
    ]
  },
  onLoad() {
  
  }
})