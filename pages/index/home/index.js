Page({
  data: {
    isChecked:false,
    swiper: {//banner图
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      indicatorcolor: '#d5d5d5',
      indicatoractivecolor: "#0084ff",
      imgUrl:[
        '/images/banner.jpg',
        '/images/banner.jpg',
        '/images/banner.jpg'
      ]
    },
    menu:[//导航
      {
        "path":"/images/menu_10.png",
        "text":"洗车"
      },
      {
        "path": "/images/menu_17.png",
        "text": "养护推荐"
      },
      {
        "path": "/images/menu_05.png",
        "text": "隐形车衣"
      },
      {
        "path": "/images/menu_07.png",
        "text": "汽车除甲醛"
      },
      {
        "path": "/images/menu_19.png",
        "text": "贴膜"
      },
      {
        "path": "/images/menu_16.png",
        "text": "新车销售"
      },
      {
        "path": "/images/menu_17.png",
        "text": "全车镀晶"
      },
      {
        "path": "/images/menu_18.png",
        "text": "车用品购买"
      }
    ],
    newcar:[// 新车购买
      {
        'path':'/images/car_03.png',
        "t":'热销推荐',
        "c":'热销推荐'
      },
      {
        'path': '/images/car_03.png',
        "t": '热销推荐',
        "c": '热销推荐'
      },
      {
        'path': '/images/car_03.png',
        "t": '热销推荐',
        "c": '热销推荐'
      },
      {
        'path': '/images/car_03.png',
        "t": '热销推荐',
        "c": '热销推荐'
      },
      {
        'path': '/images/car_03.png',
        "t": '热销推荐',
        "c": '热销推荐'
      },
      {
        'path': '/images/car_03.png',
        "t": '热销推荐',
        "c": '热销推荐'
      }
    ]
  },
  onLoad(){
    
  },
  standalone(){//城市选择
    var that = this;
    that.setData({
      isChecked: true
    })
  }
})
