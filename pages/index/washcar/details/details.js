// pages/store/details/details.js
Page({
  data: {
    aheight:"",
    store_id:'',
    class_id:'',
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    navbar: ["服务类别", "客户评价"],
    currentIndex: 0,//tabbar索引 
    address:{
      'da':'成都市邛崃市老陈大路462号天和车王养护（汇蜀路口）',
      'sn':'邛崃市天河车王养护',
      "grade": 1
    },
    fulb:[
      {
        "fulbp": "/images/fuwtp.png",
        "fwlbc":"洗车"
      },
     {
        "fulbp": "/images/fuwtp.png",
        "fwlbc": "洗车"
      },
      {
       "fulbp": "/images/fuwtp.png",
       "fwlbc": "洗车"
     },
     {
        "fulbp": "/images/fuwtp.png",
        "fwlbc": "洗车"
      },
      {
       "fulbp": "/images/fuwtp.png",
       "fwlbc": "洗车"
     },
     {
        "fulbp": "/images/fuwtp.png",
        "fwlbc": "洗车"
      },
      {
       "fulbp": "/images/fuwtp.png",
       "fwlbc": "洗车"
     },
     {
        "fulbp": "/images/fuwtp.png",
        "fwlbc": "洗车"
      }
    ],
    pinglun:[
      {
        npic:'/images/car_03.png',
        name:'李小姐',
        flag:5,
        time:'2018-05-21',
        message:'每次都在这里洗车，洗的非常专业，服务特别好，很用心。',
        pic:[
          '/images/car_03.png',
          '/images/car_03.png',
          '/images/car_03.png',
          '/images/car_03.png',
        ],
        stype:'标准洗车'
      },
      {
        npic: '/images/car_03.png',
        name: '李小姐',
        flag: 4,
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
  onLoad: function (e) {
    console.log(e )
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          aheight: res.windowHeight,
          class_id: e.class_id,
          store_id: e.store_id,
        });
      }
    });
  },

  navbarTab: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    });
  },
  ToPage() {
    wx.navigateTo({
      url: '/pages/store/comment/comment'
    })
  },
})