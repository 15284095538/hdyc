var url = getApp().globalData.publicUrl;

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
      imgUrl:[]
    },
    menu:[//导航
      {
        "path":"/images/menu_10.png",
        "text":"洗车",
        "link":"/pages/index/list/list"
      },
      {
        "path": "/images/menu_17.png",
        "text": "养护推荐",
        "link": "/pages/index/list/list"
      },
      {
        "path": "/images/menu_05.png",
        "text": "隐形车衣",
        "link": "/pages/index/list/list"
      },
      {
        "path": "/images/menu_07.png",
        "text": "汽车除甲醛",
        "link": "/pages/index/list/list"
      },
      {
        "path": "/images/menu_19.png",
        "text": "贴膜",
        "link": "/pages/index/list/list"
      },
      {
        "path": "/images/menu_16.png",
        "text": "钣金喷漆",
        "link": "/pages/index/list/list"
      },
      {
        "path": "/images/menu_17.png",
        "text": "全车镀晶",
        "link": "/pages/index/list/list"
      },
      {
        "path": "/images/menu_18.png",
        "text": "车用品购买",
        "link": "/pages/index/list/list"
      }
    ],
    classify:'',
  },
  onLoad(){
    this.getdata();
  },
  standalone(){//城市选择
    var that = this;
    that.setData({
      isChecked: true
    })
  },
  menulink(e){//导航跳转
    var link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link
    })
  },
  getdata(e){//获取数据
    var that = this;
    var lb = false;
    var classify = false;
    var classifyS = false;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask:true
    })

    wx.request({//获取轮播图
      url: url + 'home/lb',
      data: {
        'cate': '1'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          ['swiper.imgUrl']: res.data.data
        })
        lb = true
      }
    })
    wx.request({//获取推荐
      url: url + 'home/classify',
      method: 'POST',
      success: function (res) {
        that.setData({
          classify: res.data.data
        })
        classify = true
      }
    })
    wx.request({//获取分类
      url: url + 'home/classifyS',
      method: 'POST',
      success: function (res) {
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].link = '/pages/index/list/list'
        }
        console.log(res)
        classifyS = true
        
      }
    })

    if (lb && classify && classifyS ){
      wx.hideToast();
    }
  }
})
