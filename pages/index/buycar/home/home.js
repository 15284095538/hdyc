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
      imgUrl: '',
    },
    hotecar:'',//热销
    bkcar:'',//爆款
  },
  onLoad() {
    this.getdata();
  },
  getdata(e){//获取数据
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 55000,
      mask: true
    })
    wx.request({//获取轮播图
      url: url + 'home/lb',
      data: {
        'cate': '2'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          ['swiper.imgUrl']: res.data.data
        })
      }
    })
    wx.request({//获取内容
      url: url + 'car/recommend',
      method:'POST',
      success: res => {
        console.log( res )
        if( res.data.code == 200 ){
          that.setData({
            hotecar: res.data.data.rx,
            bkcar: res.data.data.bk,
          })
          wx.hideToast();
        }
        
      }
    })
  }
})